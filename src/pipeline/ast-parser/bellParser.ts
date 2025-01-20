import { TokenType } from "../tokenizer/types";
import { Parser } from "./Parser";

type TokenRule = 'child' | 'sibling' | 'parent' | 'return';

type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

export type TokenRuleMap = PartialRecord<TokenType, TokenRule>;

const bellTokenRuleMap: TokenRuleMap = {
  '!': 'child',
  '+': 'parent',
  '-': 'parent',
  '*': 'parent',
  '/': 'parent',
  '(': 'child',
  ')': 'return',
  'number-literal': 'child',
  // 'GET': 'sibling`',
  'end-of-file': 'return'
}


export const bellParser = new Parser(bellTokenRuleMap);
