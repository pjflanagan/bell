import { readBellFile } from "../interpreter";
import { COMMANDS, Command } from "../parsers/commands";
import { locateVariable, state } from "../state";

// TODO: this should be a bunch of functions like
// handleLog
// handleWrite
// handleExport
// handleImport
// not this general handle command

export function handleCommand(lines: string[], i: number): [number, string] {
  const splitLine = lines[i].split(' ');
  const commandName = splitLine[0] as Command;

  if (!COMMANDS.includes(commandName)) {
    throw `Unrecognized command ${commandName}`;
  }

  // TODO:
  // improperly formatted command, throw an error
  switch(commandName) {
    case 'log':
      console.log(locateVariable(splitLine[1]));
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
      break;
    case "wait":
      break;
    case 'request':
      // request run that file
      break;
    case 'import':
      // import load that file 
        // if it's a .bel, run that file
        // if its .json then save it
        // TODO: v2 if its a .ts then do that
      readBellFile(lines[i]);
      return [i, ''];
  }



  return [i, ''];
}
