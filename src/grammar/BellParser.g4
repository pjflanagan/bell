parser grammar BellParser;

options {
    tokenVocab = BellLexer;
}

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
  : requestBuildingStatement
  | requestStatement
  | commandStatement
  ;

eos
    : EOF
    | {this.lineTerminatorAhead()}?
    ;

namedVariable
  : Identifier
  ;

identifier
  : namedVariable
  ;

singleExpression
  : identifier
  | StringLiteral 
  | DecimalLiteral
  ;

// Assignment

assignable
  : identifier
  ;

variableDeclaration
    : assignable Assign singleExpression
    ;

// HTTP Request Statements

requestStatement
  : (HTTPGet | HTTPPost) eos
  ;

// Request Building Statements

requestBuildingStatement
  : urlStatement
  | paramStatement
  ;

urlStatement
  : Url (StringLiteral | identifier) eos
  ;

paramStatement
  : Param (StringLiteral | identifier) singleExpression eos  # NamedParamStatement
  | Param namedVariable eos                                  # IdentifierParamStatement
  ;

// Command Statements

commandStatement
  : logStatement
  ;

logStatement
  : Log singleExpression eos;

