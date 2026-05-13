parser grammar BellParser;

options {
    tokenVocab = BellLexer;
}

program
  : (sourceElements | LineTerminator)* EOF
  ;

sourceElements
  : (sourceElement | LineTerminator)+
  ;

sourceElement
  : statement eos
  ;

statement
  : variableDeclaration
  | requestBuildingStatement
  | requestStatement
  | commandStatement
  | importStatement
  | validateStatement
  | warnStatement
  | exportStatement
  | timeoutStatement
  | waitStatement
  ;

eos
    : (LineTerminator | EOF)
    ;

identifier
  : Identifier
  | Body
  | Url
  | Path
  | Param
  | Header
  | Headers
  | Log
  | Assert
  | Expect
  | Env
  | Input
  | Warn
  | Response
  | Require
  | Request
  | Import
  | From
  | Validate
  | As
  | Export
  | Timeout
  | Wait
  ;

memberIdentifier
  : Identifier
  | Body
  | Url
  | Path
  | Param
  | Header
  | Headers
  | Log
  | Assert
  | Expect
  | Env
  | Input
  | Warn
  | Response
  | Require
  | Request
  | Import
  | From
  | Validate
  | As
  | Export
  | Timeout
  | Wait
  ;

expression
  : expression Dot memberIdentifier     # MemberIndexExpression
  | expression Dot LBracket expression RBracket # ArrayAccessExpression
  | expression (Multiply | Divide) expression # MultiplicativeExpression
  | expression Plus expression          # AdditiveExpression
  | expression (Eq | StrictEq | NotEq | StrictNotEq | Lt | Gt | Le | Ge) expression # BinaryExpression
  | identifier                      # IdentifierExpression
  | StringLiteral                   # StringLiteralExpression
  | DecimalLiteral                  # DecimalLiteralExpression
  | BooleanLiteral                  # BooleanLiteralExpression
  | NullLiteral                     # NullLiteralExpression
  | Response                        # ResponseExpression
  | inputCall                       # InputCallExpression
  | warnCall                        # WarnCallExpression
  | objectLiteral                   # ObjectLiteralExpression
  | arrayLiteral                    # ArrayLiteralExpression
  ;

inputCall
  : Input LParen expression? RParen
  ;

warnCall
  : Warn expression
  ;

objectLiteral
  : LBrace LineTerminator* (propertyAssignment (LineTerminator* Comma LineTerminator* propertyAssignment)* LineTerminator* Comma? LineTerminator*)? RBrace
  ;

propertyAssignment
  : (identifier | StringLiteral) LineTerminator* Colon LineTerminator* expression
  ;

arrayLiteral
  : LBracket LineTerminator* (expression (LineTerminator* Comma LineTerminator* expression)* LineTerminator* Comma? LineTerminator*)? RBracket
  ;

// Assignment

variableDeclaration
    : identifier Assign expression
    ;

exportStatement
    : Export identifier (Comma identifier)*
    ;

// HTTP Request Statements

requestStatement
  : (HTTPGet | HTTPPost | HTTPDelete | HTTPPut | HTTPPatch | HTTPOptions | HTTPHead)
  ;

// Request Building Statements

requestBuildingStatement
  : urlStatement
  | pathStatement
  | paramStatement
  | headerStatement
  | headersStatement
  | bodyStatement
  | requireStatement
  | requestStatementBuilding
  | envStatement
  ;

urlStatement
  : Url LineTerminator* expression
  ;

pathStatement
  : Path LineTerminator* expression
  ;

paramStatement
  : Param LineTerminator* expression LineTerminator* expression   # ParamKeyValueStatement
  | Param LineTerminator* Identifier                              # ParamVariableStatement
  ;

headerStatement
  : Header LineTerminator* expression LineTerminator* expression
  ;

headersStatement
  : Headers LineTerminator* expression
  ;

bodyStatement
  : Body LineTerminator* expression
  ;

requireStatement
  : Require LineTerminator* expression
  ;

requestStatementBuilding
  : Request LineTerminator* StringLiteral
  ;

envStatement
  : Env (LineTerminator* expression (LineTerminator* Pipe LineTerminator* expression)*)?
  ;

// Command Statements

commandStatement
  : logStatement
  | assertStatement
  | expectStatement
  ;

logStatement
  : Log expression
  ;

assertStatement
  : Assert expression
  ;

expectStatement
  : Expect expression
  ;

importStatement
  : Import identifier From StringLiteral   # ImportFromStatement
  | Import LBrace (identifier (Comma identifier)*)? RBrace From StringLiteral # ImportNamedFromStatement
  | Import StringLiteral                    # ImportAnonymousStatement
  ;

validateStatement
  : Validate expression As identifier
  ;

warnStatement
  : Warn expression (As identifier)?
  ;

timeoutStatement
  : Timeout expression
  ;

waitStatement
  : Wait expression
  ;
