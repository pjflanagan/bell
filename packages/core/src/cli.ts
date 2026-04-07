#!/usr/bin/env node

// Register ts-node so Bell can require() user's .ts schema/type files at runtime
try {
  require('ts-node').register({
    transpileOnly: true,   // skip type-checking for speed
    skipProject: true,     // don't inherit the user's tsconfig
    compilerOptions: { module: 'commonjs' },
  });
} catch {
  // ts-node unavailable — .ts imports will fall back to { __file } marker
}

import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import { runSource } from './interpreter/run';
import { convertPostmanToBell } from './converters/postman';
import { formatBellFile } from './formatter/BellFormatter';
import { startRepl } from './repl/BellRepl';

const program = new Command();

program
  .name('bell')
  .usage('[file.bel] [options]')
  .description('A simple script for describing and making API calls')
  .version('0.0.1')
  .option('-c <code>', 'Execute Bell code directly (use \\n for newlines)');

program
  .command('convert')
  .description('Convert a Postman collection to Bell files')
  .argument('<postman-json>', 'Path to the exported Postman collection JSON')
  .option('-o, --output <dir>', 'Output directory for the .bel files', './bell-scripts')
  .action((postmanJson, options) => {
    const postmanPath = path.resolve(postmanJson);
    if (!fs.existsSync(postmanPath)) {
      console.error(chalk.red(`Error: Postman collection file not found: ${postmanPath}`));
      process.exit(1);
    }

    try {
      console.log(chalk.blue(`🔄 Converting Postman collection: ${chalk.bold(path.basename(postmanPath))}...`));
      convertPostmanToBell(postmanPath, path.resolve(options.output));
      console.log(chalk.green(`
✔ Conversion complete! Files saved to: ${chalk.bold(options.output)}`));
    } catch (err: any) {
      console.error(chalk.red(`
✖ Error during conversion:`));
      console.error(chalk.red(err.message));
      process.exit(1);
    }
  });

program
  .command('run')
  .description('Execute a .bel file')
  .argument('<file>', 'Path to the .bel file')
  .option('-v, --verbose', 'Print more details about the request/response')
  .option('-e, --env <environment>', 'Specify the environment to use')
  .action(async (file, options) => {
    const filePath = path.resolve(file);
    if (!fs.existsSync(filePath)) {
      console.error(chalk.red(`Error: File not found: ${filePath}`));
      process.exit(1);
    }

    try {
      console.log(chalk.blue(`🔔 Running Bell file: ${chalk.bold(path.basename(filePath))}`));
      const source = fs.readFileSync(filePath, 'utf8');
      await runSource(source, filePath, { env: options.env });
      console.log(chalk.green(`\n✔ Execution finished successfully.`));
    } catch (err: any) {
      console.error(chalk.red(`\n✖ Error during execution:`));
      console.error(chalk.red(err.message));
      if (options.verbose) {
        console.error(err);
      }
      process.exit(1);
    }
  });

program
  .command('format')
  .description('Format a .bel file in-place')
  .argument('<file>', 'Path to the .bel file')
  .option('--check', 'Exit with code 1 if the file would be changed, without writing')
  .option('--stdout', 'Print formatted output to stdout instead of writing the file')
  .action((file, options) => {
    const filePath = path.resolve(file);
    if (!fs.existsSync(filePath)) {
      console.error(chalk.red(`Error: File not found: ${filePath}`));
      process.exit(1);
    }
    try {
      const original = fs.readFileSync(filePath, 'utf8');
      const formatted = formatBellFile(filePath);
      if (options.stdout) {
        process.stdout.write(formatted);
      } else if (options.check) {
        if (original !== formatted) {
          console.error(chalk.red(`✘ ${path.basename(filePath)} would be reformatted`));
          process.exit(1);
        }
        console.log(chalk.green(`✔ ${path.basename(filePath)} is properly formatted`));
      } else {
        fs.writeFileSync(filePath, formatted, 'utf8');
        if (original !== formatted) {
          console.log(chalk.green(`✔ Formatted: ${chalk.bold(path.basename(filePath))}`));
        } else {
          console.log(chalk.gray(`  Unchanged: ${path.basename(filePath)}`));
        }
      }
    } catch (err: any) {
      console.error(chalk.red(`✖ Error formatting file:`));
      console.error(chalk.red(err.message));
      process.exit(1);
    }
  });

program
  .command('help [command]')
  .description('Display help for a command')
  .action((command) => {
    if (command) {
      const cmd = program.commands.find(c => c.name() === command);
      if (cmd) {
        cmd.outputHelp();
      } else {
        console.error(chalk.red(`Unknown command: ${command}`));
        program.outputHelp();
      }
    } else {
      program.outputHelp();
    }
  });

const INIT_EXAMPLE = `\
# Bell starter file
# Run this with: bell run bell/example.GET.bel

# Fetch a post from a public API
url "https://jsonplaceholder.typicode.com/posts/1"
GET

# Try changing the id, or swap in your own URL:
#
#   id = 42
#   url "https://jsonplaceholder.typicode.com/posts/{id}"
#   GET
#
# Add headers:
#   header "Authorization" "Bearer <token>"
#
# Send a POST:
#   url "https://jsonplaceholder.typicode.com/posts"
#   body { "title": "hello", "body": "world", "userId": 1 }
#   POST
`;

program
  .command('init')
  .description('Create a bell/ folder with a starter example file')
  .action(() => {
    const dir = path.resolve('bell');
    const file = path.join(dir, 'example.GET.bel');

    if (fs.existsSync(dir)) {
      console.error(chalk.red(`✖ Directory already exists: ${chalk.bold(dir)}`));
      process.exit(1);
    }

    fs.mkdirSync(dir);
    fs.writeFileSync(file, INIT_EXAMPLE, 'utf8');

    console.log(chalk.green(`✔ Created ${chalk.bold('bell/example.GET.bel')}`));
    console.log('');
    console.log(`  Run it:  ${chalk.cyan('bell run bell/example.GET.bel')}`);
    console.log(`  Or open ${chalk.bold('bell/example.GET.bel')} and make it your own.`);
  });

// Python-style: `bell -c <code>` — inline execution (handled before commander)
const cFlagIdx = process.argv.indexOf('-c');
if (cFlagIdx !== -1 && cFlagIdx + 1 < process.argv.length) {
  const source = process.argv[cFlagIdx + 1].replace(/\\n/g, '\n');
  const basePath = path.join(process.cwd(), '<inline>');
  (async () => {
    try {
      await runSource(source, basePath);
    } catch (err: any) {
      console.error(chalk.red(`\n✖ Error during execution:`));
      console.error(chalk.red(err.message));
      process.exit(1);
    }
  })();
} else if (process.argv.length === 2) {
  // No arguments — start the REPL
  startRepl();
} else {
  // Python-style: `bell <file.bel> [options]` — direct file invocation
  const knownSubcommands = new Set(['run', 'convert', 'format', 'init', 'help']);
  const firstArg = process.argv[2];
  if (firstArg && !firstArg.startsWith('-') && !knownSubcommands.has(firstArg) && firstArg.endsWith('.bel')) {
    // Rewrite argv so commander sees it as `bell run <file> [rest...]`
    process.argv.splice(2, 0, 'run');
  }
  program.parse(process.argv);
}
