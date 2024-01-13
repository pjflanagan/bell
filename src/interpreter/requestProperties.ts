
export const REQUEST_PROPERTIES = ['url', 'headers', 'body', 'scheme', 'subdomain', 'domain', 'topLevelDomain', 'port', 'path', 'param', 'params', 'fragment'] as const;
export type RequestProperty = typeof REQUEST_PROPERTIES[number];

export class RequestProperties {
  url?: string;
  scheme: 'http' | 'https' = 'http';
  subdomain?: string;
  domain?: string;
  topLevelDomain?: string;
  port?: number;
  path?: string;
  params: URLSearchParams;
  fragment?: string;
  //
  headers?: Headers;
  body?: any;

  constructor() {

  }

  public getUrl(): string {
    if (this.url) {
      return this.url;
    }
    return this.buildUrl();
  }

  public getHeaders(): Headers | undefined {
    return this.headers;
  }

  public getBody(): any | undefined {
    return this.body;
  }

  public setUrl() {

  }

  public reset() {

  }

  private buildUrl() {
    // TODO: this needs to build more elegantly
    // the domain can embody the subdomain and topLevelDomain
    // we have to verify that some things are set, for instance path params and fragment might not be
    // default the scheme to http
    return `${this.scheme}://${this.subdomain}.${this.domain}.${this.topLevelDomain}/${this.path}?${this.params.toString()}#${this.fragment}`;
  }
}

export function isLineRequestProperty(firstWordOfLine: string) {
  return REQUEST_PROPERTIES.includes(firstWordOfLine as RequestProperty)
}

export function handleRequestProperty(lines: string[], i: number): [number, string] {
  // url save the url
  // body save the body
  // headers save the headers
  return [i, ''];
}
