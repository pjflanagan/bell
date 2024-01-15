
// TODO: this should move to a parsing file because it has everything to do
// parsing what is written, this should then call functions in a 

import { RequestProperty, VARAIBLE_NAME_REGEX, extractString, parseString, parseValue } from "../parsers";
import { requestProperties, state } from "../state";

function handleUrl(requestLine: string[]) {
  if (requestLine.length !== 2) {
    throw 'Improperly formatted url line, should adhere to: url "<url>"'
  }
  const parsedUrlString = parseString(requestLine[1]);
  requestProperties.setUrl(parsedUrlString);
}

function handleParams(requestLine: string[]) {
  if (requestLine.length === 2) {
    const paramString = extractString(requestLine[1]);
    if (paramString[0] === '?') {
      requestProperties.setParams(paramString);
    } else {
      requestProperties.appendParams(paramString);
    }
  } else {
    throw 'Improperly formatted params';
  }
}

function handleParam(requestLine: string[]) {
  if (requestLine.length === 3) {
    // param paramName paramValue -> appendValue
    requestProperties.appendParam(requestLine[1], parseValue(requestLine[2]));
  } else if (requestLine.length === 2) {
    if (!VARAIBLE_NAME_REGEX.test(requestLine[1])) {
      throw `Invalid param configuration: invalid varName ${requestLine[1]}`;
    }
    requestProperties.appendParam(requestLine[1], state.access(requestLine[1]));
  } else {
    throw 'Invalid param configuration. Must adhere to: param <varName> or param <paramName> <paramValue>';
  }
}

export function handleRequestPropertyLine(lines: string[], i: number): number {
  const requestLine = lines[i].split(' ');
  const requestProperty = requestLine[0] as RequestProperty;

  // url|scheme|domain|port|path|param|params|fragment|headers|body|timeout
  switch (requestProperty) {
    case 'url':
      handleUrl(requestLine);
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
      handleParams(requestLine);
      break;
    case 'param':
        handleParam(requestLine);
      break;
    case 'fragment':
      break;
    case 'body':
      break;
    case 'headers':
      break;
  }
  
  return i;
}
