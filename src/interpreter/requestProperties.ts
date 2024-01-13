
export const REQUEST_PROPERTIES = ['url', 'headers', 'body', 'scheme', 'domain', 'port', 'path', 'param', 'params', 'fragment'] as const;
export type RequestProperty = typeof REQUEST_PROPERTIES[number];

const URL_REGEX = /^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/;

export class RequestProperties {
  scheme?: string;
  domain?: string;
  port?: number;
  path?: string;
  params?: URLSearchParams;
  fragment?: string;
  //
  headers?: Headers;
  body?: any;

  public get(propertyName: RequestProperty): any {
    switch (propertyName) {
      case 'url':
        return this.getUrl();

    }
  }

  public getUrl(): string {
    return this.buildUrl();
  }

  public setUrl(url: string) {
    this.clearUrlParts();
    if (!URL_REGEX.test(url)) {
      throw `Url ${url} is improperly formatted`
    }
    const results = URL_REGEX.exec(url);
    if (results) {
      const [
        _fullUrl,
        scheme,
        _domainWithPort,
        domain,
        port,
        path,
        params,
        fragment
      ] = results;
      // I think the standard should be, store things without the ://, #, :, or leading /
      this.scheme = scheme;
      this.domain = domain;
      this.port = Number(port);
      this.path = path;
      this.params = new URLSearchParams(params);
      this.fragment = fragment;
    } else {
      throw `Unable to deconstruct url ${url}`;
    }
  }

  public getHeaders(): Headers | undefined {
    return this.headers;
  }

  public getBody(): any | undefined {
    return this.body;
  }

  public reset() {
    this.clearUrlParts();
    this.body = undefined;
    this.headers = undefined;
  }

  private clearUrlParts() {
    this.scheme = undefined;
    this.domain = undefined;
    this.port = undefined;
    this.path = undefined;
    this.params = undefined;
    this.fragment = undefined;
  }

  private buildUrl() {
    // TODO: this needs to build more elegantly
    // we have to verify that some things are set, for instance path params and fragment might not be
    // default the scheme to http
    // if they manually entered stuff, we will want to insert 
    return `${this.scheme}://${this.domain}/${this.path}?${this.params?.toString()}#${this.fragment}`;
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
