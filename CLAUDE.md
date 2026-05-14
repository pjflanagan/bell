# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What is Bell

Bell is a domain-specific language (DSL) for describing and executing HTTP API requests. It consists of:
- **`packages/core`** — the language runtime: ANTLR4-based lexer/parser, tree-visitor interpreter, and a CLI (`bell`)
- **`packages/vscode`** — a VS Code extension providing syntax highlighting and a "Run current file" command for `.bel` files

## Commands

All commands run from `packages/core/`:

```bash
# Build TypeScript
npm run build

# Run tests (builds first, then runs mocha on dist/)
npm test

# Run a specific .bel file directly
npx ts-node ./src/main.ts           # hardcoded example runner
bell run <file.bel>                  # via CLI (after build)
bell run <file.bel> -e <env>         # with environment selection
bell postman <collection.json> -o ./out # convert Postman collection
bell convert <postman.json> -o ./out    # alias for bell postman (deprecated)
bell openapi <spec.json> -o ./out    # convert OpenAPI 3.x spec (JSON or YAML)

# Regenerate ANTLR grammar (after editing .g4 files)
npm run build-lexer   # regenerates BellLexer.ts from BellLexer.g4
npm run build-parser  # regenerates BellParser.ts from BellParser.g4
```

VS Code extension (`packages/vscode/`):
```bash
npm run compile   # build extension
npm run watch     # watch mode
```

## Architecture

### Grammar → Parser → Interpreter pipeline

1. **Grammar** (`packages/core/src/grammar/`): Two ANTLR4 grammar files define the language:
   - `BellLexer.g4` — tokenizes keywords (`GET`, `POST`, `url`, `path`, `body`, `header`, `headers`, `param`, `env`, `import`, `validate`, `expect`, `warn`, `log`, `input`, etc.)
   - `BellParser.g4` — defines the grammar rules; produces labeled alternatives that map 1:1 to visitor methods
   - The generated `BellLexer.ts` and `BellParser.ts` (and `BellParserVisitor.ts`) must not be edited by hand — regenerate from `.g4` files

2. **Interpreter** (`packages/core/src/interpreter/BellVisitor.ts`): A single `BellVisitor` class extends `AbstractParseTreeVisitor` and implements `BellParserVisitor`. It holds:
   - `variables: Map<string, any>` — runtime variable store
   - `requestConfig` — accumulates URL, method, params, headers, body before dispatch
   - `lastResponse` / `responses[]` — Axios response history (accessible in Bell via `response`)
   - `environments` / `selectedEnv` — loaded from imported JSON, chosen via `env` statement or `-e` CLI flag
   - Uses `axios` for HTTP, `chalk` for output formatting, `inquirer` for interactive prompts (`input()`, `warn`, `env` selection)

3. **CLI** (`packages/core/src/cli.ts`): `commander`-based entry point. Two subcommands:
   - `bell run <file>` — parses and executes a `.bel` file
   - `bell convert <postman.json>` — converts a Postman collection to `.bel` files via `src/converters/postman.ts`

### Bell language features

- Variables: `name = "value"` (string interpolation with `{var}`)
- Request building: `url`, `path` (combined with env base URL), `param`, `header`, `headers`, `body`
- HTTP dispatch: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `OPTIONS`, `HEAD` (triggers the request)
- Response access: `response.body`, `response.status`, `response.[n]` for multiple responses
- Imports: `import foo from "file.json"`, `import { Type } from "file.ts"`, `import "envConfig.json"` (anonymous, loads environments)
- Environment: `env`, `env "dev" | "prod"` — prompts user or sets env; env JSON provides base URL via `url`/`domain` key
- Assertions: `expect <expression>`, `validate <expr> as TypeName`
- Interactive: `input("prompt")`, `warn <expr>` (confirm before continuing)
- Composition: `request "other-file.bel"` (inline another Bell file)
- Exports: `export varName` (marks variables for use by callers)

### File naming convention

Examples follow `<name>.<METHOD>.bel` (e.g. `login.POST.bel`, `search.GET.bel`). This is conventional, not enforced by the runtime.

### Tests

Tests live in `packages/core/test/interpreter.test.ts` (mocha + chai + sinon). The `runCode()` helper parses and visits Bell source strings directly. Axios is stubbed with sinon for unit tests. Internal test fixtures (`.bel` files for lexer/parser edge cases) are in `packages/core/test/internal/`.
