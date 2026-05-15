import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import * as yaml from 'js-yaml';

// --- OpenAPI 3.x type definitions ---

interface OpenAPISpec {
  openapi: string;
  info: { title?: string; version?: string };
  servers?: Server[];
  paths?: Record<string, PathItem>;
  components?: {
    securitySchemes?: Record<string, SecurityScheme>;
    schemas?: Record<string, SchemaObject | Reference>;
  };
  security?: SecurityRequirement[];
}

interface Server {
  url: string;
  description?: string;
  variables?: Record<string, { default: string }>;
}

interface PathItem {
  parameters?: (Parameter | Reference)[];
  get?: Operation;
  put?: Operation;
  post?: Operation;
  delete?: Operation;
  options?: Operation;
  head?: Operation;
  patch?: Operation;
}

interface Operation {
  tags?: string[];
  summary?: string;
  description?: string;
  operationId?: string;
  parameters?: (Parameter | Reference)[];
  requestBody?: RequestBody | Reference;
  responses?: Record<string, unknown>;
  security?: SecurityRequirement[];
}

interface Parameter {
  name: string;
  in: 'query' | 'header' | 'path' | 'cookie';
  required?: boolean;
  schema?: SchemaObject | Reference;
  example?: unknown;
}

interface RequestBody {
  content: Record<string, MediaType>;
  required?: boolean;
}

interface MediaType {
  schema?: SchemaObject | Reference;
  example?: unknown;
  examples?: Record<string, Example | Reference>;
}

interface Example {
  value?: unknown;
}

interface SchemaObject {
  type?: string | string[];
  properties?: Record<string, SchemaObject | Reference>;
  items?: SchemaObject | Reference;
  enum?: unknown[];
  example?: unknown;
  default?: unknown;
  allOf?: (SchemaObject | Reference)[];
  oneOf?: (SchemaObject | Reference)[];
  anyOf?: (SchemaObject | Reference)[];
  format?: string;
  '$ref'?: string;
}

interface Reference {
  '$ref': string;
}

type SecurityRequirement = Record<string, string[]>;

interface SecurityScheme {
  type: 'apiKey' | 'http' | 'oauth2' | 'openIdConnect';
  scheme?: string;
  in?: 'query' | 'header' | 'cookie';
  name?: string;
}

interface EnvInfo {
  hasEnvFile: boolean;
  keys: string[];
}

// --- Public API ---

export function convertOpenAPIToBell(openApiPath: string, outputDir: string): void {
  const content = readFile(openApiPath);
  const spec = parseSpec(openApiPath, content);
  validateSpec(spec);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log(chalk.gray(`  API: ${chalk.bold(spec.info?.title || 'Unnamed')} v${spec.info?.version || '?'}`));

  const servers = spec.servers ?? [];
  const envKeys = computeEnvKeys(servers);
  const envInfo: EnvInfo = { hasEnvFile: servers.length > 0, keys: envKeys };

  if (envInfo.hasEnvFile) {
    writeEnvFile(servers, envKeys, outputDir);
    console.log(chalk.gray(`  Generated env.json with ${servers.length} server(s)`));
  }

  let fileCount = 0;
  const paths = spec.paths ?? {};

  for (const [apiPath, pathItem] of Object.entries(paths)) {
    if (!pathItem) continue;
    const pathLevelParams = resolveParams(pathItem.parameters ?? [], spec);

    for (const method of ['get', 'post', 'put', 'patch', 'delete', 'options', 'head'] as const) {
      const operation = pathItem[method];
      if (!operation) continue;

      const dirName = getOperationDir(operation, apiPath);
      const opDir = dirName ? path.join(outputDir, dirName) : outputDir;
      if (!fs.existsSync(opDir)) {
        fs.mkdirSync(opDir, { recursive: true });
      }

      const fileName = getFileName(operation, apiPath, method);
      const envRelPath = dirName ? '../env.json' : 'env.json';
      const allParams = deduplicateParams([
        ...pathLevelParams,
        ...resolveParams(operation.parameters ?? [], spec),
      ]);

      const bellContent = generateBellFile(method.toUpperCase(), apiPath, operation, allParams, spec, envInfo, envRelPath);
      fs.writeFileSync(path.join(opDir, fileName), bellContent, 'utf8');
      fileCount++;
    }
  }

  console.log(chalk.gray(`  Generated ${fileCount} .bel file(s)`));
}

// --- Internal helpers ---

function readFile(filePath: string): string {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (err: any) {
    throw new Error(`Failed to read file: ${err.message}`);
  }
}

function parseSpec(filePath: string, content: string): OpenAPISpec {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.yaml' || ext === '.yml') {
    try {
      return yaml.load(content) as OpenAPISpec;
    } catch (err: any) {
      throw new Error(`Failed to parse OpenAPI YAML: ${err.message}`);
    }
  }
  try {
    return JSON.parse(content);
  } catch (err: any) {
    throw new Error(`Failed to parse OpenAPI JSON: ${err.message}`);
  }
}

function validateSpec(spec: OpenAPISpec): void {
  if ((spec as any).swagger) {
    throw new Error(`Unsupported OpenAPI version: Swagger ${(spec as any).swagger} is not supported. Only OpenAPI 3.x is supported.`);
  }
  if (!spec?.openapi) {
    throw new Error('Invalid OpenAPI spec: missing "openapi" version field.');
  }
  if (!spec.openapi.startsWith('3.')) {
    throw new Error(`Unsupported OpenAPI version: ${spec.openapi}. Only OpenAPI 3.x is supported.`);
  }
  if (!spec.paths || typeof spec.paths !== 'object') {
    throw new Error('Invalid OpenAPI spec: missing or invalid "paths".');
  }
}

function computeEnvKeys(servers: Server[]): string[] {
  return servers.map((server, index) => {
    if (server.description) return sanitizeName(server.description);
    return index === 0 ? 'default' : `server_${index}`;
  });
}

function writeEnvFile(servers: Server[], keys: string[], outputDir: string): void {
  const config: Record<string, { url: string }> = {};
  servers.forEach((server, index) => {
    let url = server.url;
    for (const [varName, varDef] of Object.entries(server.variables ?? {})) {
      url = url.replace(`{${varName}}`, varDef.default);
    }
    config[keys[index]] = { url: url.replace(/\/$/, '') };
  });
  fs.writeFileSync(path.join(outputDir, 'env.json'), JSON.stringify(config, null, 2) + '\n', 'utf8');
}

function resolveParams(params: (Parameter | Reference)[], spec: OpenAPISpec): Parameter[] {
  return params
    .map(p => (isReference(p) ? resolveRef<Parameter>(p['$ref'], spec) : p))
    .filter((p): p is Parameter => p !== null);
}

function getOperationDir(operation: Operation, apiPath: string): string {
  const tag = operation.tags?.[0];
  if (tag) return sanitizeName(tag);
  const segments = apiPath.split('/').filter(s => s && !s.startsWith('{'));
  return segments.length > 0 ? sanitizeName(segments[0]) : '';
}

function getFileName(operation: Operation, apiPath: string, method: string): string {
  const name = operation.operationId
    ? sanitizeName(operation.operationId)
    : getOperationName(apiPath, method);
  return `${name}.${method.toUpperCase()}.bel`;
}

function getOperationName(apiPath: string, method: string): string {
  const segments = apiPath.split('/').filter(Boolean).map(s => s.replace(/[{}]/g, ''));
  return sanitizeName(`${method}_${segments.join('_')}` || method);
}

function sanitizeName(name: string): string {
  return name
    .replace(/([a-z])([A-Z])/g, '$1_$2')  // camelCase → snake_case
    .replace(/[^a-z0-9]/gi, '_')
    .toLowerCase();
}

function toBellVarName(name: string): string {
  return name.replace(/-/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
}

function deduplicateParams(params: Parameter[]): Parameter[] {
  const seen = new Set<string>();
  return params.filter(p => {
    const key = `${p.in}:${p.name}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function isReference(obj: unknown): obj is Reference {
  return typeof obj === 'object' && obj !== null && '$ref' in obj;
}

function resolveRef<T>(ref: string, spec: OpenAPISpec): T | null {
  if (!ref.startsWith('#/')) return null;
  const parts = ref.slice(2).split('/');
  let current: unknown = spec;
  for (const part of parts) {
    current = (current as Record<string, unknown>)?.[part];
    if (current === undefined) return null;
  }
  return current as T;
}

function resolveSchema(schema: SchemaObject | Reference | undefined, spec: OpenAPISpec): SchemaObject | null {
  if (!schema) return null;
  if (isReference(schema)) return resolveRef<SchemaObject>(schema['$ref'], spec);
  return schema;
}

function generateExampleValue(schema: SchemaObject | Reference | undefined, spec: OpenAPISpec, depth = 0): unknown {
  if (!schema) return 'example';
  if (depth > 4) return null;

  if (isReference(schema)) {
    const resolved = resolveRef<SchemaObject>(schema['$ref'], spec);
    return resolved ? generateExampleValue(resolved, spec, depth) : 'example';
  }

  if (schema.example !== undefined) return schema.example;
  if (schema.default !== undefined) return schema.default;
  if (schema.enum?.length) return schema.enum[0];

  const first = (arr?: (SchemaObject | Reference)[]) => arr?.[0];
  if (schema.allOf) return generateExampleValue(first(schema.allOf), spec, depth);
  if (schema.oneOf) return generateExampleValue(first(schema.oneOf), spec, depth);
  if (schema.anyOf) return generateExampleValue(first(schema.anyOf), spec, depth);

  const type = Array.isArray(schema.type) ? schema.type[0] : schema.type;

  switch (type) {
    case 'string':
      if (schema.format === 'date-time') return '2024-01-01T00:00:00Z';
      if (schema.format === 'date') return '2024-01-01';
      if (schema.format === 'email') return 'user@example.com';
      if (schema.format === 'uuid') return '00000000-0000-0000-0000-000000000000';
      if (schema.format === 'uri') return 'https://example.com';
      return 'example';
    case 'integer':
    case 'number':
      return 0;
    case 'boolean':
      return true;
    case 'array':
      return schema.items ? [generateExampleValue(schema.items, spec, depth + 1)] : [];
    case 'object': {
      if (!schema.properties) return {};
      const obj: Record<string, unknown> = {};
      for (const [key, prop] of Object.entries(schema.properties)) {
        obj[key] = generateExampleValue(prop, spec, depth + 1);
      }
      return obj;
    }
    default:
      return 'example';
  }
}

function generateBellFile(
  method: string,
  apiPath: string,
  operation: Operation,
  allParams: Parameter[],
  spec: OpenAPISpec,
  envInfo: EnvInfo,
  envRelPath: string,
): string {
  const lines: string[] = [];

  // Header comment
  const title = operation.summary || operation.operationId || `${method} ${apiPath}`;
  lines.push(`### ${title}`);
  if (operation.description && operation.description !== operation.summary) {
    lines.push(`### ${operation.description}`);
  }
  lines.push('');

  // Env import + selection
  if (envInfo.hasEnvFile) {
    lines.push(`import "${envRelPath}"`);
    if (envInfo.keys.length === 1) {
      lines.push(`env "${envInfo.keys[0]}"`);
    } else {
      lines.push(`env ${envInfo.keys.map(k => `"${k}"`).join(' | ')}`);
    }
    lines.push('');
  }

  // Path parameter declarations
  const pathParams = allParams.filter(p => p.in === 'path');
  if (pathParams.length > 0) {
    for (const param of pathParams) {
      const schema = resolveSchema(param.schema, spec) ?? undefined;
      const example = param.example ?? generateExampleValue(schema, spec);
      const val = typeof example === 'string' ? `"${example}"` : JSON.stringify(example);
      lines.push(`${toBellVarName(param.name)} = ${val}`);
    }
    lines.push('');
  }

  // URL
  const bellPath = apiPath.replace(/{([^}]+)}/g, (_, n) => `{${toBellVarName(n)}}`);
  if (envInfo.hasEnvFile) {
    lines.push(`path "${bellPath}"`);
  } else {
    lines.push(`url "https://your-api.com${bellPath}"`);
  }
  lines.push('');

  // Query parameters
  const queryParams = allParams.filter(p => p.in === 'query');
  if (queryParams.length > 0) {
    for (const param of queryParams) {
      const schema = resolveSchema(param.schema, spec) ?? undefined;
      const example = param.example ?? generateExampleValue(schema, spec);
      const val = typeof example === 'string' ? `"${example}"` : JSON.stringify(example);
      lines.push(`param "${param.name}" ${val}`);
    }
    lines.push('');
  }

  // Explicit header parameters
  const headerParams = allParams.filter(p => p.in === 'header');
  if (headerParams.length > 0) {
    for (const param of headerParams) {
      const schema = resolveSchema(param.schema, spec) ?? undefined;
      const example = param.example ?? generateExampleValue(schema, spec);
      const val = typeof example === 'string' ? `"${example}"` : JSON.stringify(example);
      lines.push(`header "${param.name}" ${val}`);
    }
    lines.push('');
  }

  // Security headers (commented out)
  const securityLines = buildSecurityLines(operation, spec);
  if (securityLines.length > 0) {
    lines.push(...securityLines);
    lines.push('');
  }

  // Request body
  if (operation.requestBody) {
    const bodyLines = buildBodyLines(operation.requestBody, spec);
    if (bodyLines.length > 0) {
      lines.push(...bodyLines);
      lines.push('');
    }
  }

  // HTTP method
  lines.push(method);
  lines.push('');

  // Expect success status
  const responses = operation.responses ?? {};
  const successCodes = Object.keys(responses)
    .filter(c => /^2\d\d$/.test(c))
    .map(Number);
  const expectedStatus = successCodes.length > 0 ? Math.min(...successCodes) : 200;
  lines.push(`expect response.status === ${expectedStatus}`);

  return lines.join('\n') + '\n';
}

function buildSecurityLines(operation: Operation, spec: OpenAPISpec): string[] {
  const security = operation.security ?? spec.security ?? [];
  const schemes = spec.components?.securitySchemes ?? {};
  const lines: string[] = [];
  const seen = new Set<string>();

  for (const req of security) {
    for (const name of Object.keys(req)) {
      const scheme = schemes[name];
      if (!scheme || seen.has(name)) continue;
      seen.add(name);

      if (scheme.type === 'http') {
        if (scheme.scheme === 'bearer') {
          lines.push(`# header "Authorization" "Bearer YOUR_TOKEN"`);
        } else if (scheme.scheme === 'basic') {
          lines.push(`# header "Authorization" "Basic YOUR_CREDENTIALS"`);
        }
      } else if (scheme.type === 'apiKey') {
        if (scheme.in === 'header') {
          lines.push(`# header "${scheme.name}" "YOUR_API_KEY"`);
        } else if (scheme.in === 'query') {
          lines.push(`# param "${scheme.name}" "YOUR_API_KEY"`);
        }
      } else if (scheme.type === 'oauth2') {
        lines.push(`# header "Authorization" "Bearer YOUR_OAUTH_TOKEN"`);
      }
    }
  }

  return lines;
}

function buildBodyLines(requestBody: RequestBody | Reference, spec: OpenAPISpec): string[] {
  const body = isReference(requestBody)
    ? resolveRef<RequestBody>(requestBody['$ref'], spec)
    : requestBody;
  if (!body?.content) return [];

  const mediaType = body.content['application/json'] ?? Object.values(body.content)[0];
  if (!mediaType) return [];

  let example: unknown;
  if (mediaType.example !== undefined) {
    example = mediaType.example;
  } else if (mediaType.examples) {
    const first = Object.values(mediaType.examples)[0];
    if (first && !isReference(first) && 'value' in first) {
      example = first.value;
    }
  } else if (mediaType.schema) {
    const schema = resolveSchema(mediaType.schema, spec);
    example = generateExampleValue(schema ?? undefined, spec);
  }

  if (example === undefined) return [];
  if (typeof example === 'object' && example !== null) {
    return [`body ${JSON.stringify(example, null, 2)}`];
  }
  return [`body ${JSON.stringify(example)}`];
}
