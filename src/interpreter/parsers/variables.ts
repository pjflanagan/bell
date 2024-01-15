
export const VARIABLE_SET_LINE_REGEX = /^([a-zA-Z][a-zA-Z0-9_]*) ?\= ?(.*)$/;
export const VARAIBLE_NAME_REGEX = /([a-zA-Z][a-zA-Z0-9_]*)/;

// TODO: TODO: TODO:
export const VARIABLE_CHAIN_REGEX = /(.*)/

export function isLineVariableSet(line: string) {
  return VARIABLE_SET_LINE_REGEX.test(line);
}
