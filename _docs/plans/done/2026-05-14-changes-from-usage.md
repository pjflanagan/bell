
- I'm not sure `request` is the best name because not all files send requests. 
  - Maybe `run` is a better name because it runs the file first. -> changed
  - If we had `import` as a command we should remove that too in favor of just `run` -> import is just for json and things
- When doing `input('prompt...')` we should allow `? defaultValue` at the end so user can click enter through it.
  - added


---


  request → run
  - Grammar: Request : 'request' → Run : 'run' in BellLexer.g4, updated requestStatementBuilding rule and identifier lists in BellParser.g4
  - Interpreter: log message updated to Running: <path>
  - Formatter: emits run "..." instead of request "...", internal kind renamed 'run-file'
  - VS Code syntax highlighting: request → run
  - Example files: all 4 files with request "..." updated
  - Tests: updated describe/usage strings
  
  input() default value
  - Grammar: Added QuestionMark : '?' to BellLexer.g4; updated inputCall to Input LParen expression? (QuestionMark expression)? RParen in BellParser.g4
  - Interpreter: visitInputCallExpression now reads a second expression if present and passes it as default to the prompter
  - Formatter: formatExpr handles the two-expression form and emits input(prompt ? default)