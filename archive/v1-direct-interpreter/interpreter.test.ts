
// legacy-todo: this is probably going to be a long file

import { readBellFile } from "./interpreter";
import { initState } from "./state";

// so idk, but 
describe('interpreter.ts', () => {
  describe('readBellFile', () => {
    let consoleLog: jest.SpyInstance;
    // let consoleError: jest.SpyInstance;

    beforeEach(() => {
      consoleLog = jest.spyOn(console, "log").mockImplementation(() => { });
      // consoleError = jest.spyOn(console, "error").mockImplementation(() => { });
      initState();
    });

    afterEach(() => {
      jest.resetAllMocks();
    })

    describe('#comments', () => {
      it.each([
        ['0-comments-0-singleLine', 'valid'],
        ['0-comments-1-multiLine', 'valid'],
        ['0-comments-2-multiLineTrailing', 'valid'],
      ])('should read file %s and log %s', async (fileName, expectedLog) => {
        await readBellFile(`src/testBellFiles/${fileName}.bel`);
        expect(consoleLog).toHaveBeenCalledWith(expectedLog);
      });
    })

    describe('#variables', () => {

      type VariablesTest = [string, boolean, any?];

      it.each<VariablesTest>([
        ['1-variables-0-camelCaseNumber', false, 10, ],
        ['1-variables-1-snakeCaseString', false, 'valid'],
        ['1-variables-2-withNumbers', false, 'valid'],
        // ['1-variables-3-noEndToString', true],
        // ['1-variables-4-leadingNumberInVarName', true],
        // ['1-variables-5-variableNotFound', true],
        ['1-variables-6-variableSetToVariable', false, 999],
        ['1-variables-7-variableReset', false, 'reset'],
        ['1-variables-8-stringInterpolation', false, 'string has 10 inside'],
      ])('should read file %s and log %s', async (fileName, expectError, expectedLog) => {
        try {
          await readBellFile(`src/testBellFiles/${fileName}.bel`);
        } catch {
          if (expectError) {
            // expect(consoleError).toHaveBeenCalled();
            expect(true).toBe(true);
          } else {
            expect(true).toBe(false);
          }
        }
        if (!expectError) {
          expect(consoleLog).toHaveBeenCalledWith(expectedLog);
        }
      });
    });
    describe('#requestProperties', () => { });
    describe('#methods', () => { })
    describe('#commands', () => { });
  })
});