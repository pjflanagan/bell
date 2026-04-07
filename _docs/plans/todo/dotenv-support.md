
# .env File Support

Many projects already store secrets and config in `.env` files. Bell should be
able to load them so users don't have to duplicate values into a Bell env JSON.

---

## Proposed syntax

### Anonymous import (same as env JSON)

```bel
import ".env"
```

Bell detects the `.env` extension and parses it as `KEY=VALUE` pairs instead of
JSON. All keys become Bell variables, available by name (case-preserved).

```bel
import ".env"
# if .env contains: API_KEY=abc123
header "Authorization" "Bearer {API_KEY}"
```

### Named import (pull specific keys)

```bel
import { API_KEY, BASE_URL } from ".env"
```

Same ergonomics as importing named exports from a `.bel` or `.ts` file.

---

## Base URL convention

Bell env JSON uses a `"url"` key to set the base URL. For `.env` files, use
`BELL_URL` as the conventional key:

```
BELL_URL=https://api.example.com
API_KEY=abc123
```

If `BELL_URL` is present, it acts like the `url` key in an env JSON config —
it sets the base URL for `path` statements without requiring an explicit `url`
call.

---

## Interaction with existing `env` system

Loading a `.env` file is flat — it adds variables but does not create named
environments (dev/prod/etc.). If the user needs per-environment `.env` files,
they can use the existing pattern:

```bel
env "dev" | "prod"
import ".env.{env}"   # .env.dev or .env.prod
```

This requires the env to be selected before the import is evaluated, which
means the `env` statement would need to run first. Worth thinking through
the ordering semantics.

---

## Implementation notes

- Parsing: standard `KEY=VALUE` format, skip blank lines and `#` comments,
  strip surrounding quotes from values.
- The `.env` file extension (and `.env.local`, `.env.dev`, etc.) should be
  detected by the import handler before attempting JSON.parse.
- No new grammar rules needed — anonymous and named import already exist;
  only the runtime loader needs a new branch for `.env` files.
- Should warn the user (or print a dim note) if the `.env` file does not exist,
  since it is commonly gitignored and may be missing in CI.

---

## Open questions

- Should `SCREAMING_SNAKE_CASE` keys be usable as Bell identifiers directly?
  Bell identifiers are currently lowercase-friendly but the grammar may need to
  allow uppercase letters.
- Should Bell auto-load a `.env` in the current directory the way some tools do,
  or keep it explicit via `import`? Explicit feels safer and more in line with
  Bell's philosophy.
- How to handle multiline values (the `KEY="line1\nline2"` pattern)?
