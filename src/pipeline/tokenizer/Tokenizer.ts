import { Matcher, Token } from "./types";

// https://dev.to/ndesmic/writing-a-tokenizer-1j85

export class Tokenizer {
  private tokenTypes: Matcher[];

  constructor(tokenTypes: Matcher[]) {
    this.tokenTypes = tokenTypes;
  }

  public *tokenize(sourceCode: string): Generator<Token> {
    let index = 0;
    let line = 0;
    let col = 0;

    while (index < sourceCode.length) {
      let hasMatch = false;

      for (const { matcher, type, valueExtractor } of this.tokenTypes) {
        const currentMatcher = new RegExp(matcher.source, "y");
        currentMatcher.lastIndex = index;
        const matchedSourceCode = currentMatcher.exec(sourceCode);

        if (matchedSourceCode !== null) {
          index += matchedSourceCode[0].length;
          col += matchedSourceCode[0].length;

          if (type !== null) {
            const token: Token = { type, index };
            if (valueExtractor) {
              token.value = valueExtractor(matchedSourceCode[0]);
            }

            if (type === "line-break") {
              line += 1;
              col = 0;
            }

            yield token;
          }

          hasMatch = true;
        }
      }

      if (!hasMatch) {
        throw new Error(`Unexpected token at line ${line} col ${col}`);
      }
    }

    yield {
      type: "end-of-file",
      index,
    };
  }
}
