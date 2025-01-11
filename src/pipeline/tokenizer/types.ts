

export type TokenType = 
  // Commands
  | 'import'
  | 'export'
  | 'write'
  | 'log'
  | 'request'
  | 'require'
  | 'wait'

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

  // Test
  | 'expect'

  | 'var'
  | '='
  | 'identifier'

  | '{'
  | '}'
  | '['
  | ']'
  | '('
  | ')'
  | '.'
  | '*'
  | '==='
  | '='
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
  | 'line-break'
  | 'string-literal'
  | 'number-literal'
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
