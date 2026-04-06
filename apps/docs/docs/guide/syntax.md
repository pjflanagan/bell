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
Sets the full base URL for the request. Bell supports both quoted and unquoted absolute URLs.
```bel
url "https://api.example.com"
url https://api.example.com
```

### `path`
Appends a path to the base URL (if an environment or URL is set).
```bel
path "/users/123"
```

### `input`
Prompts the user for a value during execution.
```bel
id = input("Enter user ID")
url https://api.example.com/users/{id}
```

### `warn`
Displays a warning message and requires user confirmation before proceeding.
```bel
# Prompts for confirmation and returns the value if confirmed
prodUrl = warn "production.com"

# Can also be used as a statement
warn "You are about to modify production data!"
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
Sets the request body (usually used with POST or PUT). Supports multi-line declarations.
```bel
body {
  "name": "John Doe",
  "email": "john@example.com"
}
```

## Keywords as Identifiers

You can use Bell keywords (like `url`, `body`, `headers`) as variables in expressions.

```bel
log url
token = response.body.token
```
