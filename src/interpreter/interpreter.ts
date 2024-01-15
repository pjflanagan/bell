
import * as fs from 'fs/promises';

import { Method, handleCommand, handleMethod, handleRequestPropertyLine, handleVariableSet, isLineMethod } from "./handlers";
import { requestProperties, state } from "./state";
import { isMultiLineCommentDelineator, isSingleLineComment, isLineCommand, isLineRequestProperty, isLineVariableSet } from './parsers';
import { logResponse } from './io/log';

function formatFileData(data: Buffer): string[] {
  return data
    .toString()
    .split('\n')
    .map(l => l.trim());
}

export async function readBellFile(fileName: string) {
  try {
    const data = await fs.readFile(fileName)
    const formattedFile = formatFileData(data);
    interpretFile(formattedFile);
  } catch(err) {
    throw err;
  }
}

type ActionableLineType = 'command' | 'requestProperty' | 'variableSet' | 'method';
// type LineType = ActionableLineType | 'blank' | 'comment';

// TODO: interpretFile needs to check recursion
export async function interpretFile(lines: string[]) {
  // go through each line and read the commands
  let isMultilineComment = false;
  let lastActionableLineType: ActionableLineType | undefined = undefined;

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

    switch (true) {
      case isLineVariableSet(line):
        lastActionableLineType = 'variableSet';
        handleVariableSet(line);
        break;
      case isLineRequestProperty(line):
        lastActionableLineType = 'requestProperty';
        i = handleRequestPropertyLine(lines, i);
        break;
      case isLineCommand(line):
        lastActionableLineType = 'command';
        i = await handleCommand(lines, i);
        break;
      case isLineMethod(line):
        lastActionableLineType = 'method';
        await handleMethod(line as Method);
        break;
      default:
        throw `Unexpected format on line ${i + 1}: ${line}`;
    }
  }

  // if there are no other commands and we have not logged, log the last response
  if (lastActionableLineType && lastActionableLineType === 'method') {
    logResponse();
  }
  // cleanup the file by deleting all the requestProperties
  requestProperties.clear();
  // remove all the unexported variables from state
  state.clearUnexportedVariables();
}
