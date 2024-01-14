import { REQUEST_PROPERTIES, RequestProperty } from "../parsers/requestProperty";
import { requestProperties, response, state } from "./state";

export function isReservedVariable(varName: string): boolean {
  return [...REQUEST_PROPERTIES, 'response'].includes(varName);
}

export function locateVariable(varName: string): any {
  if (isReservedVariable(varName)) {
    if (varName === 'response') {
      // TODO: response is a json object that can be chained, so I need to make this chainable
      return response;
    }
    return requestProperties.get(varName as RequestProperty);
  }
  return state.access(varName);
}

