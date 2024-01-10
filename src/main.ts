
const METHODS = ['HEAD', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'CONNECT', 'PATCH'] as const;
type Method = typeof METHODS[number];

const COMMANDS = ['@url'] as const;
type Command = typeof COMMANDS[number];

function handleCommand(lines: string[], i: number) {
  const commandName: string = ''; // TODO: get the first word

  if (!COMMANDS.includes(commandName as Command)) {
    throw `Unrecognized command ${commandName}`;
  }

  // @import load that file 
    // if it's a .bel do the bell things
    // if its a .ts then do that
    // if its .json then save it

  // @export save the var to the export map

  // @url save the url
  // @body save the body
  // @header save the header

  // @write save to a file
  // @log log whatever

  // improperly formatted command, throw an error
  // unrecognized variable, throw an error

  return { newIndex: i + 1, errorMessage: '' };
}

function handleMethod(line: Method) {
  // TODO: make the fetch call using what we have build and this url method
  // store the response in the map
  // log an error if there is one
  // fetch()
}

function main() {
  // get the .bel file
  // go through each line and read the commands
  const lines: string[] = [];

  for (let i = 0; i < lines.length; ++i) {
    const line = lines[i];
    const formattedLine = line.trim();

    // ignore blank lines
    if (formattedLine.length === 0) {
      continue;
    }

    const firstChar = formattedLine[0];

    switch (firstChar) {
      // # ignore comment lines
      case '#':
        continue;
      case '@':
        // the handle command function returns the new i that we have reached
        const { newIndex, errorMessage } = handleCommand(lines, i);
        if (errorMessage !== '') {
          throw errorMessage;
        }
        i = newIndex;
        continue;
      default:
        if (METHODS.includes(line as Method)) {
          // if the line is a method (POST, GET, etc.)
          // then send the request we've built
          handleMethod(line as Method);
        } else if (/([a-zA-Z]*)\=.*/.test(line)) {
          // if the line is a variable
          // _ = _, define or reset a variable in the map
        } else {
          throw `Unexpected token ${firstChar} on line ${i + 1}`;
        }
    }
  }
}

// if there are no other commands and we have not logged, log the last response
