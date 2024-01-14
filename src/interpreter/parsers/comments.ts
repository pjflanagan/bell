

export function isSingleLineComment(line: string) {
  return line.length > 0 && line[0] === '#';
}

// TODO: check to see if the highlight works when a comment looks like this, becuase I think I'd like this to work
/*
### comment start
more text
### comment end

*/
export function isMultiLineCommentDelineator(line: string) {
  return /(^###).*/.test(line);
}