import { locateVariable } from "../../state";

export const STRING_DELINEATORS = ['\'', '"', '`'];

export function isString(parseableValue: string) {
  return STRING_DELINEATORS.includes(parseableValue[0]);
}

// Takes the string out of the quotes
export function extractString(value: string) {
  const leadingChar = value[0];
  if (!STRING_DELINEATORS.includes(leadingChar)) {
    throw `Expected string but received ${leadingChar}`;
  }
  const endingChar = value[value.length - 1];
  if (leadingChar !== endingChar) {
    throw `String does not contain a matching end quote, found ${endingChar}`;
  }
  return value.substring(1, value.length - 1);
}

// Inserts variables into the string
export function interpolateString(value: string) {
  let interpolatedString = '';
  let currentVariableName = '';
  let isCapturingVariableName = false;
  for (let i = 0; i < value.length; ++i) {
    const currentChar = value[i];
    if (currentChar === '{') {
      // if {, start the capture
      if (isCapturingVariableName) {
        throw `Unexpected { in interpolated string`;
      }
      isCapturingVariableName = true;
    } else if (currentChar === '}') {
      // if }, end the capture
      if (!isCapturingVariableName) {
        throw `Unexpected } in interpolated string`;
      }
      isCapturingVariableName = false;
      interpolatedString += locateVariable(currentVariableName);
      currentVariableName = '';
    } else if(isCapturingVariableName) {
      // if capturing, get the name
      currentVariableName += currentChar;
    } else {
      // if not capturing, it's part of the string
      interpolatedString += currentChar;
    }
  }
  if (isCapturingVariableName) {
    throw 'Expected } in interpolated string but none was found';
  }
  return interpolatedString;
}

// Interpolates and extracts the string
export function parseString(value: string) {
  return interpolateString(extractString(value));
}