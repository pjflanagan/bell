
# Bell

<img width="600" alt="Bell Share Card" src="./_docs/images/bell-card.png">

Bell is a simple scripting language for describing and making API calls. 

[Documentation](https://pjflanagan.github.io/bell/) | [GitHub](https://github.com/pjflanagan/bell)

## Advantages

- Bell files are easy to read: unlike Postman which buries important information in various menu tabs.
- Bell files are easy to run: a simple CLI or VSCode plugin can run Bell files.
- Bell is collaborative by default: make a `/bell` folder in your project repo and use git to keep the team on track. This also makes Bell files easy to find and share.

## Project

The project is divided into three parts:

- [New file type with documentation](https://pjflanagan.github.io/bell/)
- [Command Line Tool](./packages/core)
  - Capable of executing Bell files
  - v2: Capable of running individual commands (like Python Shell)
- [VSCode plugin](./packages/vscode)
  - with syntax highlighting
  - a simple GUI
  - v2: error flags

### VSCode Plugins

- [VSCode Language Extensions: Syntax Highlight Guide](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide)
- [VSCode API: Contribution Points](https://code.visualstudio.com/api/references/contribution-points)

## Develop

Using the Antlr VSCode extension, drag the `*.tokens` files out of the `.antlr` folder and into the `grammar` folder.

```bash
$ pip3 install antlr4-tools
$ antlr4 -Dlanguage=JavaScript ./packages/core/src/grammar/BellParser.g4 
```

