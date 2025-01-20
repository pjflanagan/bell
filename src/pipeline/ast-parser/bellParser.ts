import { TokenType } from "../tokenizer/types";
import { Parser } from "./Parser";

type TokenRule = {
  position?: 'parent' | 'sibling' | 'child';
  expectedNextTokens: {
    position: 'child',
    tokenTypes: TokenType[]
  }[];
}

const TokenRuleUrl: TokenRule = {
  position: 'sibling',
  expectedNextTokens: [
    {
      position: 'child',
      tokenTypes: ['string-literal']
    }
  ]
}

const TokenRuleParam: TokenRule = {
  position: 'sibling',
  expectedNextTokens: [
    {
      position: 'child',
      tokenTypes: ['identifier', 'string-literal', 'unquoted-string-literal']
    },
    {
      position: 'child',
      tokenTypes: ['identifier', 'number-literal', 'string-literal', 'unquoted-string-literal']
    }
  ]
}

const TokenRuleHttpMethod: TokenRule = {
  position: 'sibling',
  expectedNextTokens: []
}

export type TokenRuleMap = Record<TokenType, TokenRule>;

const bellTokenRuleMap: TokenRuleMap = {
  'url': TokenRuleUrl,
  'param': TokenRuleParam,
  GET: TokenRuleHttpMethod,
  POST: TokenRuleHttpMethod,
}


export const bellParser = new Parser(bellTokenRuleMap);
