lexer grammar BellLexer;

// Comments

MultiLineComment  : '###' .*? '###'             -> channel(HIDDEN);
SingleLineComment : '#' ~[\r\n\u2028\u2029]* -> channel(HIDDEN);

// Special tokens

Assign            : '=';

// Literal tokens

NullLiteral: 'null';
BooleanLiteral: 'true' | 'false';
DecimalLiteral:
    DecimalIntegerLiteral '.' [0-9] [0-9_]* ExponentPart?
    | '.' [0-9] [0-9_]* ExponentPart?
    | DecimalIntegerLiteral ExponentPart?
;

// HTTP Request Statements
HTTPGet      : 'GET';
HTTPPost     : 'POST';

// Request Building Statements
Url          : 'url';
Param        : 'param';

// Command Statements
Log          : 'log';

Identifier: IdentifierStart IdentifierPart*;
/// String Literals
StringLiteral:
    ('"' DoubleStringCharacter* '"' | '\'' SingleStringCharacter* '\'') {this.ProcessStringLiteral();}
;

fragment EscapeSequence:
    CharacterEscapeSequence
    | '0' // no digit ahead! TODO
    | UnicodeEscapeSequence
;

fragment ExponentPart: [eE] [+-]? [0-9_]+;

fragment LineContinuation: '\\' [\r\n\u2028\u2029]+;

fragment HexDigit: [_0-9a-fA-F];

fragment NonEscapeCharacter: ~['"\\bfnrtv0-9xu\r\n];

fragment SingleEscapeCharacter: ['"\\bfnrtv];

fragment UnicodeEscapeSequence:
    'u' HexDigit HexDigit HexDigit HexDigit
    | 'u' '{' HexDigit HexDigit+ '}'
;

fragment CharacterEscapeSequence: SingleEscapeCharacter | NonEscapeCharacter;

fragment DoubleStringCharacter: ~["\\\r\n] | '\\' EscapeSequence | LineContinuation;

fragment SingleStringCharacter: ~['\\\r\n] | '\\' EscapeSequence | LineContinuation;

fragment DecimalIntegerLiteral: '0' | [1-9] [0-9_]*;

fragment IdentifierPart: IdentifierStart | [\p{Mn}] | [\p{Nd}] | [\p{Pc}] | '\u200C' | '\u200D';

fragment IdentifierStart: [\p{L}] | [$_] | '\\' UnicodeEscapeSequence;
