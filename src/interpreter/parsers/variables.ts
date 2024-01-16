
export const VARIABLE_SET_LINE_REGEX = /^([a-zA-Z][a-zA-Z0-9_]*) ?\= ?(.*)$/;
export const VARIABLE_NAME_REGEX = /^([a-zA-Z][a-zA-Z0-9_\.]*)$/;

export function isLineVariableSet(line: string) {
  return VARIABLE_SET_LINE_REGEX.test(line);
}

export function isVariableName(word: string) {
  return VARIABLE_NAME_REGEX.test(word);
}

export function isChainedVariable(varName: string): boolean {
  return varName.includes('.');
}
