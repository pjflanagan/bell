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

identifier
  : Identifier
  ;

singleExpression
  : StringLiteral
  | Identifier
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
  : getStatement
  | postStatement
  ;

getStatement
  : HTTPGet eos
  ;

postStatement
  : HTTPPost eos
  ;

// Request Building Statements

requestBuildingStatement
  : urlStatement
  | paramStatement
  ;

urlStatement
  : Url StringLiteral eos
  ;

paramStatement
  : Param (StringLiteral | Identifier) singleExpression eos # NamedParamStatement
  | Param Identifier eos                                    # IdentifierParamStatement
  ;

// Command Statements

commandStatement
  : logStatement
  ;

logStatement
  : Log singleExpression eos;

