
const COMMANDS = ['log', 'write', 'import', 'export', 'request', 'require'] as const;
type Command = typeof COMMANDS[number];

export function isLineCommand(firstWordOfLine: string) {
  return COMMANDS.includes(firstWordOfLine as Command);
}

export function handleCommand(lines: string[], i: number): [number, string] {
  const commandName: string = ''; // TODO: get the first word

  if (!COMMANDS.includes(commandName as Command)) {
    throw `Unrecognized command ${commandName}`;
  }

  // @import load that file 
    // if it's a .bel do the bell things
    // if its a .ts then do that
    // if its .json then save it

  // @export save the var to the export map


  // @write save to a file
  // @log log whatever

  // improperly formatted command, throw an error
  // unrecognized variable, throw an error

  return [i, ''];
}
