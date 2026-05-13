# Bell MVP Release Plan

Goal: a stable, consistent, publishable v0.1.0 of Bell — core language works correctly,
tests pass and cover the critical path, examples run without errors, and the README
gives a new user everything they need to get started.

**Test count**: 29 → 58 passing (as of Phase 4 completion)

---

## Phase 1 — Fix Critical Bugs ✅

### 1.1 Fix `log` statement ✅

**Root cause found**: `log` itself was correct. The silent failure was caused by the
`response` keyword bug (see 1.2) — variables set from `response.body.*` chains were
getting `undefined`, so there was nothing meaningful to log.

**Also fixed**: `visitLogStatement` now formats objects with `JSON.stringify` and
handles `null`/`undefined` cleanly instead of relying on `console.log`'s default.

### 1.2 Fix `param` statement ✅

**Root cause found**: same as `log` — `param` itself was correct. Param values derived
from `response.body.*` were `undefined` because of the `response` keyword bug.

**Root cause of both 1.1 and 1.2**: `response` is listed in the grammar's `identifier`
rule, so the ANTLR visitor dispatched `visitIdentifierExpression` instead of
`visitResponseExpression`. `visitIdentifierExpression` had no special case for
`response`, so it returned the string `"response"` — making all `response.body.*` access
evaluate to `undefined`. Fixed by adding `if (id === 'response') return this.lastResponse`
to `visitIdentifierExpression`.

### 1.3 Fix multiply/divide (`*`, `/`) operators ✅

`MultiplicativeExpressionContext` was missing from imports. Added. The runtime worked
by coincidence (ANTLR dispatches by method name, not type), but the TypeScript type was
wrong. Corrected.

### 1.4 Fix formatter: blank lines and table alignment ✅

**Finding**: The formatter was already correct for all tested cases — all formatter tests
pass. The original complaint in `errors.md` was likely about an edge case that has since
been fixed, or about behavior that is now covered by tests. No code changes needed.
Formatter tests added as part of Phase 4 confirm the reported behavior is correct.

---

## Phase 2 — Define and Implement Missing Language Features ✅

### 2.1 Define request state reset behavior ✅

Confirmed: `resetRequestConfig()` is called in `finally` after every HTTP dispatch.
URL, params, headers, and body all reset. Variables persist for the full file lifetime.
Test added: `should reset request config between requests but keep variables`.

### 2.2 Implement `assert` statement ✅

Implemented `visitAssertStatement`: logs `✔ Assert Passed` on truthy, calls
`process.exit(1)` on falsy. Semantic distinction from `expect`: `expect` is a soft
log-and-continue check; `assert` halts execution.
Tests added for both passing and failing cases.

### 2.3 Decide on `require` statement ✅

**Decision**: implemented with same semantics as `assert`. The name distinction is
semantic — `require` is a pre-condition guard placed before a request, `assert` is a
post-condition check placed after. Both exit on false.
Tests added for both passing and failing cases.
`guide/expect.bel` comment fixed (it incorrectly said `expect` exits on failure).

---

## Phase 3 — Error Handling and Undefined Variable Safety ✅

### 3.1 Undefined variable in string interpolation ✅

`resolveInterpolation` now throws `Error: Undefined variable in string interpolation: "name"`.
Also throws `Error: Unclosed interpolation brace` for `{name` without a closing `}`.
Test added for each.

### 3.2 Undefined variable in expression context ✅

`visitIdentifierExpression` now throws `Error: Undefined variable: "name"` instead of
silently returning the identifier text as a string. Special cases preserved for
`response` and `url`.

### 3.3 Missing required request fields ⬜

Not yet implemented. Calling an HTTP method without a URL set will silently send a
request with an empty URL (axios will error at the network layer, not with a clear
Bell-level message). Left for a follow-up pass.

---

## Phase 4 — Test Coverage ✅

**29 tests → 58 tests**

### 4.1 Automate internal test files ✅

New `test/internal.test.ts` harness runs all 17 `.bel` files in `test/internal/`:
- Files with `# expect error` assert that `runCode()` throws
- Files with `# expect <value>` assert the variable holds the expected value
- HTTP request files verify params/headers are passed to axios correctly
Two internal test files updated to use quoted string keys (`2-request-1-param.bel`,
`2-request-2-paramNumbersAndBooleans.bel`) — bare identifiers as param keys are no
longer valid now that undefined identifiers throw.

### 4.2 Add tests for Phase 1 fixes ✅

- Response access: `response.body`, `response.status`, `response.[0].status`
- Request state reset: second request has empty params
- Multiplication operator: verified via existing `timeout 10 * 1000` test

### 4.3 Add tests for Phase 2 features ✅

- `assert true` passes, `assert false` exits with code 1
- `require true` passes, `require false` exits with code 1
- Request state reset test covers 2.1

### 4.4 Add tests for Phase 3 error handling ✅

- `log undefinedVar` throws with message including the variable name
- `x = "hello {missing}"` throws with interpolation error message
- `x = "hello {unclosed"` throws with brace error message
- `x = "unclosed string` throws `SyntaxError`
- `runCode` helper updated to check `parser.numberOfSyntaxErrors`

---

## Phase 5 — Examples Audit ✅

### 5.1 Run each numbered example

Static audit completed (live httpbin.org run pending — requires network):

| Example | Status | Notes |
|---------|--------|-------|
| 0-basicGetRequest/post.GET.bel | ✅ Clean | |
| 0-basicGetRequest/postWithUserInput.GET.bel | ✅ Clean | Requires interactive input |
| 1-loginAndPost/loginAndPostOneFile.bel | 🔧 Fixed | |
| 2-loginAndPostAndDelete-require/loginAndPostImport.bel | 🔧 Fixed | |
| 3-searchWithUrlBreakdown/searchWithUrl.GET.bel | ✅ Clean | |
| 4-logAndWriteToFile/logAndWriteToFile.GET.bel | 🔧 Fixed | |
| 5-postWithValidateAndExpect/post.POST.bel | ✅ Clean | |
| 6-environment/environment.GET.bel | 🔧 Fixed | |
| 7-securityWarnings/deleteUserProdWarning.bel | ✅ Clean | |
| 8-timeouts/timeouts.bel | ✅ Clean | |

### 5.2 Fix or update broken examples ✅

- **1-loginAndPost**: `response.body.token` → `response.body.json.token` (httpbin
  nests POST body under `.json` in the response)
- **2-loginAndPostAndDelete-require**: added `id = "123"` to `loginAndPostImport.bel`
  so `require id` in the delete file has a value to check; `3-delete.DELETE.bel`
  unchanged (correctly demonstrates `require` as a pre-condition guard)
- **4-logAndWriteToFile**: removed `write` commands (unimplemented feature) and the
  undefined `id` variable; simplified to a clean log demo
- **6-environment**: removed duplicate `env` calls (the second and third were always
  no-ops after the first set `selectedEnv`); single `env "dev" | "preprod" | "prod"`

### 5.3 Verify `guide/` examples match language features ✅

- **guide/response.bel**: `response[0]` → `response.[0]` (Bell array access requires
  the dot prefix: `expr.[n]`, not `expr[n]`)
- **guide/expect.bel**: corrected comment — `expect` logs pass/fail and continues;
  only `assert` exits on failure

### 5.4 Ensure consistent style ⬜

Not yet audited. Deferred — no blocking issues found during 5.2/5.3 pass.

---

## Phase 6 — README and Documentation ⬜

### 6.1 Expand README ⬜

Currently 27 lines. Needs: installation, features list, complete chained-request
example, CLI reference, VS Code extension mention.

### 6.2 Verify documentation website ⬜

Link at `https://pjflanagan.github.io/bell/` — not yet checked against current
language features.

---

## Phase 7 — Version and Release Consistency ⬜

### 7.1 Bump `packages/vscode` version to match core ⬜

VS Code extension at `0.0.1`; core at `0.0.4`. Align both on `0.1.0`.

### 7.2 Decide on `v0.1.0` versioning ⬜

Both packages should move to `0.1.0` for the first intentional release.

### 7.3 Clean up `main.ts` ⬜

`packages/core/src/main.ts` is a dev scratch pad hardcoded to an example file.
Delete or move to a dev script excluded from the published package.

### 7.4 Set up CI (GitHub Actions) ⬜

Add `.github/workflows/test.yml` to run `npm install && npm run build && npm test`
on push and PR.

---

## Phase 8 — Polish (do last, only if time allows)

### 8.1 VS Code diagnostics ⬜

Show parse errors and undefined variables as red squiggles in the editor.

### 8.2 VS Code IntelliSense ⬜

Autocomplete for keywords (`GET`, `POST`, `url`, `param`, etc.) and known variables.

### 8.3 `bell init` command ⬜

The CLI has a stub for this. Scaffold a starter `.bel` file (and optionally an env
config) in the current directory.

---

## Completion Criteria for MVP

Before tagging `v0.1.0`:

- [x] All tests pass (`npm test` in `packages/core/`) — **58/58**
- [x] `log`, `param`, `*`/`/` are working and tested
- [x] `assert` is implemented and tested
- [x] `require` is implemented and tested
- [x] Request state is cleared correctly between requests
- [x] All 9 numbered examples audited and fixed
- [ ] All 9 numbered examples verified against live httpbin.org
- [ ] README covers install, quick start, features, CLI reference
- [ ] Both packages are at the same version (`0.1.0`)
- [ ] CI is running on main

---

## Suggested Work Order

1. ~~Phase 1 (fix bugs)~~ ✅
2. ~~Phase 4 (tests for Phase 1)~~ ✅
3. ~~Phase 2 (missing features)~~ ✅
4. ~~Phase 4 continued (tests for Phase 2)~~ ✅
5. ~~Phase 3 (error handling)~~ ✅
6. ~~Phase 5 (examples audit)~~ ✅
7. **Phase 6 (README)** ← next
8. Phase 7 (version + CI)
9. Phase 8 (polish)
