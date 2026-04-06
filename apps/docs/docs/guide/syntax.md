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
param "lat"    30.1234
param "lng"    -40.1268
param "output" "json"
```

Can also set a param just using a variable. This will yield `?variableName=<variableValue>`.
```bel
param variableName
```

### `header` and `headers`
Adds an HTTP header to the request.
```bel
header "Authorization"  "Bearer {token}"
header "Content-Type"   "application/json"
```

Or sets the headers outright
```bel
headers {
  "Authorization": "Bearer {token}"
}
```

### `body`
Sets the request body (usually used with POST or PUT). Supports multi-line declarations.
```bel
body {
  "name": "John Doe",
  "email": "john@example.com"
}
```

## Sending a Request

When bell encounters `GET`, `POST`, `PATCH` or other HTTP method, it sends the currently built request.

```bel
POST
```

## User Interaction

### `input`
Prompts the user for a value during execution.
```bel
id = input("Enter user ID")
url "https://api.example.com/users/{id}"
```

### `warn`
Displays a warning message and requires user confirmation before proceeding.
```bel
# Prompts for confirmation and returns the value if confirmed
prodUrl = warn "production.com"

# Can also be used as a statement
warn "You are about to modify production data!"
```

## `expect`
Bell files can be used as test files with the `expect` command.
```bel
url "example.com"
expect response.code === 200
```

## Keywords as Identifiers

You can use Bell keywords (like `url`, `body`, `headers`) as variables in expressions.

```bel
log url
log body.data.entry
```
