
export const URL_REGEX = /^((https?)\:\/\/)?(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)#?(.*|)$/;
export const URL_PATH_REGEX = /([\/]{0,1}[^?#]*)/
export const URL_PATH_PARAMS_FRAGMENT_REGEX = /([\/]{0,1}[^?#]*)(\?[^#]*|)#?(.*|)/

export type UrlPath = {
  path?: string;
  params?: URLSearchParams;
  fragment?: string;
}

export type UrlParts = {
  scheme?: string;
  domain?: string;
  port?: number;
} & UrlPath;

export function parseUrl(url: string): UrlParts {
  if (!URL_REGEX.test(url)) {
    throw `Improperly formatted url: ${url}`;
  }
  const results = URL_REGEX.exec(url);
  if (!results) {
    throw `Unable to deconstruct url: ${url}`
  }
  const [
    _fullUrl,
    _schemeWithColonSlashSlash,
    scheme,
    _domainWithPort,
    domain,
    port,
    path,
    params,
    fragment
  ] = results;
  return {
    scheme,
    domain,
    port: Number(port),
    path,
    params: new URLSearchParams(params),
    fragment,
  }
}

export function parsePathWithParamsAndFragment(pathString: string): UrlPath {
  const results = URL_PATH_PARAMS_FRAGMENT_REGEX.exec(pathString);
  if (!results) {
    throw `Unable to deconstruct path: ${pathString}`
  }
  const [
    _fullPath,
    path,
    params,
    fragment
  ] = results;
  return {
    path,
    params: new URLSearchParams(params),
    fragment
  }
}

// leaves the scheme, port, and domain so the next request
// can simply specify a new path
// export function clearPath(urlParts: UrlParts): UrlParts {
//   const newUrlParts = { ...urlParts };
//   newUrlParts.path = '';
//   newUrlParts.params = new URLSearchParams();
//   newUrlParts.fragment = '';
//   return newUrlParts;
// }
