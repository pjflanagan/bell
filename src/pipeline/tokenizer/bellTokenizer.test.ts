import { read } from "../read/read";
import { bellTokenizer } from "./bellTokenizer";
import { Token, TokenType } from "./types";
import { log } from 'console';

describe('bellTokenizer.ts', () => {
  describe('tokenize', () => {
    let consoleLog: jest.SpyInstance;

    beforeEach(() => {
      consoleLog = jest.spyOn(console, "log").mockImplementation(() => { });
    });

    afterEach(() => {
      jest.resetAllMocks();
    })

    // the validate tokens function validates that the expected types
    // show up in order and are all present
    // it does NOT verify that the expected tokens array is equal to the result tokens array
    function validateTokens(fileName: string, tokens: Token[], expectedTypes: string[]) {
      let lastSeenIndex = -1;
      tokens.forEach((token: Token) => {
        if (token.type === expectedTypes[lastSeenIndex + 1]) {
          lastSeenIndex += 1;
        }
      });
      if (lastSeenIndex !== expectedTypes.length - 1) {
        log(fileName);
        log(tokens);
      }
      expect(lastSeenIndex).toBe(expectedTypes.length - 1);
    }

    type TokenizeTestCase = [string, TokenType[]];

    it.each<TokenizeTestCase>([
      ['0-comments-0-singleLine', ['comment', 'line-break']],
      ['0-comments-1-multiLine', ['multi-line-comment', 'line-break', 'multi-line-comment']],
      // ['0-comments-2-multiLineTrailing', []],
      ['1-variables-0-camelCaseNumber', ['comment', 'identifier', '=', 'number-literal']],
      ['1-variables-1-snakeCaseString', ['comment', 'identifier', '=', 'string-literal']],
      ['1-variables-2-withNumbers', ['comment', 'identifier', '=', 'string-literal']],
      // // ['1-variables-3-noEndToString', true],
      // // ['1-variables-4-leadingNumberInVarName', true],
      ['1-variables-5-variableNotFound', ['log', 'identifier']],
      ['1-variables-6-variableSetToVariable', ['comment', 'identifier', '=', 'number-literal', 'line-break', 'identifier', '=', 'identifier']],
      ['1-variables-7-variableReset', ['identifier', '=', 'number-literal', 'line-break', 'identifier', '=', 'string-literal']],
      // // ['1-variables-8-stringInterpolation', []],
      ['2-request-0-url', ['url', 'unquoted-string-literal', 'GET']],
      ['2-request-1-param', ['url', 'unquoted-string-literal', 'param', 'unquoted-string-literal', 'unquoted-string-literal', 'GET']],
      ['2-request-2-paramNumbersAndBooleans', ['url', 'unquoted-string-literal', 'param', 'unquoted-string-literal', 'number-literal', 'param', 'unquoted-string-literal', 'true', 'GET']],
    ])('should read file %s and create tokens', async (fileName: string, expectedTokenTypes: string[]) => {
      const sourceCode = await read(`src/testBellFiles/${fileName}.bel`);
      const tokens = [...bellTokenizer.tokenize(sourceCode)];
      validateTokens(fileName, tokens, expectedTokenTypes);
    });
  })
});