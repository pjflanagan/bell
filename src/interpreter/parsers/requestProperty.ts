
// TODO v2: timeout
export const REQUEST_PROPERTIES = ['url', 'headers', 'body', 'scheme', 'domain', 'port', 'path', 'param', 'params', 'fragment'] as const;
export type RequestProperty = typeof REQUEST_PROPERTIES[number];

// TODO v2: timeout
export function isLineRequestProperty(line: string) {
  return /^(url|scheme|domain|port|path|param|params|fragment|headers|body) .*/.test(line);
}

export function isWordRequestProperty(word: string) {
  return REQUEST_PROPERTIES.includes(word as RequestProperty)
}

