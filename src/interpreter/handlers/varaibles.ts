
import { VARIABLE_SET_REGEX } from "../parsers";
import { state } from "../state";
import { RESERVED_WORDS } from "../types";

export function handleVariableSet(line: string) {
  const results = VARIABLE_SET_REGEX.exec(line);
  if (results) {
    const [
      _fullLine,
      varName,
      varValue
    ] = results;
    console.log(varName, varValue);
    if (RESERVED_WORDS.includes(varName)) {
      console.log("ERROR")
      throw `Cannot set variable ${varName} because ${varName} is a reserved word`;
    }
    state.setVariable(varName, varValue);
  }

}