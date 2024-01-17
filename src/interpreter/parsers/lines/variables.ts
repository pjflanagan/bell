
// abcDef123_ghi = .*
export const VARIABLE_SET_LINE_REGEX = /^([a-zA-Z][a-zA-Z0-9_]*) ?\= ?(.*)$/;

export function isLineVariableSet(line: string) {
  return VARIABLE_SET_LINE_REGEX.test(line);
}

