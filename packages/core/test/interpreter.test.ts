import { expect } from 'chai';
import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { BellLexer } from '../src/grammar/BellLexer';
import { BellParser } from '../src/grammar/BellParser';
import { BellVisitor } from '../src/interpreter/BellVisitor';
import axios from 'axios';
import * as path from 'path';
import * as sinon from 'sinon';

describe('Bell Interpreter', () => {
  let axiosStub: sinon.SinonStub;

  const makePrompter = (responses: Record<string, any>) => ({
    prompt: sinon.stub().resolves(responses),
  } as any);

  const runCode = async (code: string, prompter?: any) => {
    const inputStream = CharStreams.fromString(code);
    const lexer = new BellLexer(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new BellParser(tokenStream);
    const tree = parser.program();

    const visitor = new BellVisitor(path.join(__dirname, 'test.bel'), null, prompter);
    await visitor.visit(tree);
    return visitor;
  };

  beforeEach(() => {
    axiosStub = sinon.stub(axios, 'request').resolves({ status: 200, statusText: 'OK', data: { token: 'abc123' } });
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should handle variable assignments', async () => {
    const visitor = await runCode(`foo = "bar"`);
    expect((visitor as any).variables.get('foo')).to.equal('bar');
  });

  it('should parse basic HTTP statements', async () => {
    await runCode(`
      url "http://example.com"
      GET
    `);
    expect(axiosStub.calledOnce).to.be.true;
  });

  it('should set timeout on the request config', async () => {
    await runCode(`
      url "http://example.com"
      timeout 5000
      GET
    `);
    expect(axiosStub.calledOnce).to.be.true;
    expect(axiosStub.firstCall.args[0].timeout).to.equal(5000);
  });

  it('should evaluate timeout using multiplication', async () => {
    await runCode(`
      url "http://example.com"
      timeout 10 * 1000
      GET
    `);
    expect(axiosStub.firstCall.args[0].timeout).to.equal(10000);
  });

  it('should wait between requests', async () => {
    const clock = sinon.useFakeTimers();
    const p = runCode(`
      url "http://example.com"
      GET
      wait 100
      url "http://example.com"
      GET
    `);
    await clock.tickAsync(200);
    await p;
    expect(axiosStub.callCount).to.equal(2);
    clock.restore();
  });

  it('should prompt and proceed when warn is confirmed', async () => {
    const prompter = makePrompter({ confirm: true });
    await runCode(`warn "About to do something dangerous"`, prompter);
    expect(prompter.prompt.calledOnce).to.be.true;
  });

  it('should exit when warn is rejected', async () => {
    const prompter = makePrompter({ confirm: false });
    const exitStub = sinon.stub(process, 'exit');
    await runCode(`warn "About to do something dangerous"`, prompter);
    expect(exitStub.calledWith(0)).to.be.true;
    exitStub.restore();
  });

  it('should collect input from user', async () => {
    const prompter = makePrompter({ val: 'typed value' });
    const visitor = await runCode(`result = input("Enter a value")`, prompter);
    expect((visitor as any).variables.get('result')).to.equal('typed value');
  });

  it('should set env without prompting when only one option given', async () => {
    const prompter = makePrompter({});
    await runCode(`env "dev"`, prompter);
    expect(prompter.prompt.notCalled).to.be.true;
  });

  it('should prompt for env selection when multiple options given', async () => {
    const prompter = makePrompter({ env: 'prod' });
    const visitor = await runCode(`env "dev" | "prod"`, prompter);
    expect(prompter.prompt.calledOnce).to.be.true;
    expect((visitor as any).selectedEnv).to.equal('prod');
  });
});
