import { requestProperties, response } from "../state";

const METHODS = ['HEAD', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'CONNECT', 'PATCH'] as const;

export type Method = typeof METHODS[number];


export function isLineMethod(line: string) {
  return METHODS.includes(line as Method)
}

export async function handleMethod(method: Method) {
  const newResponse = await fetch(requestProperties.getUrl(), {
    method,
    headers: requestProperties.getHeaders(),
    body: requestProperties.getBody()
  });
  requestProperties.clear();
  response.set(newResponse);
}