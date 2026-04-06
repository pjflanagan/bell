#!/usr/bin/env node
import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import { CharStreams, CommonTokenStream } from 'antlr4ts';
import { BellLexer } from './grammar/BellLexer';
import { BellParser } from './grammar/BellParser';
import { BellVisitor } from './interpreter/BellVisitor';
import { convertPostmanToBell } from './converters/postman';

const program = new Command();

program
  .name('bell')
  .description('A simple script for describing and making API calls')
  .version('0.0.1');

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
      const sourceCode = fs.readFileSync(filePath, 'utf8');
      
      // Create the lexer and parser
      const inputStream = CharStreams.fromString(sourceCode);
      const lexer = new BellLexer(inputStream);
      const tokenStream = new CommonTokenStream(lexer);
      const parser = new BellParser(tokenStream);

      // Parse the input
      const tree = parser.program();

      if (parser.numberOfSyntaxErrors > 0) {
        console.error(chalk.red(`Found ${parser.numberOfSyntaxErrors} syntax errors.`));
        process.exit(1);
      }

      console.log(chalk.blue(`🔔 Running Bell file: ${chalk.bold(path.basename(filePath))}`));
      
      // Execute using Visitor
      const visitor = new BellVisitor(filePath, options.env);
      await visitor.visit(tree);
      
      console.log(chalk.green(`
✔ Execution finished successfully.`));
    } catch (err: any) {
      console.error(chalk.red(`
✖ Error during execution:`));
      console.error(chalk.red(err.message));
      if (options.verbose) {
        console.error(err);
      }
      process.exit(1);
    }
  });

program.parse(process.argv);
