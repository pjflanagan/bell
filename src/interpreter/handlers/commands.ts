import { readBellFile } from "../interpreter";
import { parseValue } from "../parsers";
import { COMMANDS, Command } from "../parsers/commands";
import { state } from "../state";

// TODO: this should be a bunch of functions like
// handleLog
// handleWrite
// handleExport
// handleImport
// not this general handle command

export async function handleCommand(lines: string[], i: number): Promise<number> {
  const splitLine = lines[i].split(' ');
  const commandName = splitLine[0] as Command;

  if (!COMMANDS.includes(commandName)) {
    throw `Unrecognized command ${commandName}`;
  }

  // TODO:
  // improperly formatted command, throw an error
  switch(commandName) {
    case 'log':
      if (splitLine.length > 2) {
        throw `Improperly formatted log`;
      }
      console.log(parseValue(splitLine[1]));
    case "write":
      break;
    case "export":
      // TODO: export as array when there are multiple
      // remove all commas from things
      // FIXME: see this is why we need regex for every single possible line format
      // export save the var to the export map
      state.exportVariable(splitLine[1]);
      break;
    case "require":
      if (!state.contains(splitLine[1])) {
        throw `State does not contain variable ${splitLine[1]}`
      }
      break;
    case "wait":
      if (splitLine.length > 2) {
        throw `Improperly formatted wait`;
      }
      const waitDuration = parseValue(splitLine[1]);
      if (typeof waitDuration !== 'number') {
        throw `Invalid value for wait ${waitDuration}, wait must be set to a number`
      }
      await new Promise(r => setTimeout(r, Number(splitLine[1])));
      break;
    case 'request':
      if (splitLine.length > 2) {
        throw `Improperly formatted request`;
      }
      // request run that file
      readBellFile(splitLine[1]);
      break;
    case 'import':
      if (splitLine.length > 2) {
        throw `Improperly formatted import`;
      }
      // if it's a .bel, run that file
      readBellFile(splitLine[1]);
      // if its .json then save it
      // TODO: v2 if its a .ts then do that
  }

  return i;
}
