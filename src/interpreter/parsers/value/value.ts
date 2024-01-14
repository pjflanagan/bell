import { state } from "../../state";

// this will either return a number, string, or variable's value
export function parseValue(word: string): any {
  // if it is a number
    // return the number
  // if it starts with " ' or `
    // extractString
  // if it looks like a var name
  return state.access(word);
    // find the var name
  // if it is a json object {}
    // good fucking luck
}
