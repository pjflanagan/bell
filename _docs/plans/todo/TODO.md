
- [ ] TODO: CONSIDER: Maybe bell should start as a collection of yml files
  - Users describe their requests as yml files


- [ ] Split this into two parts (see where it makes sense)
  - [ ] 1: NPM Package for executing Bell files
  - [ ] 2: VSCode Extension

Revamp using Antlr
- [ ] Cleanup all the other Todo and Readme files so that we only have the relevant stuff
- [ ] Remove all irrelevant legacy-todo: comments
- [ ] Consolidate all relevant legacy-todo: and resource link comments into the README
- [ ] Relearn how to do the vscode syntax highlighting so that I can document how


1. VSCode Plugin for Syntax highlighting (I won't want to do this if I can't make it look good)
2. Command Line Tool (make it work in the first place, after that I can try and make it look good)
3. VSCode Plugin expansion for GUI (this will take the form of an output terminal with a run and cancel button)
  - unlike Thunder Client this will be more basic and integrated into the existing VSCode file system, rather than a new tab that looks exactly like Postman
  - This is where the true benefit of this needs to come through. Postman has a lot of features (nameley the enviornment var stuff) that make it powerful. If this is to be a tool rather than a basic scripting language then we need to have useful UI
4. Perhaps I need a way to export Postman to Bell and vice versa