import { read } from "../read/read";
import { bellTokenizer } from "./bellTokenizer";

describe('bellTokenizer.ts', () => {
  describe('tokenize', () => {
    let consoleLog: jest.SpyInstance;

    beforeEach(() => {
      consoleLog = jest.spyOn(console, "log").mockImplementation(() => { });
    });

    afterEach(() => {
      jest.resetAllMocks();
    })

    describe('#comments', () => {
      it.each([
        // TODO: the second part of this is an array of expected token types
        ['0-comments-0-singleLine', []],
        ['0-comments-1-multiLine', []],
        // ['0-comments-2-multiLineTrailing', 'valid'],
      ])('should read file %s and create tokens', async (fileName, expectedTokens) => {
        const sourceCode = await read(`src/testBellFiles/${fileName}.bel`);
        const tokens = [...bellTokenizer.tokenize(sourceCode)];
        console.log(tokens);
      });
    })

    // describe('#variables', () => {

    //   type VariablesTest = [string, boolean, any?];

    //   it.each<VariablesTest>([
    //     ['1-variables-0-camelCaseNumber', false, 10, ],
    //     ['1-variables-1-snakeCaseString', false, 'valid'],
    //     ['1-variables-2-withNumbers', false, 'valid'],
    //     // ['1-variables-3-noEndToString', true],
    //     // ['1-variables-4-leadingNumberInVarName', true],
    //     // ['1-variables-5-variableNotFound', true],
    //     ['1-variables-6-variableSetToVariable', false, 999],
    //     ['1-variables-7-variableReset', false, 'reset'],
    //     ['1-variables-8-stringInterpolation', false, 'string has 10 inside'],
    //   ])('should read file %s and log %s', async (fileName, expectError, expectedLog) => {
    //     try {
    //       await readBellFile(`src/testBellFiles/${fileName}.bel`);
    //     } catch {
    //       if (expectError) {
    //         // expect(consoleError).toHaveBeenCalled();
    //         expect(true).toBe(true);
    //       } else {
    //         expect(true).toBe(false);
    //       }
    //     }
    //     if (!expectError) {
    //       expect(consoleLog).toHaveBeenCalledWith(expectedLog);
    //     }
    //   });
    // });
    // describe('#requestProperties', () => { });
    // describe('#methods', () => { })
    // describe('#commands', () => { });
  })
});