import { expect } from 'chai';
import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { BellLexer } from '../src/grammar/BellLexer';
import { BellParser } from '../src/grammar/BellParser';
import { BellVisitor } from '../src/interpreter/BellVisitor';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import * as sinon from 'sinon';

const INTERNAL_DIR = path.join(__dirname, '..', '..', 'test', 'internal');

const runFile = async (filename: string) => {
  const source = fs.readFileSync(path.join(INTERNAL_DIR, filename), 'utf8');
  const inputStream = CharStreams.fromString(source);
  const lexer = new BellLexer(inputStream);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new BellParser(tokenStream);
  parser.removeErrorListeners();
  const tree = parser.program();
  if (parser.numberOfSyntaxErrors > 0) {
    throw new SyntaxError(`Found ${parser.numberOfSyntaxErrors} syntax error(s).`);
  }
  const visitor = new BellVisitor(
    path.join(INTERNAL_DIR, filename),
    null,
    { prompt: sinon.stub().resolves({}) } as any,
  );
  await visitor.visit(tree);
  return visitor;
};

describe('Internal Bell test files', () => {
  let axiosStub: sinon.SinonStub;

  beforeEach(() => {
    axiosStub = sinon.stub(axios, 'request').resolves({
      status: 200, statusText: 'OK', data: {},
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('comments', () => {
    it('0-comments-0-singleLine: single-line comment does not affect execution', async () => {
      await runFile('0-comments-0-singleLine.bel');
    });

    it('0-comments-1-multiLine: multi-line comment does not affect execution', async () => {
      await runFile('0-comments-1-multiLine.bel');
    });

    it('0-comments-2-multiLineTrailing: trailing text after closing ### causes syntax error', async () => {
      try {
        await runFile('0-comments-2-multiLineTrailing.bel');
        expect.fail('should have thrown');
      } catch (err: any) {
        expect(err).to.be.instanceOf(SyntaxError);
      }
    });
  });

  describe('variables', () => {
    it('1-variables-0-camelCaseNumber: camelCase variable holds a number', async () => {
      const v = await runFile('1-variables-0-camelCaseNumber.bel');
      expect((v as any).variables.get('testVariable')).to.equal(10);
    });

    it('1-variables-1-snakeCaseString: snake_case variable holds a string', async () => {
      const v = await runFile('1-variables-1-snakeCaseString.bel');
      expect((v as any).variables.get('test_variable')).to.equal('valid');
    });

    it('1-variables-2-withNumbers: variable name with embedded numbers', async () => {
      const v = await runFile('1-variables-2-withNumbers.bel');
      expect((v as any).variables.get('test1Variable2')).to.equal('valid');
    });

    it('1-variables-3-noEndToString: unclosed string literal is a syntax error', async () => {
      try {
        await runFile('1-variables-3-noEndToString.bel');
        expect.fail('should have thrown');
      } catch (err: any) {
        expect(err).to.be.instanceOf(SyntaxError);
      }
    });

    it('1-variables-4-leadingNumberInVarName: leading number in identifier is a syntax error', async () => {
      try {
        await runFile('1-variables-4-leadingNumberInVarName.bel');
        expect.fail('should have thrown');
      } catch (err: any) {
        expect(err).to.be.instanceOf(SyntaxError);
      }
    });

    it('1-variables-5-variableNotFound: referencing an undefined variable throws', async () => {
      try {
        await runFile('1-variables-5-variableNotFound.bel');
        expect.fail('should have thrown');
      } catch (err: any) {
        expect(err.message).to.include('Undefined variable');
      }
    });

    it('1-variables-6-variableSetToVariable: variable assigned from another variable', async () => {
      const v = await runFile('1-variables-6-variableSetToVariable.bel');
      expect((v as any).variables.get('test2')).to.equal(999);
    });

    it('1-variables-7-variableReset: variable can be reassigned', async () => {
      const v = await runFile('1-variables-7-variableReset.bel');
      expect((v as any).variables.get('test1')).to.equal('reset');
    });

    it('1-variables-8-stringInterpolation: variable value is interpolated into string', async () => {
      const v = await runFile('1-variables-8-stringInterpolation.bel');
      expect((v as any).variables.get('outside')).to.equal('string has 10 inside');
    });

    it('1-variables-9-stringInterpolationNoEndError: unclosed interpolation brace throws', async () => {
      try {
        await runFile('1-variables-9-stringInterpolationNoEndError.bel');
        expect.fail('should have thrown');
      } catch (err: any) {
        expect(err.message).to.include('Unclosed interpolation brace');
      }
    });
  });

  describe('requests', () => {
    it('2-request-0-url: GET with full URL dispatches request', async () => {
      await runFile('2-request-0-url.bel');
      expect(axiosStub.calledOnce).to.be.true;
      expect(axiosStub.firstCall.args[0].url).to.include('subdomain.domain.com');
    });

    it('2-request-1-param: string key-value param is sent in request', async () => {
      await runFile('2-request-1-param.bel');
      expect(axiosStub.firstCall.args[0].params).to.deep.equal({ name: 'value' });
    });

    it('2-request-2-paramNumbersAndBooleans: number and boolean param values', async () => {
      await runFile('2-request-2-paramNumbersAndBooleans.bel');
      expect(axiosStub.firstCall.args[0].params).to.deep.equal({ number: 0, boolean: true });
    });

    it('2-request-3-paramVariable: variable values used as param key and value', async () => {
      const v = await runFile('2-request-3-paramVariable.bel');
      expect(axiosStub.firstCall.args[0].params).to.deep.equal({ query: 30 });
    });
  });
});
