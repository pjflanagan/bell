
// TODO: this is probably going to be a long file

import { readBellFile } from "./interpreter";
import { initState } from "./state";

// so idk, but 
describe('interpreter.ts', () => {
  describe('readBellFile', () => {
    let consoleLog: jest.SpyInstance;

    beforeEach(() => {
      consoleLog = jest.spyOn(console, "log").mockImplementation(() => {});
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
      it.each([
        ['1-variables-0-camelCaseNumber', 10],
        ['1-variables-1-snakeCaseString', 'valid'],
        ['1-variables-2-withNumbers', 'valid'],
        // ['1-variables-3-noEndToString', false],
        // ['1-variables-4-leadingNumberInVarName', false],
        // ['1-variables-5-variableNotFound', false],
        ['1-variables-6-variableSetToVariable', 999],
        ['1-variables-7-variableReset', "reset"],
      ])('should read file %s and log %s', async (fileName, expectedLog) => {
        await readBellFile(`src/testBellFiles/${fileName}.bel`);
        if (expectedLog) {
          expect(consoleLog).toHaveBeenCalledWith(expectedLog);
        } else {
          expect(consoleLog).not.toHaveBeenCalled();
        }
      });
    });
    describe('#requestProperties', () => { });
    describe('#methods', () => { })
    describe('#commands', () => { });
  })
});