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

  // __dirname is dist/test/ at runtime; source fixtures are two levels up
  const fp = (name: string) =>
    path.resolve(__dirname, '../../test/fixtures', name).replace(/\\/g, '/');

  describe('request building', () => {
    it('sets query params via param key-value', async () => {
      await runCode(`
        url "http://example.com"
        param "page" 2
        GET
      `);
      expect(axiosStub.firstCall.args[0].params).to.deep.equal({ page: 2 });
    });

    it('sets query params via param variable', async () => {
      await runCode(`
        token = "abc"
        url "http://example.com"
        param token
        GET
      `);
      expect(axiosStub.firstCall.args[0].params).to.deep.equal({ token: 'abc' });
    });

    it('sets a single header', async () => {
      await runCode(`
        url "http://example.com"
        header "Authorization" "Bearer xyz"
        GET
      `);
      expect(axiosStub.firstCall.args[0].headers).to.include({ Authorization: 'Bearer xyz' });
    });

    it('merges bulk headers from object literal', async () => {
      await runCode(`
        url "http://example.com"
        headers { "Content-Type": "application/json", Accept: "text/html" }
        GET
      `);
      const headers = axiosStub.firstCall.args[0].headers;
      expect(headers['Content-Type']).to.equal('application/json');
      expect(headers.Accept).to.equal('text/html');
    });

    it('sets request body', async () => {
      await runCode(`
        url "http://example.com"
        body { name: "Alice", age: 30 }
        POST
      `);
      expect(axiosStub.firstCall.args[0].data).to.deep.equal({ name: 'Alice', age: 30 });
    });

    it('constructs URL from .env base URL and path', async () => {
      await runCode(`
        import "${fp('.env.test')}"
        path "/health"
        GET
      `);
      expect(axiosStub.firstCall.args[0].url).to.equal('http://api.local/health');
    });

    it('prepends http:// when path has no base URL', async () => {
      await runCode(`
        path "api.example.com/health"
        GET
      `);
      expect(axiosStub.firstCall.args[0].url).to.equal('http://api.example.com/health');
    });
  });

  describe('HTTP error responses', () => {
    it('captures 4xx response in lastResponse and continues', async () => {
      const err = new Error('Not Found') as any;
      err.response = { status: 404, statusText: 'Not Found', data: {} };
      axiosStub.rejects(err);
      const visitor = await runCode(`
        url "http://example.com"
        GET
        code = response.status
      `);
      expect((visitor as any).variables.get('code')).to.equal(404);
    });

    it('captures 401 response in lastResponse and continues', async () => {
      const err = new Error('Unauthorized') as any;
      err.response = { status: 401, statusText: 'Unauthorized', data: {} };
      axiosStub.rejects(err);
      const visitor = await runCode(`
        url "http://example.com"
        GET
        code = response.status
      `);
      expect((visitor as any).variables.get('code')).to.equal(401);
    });

    it('captures 5xx response in lastResponse and continues', async () => {
      const err = new Error('Internal Server Error') as any;
      err.response = { status: 500, statusText: 'Internal Server Error', data: {} };
      axiosStub.rejects(err);
      const visitor = await runCode(`
        url "http://example.com"
        GET
        code = response.status
      `);
      expect((visitor as any).variables.get('code')).to.equal(500);
    });

    it('throws on ECONNREFUSED', async () => {
      const err = new Error('connect ECONNREFUSED') as any;
      err.code = 'ECONNREFUSED';
      axiosStub.rejects(err);
      try {
        await runCode(`url "http://example.com"\nGET`);
        expect.fail('should have thrown');
      } catch (e: any) {
        expect(e.code).to.equal('ECONNREFUSED');
      }
    });

    it('throws on ENOTFOUND', async () => {
      const err = new Error('getaddrinfo ENOTFOUND') as any;
      err.code = 'ENOTFOUND';
      axiosStub.rejects(err);
      try {
        await runCode(`url "http://example.com"\nGET`);
        expect.fail('should have thrown');
      } catch (e: any) {
        expect(e.code).to.equal('ENOTFOUND');
      }
    });

    it('throws on ETIMEDOUT', async () => {
      const err = new Error('timeout') as any;
      err.code = 'ETIMEDOUT';
      axiosStub.rejects(err);
      try {
        await runCode(`url "http://example.com"\nGET`);
        expect.fail('should have thrown');
      } catch (e: any) {
        expect(e.code).to.equal('ETIMEDOUT');
      }
    });

    it('throws on generic error with no code and no response', async () => {
      axiosStub.rejects(new Error('Something unexpected'));
      try {
        await runCode(`url "http://example.com"\nGET`);
        expect.fail('should have thrown');
      } catch (e: any) {
        expect(e.message).to.include('Something unexpected');
      }
    });
  });

  describe('expressions: operators and data types', () => {
    it('evaluates object literal with identifier keys', async () => {
      const visitor = await runCode(`obj = { name: "Alice", age: 30 }`);
      expect((visitor as any).variables.get('obj')).to.deep.equal({ name: 'Alice', age: 30 });
    });

    it('evaluates object literal with string keys', async () => {
      const visitor = await runCode(`obj = { "Content-Type": "application/json" }`);
      expect((visitor as any).variables.get('obj')).to.deep.equal({ 'Content-Type': 'application/json' });
    });

    it('evaluates array literal', async () => {
      const visitor = await runCode(`arr = [1, "two", true]`);
      expect((visitor as any).variables.get('arr')).to.deep.equal([1, 'two', true]);
    });

    it('adds two numbers', async () => {
      const visitor = await runCode(`result = 3 + 4`);
      expect((visitor as any).variables.get('result')).to.equal(7);
    });

    it('concatenates strings with +', async () => {
      const visitor = await runCode(`result = "hello" + " world"`);
      expect((visitor as any).variables.get('result')).to.equal('hello world');
    });

    it('divides two numbers', async () => {
      const visitor = await runCode(`result = 10 / 4`);
      expect((visitor as any).variables.get('result')).to.equal(2.5);
    });
  });

  describe('import system', () => {
    it('imports a JSON file as a variable', async () => {
      const visitor = await runCode(`import data from "${fp('data.json')}"`);
      expect((visitor as any).variables.get('data')).to.deep.equal({ host: 'api.example.com', port: 8080 });
    });

    it('imports a .env file as an object variable', async () => {
      const visitor = await runCode(`import env from "${fp('.env.test')}"`);
      expect((visitor as any).variables.get('env')).to.deep.equal({
        BELL_URL: 'http://api.local',
        API_KEY: 'secret123',
        DB_HOST: 'localhost',
      });
    });

    it('warns and continues when default .env import is missing', async () => {
      const visitor = await runCode(`import env from "/no/such/.env.missing"`);
      expect((visitor as any).variables.has('env')).to.be.false;
    });

    it('imports named keys from a .env file', async () => {
      const visitor = await runCode(`import { API_KEY } from "${fp('.env.test')}"`);
      expect((visitor as any).variables.get('API_KEY')).to.equal('secret123');
    });

    it('imports a named export from a .ts file', async () => {
      const visitor = await runCode(`import { greeting } from "${fp('named-exports.ts')}"`);
      expect((visitor as any).variables.get('greeting')).to.equal('hello');
    });

    it('stores null for unknown named keys from .ts file', async () => {
      const visitor = await runCode(`import { missing } from "${fp('named-exports.ts')}"`);
      expect((visitor as any).variables.get('missing')).to.be.null;
    });

    it('anonymously loads a JSON file as environments config', async () => {
      const visitor = await runCode(`import "${fp('env-config.json')}"`);
      expect((visitor as any).environments).to.deep.equal({
        dev: { url: 'http://dev.api.com' },
        prod: { url: 'http://prod.api.com' },
      });
    });

    it('anonymously loads a .env file (sets variables and BELL_URL as base URL)', async () => {
      const visitor = await runCode(`import "${fp('.env.test')}"`);
      expect((visitor as any).dotEnvBaseUrl).to.equal('http://api.local');
      expect((visitor as any).variables.get('API_KEY')).to.equal('secret123');
      expect((visitor as any).variables.get('DB_HOST')).to.equal('localhost');
    });

    it('warns and continues when anonymous .env import is missing', async () => {
      const visitor = await runCode(`import "/no/such/.env.missing"`);
      expect((visitor as any).dotEnvBaseUrl).to.be.null;
    });

    it('stores a file marker for unsupported import types', async () => {
      const visitor = await runCode(`import schema from "/some/path/schema.xml"`);
      expect((visitor as any).variables.get('schema')).to.deep.equal({ __file: '/some/path/schema.xml' });
    });
  });

  describe('export statement', () => {
    it('does not throw and is a no-op', async () => {
      const visitor = await runCode(`
        token = "abc123"
        export token
      `);
      expect((visitor as any).variables.get('token')).to.equal('abc123');
    });
  });

  describe('env: additional variants', () => {
    it('skips prompting when env is already selected', async () => {
      const visitor = new BellVisitor(path.join(__dirname, 'test.bel'), 'dev') as any;
      const tree = new BellParser(new CommonTokenStream(new BellLexer(
        CharStreams.fromString(`env "dev" | "prod"`)
      ))).program();
      const logs: string[] = [];
      const orig = console.log;
      console.log = (...args: any[]) => logs.push(args.join(' '));
      await visitor.visit(tree);
      console.log = orig;
      expect(logs.some((l: string) => l.includes('Using environment'))).to.be.true;
      expect(visitor.selectedEnv).to.equal('dev');
    });

    it('prompts from loaded environments config when env has no inline options', async () => {
      const prompter = makePrompter({ env: 'prod' });
      const visitor = await runCode(`
        import "${fp('env-config.json')}"
        env
      `, prompter);
      expect(prompter.prompt.calledOnce).to.be.true;
      expect((visitor as any).selectedEnv).to.equal('prod');
    });

    it('warns when env is called with no options and no config loaded', async () => {
      const logs: string[] = [];
      const orig = console.log;
      console.log = (...args: any[]) => logs.push(args.join(' '));
      await runCode(`env`);
      console.log = orig;
      expect(logs.some((l: string) => l.includes('no environment options provided'))).to.be.true;
    });
  });

  describe('validate: edge cases', () => {
    const parse = (code: string) => {
      const lexer = new BellLexer(CharStreams.fromString(code));
      return new BellParser(new CommonTokenStream(lexer)).program();
    };

    it('reports null/undefined when value is null and schema lacks safeParse', async () => {
      const visitor = new BellVisitor(path.join(__dirname, 'test.bel')) as any;
      visitor.variables.set('NoSchema', { notZod: true });
      visitor.variables.set('data', null);
      const logs: string[] = [];
      const orig = console.log;
      console.log = (...args: any[]) => logs.push(args.join(' '));
      await visitor.visit(parse(`validate data as NoSchema`));
      console.log = orig;
      expect(logs.some((l: string) => l.includes('null or undefined'))).to.be.true;
    });

    it('warns when schema is not a Zod object', async () => {
      const visitor = new BellVisitor(path.join(__dirname, 'test.bel')) as any;
      visitor.variables.set('BadSchema', { notZod: true });
      visitor.variables.set('data', { id: 1 });
      const logs: string[] = [];
      const orig = console.log;
      console.log = (...args: any[]) => logs.push(args.join(' '));
      await visitor.visit(parse(`validate data as BadSchema`));
      console.log = orig;
      expect(logs.some((l: string) => l.includes('not a Zod schema'))).to.be.true;
    });
  });

  describe('request keyword (inline composition)', () => {
    it('executes another .bel file inline', async () => {
      await runCode(`request "${fp('sub.bel')}"`);
      expect(axiosStub.calledOnce).to.be.true;
      expect(axiosStub.firstCall.args[0].url).to.equal('http://sub.example.com');
    });
  });

  describe('warn call expression', () => {
    it('prompts and returns the original value', async () => {
      const prompter = makePrompter({ confirm: true });
      const visitor = await runCode(`result = warn "Are you sure?"`, prompter);
      expect((visitor as any).variables.get('result')).to.equal('Are you sure?');
    });
  });
});
