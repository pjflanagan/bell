import { locateVariable } from "../../state";
import { isVariableName } from "../variables";
import { NUMBER_REGEX } from "./number";
import { isString, parseString } from "./string";

// this will either return a number, string, or variable's value
export function parseValue(word: string): any {
  // if it starts with " ' or `
  if (isString(word)) {
    return parseString(word);
  }
  // TODO: if this is shaped like a function (ie: input)
  // then run that function
  // if (FUNCTION_REGEX) {

  // }
  // if it looks like a var name
  if (isVariableName(word)) {
    return locateVariable(word);
  }
  // if it is a number
  if (NUMBER_REGEX.test(word)) {
    return Number(word);
  }
  // if it is a json object {}
    // good fucking luck
}
