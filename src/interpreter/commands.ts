import { readFile } from "./interpreter";

const COMMANDS = ['log', 'write', 'import', 'export', 'request', 'require'] as const;
type Command = typeof COMMANDS[number];

export function isLineCommand(firstWordOfLine: string) {
  return COMMANDS.includes(firstWordOfLine as Command);
}

export function handleCommand(lines: string[], i: number): [number, string] {
  const commandName: string = '';

  if (!COMMANDS.includes(commandName as Command)) {
    throw `Unrecognized command ${commandName}`;
  }

  switch(commandName) {
    case 'request':
    case 'import':
      readFile(lines[i]);
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
