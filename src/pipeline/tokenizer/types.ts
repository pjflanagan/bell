
type TokenPart =
  | 'command'
  | 'requestPart'
  | 'httpMethod'
  | 'comparator'
  | 'operation'
  | 'value'
  | 'brackets'
  | 'whitespace'
  | 'deliminator'
  | 'equal'
  | 'comment'
  ;

export type TokenType = 
  // Commands
  | 'import'
  | 'export'
  | 'write'
  | 'log'
  | 'request'
  | 'require'
  | 'wait'
  | 'expect'

  // Request
  | 'url'
  | 'scheme'
  | 'domain'
  | 'port'
  | 'path'
  | 'param'
  | 'params'
  | 'fragment'
  | 'headers'
  | 'body'

  // HTTP Methods
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'PATCH'
  | 'HEAD'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE'

  // equal
  | '='
  // | ':'

  // deliminator
  // | ','

  // | '{'
  // | '}'
  | '['
  | ']'
  // | '('
  // | ')'

  // operators
  // | '*'
  // | '/'
  // | '+'
  // | '-'
  // | '||'
  // | '&&'
  // | '!'
  
  // comparators
  // | '==='
  // | '!=='
  // | '>='
  // | '>'
  // | '<='
  // | '<'

  // value
  | 'identifier'
  | '.'
  // | 'true'
  // | 'false'
  | 'string-literal'
  | 'unquoted-string-literal'
  | 'number-literal'
  
  // comment
  | 'comment'
  | 'multi-line-comment'

  // whitespace
  | 'line-break'
  | 'end-of-file'
  ;

export type TokenTypePartMap = Record<TokenType, TokenPart>;
  
// Matcher
  
export type NulledWhitespaceToken = TokenType | null;

export type Matcher = {
  matcher: RegExp;
  type: NulledWhitespaceToken;
  valueExtractor?: (match: string) => string | number;
}

// Token

export type Token = {
  index: number;
  type: TokenType;
  part: TokenPart;
  value?: string | number;
}
