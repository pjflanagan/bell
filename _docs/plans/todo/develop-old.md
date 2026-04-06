## Project

The project is divided into three parts

- New file type with documentation
- Command Line Tool
  - Capable of executing Bell files
  - v2: Capable of running individual commands (like Python Shell)
  - v2: capable of importing postman files
- VSCode plugin
  - with syntax highlighting
  - a simple GUI
  - v2: error flags

### VSCode Plugins

- https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide
- https://code.visualstudio.com/api/references/contribution-points


## Develop

Using the Antlr VSCode extension, drag the `*.tokens` files out of the `.antlr` folder and into the `grammar` folder.

```
$ pip3 install antlr4-tools
$ antlr4 -Dlanguage=JavaScript ./src/grammar/BellParser.g4 
```