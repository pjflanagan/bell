# Bell

<img width="600" alt="Bell Share Card" src="./_docs/images/bell-card.png">

Bell is a simple scripting language for describing and making API calls. 

[Documentation](https://pjflanagan.github.io/bell/) | [GitHub](https://github.com/pjflanagan/bell)

## Advantages

- **Readable**: Unlike Postman which buries information in menus, Bell files are plain text.
- **Collaborative**: Store scripts in your git repo for easy team collaboration.
- **Flexible**: Run from your CLI, VSCode, or convert from existing Postman collections.

## Directory Structure

- `/examples`: **Public-facing examples**. Clean, documented, and best-practice scripts for users.
- `/packages/core/test/internal`: **Private test files**. Granular and "messy" files used for internal technical validation and grammar testing.

## Project

The project is divided into three parts:

- [New file type with documentation](https://pjflanagan.github.io/bell/)
- [Command Line Tool](./packages/core)
  - Capable of executing Bell files
  - Includes a Postman-to-Bell converter (`bell convert`)
- [VSCode plugin](./packages/vscode)
  - With syntax highlighting and execution support

## Develop

Using the Antlr VSCode extension, drag the `*.tokens` files out of the `.antlr` folder and into the `grammar` folder.

```bash
$ pip3 install antlr4-tools
$ antlr4 -Dlanguage=JavaScript ./packages/core/src/grammar/BellParser.g4 
```
