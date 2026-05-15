import { expect } from 'chai';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { convertOpenAPIToBell } from '../src/converters/openapi';

// __dirname is dist/test/ at runtime; fixtures live in the source test/ directory
function fixturePath(caseName: string, file = 'input.json'): string {
  return path.join(__dirname, '..', '..', 'test', 'openapi', caseName, file);
}

function expectedFile(caseName: string, ...parts: string[]): string {
  return fs.readFileSync(
    path.join(__dirname, '..', '..', 'test', 'openapi', caseName, 'expected', ...parts),
    'utf8'
  );
}

describe('OpenAPI Converter', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'bell-openapi-'));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  // --- Happy path ---

  it('converts a simple GET operation without servers', () => {
    convertOpenAPIToBell(fixturePath('simple-get'), tmpDir);
    const output = fs.readFileSync(path.join(tmpDir, 'users', 'list_users.GET.bel'), 'utf8');
    expect(output).to.equal(expectedFile('simple-get', 'users', 'list_users.GET.bel'));
  });

  it('generates env.json and uses path statements when servers are defined', () => {
    convertOpenAPIToBell(fixturePath('with-servers'), tmpDir);

    const envOutput = fs.readFileSync(path.join(tmpDir, 'env.json'), 'utf8');
    expect(envOutput).to.equal(expectedFile('with-servers', 'env.json'));

    const belOutput = fs.readFileSync(path.join(tmpDir, 'users', 'list_users.GET.bel'), 'utf8');
    expect(belOutput).to.equal(expectedFile('with-servers', 'users', 'list_users.GET.bel'));
  });

  it('generates a body block from the request body schema', () => {
    convertOpenAPIToBell(fixturePath('post-with-body'), tmpDir);
    const output = fs.readFileSync(path.join(tmpDir, 'users', 'create_user.POST.bel'), 'utf8');
    expect(output).to.equal(expectedFile('post-with-body', 'users', 'create_user.POST.bel'));
  });

  it('declares path parameters as variables and emits query params', () => {
    convertOpenAPIToBell(fixturePath('path-and-query-params'), tmpDir);
    const output = fs.readFileSync(path.join(tmpDir, 'users', 'get_user.GET.bel'), 'utf8');
    expect(output).to.equal(expectedFile('path-and-query-params', 'users', 'get_user.GET.bel'));
  });

  it('emits commented security headers for bearer auth', () => {
    convertOpenAPIToBell(fixturePath('with-security'), tmpDir);
    const output = fs.readFileSync(path.join(tmpDir, 'users', 'list_users.GET.bel'), 'utf8');
    expect(output).to.equal(expectedFile('with-security', 'users', 'list_users.GET.bel'));
  });

  it('parses YAML input files', () => {
    convertOpenAPIToBell(fixturePath('yaml-format', 'input.yaml'), tmpDir);
    const output = fs.readFileSync(path.join(tmpDir, 'users', 'list_users.GET.bel'), 'utf8');
    expect(output).to.equal(expectedFile('yaml-format', 'users', 'list_users.GET.bel'));
  });

  it('uses operation tags as subdirectory names', () => {
    convertOpenAPIToBell(fixturePath('tags'), tmpDir);
    const users = fs.readFileSync(path.join(tmpDir, 'users', 'list_users.GET.bel'), 'utf8');
    const posts = fs.readFileSync(path.join(tmpDir, 'posts', 'list_posts.GET.bel'), 'utf8');
    expect(users).to.equal(expectedFile('tags', 'users', 'list_users.GET.bel'));
    expect(posts).to.equal(expectedFile('tags', 'posts', 'list_posts.GET.bel'));
  });

  it('generates one file per HTTP method on the same path', () => {
    convertOpenAPIToBell(fixturePath('multiple-methods'), tmpDir);
    const getOutput = fs.readFileSync(path.join(tmpDir, 'articles', 'list_articles.GET.bel'), 'utf8');
    const postOutput = fs.readFileSync(path.join(tmpDir, 'articles', 'create_article.POST.bel'), 'utf8');
    expect(getOutput).to.equal(expectedFile('multiple-methods', 'articles', 'list_articles.GET.bel'));
    expect(postOutput).to.equal(expectedFile('multiple-methods', 'articles', 'create_article.POST.bel'));
  });

  // --- Schema example generation ---

  it('uses the example field from the spec when present', () => {
    const spec = {
      openapi: '3.0.0',
      info: { title: 'T', version: '1' },
      paths: {
        '/ping': {
          get: {
            operationId: 'ping',
            summary: 'Ping',
            requestBody: {
              content: {
                'application/json': {
                  schema: { type: 'string', example: 'hello' },
                },
              },
            },
            responses: { '200': { description: 'ok' } },
          },
        },
      },
    };
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'bell-oa-'));
    const specPath = path.join(tmp, 'spec.json');
    fs.writeFileSync(specPath, JSON.stringify(spec));
    try {
      convertOpenAPIToBell(specPath, tmp);
      const output = fs.readFileSync(path.join(tmp, 'ping', 'ping.GET.bel'), 'utf8');
      expect(output).to.include('body "hello"');
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  });

  it('generates format-specific string examples (email, uuid, date)', () => {
    const spec = {
      openapi: '3.0.0',
      info: { title: 'T', version: '1' },
      paths: {
        '/items': {
          post: {
            operationId: 'createItem',
            summary: 'Create',
            requestBody: {
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      email: { type: 'string', format: 'email' },
                      id: { type: 'string', format: 'uuid' },
                      date: { type: 'string', format: 'date' },
                    },
                  },
                },
              },
            },
            responses: { '200': { description: 'ok' } },
          },
        },
      },
    };
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'bell-oa-'));
    const specPath = path.join(tmp, 'spec.json');
    fs.writeFileSync(specPath, JSON.stringify(spec));
    try {
      convertOpenAPIToBell(specPath, tmp);
      const output = fs.readFileSync(path.join(tmp, 'items', 'create_item.POST.bel'), 'utf8');
      expect(output).to.include('"user@example.com"');
      expect(output).to.include('"00000000-0000-0000-0000-000000000000"');
      expect(output).to.include('"2024-01-01"');
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  });

  it('picks the first enum value as the example', () => {
    const spec = {
      openapi: '3.0.0',
      info: { title: 'T', version: '1' },
      paths: {
        '/items': {
          get: {
            operationId: 'listItems',
            summary: 'List',
            parameters: [
              { name: 'status', in: 'query', schema: { type: 'string', enum: ['active', 'inactive'] } },
            ],
            responses: { '200': { description: 'ok' } },
          },
        },
      },
    };
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'bell-oa-'));
    const specPath = path.join(tmp, 'spec.json');
    fs.writeFileSync(specPath, JSON.stringify(spec));
    try {
      convertOpenAPIToBell(specPath, tmp);
      const output = fs.readFileSync(path.join(tmp, 'items', 'list_items.GET.bel'), 'utf8');
      expect(output).to.include('param "status" "active"');
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  });

  it('resolves $ref schemas from components', () => {
    const spec = {
      openapi: '3.0.0',
      info: { title: 'T', version: '1' },
      components: {
        schemas: {
          User: {
            type: 'object',
            properties: { name: { type: 'string' } },
          },
        },
      },
      paths: {
        '/users': {
          post: {
            operationId: 'createUser',
            summary: 'Create user',
            requestBody: {
              content: {
                'application/json': {
                  schema: { '$ref': '#/components/schemas/User' },
                },
              },
            },
            responses: { '201': { description: 'Created' } },
          },
        },
      },
    };
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'bell-oa-'));
    const specPath = path.join(tmp, 'spec.json');
    fs.writeFileSync(specPath, JSON.stringify(spec));
    try {
      convertOpenAPIToBell(specPath, tmp);
      const output = fs.readFileSync(path.join(tmp, 'users', 'create_user.POST.bel'), 'utf8');
      expect(output).to.include('"name": "example"');
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  });

  // --- Security scheme variants ---

  it('emits api-key header comment for apiKey security', () => {
    const spec = {
      openapi: '3.0.0',
      info: { title: 'T', version: '1' },
      components: {
        securitySchemes: {
          apiKey: { type: 'apiKey', in: 'header', name: 'X-API-Key' },
        },
      },
      security: [{ apiKey: [] }],
      paths: {
        '/items': {
          get: {
            operationId: 'listItems',
            summary: 'List',
            responses: { '200': { description: 'ok' } },
          },
        },
      },
    };
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'bell-oa-'));
    const specPath = path.join(tmp, 'spec.json');
    fs.writeFileSync(specPath, JSON.stringify(spec));
    try {
      convertOpenAPIToBell(specPath, tmp);
      const output = fs.readFileSync(path.join(tmp, 'items', 'list_items.GET.bel'), 'utf8');
      expect(output).to.include('# header "X-API-Key" "YOUR_API_KEY"');
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  });

  it('emits query param comment for query-based apiKey security', () => {
    const spec = {
      openapi: '3.0.0',
      info: { title: 'T', version: '1' },
      components: {
        securitySchemes: {
          apiKey: { type: 'apiKey', in: 'query', name: 'api_key' },
        },
      },
      security: [{ apiKey: [] }],
      paths: {
        '/items': {
          get: {
            operationId: 'listItems',
            summary: 'List',
            responses: { '200': { description: 'ok' } },
          },
        },
      },
    };
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'bell-oa-'));
    const specPath = path.join(tmp, 'spec.json');
    fs.writeFileSync(specPath, JSON.stringify(spec));
    try {
      convertOpenAPIToBell(specPath, tmp);
      const output = fs.readFileSync(path.join(tmp, 'items', 'list_items.GET.bel'), 'utf8');
      expect(output).to.include('# param "api_key" "YOUR_API_KEY"');
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  });

  it('uses the lowest 2xx status code in the expect assertion', () => {
    const spec = {
      openapi: '3.0.0',
      info: { title: 'T', version: '1' },
      paths: {
        '/things': {
          post: {
            operationId: 'createThing',
            summary: 'Create',
            responses: {
              '201': { description: 'Created' },
              '400': { description: 'Bad request' },
            },
          },
        },
      },
    };
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'bell-oa-'));
    const specPath = path.join(tmp, 'spec.json');
    fs.writeFileSync(specPath, JSON.stringify(spec));
    try {
      convertOpenAPIToBell(specPath, tmp);
      const output = fs.readFileSync(path.join(tmp, 'things', 'create_thing.POST.bel'), 'utf8');
      expect(output).to.include('expect response.status === 201');
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  });

  // --- Error handling ---

  it('throws when the file does not exist', () => {
    expect(() =>
      convertOpenAPIToBell('/nonexistent/path/spec.json', tmpDir)
    ).to.throw(/Failed to read file/);
  });

  it('throws on invalid JSON', () => {
    const badPath = path.join(tmpDir, 'bad.json');
    fs.writeFileSync(badPath, 'not json');
    expect(() => convertOpenAPIToBell(badPath, tmpDir)).to.throw(/Failed to parse/);
  });

  it('throws on Swagger 2.0 specs', () => {
    const swaggerPath = path.join(tmpDir, 'swagger.json');
    fs.writeFileSync(swaggerPath, JSON.stringify({ swagger: '2.0', info: {}, paths: {} }));
    expect(() => convertOpenAPIToBell(swaggerPath, tmpDir)).to.throw(/Unsupported OpenAPI version/);
  });

  it('throws when paths is missing', () => {
    const specPath = path.join(tmpDir, 'spec.json');
    fs.writeFileSync(specPath, JSON.stringify({ openapi: '3.0.0', info: { title: 'T', version: '1' } }));
    expect(() => convertOpenAPIToBell(specPath, tmpDir)).to.throw(/missing or invalid "paths"/);
  });

  it('creates the output directory if it does not exist', () => {
    const nestedOut = path.join(tmpDir, 'a', 'b', 'c');
    convertOpenAPIToBell(fixturePath('simple-get'), nestedOut);
    expect(fs.existsSync(path.join(nestedOut, 'users', 'list_users.GET.bel'))).to.be.true;
  });

  it('deduplicates parameters shared between path and operation', () => {
    const spec = {
      openapi: '3.0.0',
      info: { title: 'T', version: '1' },
      paths: {
        '/users/{userId}': {
          parameters: [
            { name: 'userId', in: 'path', required: true, schema: { type: 'string' } },
          ],
          get: {
            operationId: 'getUser',
            summary: 'Get user',
            parameters: [
              { name: 'userId', in: 'path', required: true, schema: { type: 'string' } },
            ],
            responses: { '200': { description: 'ok' } },
          },
        },
      },
    };
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'bell-oa-'));
    const specPath = path.join(tmp, 'spec.json');
    fs.writeFileSync(specPath, JSON.stringify(spec));
    try {
      convertOpenAPIToBell(specPath, tmp);
      const output = fs.readFileSync(path.join(tmp, 'users', 'get_user.GET.bel'), 'utf8');
      const matches = output.match(/userId = /g);
      expect(matches).to.have.length(1);
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true });
    }
  });
});
