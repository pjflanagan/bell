# Gemini Roadmap to MVP - FINISHED

## Step 1: Language Specification (Grammar Alignment)
- [x] Sync `BellLexer.g4` and `BellParser.g4` with `examples/`
  - [x] Support variable assignments (`key = value`)
  - [x] Support parameters (`param key value`)
  - [x] Support response access (`log response.data`)
  - [x] Support full HTTP methods (GET, POST, etc.)
  - [x] Support Headers and Request Bodies (JSON)
  - [x] Support Imports (`require`)
  - [x] Support `request` recursive calls
- [x] Implement `assert` or `expect` statements

## Step 2: Core Execution Engine (The Interpreter)
- [x] Implement TypeScript Visitor for AST traversal (`BellVisitor.ts`)
- [x] Integrate HTTP client (`axios`)
- [x] Implement State Management (runtime context for variables/responses)
- [x] Implement `import` logic (reading JSON files)
- [x] Implement `validate` logic (Basic existence check)
- [x] Support relative file paths for imports and requests

## Step 3: CLI Utility
- [x] Create `bell run <file>` command
- [x] Format terminal output for requests/responses (using `chalk`)
- [x] Add support for environment variables/files (`--env` flag)

## Step 4: VSCode Extension UX
- [x] Update `bel.tmLanguage.json` syntax highlighting
- [x] Add "Run Bell File" command to VSCode (with UI button and shortcut)
- [x] Implement terminal integration

## Step 5: Advanced Features
- [x] Refine environment file support (Default environments, config files)
- [x] Scaffolding the `apps/docs` website with VitePress
- [x] Linked Bell syntax highlighting to VitePress (via Shiki and `bel.tmLanguage.json`)
- [x] Added unit tests with Mocha/Chai in `packages/core`
- [x] Created `DEVELOPMENT.md` for repo setup
- [x] Fixed monorepo `launch.json` and extension host configuration
- [x] Fixed root `package.json` for VSCode validation (added `version` and `engines`)
- [x] Set up CI/CD GitHub Actions (CI, Docs Deployment, Release to NPM/Marketplace)
- [ ] Full TS-based validation (integration with `ts-json-schema-generator` or similar)
