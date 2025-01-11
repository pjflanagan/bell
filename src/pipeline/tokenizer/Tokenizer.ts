import { Matcher, Token } from "./types";

// https://dev.to/ndesmic/writing-a-tokenizer-1j85

export function tokenize(sourceCode: string): Token[] {
  return [];
}

export const END = Symbol("END");

export class Tokenizer {
  tokenTypes: Matcher[];

  constructor(tokenTypes: Matcher[]) {
    this.tokenTypes = tokenTypes;
  }

  *tokenize(text: string): Generator<Token | { type: typeof END }> {
    let index = 0;
    while (index < text.length) {
      let hasMatch = false;

      for (const { matcher, type, valueExtractor } of this.tokenTypes) {
        const currentMatcher = new RegExp(matcher.source, "y");
        currentMatcher.lastIndex = index;
        const matched = currentMatcher.exec(text);
        if (matched !== null) {
          index += matched[0].length;
          if (type != null) {
            const token: Token = { type, index };
            if (valueExtractor) {
              token.value = valueExtractor(matched[0]);
            }
            yield token;
          }
          hasMatch = true;
        }
      }
      if (!hasMatch) {
        throw new Error(`Unexpected token at index ${index}`);
      }
    }
    yield { type: END };
  }
}
