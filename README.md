# Bell

<img width="600" alt="Bell Share Card" src="./_docs/images/bell-card.png">

Bell is a simple scripting language for describing and making API calls. 

- **Readable**: Unlike Postman which buries information in menus, Bell files are plain text.
- **Collaborative**: Store scripts in your git repo for easy team collaboration.
- **Flexible**: Run from your CLI, VSCode, or convert from existing Postman collections.

## Links

- [Documentation](https://pjflanagan.github.io/bell/)
- [NPM](#) (Coming soon)
- [GitHub](https://github.com/pjflanagan/bell)

## Quick Start

Create a `.bel` file (e.g., `get_user.GET.bel`):

```bel
id = 1
url "https://jsonplaceholder.typicode.com/users/{id}"
GET
log response.body.name
```

