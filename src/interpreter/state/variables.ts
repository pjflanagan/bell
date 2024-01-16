import { isChainedVariable } from "../parsers";
import { REQUEST_PROPERTIES, RequestProperty } from "../parsers/requestProperty";
import { requestProperties, response, state } from "./state";

export function isReservedVariable(varName: string): boolean {
  return [...REQUEST_PROPERTIES, 'response'].includes(varName);
}

// TODO: this is a util
export function getIn(variable: any, varNameChain: string[]) {
  for (let i = 1; i < varNameChain.length; ++i) {
    try {
      variable = variable[varNameChain[i]];
    } catch {
      throw `No value found for ${varNameChain.join('.')}`
    }
  }
  return variable;
}

export function accessChainedVariable(varName: string) {
  const varNameChain = varName.split('.');
  const parentVaraible = varNameChain[0];
  varNameChain.shift();
  if (parentVaraible === 'response') {
    return response.get(varNameChain);
  }
  let variable = locateVariable(parentVaraible);
  return getIn(variable, varNameChain);
}

export function locateVariable(varName: string): any {
  if (isChainedVariable(varName)) {
    return accessChainedVariable(varName);
  }
  if (isReservedVariable(varName)) {
    if (varName === 'response') {
      return response.get();
    }
    return requestProperties.get(varName as RequestProperty);
  }
  return state.access(varName);
}

