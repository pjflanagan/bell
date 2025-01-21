grammar bell;

// file: statement* EOF;

program
    : sourceElements? EOF
    ;

sourceElement
    : statement
    ;

sourceElements
    : sourceElement+
    ;

statement
  : urlStatement
  | paramStatement
  | logStatement
  ;

urlStatement
  : 'url' URL
  ;

paramStatement
  : 'param' ID NUMBER
  ;

logStatement
  : 'log' ID;

URL: 'http' '://' ~[\s]+;
ID: [a-zA-Z_][a-zA-Z_0-9]*;
NUMBER: [0-9]+ ('.' [0-9]+)?;
WS: [ \t\r\n]+ -> skip;
