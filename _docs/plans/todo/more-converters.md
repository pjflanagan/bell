# More Converters

Bell currently converts from Postman and OpenAPI. Each new source format follows the same pattern: one subcommand (`bell <format>`), one converter module in `src/converters/`, fixture-based tests, and a section on the `/guide/migrate` docs page.

---

## Formats to support

### `bell curl` — convert a curl command

**Why:** curl commands appear everywhere — API docs, Stack Overflow, GitHub READMEs, terminal history. This is the fastest path from "I found an example" to a runnable Bell file.

**Input:** A curl command string (passed as an argument or piped from stdin).

```bash
bell curl 'curl -X POST https://api.example.com/users \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"alice\"}"'

# or pipe it
pbpaste | bell curl
```

**What to parse:**
- `-X METHOD` or implied GET
- URL (positional argument)
- `-H "Key: Value"` headers
- `-d`, `--data`, `--data-raw`, `--data-binary` body (detect JSON vs raw)
- `-u user:pass` → Basic auth header
- `--url` as alternative to positional URL
- Multiple `-H` flags

**Output:** A single `.bel` file (stdout by default, or `-o file.bel`).

**Notes:** No subdirectory structure — curl is always one request. Consider a `--stdout` mode that prints to stdout instead of writing a file, so it can be used inline.

---

### `bell har` — convert a browser HAR export

**Why:** HAR (HTTP Archive) is the format exported from Chrome/Firefox DevTools → Network tab → "Save all as HAR". It captures real traffic, including cookies, timing, and full request/response pairs. Useful for turning "I saw this request in DevTools" into a reproducible Bell file.

**Input:** A `.har` JSON file.

```bash
bell har network-export.har -o ./bell
```

**Structure of a HAR file:**
```json
{
  "log": {
    "entries": [
      {
        "request": {
          "method": "POST",
          "url": "https://api.example.com/users",
          "headers": [{ "name": "Authorization", "value": "Bearer ..." }],
          "postData": { "mimeType": "application/json", "text": "{...}" },
          "queryString": [{ "name": "page", "value": "1" }]
        },
        "response": {
          "status": 200
        }
      }
    ]
  }
}
```

**What to handle:**
- Filter out noise: browser internals (`chrome-extension://`), static assets (images, fonts, CSS/JS by MIME type), preflight OPTIONS
- Merge duplicate entries for the same endpoint
- Strip or redact `Cookie` and `Set-Cookie` headers by default (add `--include-cookies` flag)
- Use the actual response status code in the `expect` assertion
- Group by path prefix into subdirectories

**Notes:** HAR files can be very large (100s of entries). A `--filter <pattern>` flag to match URLs by substring or regex would be useful. Consider a `--dedupe` flag that keeps only the last request per unique `method + path`.

---

### `bell insomnia` — convert an Insomnia collection

**Why:** Insomnia is a popular alternative to Postman with a similar feature set. Its export format is straightforward JSON.

**Input:** An Insomnia v4 export JSON.

```bash
bell insomnia Insomnia_export.json -o ./bell
```

**Insomnia export structure:**
```json
{
  "__export_format": 4,
  "resources": [
    { "_type": "request", "name": "Get Users", "method": "GET", "url": "..." },
    { "_type": "request_group", "name": "Users", "parentId": "..." }
  ]
}
```

**What to handle:**
- `_type: "request"` → one `.bel` file
- `_type: "request_group"` → subdirectory (reconstruct tree via `parentId`)
- Insomnia `{{ variable }}` syntax → Bell `{variable}`
- `body.mimeType === "application/json"` → `body { ... }`
- `authentication` block:
  - `type: "bearer"` → `header "Authorization" "Bearer {token}"`
  - `type: "basic"` → `header "Authorization" "Basic ..."`
  - `type: "apikey"` → `header "{key}" "{value}"`
- `environments` → `env.json`

---

### `bell bruno` — convert a Bruno collection

**Why:** Bruno is a growing open-source alternative to Postman/Insomnia that stores collections as plain text files (`.bru` format) in a git-friendly way. Users migrating to Bell from Bruno will want this.

**Input:** A Bruno collection directory or a single `.bru` file.

```bash
bell bruno ./my-collection/ -o ./bell
bell bruno request.bru -o request.GET.bel
```

**Bruno `.bru` format** (plain text, not JSON):
```
meta {
  name: Get Users
  type: http
}

get {
  url: https://api.example.com/users
}

headers {
  Authorization: Bearer {{token}}
}

body:json {
  {
    "name": "alice"
  }
}
```

**What to handle:**
- Parse the block-based `.bru` syntax (each block is `blockName { ... }`)
- Recurse through directories, preserving folder structure
- `{{variable}}` → `{variable}`
- `body:json`, `body:text`, `body:form-urlencoded`
- `auth:bearer`, `auth:basic`, `auth:apikey`

**Notes:** The `.bru` parser will need to be written from scratch (it's a custom format). A simple line-by-line state machine should be sufficient — it's not deeply nested.

---

### `bell http` — convert a `.http` / REST Client file

**Why:** The [REST Client VS Code extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) uses `.http` files that many developers already have in their repos. These files are a natural gateway into Bell.

**Input:** A `.http` or `.rest` file.

```bash
bell http requests.http -o ./bell
```

**`.http` format:**
```http
### Get a user
GET https://api.example.com/users/1
Authorization: Bearer {{token}}

###

### Create a user
POST https://api.example.com/users
Content-Type: application/json

{
  "name": "alice"
}
```

**What to handle:**
- `###` as the request separator (with optional name as comment)
- First line of each block: `METHOD URL`
- Headers: `Key: Value` lines before the blank line
- Body: content after the blank line
- `{{variable}}` → `{variable}`
- `@variable = value` declarations at the top of the file → Bell variables
- Generate one `.bel` file per `###` block

---

## Shared implementation notes

- All converters live in `src/converters/<format>.ts` and are wired up in `cli.ts`
- Fixture-based tests follow the same pattern as the Postman and OpenAPI converters: `test/<format>/` with `input.*` and `expected/` files
- Each format gets a section on the `/guide/migrate` docs page
- `sanitizeName` (camelCase → snake_case, non-alnum → `_`) is shared — put it in `src/converters/utils.ts` when adding the second new converter

## Priority order

1. **`bell curl`** — highest leverage, no file to export, works from clipboard
2. **`bell har`** — captures real traffic; unique angle vs other converters
3. **`bell insomnia`** — large user base, straightforward format
4. **`bell http`** — existing REST Client users are natural Bell adopters
5. **`bell bruno`** — smaller current user base, custom parser needed
