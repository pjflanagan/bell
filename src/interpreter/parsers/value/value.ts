import { locateVariable, state } from "../../state";
import { VARAIBLE_NAME_REGEX } from "../variables";
import { NUMBER_REGEX } from "./number";
import { STRING_DELINEATORS, extractString } from "./string";

// this will either return a number, string, or variable's value
export function parseValue(word: string): any {
  // if it starts with " ' or `
  if (STRING_DELINEATORS.includes(word[0])) {
    return extractString(word);
  }
  // TODO: if this is shaped like a function (ie: input)
  // then run that function
  // if (FUNCTION_REGEX) {

  // }
  // if it looks like a var name
  if (VARAIBLE_NAME_REGEX.test(word)) {
    return locateVariable(word);
  }
  // if it is a number
  if (NUMBER_REGEX.test(word)) {
    return Number(word);
  }
  // if it is a json object {}
    // good fucking luck
}
