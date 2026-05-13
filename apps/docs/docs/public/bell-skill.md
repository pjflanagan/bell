You are working with Bell, a DSL for describing and executing HTTP API requests.
Bell files use the `.bel` extension.

## Variables

Assign strings, numbers, or booleans to variables. Use `{varName}` to interpolate into strings.

```bel
apiKey = "my-secret-token"
userId = 42
active = true
url "https://api.example.com/users/{userId}"
header "Authorization" "Bearer {apiKey}"
GET
```

## Request Building

Build a request with these keywords before dispatching it with an HTTP method:

- `url "..."` — full base URL
- `path "..."` — appended to the base URL (use with environments)
- `param "key" value` — query parameter; or `param varName` to use a variable as both key and value
- `header "Key" "value"` — individual request header
- `headers { "Key": "value", ... }` — set all headers at once
- `body { ... }` — JSON request body (set with POST, PUT, PATCH)

## HTTP Methods

Write a method keyword to dispatch the currently built request:

```bel
url "https://api.example.com"

path "/users"
GET

path "/users"
body { "name": "Jane" }
POST

path "/users/42"
body { "name": "Jane Doe" }
PUT

path "/users/42"
body { "name": "Jane D." }
PATCH

path "/users/42"
DELETE
```

## Response

After a request, `response` is set. Bell keeps a history of all responses.

```bel
url "https://api.example.com/users"
GET

log response.status         # HTTP status code
log response.body           # full response body
log response.body.data.id   # nested property
log response.headers        # response headers

# Multiple requests: index past responses with response.[n]
url "https://api.example.com/posts"
POST

log response.[0].status     # status of the GET above
log response.[1].body       # body of the POST
```

## Logging

```bel
log response.body
log url
count = 42
log count
```

## User Interaction

`input("prompt")` — prompts the user at runtime; use as expression or inline:

```bel
id = input("Enter user ID")
param "id" id

url "https://api.example.com/posts"
body {
  "title": input("Post title"),
  "body":  input("Post body")
}
POST
```

`warn` — asks for confirmation before continuing (stops execution if declined):

```bel
# As expression: returns the value if confirmed
prodUrl = warn "api.example.com"
url "https://{prodUrl}/users"
GET

# As statement: shows a message and waits
warn "You are about to delete a user. Proceed?"
url "https://api.example.com/users/42"
DELETE
```

## Guards and Assertions

`require expr` — pre-condition guard; stops before the request if falsy:

```bel
require token
require id

url "https://api.example.com/posts/{id}"
header "Authorization" "Bearer {token}"
DELETE
```

`expect expr` — checks a condition after a request, logs pass/fail, continues:

```bel
url "https://api.example.com/users"
GET

expect response.status === 200
expect response.body.data !== null
```

`assert expr` — like `expect`, but stops execution immediately if the check fails:

```bel
url "https://api.example.com/users"
GET

assert response.status === 200
assert response.body.id !== null
```

## Imports

```bel
# Named import from JSON
import requestBody from "./request-body.json"

# Named imports from TypeScript (types, schemas)
import { UserRequest, UserResponse } from "./types.ts"

# Anonymous import — loads an environment config or .env file
import "./env-config.json"
import "./.env"
```

## .env Files

Bell can load `.env` files. The special key `BELL_URL` sets the base URL.

```bash
# .env
BELL_URL=https://api.example.com
API_KEY=my-secret
```

```bel
import "./.env"
path "/users"
header "Authorization" "Bearer {API_KEY}"
GET
```

## Environments

Define environments in a JSON config:

```json
{
  "dev":  { "url": "https://dev.api.example.com",  "version": "v1" },
  "prod": { "url": "https://api.example.com",      "version": "v2" }
}
```

```bel
import "./env-config.json"

env "dev" | "prod"   # prompts the user to choose
# or: env "prod"     # sets without prompting

path "/{version}/users"
GET
```

## Runtime Validation

`validate expr as TypeName` — checks that a value matches a TypeScript type at runtime:

```bel
import requestBody from "./request-body.json"
import { UserRequest, UserResponse } from "./types.ts"

validate requestBody as UserRequest

url "https://api.example.com/users"
body requestBody
POST

validate response.body as UserResponse
```

## Multi-file Workflows

`request "file.bel"` — runs another Bell file inline; exported variables become available:

```bel
# login.POST.bel
url "https://api.example.com/login"
body { "username": "user", "password": "pass" }
POST

token = response.body.token
export token
```

```bel
# main.bel
request "./login.POST.bel"

# token is now available from the sub-file
url "https://api.example.com/posts"
header "Authorization" "Bearer {token}"
GET
```

`export varName` or `export a, b, c` — marks variables to share with callers.

## Comments

```bel
# Single-line comment

#
# Multi-line comment block
#
```

## File Naming Convention

Files are conventionally named `<name>.<METHOD>.bel` (e.g. `login.POST.bel`, `users.GET.bel`).
This is conventional, not enforced by the runtime.

## CLI Quick Reference

```bash
bell run <file.bel>               # run a file
bell run <file.bel> -e prod       # run with environment
bell <file.bel>                   # shorthand (no subcommand needed)
bell init                         # create a starter bell/ folder
bell format <file.bel>            # format a file
bell convert <postman.json>       # convert Postman collection
bell skill                        # print this skill reference
bell skill --install              # install as Claude Code slash command
```
