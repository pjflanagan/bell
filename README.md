
# Bell

<img width="499" alt="Screenshot 2024-01-16 at 9 30 09 PM" src="https://github.com/pjflanagan/bell/assets/10575487/43985232-1608-4a46-bdd2-da4db5c163ca">

Bell is a simple script for describing and making API calls. 

## Advantages

- Bell files are easy to read: unlike Postman which buries important information in various menu tabs
- Bell files are easy to run: a simple CLI or VSCode plugin can run Bell files
- Bell is collaborative by default: make a `/bell` folder in your project repo and use git to keep the team on track. This also makes Bell files easy to track down.

## Project

The project is divided into three parts

- New file type with documentation
- Command Line Tool
  - Capable of executing Bell files
  - v2: Capable of running individual commands (like Python Shell)
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