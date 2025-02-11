
lexer grammar BellLexer;

// Hidden tokens

MultiLineComment    : '###' .*? '###'                 -> channel(HIDDEN);
SingleLineComment   : '#' ~[\r\n\u2028\u2029]*        -> channel(HIDDEN);
WhiteSpaces         : [\t\u000B\u000C\u0020\u00A0]+   -> channel(HIDDEN);
LineTerminator      : [\r\n\u2028\u2029]              -> channel(HIDDEN);


// Special tokens

Assign            : '=';

// Literal tokens

NullLiteral       : 'null';
BooleanLiteral    : 'true' | 'false';

// Numbers

fragment DecimalIntegerLiteral: '0' | [1-9] [0-9_]*;

DecimalLiteral
  : DecimalIntegerLiteral '.' [0-9] [0-9_]*
  | '.' [0-9] [0-9_]*
  | DecimalIntegerLiteral
  ;

// HTTP Request Statements
HTTPGet      : 'GET';
HTTPPost     : 'POST';

// Request Building Statements
Url          : 'url';
Param        : 'param';

// Command Statements
Log          : 'log';
Input        : 'input';
Assert       : 'assert';

// Variables

Response     : 'response';

fragment NamedVariableCharacter: [a-zA-Z_0-9]+;

Identifier   : '$'NamedVariableCharacter*;

// String Literals

fragment DoubleStringCharacter: ~["\\\r\n];

fragment SingleStringCharacter: ~['\\\r\n];

StringLiteral
  : ('"' DoubleStringCharacter* '"' | '\'' SingleStringCharacter* '\'') {this.ProcessStringLiteral();}
  ;
