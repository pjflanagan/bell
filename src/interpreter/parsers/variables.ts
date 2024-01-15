
export const VARIABLE_SET_LINE_REGEX = /^([a-zA-Z][a-zA-Z0-9_]*) ?\= ?(.*)$/;
export const VARIABLE_NAME_REGEX = /^([a-zA-Z][a-zA-Z0-9_]*)$/;

// TODO: TODO: TODO:
export const VARIABLE_CHAIN_REGEX = /(.*)/

export function isLineVariableSet(line: string) {
  return VARIABLE_SET_LINE_REGEX.test(line);
}

export function isVariableName(word: string) {
  return VARIABLE_NAME_REGEX.test(word);
}
