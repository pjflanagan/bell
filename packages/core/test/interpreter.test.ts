import { expect } from 'chai';
import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { BellLexer } from '../src/grammar/BellLexer';
import { BellParser } from '../src/grammar/BellParser';
import { BellVisitor } from '../src/interpreter/BellVisitor';
import axios from 'axios';
import * as path from 'path';
import * as sinon from 'sinon';
import { z } from 'zod';

// Register ts-node so the test suite can load .ts fixture files via require()
try {
  require('ts-node').register({ transpileOnly: true, skipProject: true, compilerOptions: { module: 'commonjs' } });
} catch { /* ok */ }

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
    parser.removeErrorListeners();
    const tree = parser.program();
    if (parser.numberOfSyntaxErrors > 0) {
      throw new SyntaxError(`Found ${parser.numberOfSyntaxErrors} syntax error(s).`);
    }

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

  describe('response access', () => {
    it('should expose response.body (axios data)', async () => {
      const visitor = await runCode(`
        url "http://example.com"
        POST
        token = response.body.token
      `);
      expect((visitor as any).variables.get('token')).to.equal('abc123');
    });

    it('should expose response.status', async () => {
      const visitor = await runCode(`
        url "http://example.com"
        GET
        code = response.status
      `);
      expect((visitor as any).variables.get('code')).to.equal(200);
    });

    it('should access response by index for multiple requests', async () => {
      const visitor = await runCode(`
        url "http://example.com"
        GET
        url "http://example.com"
        GET
        first = response.[0].status
      `);
      expect((visitor as any).variables.get('first')).to.equal(200);
    });

    it('should reset request config between requests but keep variables', async () => {
      await runCode(`
        url "http://example.com"
        param "a" "1"
        GET
        url "http://example.com"
        GET
      `);
      // Second request should not carry over params from first
      expect(axiosStub.callCount).to.equal(2);
      expect(axiosStub.secondCall.args[0].params).to.deep.equal({});
    });
  });

  describe('error handling', () => {
    it('should throw on undefined variable reference', async () => {
      try {
        await runCode(`log undefinedVar`);
        expect.fail('should have thrown');
      } catch (err: any) {
        expect(err.message).to.include('Undefined variable');
        expect(err.message).to.include('undefinedVar');
      }
    });

    it('should throw on undefined variable in string interpolation', async () => {
      try {
        await runCode(`x = "hello {missing}"`);
        expect.fail('should have thrown');
      } catch (err: any) {
        expect(err.message).to.include('Undefined variable in string interpolation');
        expect(err.message).to.include('missing');
      }
    });

    it('should throw on unclosed interpolation brace', async () => {
      try {
        await runCode(`x = "hello {unclosed"`);
        expect.fail('should have thrown');
      } catch (err: any) {
        expect(err.message).to.include('Unclosed interpolation brace');
      }
    });

    it('should throw a SyntaxError on malformed source', async () => {
      try {
        await runCode(`x = "unclosed string`);
        expect.fail('should have thrown');
      } catch (err: any) {
        expect(err).to.be.instanceOf(SyntaxError);
      }
    });
  });

  describe('assert statement', () => {
    it('should log pass and continue when assertion is truthy', async () => {
      const logs: string[] = [];
      const orig = console.log;
      console.log = (...args: any[]) => logs.push(args.join(' '));
      await runCode(`assert true`);
      console.log = orig;
      expect(logs.some(l => l.includes('Assert Passed'))).to.be.true;
    });

    it('should exit when assertion is falsy', async () => {
      const exitStub = sinon.stub(process, 'exit');
      await runCode(`assert false`);
      expect(exitStub.calledWith(1)).to.be.true;
      exitStub.restore();
    });
  });

  describe('require statement', () => {
    it('should log pass and continue when condition is truthy', async () => {
      const logs: string[] = [];
      const orig = console.log;
      console.log = (...args: any[]) => logs.push(args.join(' '));
      await runCode(`require true`);
      console.log = orig;
      expect(logs.some(l => l.includes('Require Passed'))).to.be.true;
    });

    it('should exit when condition is falsy', async () => {
      const exitStub = sinon.stub(process, 'exit');
      await runCode(`require false`);
      expect(exitStub.calledWith(1)).to.be.true;
      exitStub.restore();
    });
  });

  describe('Zod validation', () => {
    const UserSchema = z.object({ id: z.number(), name: z.string() });

    const runWithSchema = async (code: string, schemaName: string, schema: any) => {
      const visitor = await runCode('') as any;
      visitor.variables.set(schemaName, schema);
      // parse and visit just the validate statement
      const inputStream = CharStreams.fromString(code);
      const lexer = new BellLexer(inputStream);
      const tokenStream = new CommonTokenStream(lexer);
      const parser = new BellParser(tokenStream);
      const tree = parser.program();
      // re-use visitor with schema already set
      const v2 = new BellVisitor(path.join(__dirname, 'test.bel'));
      (v2 as any).variables.set(schemaName, schema);
      await v2.visit(tree);
      return v2;
    };

    it('should pass validation for a valid object', async () => {
      const visitor = new BellVisitor(path.join(__dirname, 'test.bel')) as any;
      visitor.variables.set('UserSchema', UserSchema);
      visitor.variables.set('data', { id: 1, name: 'Alice' });

      const inputStream = CharStreams.fromString(`validate data as UserSchema`);
      const lexer = new BellLexer(inputStream);
      const tree = new BellParser(new CommonTokenStream(lexer)).program();
      await visitor.visit(tree);
      // no throw = passed
    });

    it('should fail validation for an invalid object', async () => {
      const logs: string[] = [];
      const originalLog = console.log;
      console.log = (...args: any[]) => logs.push(args.join(' '));

      const visitor = new BellVisitor(path.join(__dirname, 'test.bel')) as any;
      visitor.variables.set('UserSchema', UserSchema);
      visitor.variables.set('data', { id: 'not-a-number', name: 'Alice' });

      const inputStream = CharStreams.fromString(`validate data as UserSchema`);
      const lexer = new BellLexer(inputStream);
      const tree = new BellParser(new CommonTokenStream(lexer)).program();
      await visitor.visit(tree);

      console.log = originalLog;
      expect(logs.some(l => l.includes('Validation Failed'))).to.be.true;
      expect(logs.some(l => l.includes('id'))).to.be.true;
    });

    it('should load a .ts schema file and validate with it', async () => {
      // __dirname is dist/test/ at runtime; source fixtures are two levels up at test/fixtures/
      const schemaPath = path.resolve(__dirname, '../../test/fixtures/user.schema.ts').replace(/\\/g, '/');
      const visitor = await runCode(`import UserSchema from "${schemaPath}"`);
      const schema = (visitor as any).variables.get('UserSchema');
      expect(schema).to.not.be.null;
      expect(typeof schema.safeParse).to.equal('function');
      expect(schema.safeParse({ id: 1, name: 'Bob' }).success).to.be.true;
      expect(schema.safeParse({ id: 'bad', name: 'Bob' }).success).to.be.false;
    });
  });
});
