lexer grammar BellLexer;

// Hidden tokens

MultiLineComment    : '###' .*? '###'                 -> channel(HIDDEN);
SingleLineComment   : '#' ~[\r\n\u2028\u2029]*        -> channel(HIDDEN);
WhiteSpaces         : [\t\u000B\u000C\u0020\u00A0]+   -> channel(HIDDEN);
Semicolon           : ';'                             -> channel(HIDDEN);


// Special tokens

Assign            : '=';
QuestionMark      : '?';
Dot               : '.';
Comma             : ',';
Colon             : ':';
LBrace            : '{';
RBrace            : '}';
LBracket          : '[';
RBracket          : ']';
LParen            : '(';
RParen            : ')';
Pipe              : '|';
Plus              : '+';
Multiply          : '*';
Divide            : '/';

// Comparison Operators
Eq                : '==';
StrictEq          : '===';
NotEq             : '!=';
StrictNotEq       : '!==';
Lt                : '<';
Gt                : '>';
Le                : '<=';
Ge                : '>=';

// Literal tokens

NullLiteral       : 'null';
BooleanLiteral    : 'true' | 'false';

// Numbers

fragment DecimalIntegerLiteral: '0' | [1-9] [0-9_]*;

DecimalLiteral
  : '-'? DecimalIntegerLiteral '.' [0-9] [0-9_]*
  | '-'? '.' [0-9] [0-9_]*
  | '-'? DecimalIntegerLiteral
  ;

// HTTP Request Statements
HTTPGet      : 'GET';
HTTPPost     : 'POST';
HTTPDelete   : 'DELETE';
HTTPPut      : 'PUT';
HTTPPatch    : 'PATCH';
HTTPOptions  : 'OPTIONS';
HTTPHead     : 'HEAD';

// Request Building Statements
Url          : 'url';
Path         : 'path';
Param        : 'param';
Header       : 'header';
Headers      : 'headers';
Body         : 'body';
Env          : 'env';

// Command Statements
Var          : 'var';
Log          : 'log';
Input        : 'input';
Assert       : 'assert';
Expect       : 'expect';
Require      : 'require';
Run          : 'run';
Import       : 'import';
From         : 'from';
Validate     : 'validate';
As           : 'as';
Warn         : 'warn';
Export       : 'export';
Timeout      : 'timeout';
Wait         : 'wait';

// String Literals

fragment DoubleStringCharacter: ~["\\\r\n];

fragment SingleStringCharacter: ~['\\\r\n];

StringLiteral
  : '"' DoubleStringCharacter* '"' 
  | '\'' SingleStringCharacter* '\''
  | '`' (~['`'])* '`'
  ;

// Variables

Response     : 'response';

fragment NamedVariableCharacter: [a-zA-Z_0-9]+;

Identifier   : [a-zA-Z_] NamedVariableCharacter*;

LineTerminator      : [\r\n\u2028\u2029]+;
