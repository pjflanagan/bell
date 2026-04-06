# Python-Style CLI Plan

Python lets you run `python script.py` directly, pass inline code with `-c`, and drop into a REPL with no arguments. This plan brings the same feel to Bell.

---

## Target UX

```bash
# run a file directly — no subcommand needed
bell script.bel
bell script.bel -e prod

# run inline Bell code (like python -c)
bell -c 'url "https://httpbin.org/get"\nGET'

# open a REPL
bell

# subcommands still work as before
bell run script.bel
bell convert collection.json
bell format script.bel
```

---

## Behaviour Changes

### 1. `bell <file>` — direct file execution

When the first argument to `bell` is a `.bel` file path (not a known subcommand name), treat it as `bell run <file>`. All flags that `run` accepts (`-e`, `--verbose`) are accepted in this form too.

```bash
bell login.POST.bel -e dev
# equivalent to:
bell run login.POST.bel -e dev
```

Commander supports this via a default command (`.addHelpCommand` + `.action` on the root program rather than a subcommand). The existing `run` subcommand stays so nothing breaks.

### 2. `bell -c <code>` — inline execution

Run a string of Bell code directly without a file. Newlines in the string can be literal (`$'...'` in bash) or escaped (`\n`).

```bash
bell -c 'url "https://httpbin.org/get"
GET'

bell -c $'url "http://localhost:4000/ping"\nGET'
```

The `-c` path creates a temporary in-memory source (no file on disk), so relative imports and `request` statements are resolved from the current working directory.

### 3. `bell` with no arguments — REPL

Dropping into a REPL is the most Python-like feature. Each line of Bell is parsed and executed incrementally. State persists across lines (variables, last response, selected env).

```
$ bell
Bell 0.0.1  (type 'exit' or Ctrl+D to quit)
>>> url "https://httpbin.org/post"
>>> body { "hello": "world" }
>>> POST
➤ [POST] https://httpbin.org/post
✔ 200 OK
>>> log response.body.json.hello
  log: world
>>> exit
```

The REPL is line-buffered but handles multi-line constructs (object/array literals) by detecting unclosed `{` / `[` and prompting for continuation with `...`.

```
>>> body {
...   "name": "bell",
...   "version": 1
... }
```

---

## Implementation Plan

### Phase 1 — Direct file invocation (`bell <file>`) ✓

- [x] In `src/cli.ts`, before `program.parse()`, inspect `process.argv[2]`:
  - If it exists, is not a known subcommand name (`run`, `convert`, `format`), and ends with `.bel` (or is a path to a `.bel` file), re-route to the `run` command action
  - All remaining argv flags are passed through unchanged
- [x] Update help text to show `bell <file> [options]` as the primary usage line

This is a small change — no new files needed.

### Phase 2 — Inline execution (`bell -c`) ✓

- [x] Add `-c, --code <code>` option to the root `program` in `src/cli.ts`
- [x] When `-c` is present, unescape `\n` → newline, then run through the same parse + visit pipeline as `bell run`, using `process.cwd()` as the base path for relative resolution
- [x] Error output mirrors `bell run` (syntax error count, execution errors)

### Phase 3 — REPL (`src/repl/BellRepl.ts`)

The REPL is the most complex phase. It builds on `BellVisitor` by keeping a single long-lived instance across prompts.

**Entry point:**
- [ ] In `src/cli.ts`, when `process.argv.length === 2` (no arguments), start the REPL

**`src/repl/BellRepl.ts`:**
- [ ] Use Node's `readline` (built-in) for input — no extra dependency
- [ ] Print a banner line (`Bell x.x.x  (type 'exit' or Ctrl-D to quit)`) on start
- [ ] Primary prompt: `>>> `, continuation prompt: `... `
- [ ] Brace-depth tracking to detect incomplete input (open `{` / `[` without close)
- [ ] On each complete input, parse the accumulated lines as a `program` node and call `visitor.visit(tree)` on the single persistent `BellVisitor` instance
  - The visitor already holds `variables`, `requestConfig`, `lastResponse`, `environments`, `selectedEnv` across calls — no extra state management needed
- [ ] After each successful execution, reset `requestConfig` to its default state (method, params, headers, body) but keep variables and last response — same as how `request` sub-files work today
- [ ] Special inputs handled before parsing:
  - `exit` / `quit` → `process.exit(0)`
  - `clear` → reset the full visitor state (new `BellVisitor` instance)
  - `help` → print a short keyword reference

**Error handling in the REPL:**
- Parse errors print the error message and discard the buffer, then return to `>>> ` — they do not kill the session
- Runtime errors (network failures, etc.) are caught and printed, session continues

### Phase 4 — Tests

- [ ] `bell script.bel` invocation — test that it runs the same as `bell run script.bel`
- [ ] `bell -c '...'` — inline execution test, verify output and state
- [ ] REPL unit tests: feed input lines through `BellRepl` programmatically, assert stdout output and visitor state after each step

---

## Open questions

- **History in the REPL**: `readline` supports persistent history via `readline.Interface`. Should history be saved to `~/.bell_history`? Opt-in via a config flag is probably the right call.
- **`request` in `-c` mode**: since there is no source file, relative paths in `request "./other.bel"` resolve from `cwd`. This is probably fine but should be documented.
- **Multi-statement `-c`**: should `bell -c` accept multiple `-c` flags (like `node -e` does not, but `perl -e` supports chaining)? Start with a single `-c` flag; multiple can be added later by joining with newlines.
