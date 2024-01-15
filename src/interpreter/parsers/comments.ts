

export function isSingleLineComment(line: string) {
  return line.length > 0 && line[0] === '#';
}

export function isMultiLineCommentDelineator(line: string) {
  return /(^###).*/.test(line);
}