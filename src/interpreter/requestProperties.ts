
export const REQUEST_PROPERTIES = ['url', 'header', 'body', 'scheme', 'subdomain', 'domain', 'topLevelDomain', 'port', 'path', 'param', 'params', 'fragment'] as const;
export type RequestProperty = typeof REQUEST_PROPERTIES[number];

export function isLineRequestProperty(firstWordOfLine: string) {
  return REQUEST_PROPERTIES.includes(firstWordOfLine as RequestProperty)
}

export function handleRequestProperty(lines: string[], i: number): [number, string] {
  // @url save the url
  // @body save the body
  // @header save the header
  return [i, ''];
}
