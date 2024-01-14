import { requestProperties, response } from "../state";

const METHODS = ['HEAD', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'CONNECT', 'PATCH'] as const;

export type Method = typeof METHODS[number];


export function isLineMethod(line: string) {
  return METHODS.includes(line as Method)
}

export function handleMethod(method: Method) {
  fetch(requestProperties.getUrl(), {
    method,
    headers: requestProperties.getHeaders(),
    body: requestProperties.getBody()
  })
    .then(newResponse => {
      response.set(newResponse);
      response.log();
    })
    .catch()
  // TODO: make the fetch call using what we have built and this url method
  // store the response in the map
  // log an error if there is one
  // fetch()
}