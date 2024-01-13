import { requestProperties, response } from "../main";
import { REQUEST_PROPERTIES, RequestProperty } from "./requestProperties";

class ExportVariables {

}

class VariableMap {

}

export function isVariableDefinition(line: string): boolean {
  return /([a-zA-Z]*)\=.*/.test(line);
}

export function isReservedVariable(varName: string): boolean {
  return [...REQUEST_PROPERTIES, 'response'].includes(varName);
}

export function locateVariable(varName: string) {
  if (isReservedVariable(varName)) {
    if (varName === 'response') {
      return response;
    }
    return requestProperties.get(varName as RequestProperty);
  }
}
