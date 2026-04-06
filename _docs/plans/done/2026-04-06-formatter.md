# Bell Formatter Plan

A formatter (`bell format <file>`) that reads a `.bel` file, parses it with the existing ANTLR grammar, and rewrites it with consistent style. Like `prettier` for Bell.

---

## Output of `bell format`

- Rewrites the file in-place (or `--check` mode to exit non-zero without writing)
- VSCode extension can call it on save via a `bell.formatOnSave` setting

---

## Formatting Rules

### Strings

All string values use double quotes unless the string contains interpolation (`{var}`), in which case backticks are used. Single quotes are normalized to double quotes.

```
# in
url 'http://localhost'
url "http://localhost/{id}"

# out
url "http://localhost"
url `http://localhost/{id}`
```

### Spacing

- One blank line between logical blocks (request config + method = one block)
- No blank lines within a request block (between `url`, `param`, `header`, `body`, and the HTTP method)
- One blank line after the HTTP method before the next statement
- No trailing whitespace

```
# in
url "http://api.example.com"

param "page" 1


GET


token = response.body.token

# out
url "http://api.example.com"
param "page" 1
GET

token = response.body.token
```

### param Table Alignment

Consecutive `param` lines are treated as a table. The key column and value column are each padded to the width of the longest entry in that column, separated by exactly two spaces.

```
# in
param "query" "Sushi"
param "location" "NY/New_York"
param "page" 1

# out
param "query"    "Sushi"
param "location" "NY/New_York"
param "page"     1
```

The same rule applies to consecutive `header` lines (single-header form, not the `headers {}` block).

### header / headers

- If there is only one header, use `header "Key" "Value"` 
- If there are two or more headers, use the `headers { }` block form
- Object properties inside `headers { }` are one per line, indented with 2 spaces, no trailing comma on the last entry

```
# in
header "Authorization" `Bearer {token}`

# out (single header, keep as header)
header "Authorization" `Bearer {token}`

# in
header "Authorization" `Bearer {token}`
header "Content-Type" "application/json"

# out (multiple, convert to headers block)
headers {
  "Authorization": `Bearer {token}`,
  "Content-Type": "application/json"
}
```

### body

The `body` value, if it is an object or array literal, is always written on the next line indented, never inline. Trailing commas are removed from the last property.

```
# in
body { "username": username, "password": password }

# out
body {
  "username": username,
  "password": password
}
```

### Comments

- Single-line comments (`# ...`) keep one space after `#`
- Multi-line comments (`### ... ###`) are preserved as-is
- Comments that appear on the same line as a statement are moved to the line above

```
# in
GET # send it

# out
# send it
GET
```

### Variable declarations

No special alignment between unrelated variable declarations. But consecutive declarations that are clearly a group (no blank line between them) are left as-is — the formatter does not column-align `=` signs.

```
# we don't do this:
username = "admin"
password = "secret"  # formatter does NOT align = signs

# still output as-is
username = "admin"
password = "secret"
```

### import

`import` statements go at the top of the file, before any other statements, separated from the rest of the file by one blank line. Multiple `import` statements are not separated from each other.

```
# out
import body from "./request.json"
import { RequestType, ResponseType } from "./format.ts"

url "https://api.example.com"
...
```

### export

`export` statements go at the bottom of the file, after all other statements, with one blank line above.

---

## Implementation Plan

### Phase 1 — CLI command

- [ ] Add `bell format <file>` command to `src/cli.ts`
- [ ] Add `--check` flag (exits 1 without writing if formatting would change the file)

### Phase 2 — Formatter core (`src/formatter/BellFormatter.ts`)

The formatter walks the parse tree using a new `BellFormatter` class (separate from `BellVisitor`). Rather than executing, it reconstructs the source string from the AST.

Key design: the formatter builds the output as an array of **blocks**, where each block is a group of lines that belong together (e.g. a full request: url + params + headers + body + method). Blank-line rules are applied between blocks, not within them.

- [ ] `src/formatter/BellFormatter.ts` — main class, walks the AST and produces a string
- [ ] `src/formatter/formatParam.ts` — handles the param/header table-alignment pass
  - Collect consecutive param nodes into a group
  - Measure max key width and max value width
  - Rewrite each line with padding
- [ ] `src/formatter/formatBody.ts` — normalizes inline object/array to multi-line

### Phase 3 — VSCode integration

- [ ] Add `bell.formatOnSave` setting to `packages/vscode/package.json`
- [ ] Register a `DocumentFormattingEditProvider` in `packages/vscode/src/extension.ts`
  - Calls `bell format --stdout <file>` (add `--stdout` flag to print to stdout instead of writing in-place) and returns the result as a `TextEdit`

### Phase 4 — Tests

- [ ] Add `packages/core/test/formatter.test.ts`
- [ ] Input/output fixture pairs in `packages/core/test/formatter/` (`.bel` files: `input.bel` + `expected.bel`)
- [ ] Cover: param table alignment, blank-line normalization, header collapsing, body expansion, import hoisting

---

## Open questions

- **Inline `request` blocks**: a `request "./other.bel"` line acts like a sub-program. The formatter should not reach into the referenced file — format each file independently: yes
- **Mixed param/non-param lines**: if a non-param line appears between two param lines: yes
- **Comments between params**: a `# comment` line between two `param` lines should break the table group: yes
