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

literal
  : NUMBER
  | STRING
  ;


singleExpression
  : literal
  | identifier
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
  : 'url' STRING eos
  ;

paramStatement
  : 'param' ID NUMBER eos
  ;

// Command Statements

commandStatement
  : logStatement
  ;

logStatement
  : 'log' ID eos;
