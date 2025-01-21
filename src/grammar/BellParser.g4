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


singleExpression
  : StringLiteral
  | Identifier
  | DecimalLiteral
  ;

// HTTP Request Statements

requestStatement
  : getStatement
  | postStatement
  ;

getStatement
  : 'GET' eos
  ;

postStatement
  : 'POST' eos
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
  : 'log' singleExpression eos;

