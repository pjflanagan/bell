import { handleCommand, isLineCommand } from "./commands";
import { isMultiLineCommentDelineator, isSingleLineComment } from "./comments";
import { Method, handleMethod, isLineMethod } from "./methods";
import { handleRequestProperty, isLineRequestProperty } from "./requestProperties";
import { isVariableDefinition } from "./variables";

// TODO: interpretFile needs to check recursion
// TODO: what is the main difference between and request (request just runs the file, import runs and pull vars)
// TODO: interpretFile is the same as `request filename.bel` and `import filename.bel`
// function loadFile() {
//   const fileReader = new FileReader();
//   fileReader
// }

export function interpretFile(fileName: string) {
  // get the .bel file
  // go through each line and read the commands
  const lines: string[] = ([] as string[]).map(l => l.trim());
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
      case isLineRequestProperty(splitLine[0]):
        const [requestPartEndLine, requestPartErrorMessage] = handleRequestProperty(splitLine, i);
        if (requestPartErrorMessage !== '') {
          throw requestPartErrorMessage;
        }
        i = requestPartEndLine;
        break;
      case isLineCommand(splitLine[0]):
        // the handle command function returns the new i that we have reached
        const [commandEndLine, commandErrorMessage] = handleCommand(splitLine, i);
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
