
# Bell

Bell is a simple script for describing and making API calls. 

## TODO:

- Need to finalize some of the code layout (handling variables)

1. VSCode Plugin for Syntax highlighting (I won't want to do this if I can't make it look good)
2. Command Line Tool (make it work in the first place, after that I can try and make it look good)
3. VSCode Plugin expansion for GUI (this will take the form of an output terminal with a run and cancel button)

## Advantages

- Bell files are easy to read: unlike Postman which buries important information in various menus
- Bell files are easy to run: a simple CLI or VSCode plugin can run Bell files
- Bell is collaborative by default: make a `/bell` folder in your project repo and use git to keep the team on track. This also makes Bell files easy to track down.

## Project

The project is divided into three parts

- New file type with documentation
- Command Line Tool for executing Bell files
- VSCode plugin with syntax highlighting, error flags, and simple GUI

### VSCode Plugins

- https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide
- https://code.visualstudio.com/api/references/contribution-points