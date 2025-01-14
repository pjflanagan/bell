
// type TokenPart =
//   | 'command'
//   | 'request'
//   | 'httpMethod'
//   | 'operator'
//   ;

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

  | 'identifier'
  | '='

  | '{'
  | '}'
  | '['
  | ']'
  | '('
  | ')'
  | '.'
  | ','
  | '*'
  | '==='
  | '!=='
  | '&&'
  | '!'
  | '||'
  | '+'
  | '-'
  | '>='
  | '>'
  | '<='
  | '<'
  | 'true'
  | 'false'

  | 'comment'
  | 'multi-line-comment'
  | 'line-break'
  | 'string-literal'
  | 'unquoted-string-literal'
  | 'number-literal'
  | 'end-of-file'
  | null
  ;

// Matcher

export type Matcher = {
  matcher: RegExp;
  type: TokenType;
  valueExtractor?: (match: string) => string | number;
}

// Token

export type Token = {
  index: number;
  type: TokenType;
  value?: string | number;
}
