import * as readline from 'readline';
import * as path from 'path';
import chalk from 'chalk';
import { BellVisitor } from '../interpreter/BellVisitor';
import { runSource } from '../interpreter/run';

const VERSION = '0.0.1';

const HELP_TEXT = `
Bell REPL — keyword reference
  url "https://..."        set the base URL
  path "/foo"              append a path segment
  param key "value"        add a query parameter
  header key "value"       add a request header
  body { ... }             set the request body
  GET / POST / PUT / PATCH / DELETE   dispatch the request
  log <expr>               print a value
  expect <expr>            assert a truthy value
  name = <expr>            assign a variable
  import "file.json"       load an environment file
  env "name"               select an environment
  response.body            last response body
  response.status          last response status code

Special commands:
  help   show this message
  clear  reset all state (variables, response, env)
  exit   quit the REPL
`.trim();

export async function startRepl(rl?: readline.Interface): Promise<void> {
  if (!rl) {
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: true,
      prompt: 'bell> ',
    });
  }

  console.log(chalk.bold(`Bell ${VERSION}`) + chalk.gray(`  (type 'exit' or Ctrl+D to quit)`));

  let visitor = new BellVisitor(path.join(process.cwd(), '<repl>'));
  let buffer = '';
  let braceDepth = 0;
  let bracketDepth = 0;

  const isComplete = () => braceDepth === 0 && bracketDepth === 0 && buffer.trim().length > 0;

  const resetPrompt = () => {
    buffer = '';
    braceDepth = 0;
    bracketDepth = 0;
    rl.setPrompt('bell> ');
    rl.prompt();
  };

  rl.prompt();

  rl.on('line', async (line: string) => {
    // Handle special commands on empty buffer
    if (buffer === '') {
      const trimmed = line.trim();
      if (trimmed === 'exit' || trimmed === 'quit') {
        rl.close();
        process.exit(0);
      }
      if (trimmed === 'help') {
        console.log(HELP_TEXT);
        rl.prompt();
        return;
      }
      if (trimmed === 'clear') {
        visitor = new BellVisitor(path.join(process.cwd(), '<repl>'));
        console.log(chalk.gray('  State cleared.'));
        rl.prompt();
        return;
      }
    }

    // Accumulate input
    buffer += (buffer ? '\n' : '') + line;

    // Track brace/bracket depth for multi-line detection
    for (const ch of line) {
      if (ch === '{') braceDepth++;
      else if (ch === '}') braceDepth--;
      else if (ch === '[') bracketDepth++;
      else if (ch === ']') bracketDepth--;
    }

    if (!isComplete()) {
      rl.setPrompt('... ');
      rl.prompt();
      return;
    }

    // Execute the complete input
    const source = buffer;
    buffer = '';
    braceDepth = 0;
    bracketDepth = 0;

    rl.pause();
    try {
      await runSource(source, path.join(process.cwd(), '<repl>'), { visitor });
      visitor.resetRequestConfig();
    } catch (err: any) {
      console.error(chalk.red(`  ✖ ${err.message}`));
    } finally {
      rl.resume();
      rl.setPrompt('bell> ');
      rl.prompt();
    }
  });

  rl.on('close', () => {
    console.log('');
    process.exit(0);
  });
}
