# Bell Project TODOs

## Active Tasks
- [x] Implement robust error handling in the interpreter.
  — Phase 3: `visitIdentifierExpression` throws `Undefined variable: "name"` instead of silently returning the identifier text. `resolveInterpolation` throws on undefined variables and unclosed braces. `runCode` / `run.ts` checks `parser.numberOfSyntaxErrors` and throws `SyntaxError`. 8 error-handling tests added.

## Infrastructure & Publishing
- [x] Set up GitHub Actions for automated testing (and publishing?)
  — `.github/workflows/ci.yml` already existed and runs `npm install && build-lexer && build-parser && build && npm test` on push/PR to main. Verified in Phase 7.4.
