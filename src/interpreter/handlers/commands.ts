import { readBellFile } from "../interpreter";
import { COMMANDS, Command } from "../parsers/commands";

export function handleCommand(lines: string[], i: number): [number, string] {
  const commandName: string = '';

  if (!COMMANDS.includes(commandName as Command)) {
    throw `Unrecognized command ${commandName}`;
  }

  switch(commandName) {
    case 'request':
    case 'import':
      readBellFile(lines[i]);
      return [i, ''];
  }

  // request run that file
  // import load that file 
    // if it's a .bel, run that file
    // if its .json then save it
    // TODO: v2 if its a .ts then do that
  // export save the var to the export map


  // @write save to a file
  // @log log whatever

  // improperly formatted command, throw an error
  // unrecognized variable, throw an error

  return [i, ''];
}
