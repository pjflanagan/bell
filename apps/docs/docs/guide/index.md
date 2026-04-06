# Introduction to Bell

Bell is a domain-specific language (DSL) for making HTTP requests in a human-readable format.

## Example

Here's how a typical Bell file looks:

```bel
url "https://api.example.com"
token = "my-secret-token"

header "Authorization" "Bearer " + token

# Make a request
path "/users/123"
GET

# Validate results
log response.body.name
expect response.status === 200
```

## Features

- **Declarative**: Focus on what you want to send, not how to send it.
- **Collaborative**: Store `.bel` files in your repo for team access.
- **Environment Aware**: Easily switch between development, staging, and production.
- **Integrated**: Works from your terminal and directly in VSCode.
