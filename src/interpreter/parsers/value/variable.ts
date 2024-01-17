import { locateVariable } from "../../state";

// varName.child.subchild2
export const VALID_VAR_CHARACTERS_REGEX = /[a-zA-Z0-9_]/;
export const VARIABLE_NAME_WITH_CHAIN_AND_INDEX_REGEX = /^([a-zA-Z][a-zA-Z0-9_\.\[\]]*)$/;


export function isVariableNameWithChainAndIndex(word: string) {
  return VARIABLE_NAME_WITH_CHAIN_AND_INDEX_REGEX.test(word);
}

export function isValidVarCharacter(character: string): boolean {
  if (character.length !== 1) {
    return false;
  }
  return VALID_VAR_CHARACTERS_REGEX.test(character);
}

// returns a variable name chain
export type VariableNameChain = string[];

export function parseVariableNameChain(fullVariableName: string): VariableNameChain {
  const variableNameChain: VariableNameChain = [];
  let currentVariableName = '';
  for (let i = 0; i < fullVariableName.length; ++i) {
    const currentChar = fullVariableName[i];
    // TODO: this will not worry about the order
    // technically you can say variable.1.child[subchild[subsubchild][][].5...final and it will work
    // I need some expects for error handling here
    if (['.', '[', ']'].includes(currentChar)) {
      if (currentVariableName.length > 0) {
        variableNameChain.push(currentVariableName);
      }
      currentVariableName = '';
    } else {
      currentVariableName += currentChar;
    }
  }
  if (currentVariableName.length > 0) {
    variableNameChain.push(currentVariableName);
  }
  return variableNameChain;
}

export function parseVariable(variableName: string): any {
  const variableNameChain = parseVariableNameChain(variableName);
  return locateVariable(variableNameChain);
}
