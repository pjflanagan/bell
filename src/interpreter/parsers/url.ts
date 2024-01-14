import { parseString } from "./string";

const LOCALHOST_REGEX = /([^:\/?#]*)(?:\:([0-9]+))([\/]{0,1}[^?#]*)(\?[^#]*|)#?(.*|)/
const URL_REGEX = /^(https?)\:\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)#?(.*|)$/;

export type UrlParts = {
  scheme?: string;
  domain: string;
  port: number;
  path: string;
  params: URLSearchParams;
  fragment: string;
}

export function parseUrlWithoutScheme(url: string): UrlParts {
  const results = LOCALHOST_REGEX.exec(url);
  if (results) {
    const [
      _fullUrl,
      domain,
      port,
      path,
      params,
      fragment
    ] = results;
    return {
      scheme: 'http',
      domain,
      port: Number(port),
      path,
      params: new URLSearchParams(params),
      fragment,
    }
  } else {
    throw `Unable to deconstruct scheme-less url: ${url}`;
  }
}

export function parseUrlWithScheme(url: string): UrlParts {
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
    console.log(params);
    return {
      scheme,
      domain,
      port: Number(port),
      path,
      params: new URLSearchParams(params),
      fragment,
    }
  } else {
    throw `Unable to deconstruct url: ${url}`;
  }
}

export function parseUrl(url: string): UrlParts {
  if (LOCALHOST_REGEX.test(url)) {
    return parseUrlWithoutScheme(url);
  }
  else if (URL_REGEX.test(url)) {
    return parseUrlWithScheme(url)
  } else {
    throw `Url ${url} is improperly formatted`
  }
}