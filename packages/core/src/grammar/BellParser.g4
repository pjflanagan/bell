parser grammar BellParser;

options {
    tokenVocab = BellLexer;
}

program
  : (sourceElements | LineTerminator | EOF)*
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
  ;

eos
    : (LineTerminator | EOF)
    ;

identifier
  : Identifier
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
  ;

expression
  : expression Dot memberIdentifier     # MemberIndexExpression
  | expression Dot LBracket expression RBracket # ArrayAccessExpression
  | expression Plus expression          # AdditiveExpression
  | expression (Eq | StrictEq | NotEq | StrictNotEq | Lt | Gt | Le | Ge) expression # BinaryExpression
  | identifier                      # IdentifierExpression
  | StringLiteral                   # StringLiteralExpression
  | DecimalLiteral                  # DecimalLiteralExpression
  | BooleanLiteral                  # BooleanLiteralExpression
  | NullLiteral                     # NullLiteralExpression
  | Response                        # ResponseExpression
  | RelativeUrl                     # RelativeUrlExpression
  | inputCall                       # InputCallExpression
  | objectLiteral                   # ObjectLiteralExpression
  | arrayLiteral                    # ArrayLiteralExpression
  ;

inputCall
  : Input LParen expression? RParen
  ;

objectLiteral
  : LBrace (propertyAssignment (Comma propertyAssignment)* Comma?)? RBrace
  ;

propertyAssignment
  : (identifier | StringLiteral) Colon expression
  ;

arrayLiteral
  : LBracket (expression (Comma expression)* Comma?)? RBracket
  ;

// Assignment

variableDeclaration
    : identifier Assign expression
    ;

// HTTP Request Statements

requestStatement
  : (HTTPGet | HTTPPost | HTTPDelete | HTTPPut | HTTPPatch)
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
  : Url expression
  ;

pathStatement
  : Path expression
  ;

paramStatement
  : Param expression (Assign? expression)?
  ;

headerStatement
  : Header expression expression
  ;

headersStatement
  : Headers expression
  ;

bodyStatement
  : Body expression
  ;

requireStatement
  : Require expression
  ;

requestStatementBuilding
  : Request expression
  ;

envStatement
  : Env (expression (Pipe expression)*)?
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
