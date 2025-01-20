import { read } from "../read/read";
import { bellTokenizer } from "../tokenizer/bellTokenizer";
import { bellParser } from "./bellParser";
import { log } from 'console';

describe('bellParser.ts', () => {
  describe('parse', () => {
    let consoleLog: jest.SpyInstance;

    beforeEach(() => {
      consoleLog = jest.spyOn(console, "log").mockImplementation((output) => log(output));
    });

    afterEach(() => {
      jest.resetAllMocks();
    })

    type ParseTestCase = [string];

    it.each<ParseTestCase>([
      ['3 + 7 * 2'],
      // ['2 * 7 + 3'],
      // ['2 * (7 + 3)'],
    ])('should parse %s', async (sourceCode: string) => {
      const tokens = [...bellTokenizer.tokenize(sourceCode)];
      const ast = bellParser.parse(tokens);
      console.log(ast.print());
    });
  })
});