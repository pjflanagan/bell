
const URL_REGEX = /^((https?)\:\/\/)?(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)#?(.*|)$/;

export type UrlParts = {
  scheme?: string;
  domain?: string;
  port?: number;
  path?: string;
  params?: URLSearchParams;
  fragment?: string;
}

export function parseUrl(url: string): UrlParts {
  if (!URL_REGEX.test(url)) {
    throw `Improperly formatted url: ${url}`;
  }
  const results = URL_REGEX.exec(url);
  if (results) {
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
  } else {
    throw `Unable to deconstruct url: ${url}`
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
