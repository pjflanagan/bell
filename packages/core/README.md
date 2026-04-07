# Bell (bell-lang)

<img width="600" alt="Bell Share Card" src="https://github.com/pjflanagan/bell/raw/main/_docs/images/bell-card.png">

Bell is a simple scripting language for describing and making API calls. 

- **Readable**: Unlike Postman which buries information in menus, Bell files are plain text.
- **Collaborative**: Store scripts in your git repo for easy team collaboration.
- **Flexible**: Run from your CLI, VSCode, or convert from existing Postman collections.

## Links

- [Documentation](https://pjflanagan.github.io/bell/)
- [GitHub](https://github.com/pjflanagan/bell)

## Quick Start

Install the CLI:

```bash
npm install -g bell-lang
```

Create a `.bel` file (e.g., `getUser.GET.bel`):

```bel
id = 1
url "https://jsonplaceholder.typicode.com/users/{id}"
GET
log response.body.name
```

Run it:

```bash
bell run getUser.GET.bel
```
