import { UrlParts, parseUrl } from "../parsers/url";
import { RequestProperty } from "../parsers/requestProperty";

export class RequestProperties {
  urlParts?: UrlParts;
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
    this.urlParts = parseUrl(url);
  }

  public appendParam(key: string, value: string) {
    this.urlParts?.params.append(key, value);
  }

  public getHeaders(): Headers | undefined {
    return this.headers;
  }

  public getBody(): any | undefined {
    return this.body;
  }

  public getScheme(): string {
    const scheme = this.urlParts?.scheme || 'http';
    return `${scheme}://`;
  }

  public getDomain(): string {
    const domain = this.urlParts?.domain || '';
    return domain;
  }

  public getPort(): string {
    const port = this.urlParts?.port || 0;
    if (port > 0) {
      return `:${port}`;
    }
    return '';
  }

  public getPath(): string {
    const path = this.urlParts?.path || '';
    if (path.length === 0) {
      return '';
    } else if (path[0] === '/') {
      return path;
    }
    return `/${path}`;
  }

  public getParams(): string {
    const params = this.urlParts?.params?.toString();
    if (params) {
      return`?${params.toString()}`
    }
    return '';
  }

  public getFragment(): string {
    const fragment = this.urlParts?.fragment || '';
    if (fragment.length === 0) {
      return '';
    } else if (fragment[0] === '#') {
      return fragment;
    }
    return `#${fragment}`;
  }

  public reset() {
    this.urlParts = undefined;
    this.body = undefined;
    this.headers = undefined;
  }

  private buildUrl() {
    // TODO: this needs to build more elegantly
    // we have to verify that some things are set, for instance path params and fragment might not be
    // default the scheme to http
    // if they manually entered stuff, we will want to insert 
    if (!this.urlParts) {
      throw `No Url set`;
    }
    let url = this.getScheme();
    url += this.getDomain();
    url += this.getPort();
    url += this.getPath();
    url += this.getParams();
    url += this.getFragment();
    console.log(url);
    return url;
  }
}