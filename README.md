# Bell

<img width="600" alt="Bell Share Card" src="./_docs/images/bell-card.png">

Bell is a simple scripting language for describing and making API calls. 

[Documentation](https://pjflanagan.github.io/bell/) | [GitHub](https://github.com/pjflanagan/bell)

## Quick Start

Create a `.bel` file (e.g., `get_user.GET.bel`):

```bel
# Define a variable
id = 1

# Set the URL (supports unquoted)
url https://jsonplaceholder.typicode.com/users/{id}

# Execute the request
GET

# Log the response body
log response.body.name
```

Run it with the CLI:
```bash
bell run get_user.GET.bel
```

## Documentation

For full syntax and more examples, visit the [Documentation Site](https://pjflanagan.github.io/bell/).

## Advantages

- **Readable**: Unlike Postman which buries information in menus, Bell files are plain text.
- **Collaborative**: Store scripts in your git repo for easy team collaboration.
- **Flexible**: Run from your CLI, VSCode, or convert from existing Postman collections.

## Di