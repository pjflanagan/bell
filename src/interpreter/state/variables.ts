import { VariableNameChain } from "../parsers";
import { REQUEST_PROPERTIES, RequestProperty } from "../parsers/requestProperty";
import { requestProperties, response, state } from "./state";

export function isReservedVariable(varName: string): boolean {
  return [...REQUEST_PROPERTIES, 'response'].includes(varName);
}

export function getIn(variable: any, variableNameChain: VariableNameChain) {
  if (variableNameChain.length === 0) {
    return variable;
  }
  try {
    const childVariableName = variableNameChain.shift();
    if (!childVariableName) {
      throw `Unexpected error while accessing variable ${variableNameChain.join('.')}`;
    }
    const childVariable = variable[childVariableName];
    return getIn(childVariable, variableNameChain)
  } catch {
    throw `No value found for ${variableNameChain.join('.')}`
  }
}

export function locateVariable(variableNameChain: VariableNameChain): any {
  const parentVariableName = variableNameChain.shift();
  if (!parentVariableName) {
    throw `Unexpected error while accessing variable ${variableNameChain.join('.')}`;
  }
  if (isReservedVariable(parentVariableName as string)) {
    if (parentVariableName === 'response') {
      return response.get(variableNameChain);
    }
    // TODO: pass variableNameChain
    return requestProperties.get(parentVariableName as RequestProperty);
  }
  return getIn(state.access(parentVariableName as string), variableNameChain);
}

