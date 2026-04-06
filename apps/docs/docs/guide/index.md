# Introduction to Bell

Bell is a domain-specific language (DSL) for making HTTP requests in a human-readable format.

## Example

Here's how a typical Bell file looks:

```bel
url "https://api.example.com"
token = "my-secret-token"

header "Authorization" "Bearer {token}"

# Make a request
path "/users/123"
GET

# Validate results
log response.body.name
expect response.status === 200
```

## Features

- **Declarative**: Readable files don't hide anything in menus or workspaces.
- **Collaborative**: Store `.bel` files in your team's repo and manage them with git.
- **Integrated**: Works from your terminal and directly in VSCode, no software to subscribe to.
- **Environment Aware**: Easily switch between development, staging, and production.
