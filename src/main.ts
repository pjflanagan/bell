
const METHODS = ['HEAD', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'CONNECT', 'PATCH'] as const;
type Method = typeof METHODS[number];

const REQUEST_PROPERTIES = ['url', 'header', 'body', 'scheme', 'subdomain', 'domain', 'topLevelDomain', 'port', 'path', 'param', 'params', 'fragment'] as const;
type RequestProperty = typeof REQUEST_PROPERTIES[number];

const COMMANDS = ['log', 'write', 'import', 'export', 'request', 'require'] as const;
type Command = typeof COMMANDS[number];

function isVariableDefinition(line: string): boolean {
  return /([a-zA-Z]*)\=.*/.test(line);
}

function handleRequestProperty(lines: string[], i: number): [number, string] {
  return [i, ''];
}

function handleCommand(lines: string[], i: number): [number, string] {
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

  return [i, ''];
}

function handleMethod(line: Method) {
  // TODO: make the fetch call using what we have built and this url method
  // store the response in the map
  // log an error if there is one
  // fetch()
}

function main() {
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
    if (line[0] === '#' || isMultilineComment) {
      if (line[1] === '#' && line[2] === '#') {
        isMultilineComment = !isMultilineComment;
      }
      continue;
    }

    switch (true) {
      case REQUEST_PROPERTIES.includes(line as RequestProperty):
        const [requestPartEndLine, requestPartErrorMessage] = handleRequestProperty(lines, i);
        if (requestPartErrorMessage !== '') {
          throw requestPartErrorMessage;
        }
        i = requestPartEndLine;
        break;
      case COMMANDS.includes(line as Command):
        // the handle command function returns the new i that we have reached
        const [commandEndLine, commandErrorMessage] = handleCommand(lines, i);
        if (commandErrorMessage !== '') {
          throw commandErrorMessage;
        }
        i = commandEndLine;
        break;
      case METHODS.includes(line as Method):
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
}

// if there are no other commands and we have not logged, log the last response
