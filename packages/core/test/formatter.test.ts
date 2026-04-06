import { expect } from 'chai';
import * as fs from 'fs';
import * as path from 'path';
import { formatBellSource } from '../src/formatter/BellFormatter';

// __dirname is dist/test/ at runtime; fixtures live in the source test/ directory
function fixture(name: string, file: string): string {
  return fs.readFileSync(
    path.join(__dirname, '..', '..', 'test', 'formatter', name, file),
    'utf8'
  );
}

describe('Bell Formatter', () => {
  describe('param table alignment', () => {
    it('pads consecutive param keys to the same width', () => {
      const result = formatBellSource(fixture('params', 'input.bel'));
      expect(result).to.equal(fixture('params', 'expected.bel'));
    });

    it('breaks alignment groups at non-param lines', () => {
      const source = [
        'url "https://api.example.com"',
        'param "a" 1',
        'log response',
        'param "longkey" 2',
        'GET',
      ].join('\n') + '\n';
      const result = formatBellSource(source);
      // Two separate single-key groups — padEnd is a no-op but 2-space separator still applies
      expect(result).to.include('param "a"  1');
      expect(result).to.include('param "longkey"  2');
    });
  });

  describe('header table alignment', () => {
    it('aligns consecutive header keys to the same width', () => {
      const result = formatBellSource(fixture('headers', 'input.bel'));
      expect(result).to.equal(fixture('headers', 'expected.bel'));
    });

    it('keeps a single header with no extra padding', () => {
      const source = 'url "https://api.example.com"\nheader "X-Api-Key" "abc"\nGET\n';
      const result = formatBellSource(source);
      expect(result).to.include('header "X-Api-Key"  "abc"');
    });

    it('breaks alignment groups at comments', () => {
      const source = [
        'url "https://api.example.com"',
        'header "Authorization" "Bearer x"',
        '# separate',
        'header "X-Long-Key" "val"',
        'GET',
      ].join('\n') + '\n';
      const result = formatBellSource(source);
      expect(result).to.include('header "Authorization"  "Bearer x"');
      expect(result).to.include('# separate\nheader "X-Long-Key"  "val"');
    });
  });

  describe('blank line rules', () => {
    it('inserts a blank line after the HTTP method', () => {
      const result = formatBellSource(fixture('spacing', 'input.bel'));
      expect(result).to.equal(fixture('spacing', 'expected.bel'));
    });

    it('inserts a blank line before a new url', () => {
      const source = 'url "http://a.com"\nGET\nurl "http://b.com"\nGET\n';
      const result = formatBellSource(source);
      expect(result).to.equal(
        'url "http://a.com"\nGET\n\nurl "http://b.com"\nGET\n'
      );
    });

    it('does not insert a blank line before the first url', () => {
      const source = 'url "http://a.com"\nGET\n';
      const result = formatBellSource(source);
      expect(result).not.to.match(/^\n/);
    });
  });

  describe('body expansion', () => {
    it('expands an inline object body to multi-line', () => {
      const source = 'url "http://api.com"\nbody { "key": "val" }\nPOST\n';
      const result = formatBellSource(source);
      expect(result).to.include('body {\n  "key": "val"\n}');
    });
  });

  describe('string normalization', () => {
    it('converts single-quoted strings to double quotes', () => {
      const result = formatBellSource(fixture('strings', 'input.bel'));
      expect(result).to.equal(fixture('strings', 'expected.bel'));
    });

    it('uses backticks for strings with interpolation', () => {
      const source = 'url "http://api.com/{id}"\nGET\n';
      const result = formatBellSource(source);
      expect(result).to.include('url `http://api.com/{id}`');
    });
  });

  describe('import hoisting', () => {
    it('moves imports to the top before other statements', () => {
      const source = [
        'token = "abc"',
        'import body from "./req.json"',
        'url "https://api.com"',
        'GET',
      ].join('\n') + '\n';
      const result = formatBellSource(source);
      const lines = result.split('\n');
      const importLine = lines.findIndex(l => l.startsWith('import'));
      const tokenLine = lines.findIndex(l => l.startsWith('token'));
      expect(importLine).to.be.lessThan(tokenLine);
    });
  });

  describe('export lowering', () => {
    it('moves exports to the bottom after other statements', () => {
      const source = [
        'export token',
        'token = response.body.token',
        'url "http://api.com/login"',
        'POST',
      ].join('\n') + '\n';
      const result = formatBellSource(source);
      const lines = result.split('\n').filter(l => l.trim());
      expect(lines[lines.length - 1]).to.equal('export token');
    });
  });

  describe('comment preservation', () => {
    it('preserves leading comments, moves inline trailing comments to line above', () => {
      const result = formatBellSource(fixture('comments', 'input.bel'));
      expect(result).to.equal(fixture('comments', 'expected.bel'));
    });

    it('preserves orphan comments after last statement', () => {
      const result = formatBellSource(fixture('comments-orphan', 'input.bel'));
      expect(result).to.equal(fixture('comments-orphan', 'expected.bel'));
    });

    it('breaks param alignment groups at comments', () => {
      const source = [
        'url "https://api.example.com"',
        'param "q" "sushi"',
        '# page',
        'param "page" 1',
        'GET',
      ].join('\n') + '\n';
      const result = formatBellSource(source);
      // Both groups have only one param, so alignment is trivial but comments must be present
      expect(result).to.include('# page\nparam "page"  1');
    });
  });
});
