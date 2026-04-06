# Bell Syntax Guide

The Bell language is designed to be as close to plain English as possible for making HTTP requests.

## Variables and Assignments

You can define variables to store values for reuse.

```bel
apiKey = "my-secret-token"
baseUrl = "https://api.example.com"
```

## Request Building

Use these keywords to build your HTTP request.

### `url`
Sets the full base URL for the request.
```bel
url "https://api.example.com"
```

### `path`
Appends a path to the base URL (if an environment or URL is set).
```bel
path "/users/123"
```

### `param`
Adds a query parameter to the URL.
```bel
param lat 30.1234
param lng -40.1268
param output = "json"
```

### `header`
Adds an HTTP header to the request.
```bel
header "Authorization" "Bearer {apiKey}"
header "Content-Type" "application/json"
```

### `body`
Sets the request body (usually used with POST or PUT).
```bel
body {
  "name": "John Doe",
  "email": "john@example.com"
}
```

## HTTP Methods

Execute the request by simply typing the method in uppercase.

```bel
GET
POST
PUT
DELETE
PATCH
```

## Response Handling

Once a request is executed, the `response` object becomes available.

### `log`
Prints a value to the console.
```bel
log response.status
log response.body.id
```

### `expect` / `assert`
Tests a value or condition.
```bel
expect response.status === 200
assert response.body.success === true
```

### `validate`
Performs a basic check that a value exists (can be expanded for type validation).
```bel
validate response.body as UserProfile
```

## Environment Management

Bell has built-in support for multiple environments.

### `import` (Environments)
Load environment configurations from a JSON file.
```bel
import "envConfig.json"
```

### `env`
Selects an environment. If no name is provided, the CLI will prompt you.
```bel
env "prod"
env "dev" | "staging" # Prompt user between these two
env                   # Prompt user between all loaded environments
```

## Imports and Sub-requests

### `import` (Data)
Load data from a JSON file into a variable.
```bel
import userData from "./user.json"
```

### `request`
Executes another `.bel` file and returns to the current file.
```bel
request "./login.bel"
GET
```
