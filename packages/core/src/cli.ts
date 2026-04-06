#!/usr/bin/env node
import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import { runSource } from './interpreter/run';
import { convertPostmanToBell } from './converters/postman';
import { formatBellFile } from './formatter/BellFormatter';

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
} else {
  // Python-style: `bell <file.bel> [options]` — direct file invocation
  const knownSubcommands = new Set(['run', 'convert', 'format', 'help']);
  const firstArg = process.argv[2];
  if (firstArg && !firstArg.startsWith('-') && !knownSubcommands.has(firstArg) && firstArg.endsWith('.bel')) {
    // Rewrite argv so commander sees it as `bell run <file> [rest...]`
    process.argv.splice(2, 0, 'run');
  }
  program.parse(process.argv);
}
