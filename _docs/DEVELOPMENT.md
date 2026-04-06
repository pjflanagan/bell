# Bell Development Guide

This guide explains how to set up the project, run tests, and develop the Bell ecosystem.

## Project Structure

This is a monorepo managed with `npm workspaces`:

- `packages/core`: The execution engine, Antlr grammar, and CLI (`bell`).
- `packages/vscode`: The VSCode Extension (syntax highlighting, "Run" button).
- `apps/docs`: Documentation website (VitePress).
- `examples/`: Sample `.bel` files.

## Prerequisites

- Node.js (v18+)
- Java (Required for Antlr grammar generation)

## Setup

1. **Install dependencies at the root:**
   ```bash
   npm install
   ```

2. **Generate Antlr Lexer/Parser:**
   ```bash
   npm run build-lexer -w @bell/core
   npm run build-parser -w @bell/core
   ```

3. **Build Core:**
   ```bash
   cd packages/core
   npm run build # or just tsc
   ```

## Running the CLI

You can run the CLI directly using `ts-node`:

```bash
cd packages/core
npx ts-node src/cli.ts run ../../examples/fullExample.bel
```

## Running Tests

Tests are located in `packages/core/test` and use Mocha/Chai.

```bash
# From the root
npm test -w @bell/core
```

## VSCode Extension Development

To develop and test the VSCode extension:

1. Open the root folder in VSCode.
2. Go to the **Run and Debug** view (`Ctrl+Shift+D`).
3. Select **"Launch Extension"** and press `F5`.
4. This will open a new "Extension Development Host" window.
5. In the new window, open any folder containing `.bel` files.
6. You should see syntax highlighting and a "Play" button in the editor title bar.

### Extension Logic
The extension source is in `packages/vscode/src/extension.ts`. It simply triggers the `bell run` CLI command in an integrated terminal.

## Documentation Site

To run the documentation site locally:

```bash
npm run dev -w @bell/docs
```
