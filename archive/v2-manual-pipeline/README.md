
This was an attempt at writing my own Tokenizer and Parser. This is a bit misguided because there are great tools like Antlr that I should use instead.

## To Do List

Revamp:
- [ ] Make a Lexer (Tokenizer) that creates Tokens
  - [ ] The lexer catches syntax errors and remove comments, that way we catch errors before they run
- [ ] Make a parser (this takes the lexer and turns it into a tree (so we handle parentheticals))
- [ ] Make the Actionizer (or better name) to turn the AST into an action tree
- [ ] Make the Executer run the actions

Tokenize -> Parse -> (Actionize | Contectualize)
Token List -> Abstract Syntax Tree -> Action Tree

## Resources

- https://www.freecodecamp.org/news/the-programming-language-pipeline-91d3f449c919/
- https://dev.to/ndesmic/writing-a-tokenizer-1j85
- https://leanovate.github.io/bedcon/talk/abstract_syntax_tree.html 