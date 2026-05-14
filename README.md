# Bell

<img width="600" alt="Bell Share Card" src="./_docs/images/bell-card.png">

Bell is a simple scripting language for describing and making API calls.

- **Readable**: Unlike Postman which buries information in menus, Bell files are plain text.
- **Collaborative**: Store scripts in your git repo for easy team collaboration.
- **Flexible**: Run from your CLI, VS Code, or convert from existing Postman collections.

## Links

- [Documentation](https://pjflanagan.github.io/bell/)
- [NPM](https://www.npmjs.com/package/bell-lang)
- [GitHub](https://github.com/pjflanagan/bell)

## Installation

```bash
npm install -g bell-lang
```

## Quick Start

Create a `.bel` file (e.g., `getUser.GET.bel`):

```bel
id = 1234
url "https://jsonplaceholder.typicode.com/users/{id}"
GET
log response.body.username
```

Run it:

```bash
bell run getUser.GET.bel
```

Or scaffold a starter file:

```bash
bell init
bell run bell/example.GET.bel
```

## Example: Login and Post

A common pattern is chaining requests — use data from one response in the next request.

```bel
# Login
url "https://api.example.com/auth/login"
body { "username": "alice", "password": "secret" }
POST

token = response.body.token

# Create a post using the token
url "https://api.example.com/posts"
header "Authorization" `Bearer {token}`
body { "title": "Hello World", "body": "My first post" }
POST

log response.status
log response.body
```

Split across files with `request`:

```bel
# run.bel
request "./login.POST.bel"
request "./createPost.POST.bel"
```

## Language Reference

### Variables

```bel
name = "Alice"
greeting = `Hello, {name}!`
```

### Requests

```bel
url "https://api.example.com/users"
path "/123"                          # appended to the env base URL
param "page" 2
param "active" true
header "Authorization" "Bearer token"
headers { "X-App-Id": "my-app", "X-Version": "1" }
body { "name": "Alice", "role": "admin" }
timeout 5000                         # milliseconds

GET
POST
PUT
PATCH
DELETE
```

Each HTTP method dispatches the request and resets the config. Variables are kept.

### Response

```bel
log response.body
log response.status
log response.headers

# Multiple requests — index into history
log response.[0].status   # first request
log response.[1].body     # second request
```

### Assertions

```bel
expect response.status === 200          # logs pass/fail, continues
assert response.status === 200          # exits with code 1 on failure
require token                           # pre-condition guard (place before a request)
```

### Control Flow

```bel
# Prompt the user for input
username = input("Enter your username")

# Warn before a destructive action
warn "This will delete all records. Continue?"
DELETE
```

### Environments

```bel
# envConfig.json: { "dev": { "url": "http://localhost:3000" }, "prod": { "url": "https://api.example.com" } }
import "envConfig.json"
env "dev" | "prod"     # prompts user to choose; sets base URL

path "/users"
GET
```

Pass an environment directly from the CLI:

```bash
bell run myFile.bel -e prod
```

### Imports and Composition

```bel
import foo from "data.json"
import "envConfig.json"          # loads environments (anonymous import)
request "./login.POST.bel"       # run another Bell file inline
```

### Logging

```bel
log response.body
log `Status: {response.status}`
```

## CLI Reference

| Command | Description |
|---------|-------------|
| `bell run <file.bel>` | Execute a Bell file |
| `bell run <file.bel> -e <env>` | Execute with a pre-selected environment |
| `bell run <file.bel> -v` | Verbose output (full error details) |
| `bell init` | Create a `bell/` folder with a starter example |
| `bell format <file.bel>` | Format a Bell file in-place |
| `bell format <file.bel> --check` | Exit with code 1 if file would be reformatted |
| `bell format <file.bel> --stdout` | Print formatted output to stdout |
| `bell convert <postman.json>` | Convert a Postman collection to Bell files |
| `bell convert <postman.json> -o <dir>` | Convert and write to a specific directory |
| `bell openapi <spec.json>` | Convert an OpenAPI 3.x spec (JSON or YAML) to Bell files |
| `bell openapi <spec.yaml> -o <dir>` | Convert an OpenAPI spec and write to a specific directory |
| `bell -c "<code>"` | Execute Bell code inline (use `\n` for newlines) |
| `bell` | Start the interactive REPL |

## VS Code Extension

Install the [Bell extension](https://marketplace.visualstudio.com/items?itemName=pjflanagan.bell) for syntax highlighting and a one-click **Run File** command.
