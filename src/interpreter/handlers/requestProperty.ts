
import { RequestProperty, URL_PATH_PARAMS_FRAGMENT_REGEX, URL_PATH_REGEX, URL_REGEX, isString, isVariableName, parseString, parseValue } from "../parsers";
import { requestProperties, state } from "../state";

function handleUrl(requestLine: string[]) {
  if (requestLine.length !== 2) {
    throw 'Improperly formatted url line, should adhere to: url "<url>"'
  }
  const parsedUrlString = parseString(requestLine[1]);
  // NOTE: this check is doubled but it should happen here for visibility
  if (!URL_REGEX.test(parsedUrlString)) {
    throw `Improperly formatted url: ${parsedUrlString}`;
  }
  requestProperties.setUrl(parsedUrlString);
}

function handlePath(requestLine: string[]) {
  if (requestLine.length !== 2) {
    throw `Improperly formatted path line, should adhere to: path "</><path><?params><#fragment>"`;
  }
  const parsedPathString = parseString(requestLine[1]);
  if (URL_PATH_PARAMS_FRAGMENT_REGEX.test(parsedPathString)) {
    requestProperties.setPathWithParamsAndFragment(parsedPathString);
  } else if (URL_PATH_REGEX.test(parsedPathString)) {
    requestProperties.setPath(parsedPathString);
  } else {
    throw `Improperly formatted path: ${parsedPathString}`;
  }
}

function handleParams(requestLine: string[]) {
  if (requestLine.length !== 2) {
    throw 'Improperly formatted params line, should adhere to: params "<?><params>"';
  } else if (!isString(requestLine[1])) {
    throw 'Improperly formatted params line, params must be passed a string';
  }
  const parsedParamString = parseString(requestLine[1]);
  if (parsedParamString[0] === '?') {
    requestProperties.setParams(parsedParamString);
  } else {
    requestProperties.appendParams(parsedParamString);
  }
}

function handleParam(requestLine: string[]) {
  const paramName = requestLine[1];
  if (!isVariableName(paramName)) {
    throw 'Invalid param configuration. Must adhere to: param <varName> or param <paramName> <paramValue>';
  }
  if (requestLine.length === 3) {
    requestProperties.appendParam(paramName, parseValue(requestLine[2]));
  } else if (requestLine.length === 2) {
    requestProperties.appendParam(paramName, state.access(paramName));
  } else {
    throw 'Invalid param configuration. Must adhere to: param <varName> or param <paramName> <paramValue>';
  }
}

// NOTE: handlers are everything that happens after we determine what kind of line
// this is. We will still need to do parsing inside a handler
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
      handlePath(requestLine);
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
