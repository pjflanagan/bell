
export const STRING_DELINEATORS = ['\'', '"', '`'];

// Takes the string out of the quotes
export function extractString(value: string) {
  // remove the first quote (",',`)
  const leadingChar = value[0];
  if (!STRING_DELINEATORS.includes(leadingChar)) {
    throw 'Invalid string character';
  }
  const endingChar = value[value.length - 1];
  if (leadingChar !== endingChar) {
    throw 'Improperly formatted string';
  }
  // check for end quote, if none error, otherwise return the string contents
  return value.substring(1, value.length - 1);
}

// Inserts variables into the string
export function interpolateString(value: string) {
  // find all instances of ${}
  // lookup the variables inside the string, error if not found
  // return the final value
  return value;
}

// Interpolates and extracts the string
export function parseString(value: string) {
  return extractString(interpolateString(value));
}