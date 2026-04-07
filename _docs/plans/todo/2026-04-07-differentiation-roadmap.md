# Differentiation Roadmap
## Implementing Bell's unique angles

Based on the feasibility research (`plans/done/2026-04-07-feasibility-research.md`), Bell's differentiated features fall into two themes: **interactive safety** and **TypeScript integration**. This document tracks what needs to be built or fixed to make those real.

---

## 1. Fix grammar inconsistencies (blocking — do first)

These are pre-1.0 correctness issues that must be resolved before the language is stable enough to ship. Details in `plans/done/2026-04-06-language-design-assessment.md`.

### 1a. Require quoted strings for `url` and `path`

**Problem:** `url http://localhost/{id}` works only by accident. The `FullUrl` lexer token captures the raw string before interpolation gets a chance to run cleanly. `url localhost:4000/path` doesn't even lex correctly.

**Change:**
- Remove `FullUrl` and `RelativeUrl` lexer tokens from `BellLexer.g4`
- Change `urlStatement` and `pathStatement` grammar rules to accept only `expression`
- Update all examples to use quoted strings: `url "https://api.example.com/{id}"`

**Files:** `BellLexer.g4`, `BellParser.g4`, `BellVisitor.ts`, all example `.bel` files

### 1b. Remove optional `=` from `param`

**Problem:** `param query = "Sushi"` looks like variable assignment but isn't. The `=` is silently discarded. It's misleading and inconsistent with the rest of the language.

**Change:**
- Simplify grammar to: `paramStatement : Param expression expression ;`
- Remove the `Assign?` optional and the single-arg `"key=value"` form
- Remove the `key.includes('=')` split logic from the visitor
- Update examples to use `param query "Sushi"` form

**Files:** `BellParser.g4`, `BellVisitor.ts`, example `.bel` files

### 1c. Fix `$var` in test examples

**Problem:** Some test fixtures use `$var1`/`$var2` but `$` is not a valid `Identifier` character in the lexer.

**Change:** Update test fixtures to use plain identifiers. Don't add `$` support — it has no other use in the language.

**Files:** `packages/core/test/internal/` fixtures

---

## 2. Implement `timeout` and `wait` (grammar gap)

**Problem:** `timeout` and `wait` appear in examples and the `8-timeouts` example directory, but are not defined in the grammar or visitor. They are currently unreachable code.

**Implement:**
- Add `Timeout` and `Wait` tokens to `BellLexer.g4`
- Add `timeoutStatement` and `waitStatement` rules to `BellParser.g4`
- Implement visitor methods:
  - `timeoutStatement`: set `axios` timeout on `requestConfig` (milliseconds)
  - `waitStatement`: `await` a delay before continuing (useful between chained requests)

**Example syntax** (already in examples, just not wired up):
```bel
timeout 5000
GET

wait 1000
GET
```

**Files:** `BellLexer.g4`, `BellParser.g4`, `BellVisitor.ts`

---

## 3. Polish interactive features (primary differentiator)

Bell's `input()`, `warn`, and `env` selection are the features no other tool has. They need to be reliable, ergonomic, and well-documented as a deliberate product position.

### 3a. Audit and harden `input()`

- Verify `input("prompt")` works correctly inside all expression contexts (body values, headers, variable assignment)
- Ensure it handles empty input gracefully
- Test interaction with `warn` when both appear in the same file
- Add to test suite with sinon stubs for `inquirer`

### 3b. Audit and harden `warn`

- Verify `warn` blocks execution and aborts on rejection
- Clarify what "warn" shows to the user — currently shows the value of the expression; ensure the prompt is clearly phrased as a confirmation
- Consider: `warn "Are you sure you want to delete user {id}?"` — the expression should be the confirmation message, not just a value to display

### 3c. Make `env` selection robust

- Verify `env "dev" | "prod"` properly presents a menu when multiple options are given
- Verify `env "dev"` (single value) sets without prompting
- Ensure the selected env's base URL is correctly prepended to `path` statements
- Add test coverage

### 3d. Document the interactive use case

Create a guide specifically for "running Bell against production safely":
- How to use `input()` to avoid storing secrets in files
- How to use `warn` as a guard before destructive operations
- How to use `env` selection for multi-environment workflows

This positions Bell intentionally against the "fully automated CI tool" framing of Hurl/Bruno.

---

## 4. Expand TypeScript type validation (second major differentiator)

`validate response.body as UserResponse` is unique in the landscape. Currently it imports the type and does runtime checking, but the depth of validation needs to be defined and expanded.

### 4a. Define what validation actually checks today

Audit `BellVisitor.ts` to understand what `visitValidateStatement` currently does. Document it clearly so the behavior is intentional, not accidental.

### 4b. Define the validation model

Decide what "validate as TypeName" means at runtime:
- **Option A (structural):** Check that the response object has all required keys with correct primitive types (can be done without full TS compiler, just type reflection)
- **Option B (schema-generated):** At import time, use `ts-morph` or `typescript` compiler API to extract the shape of `TypeName` and generate a validation function
- **Option C (integration with existing validators):** Accept a Zod schema or `io-ts` codec alongside or instead of a TypeScript type name

Recommendation: Start with Option B using `ts-morph` — it's the most novel angle and keeps the `.ts` import story intact.

### 4c. Improve error messages on validation failure

When validation fails, show exactly which fields are missing or have wrong types, not just "validation failed." This is the practical value of the feature.

### 4d. Add test coverage for validation

Currently undertested. Add cases for:
- Valid response matching type
- Missing required field
- Wrong type on a field
- Nested object types
- Optional fields

---

## 5. Request composition — improve the `export`/`request` story

`request "login.bel"` + `export token` is a powerful composition model. It needs to be reliable and ergonomic.

### 5a. Audit current behavior

- Verify that `export`ed variables from a sub-file are correctly available in the caller's scope
- Verify that `import "env.json"` inside a sub-file doesn't clobber the caller's environment selection
- Document which variables are scoped to the sub-file vs. exported

### 5b. Consider named exports in `request`

Currently `request "file.bel"` runs the file and its exports become available. Consider whether importing specific exports makes the intent clearer:
```bel
request "login.bel" { token }   # only bring token into scope
```
This is a language design question — decide and document before shipping.

### 5c. Add test coverage for composition

Add test cases for:
- Sub-file that exports a variable used by caller
- Nested `request` (sub-file that itself calls another file)
- Error propagation when sub-file fails

---

## 6. Publish to NPM + VS Code Marketplace

### 6a. NPM package

- Finalize package name (currently placeholder in `package.json`)
- Ensure `bell run`, `bell convert`, `bell format` all work via `npx bell`
- Write a short README with quick start
- Publish to NPM

### 6b. VS Code extension

- Publish to VS Code Marketplace
- Add error highlighting (currently missing — listed in `plans/todo/ideas.md`)
- Consider language server protocol (LSP) for hover docs, autocomplete on `response.body.*`

---

## Priority order

1. **Grammar fixes** (1a, 1b, 1c) — blocking for any v1 release; do immediately
2. **`timeout`/`wait`** (2) — in examples but broken; fix before publishing examples
3. **Interactive feature hardening** (3a–3c) — primary differentiator; must be reliable
4. **TypeScript validation** (4a–4b) — define the model before expanding; don't ship half-baked
5. **Composition audit** (5a–5b) — make sure what's there works before adding more
6. **NPM + VS Code publish** (6a–6b) — do last, after above is solid
7. **Documentation** (3d) — write the "why Bell" narrative for the interactive use case
