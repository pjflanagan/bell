
import * as fs from 'fs';

import { Method, handleCommand, handleMethod, handleRequestPropertyLine, isLineMethod } from "./handlers";
import { isVariableDefinition } from "./state";
import { isMultiLineCommentDelineator, isSingleLineComment, isLineCommand, isLineRequestProperty } from './parsers';

function formatFileData(data: Buffer): string[] {
  return data
  .toString()
  .split('\n')
  .map(l => l.trim());
}

export function readBellFile(fileName: string) {
  fs.readFile(fileName, (err, data) => {
    if (err) {
      throw err;
    }
    const formattedFile = formatFileData(data);
    interpretFile(formattedFile);
  });
}

// TODO: interpretFile needs to check recursion
// TODO: what is the main difference between and request (request just runs the file, import runs and pull vars)
// TODO: interpretFile is the same as `request filename.bel` and `import filename.bel`
function interpretFile(lines: string[]) {
  // go through each line and read the commands
  let isMultilineComment = false;

  for (let i = 0; i < lines.length; ++i) {
    const line = lines[i];

    // ignore blank lines
    if (line.length === 0) {
      continue;
    }

    // ignore comment lines # & ###
    if (isSingleLineComment(line) || isMultilineComment) {
      if (isMultiLineCommentDelineator(line)) {
        isMultilineComment = !isMultilineComment;
      }
      continue;
    }

    // TODO: DO NOT SPLIT THE LINE
    // All lines should be determined by regex matching the whole line
    // That way we can reuse the regex in the Textmate grammar
    const splitLine = line.split(' ');
    switch (true) {
      case isLineRequestProperty(line):
        const [requestPartEndLine, requestPartErrorMessage] = handleRequestPropertyLine(lines, i);
        if (requestPartErrorMessage !== '') {
          throw requestPartErrorMessage;
        }
        i = requestPartEndLine;
        break;
      case isLineCommand(splitLine[0]):
        // the handle command function returns the new i that we have reached
        const [commandEndLine, commandErrorMessage] = handleCommand(lines, i);
        if (commandErrorMessage !== '') {
          throw commandErrorMessage;
        }
        i = commandEndLine;
        break;
      case isLineMethod(line):
        // if the line is a method (POST, GET, etc.)
        // then send the request we've built
        handleMethod(line as Method);
        break;
      case isVariableDefinition(line):
        // if the line is a variable definition
        // _ = _, define or reset a variable in the map
        break;
      default:
        throw `Unexpected format on line ${i + 1}: ${line}`;
    }
  }

  // if there are no other commands and we have not logged, log the last response
}
