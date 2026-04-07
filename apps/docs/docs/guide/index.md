# Introduction to Bell

Bell is a domain-specific language (DSL) for making HTTP requests in a human-readable format. 

- **Declarative**: Readable files don't hide anything in menus or workspaces.
- **Collaborative**: Store `.bel` files in your team's repo and manage them with git.
- **Integrated**: Works from your terminal and directly in VSCode, no separate application to open.
- **Environment Aware**: Easily switch between development, staging, and production.
- **CLI Power**: Powerful [command-line interface](/guide/cli) to execute, format and convert scripts.


## Example

Here's what a simple Bell file looks like:

```bel
url "https://api.example.com/users/123"

GET

log response.body.name
```

