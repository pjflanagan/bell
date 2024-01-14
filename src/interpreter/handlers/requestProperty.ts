
// TODO: this should move to a parsing file because it has everything to do
// parsing what is written, this should then call functions in a 

import { parseString } from "../parsers";
import { requestProperties } from "../state";

// handler file
export function handleRequestPropertyLine(lines: string[], i: number): [number, string] {
  const requestLine = lines[i].split(' ');
  const requestProperty = requestLine[0];

  switch (requestProperty) {
    case 'url':
      // NOTE: handle should wrap parsing 
      // NOTE: all the parsing should happen here
      const parsedUrlString = parseString(requestLine[1]);
      requestProperties.setUrl(parsedUrlString);
      break;
    case 'param':
      // param varName value -> appendValue
      // param varName -> search for var name, error if no
      requestProperties.appendParam(requestLine[1], requestLine[2]);
      break;
    // body save the body
    // headers save the headers
  }
  
  return [i, ''];
}
