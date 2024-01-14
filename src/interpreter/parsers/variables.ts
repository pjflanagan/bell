
export const VARAIBLE_NAME_REGEX = /([a-zA-Z][a-zA-Z0-9_]*)/;
export const VARIABLE_SET_REGEX = /^([a-zA-Z][a-zA-Z0-9_]*) ?\= ?(.*)$/;

export function isLineVariableSet(line: string) {
  return VARIABLE_SET_REGEX.test(line);
}
