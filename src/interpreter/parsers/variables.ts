
export const VARIABLE_SET_REGEX = /^([a-zA-Z][a-zA-Z0-9]*) ?\= ?(.*)$/;

export function isLineVariableSet(line: string) {
  return VARIABLE_SET_REGEX.test(line);
}
