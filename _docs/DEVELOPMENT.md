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

## setup

1. **install dependencies at the root:**
   ```bash
   npm install
   ```

2. **generate antlr lexer/parser:**
   ```bash
   npm run build-lexer -w @bell/core
   npm run build-parser -w @bell/core
   ```

3. **build core:**
   ```bash
   npm run build -w @bell/core
   ```

## running the cli

you can run the cli directly using `ts-node` from the root:

```bash
npx ts-node packages/core/src/cli.ts run examples/0-basicGetRequest/post.GET.bel
```

## running tests

tests are located in `packages/core/test` and use mocha/chai.

```bash
# run all tests from the root
npm test
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
