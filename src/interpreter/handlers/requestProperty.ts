
// TODO: this should move to a parsing file because it has everything to do
// parsing what is written, this should then call functions in a 

import { parseString } from "../parsers";
import { requestProperties } from "../state";

// handler file
export function handleRequestPropertyLine(lines: string[], i: number): [number, string] {
  const requestLine = lines[i].split(' ');
  const requestProperty = requestLine[0];

  // url|scheme|domain|port|path|param|params|fragment|headers|body|timeout
  switch (requestProperty) {
    case 'url':
      // NOTE: handle should wrap parsing 
      // NOTE: all the parsing should happen here
      const parsedUrlString = parseString(requestLine[1]);
      requestProperties.setUrl(parsedUrlString);
      break;
    case 'scheme':
      break;
    case 'domain':
      break;
    case 'port':
      break;
    case 'path':
      // TODO: path should allow params and fragment too
      // so users can set the quickly
      break;
    case 'params':
      // if we start with a ?, replace all the params
      // if we start with a var, append the params
      break;
    case 'param':
      // param varName value -> appendValue
      // param varName -> search for var name, error if no
      requestProperties.appendParam(requestLine[1], requestLine[2]);
      break;
    case 'fragment':
      break;
    // TODO: 
    case 'body':
      // body save the body
      break;
    case 'headers':
      // headers save the headers
      break;
  }
  
  return [i, ''];
}
