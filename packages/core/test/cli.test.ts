import { expect } from 'chai';
import { spawnSync, SpawnSyncReturns } from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

// __dirname is dist/test/ at runtime
const CLI = path.join(__dirname, '..', 'src', 'cli.js');
const HELLO_BEL = path.resolve(__dirname, '../../test/fixtures/hello.bel');

function bell(args: string[], cwd: string): SpawnSyncReturns<string> {
  return spawnSync('node', [CLI, ...args], { encoding: 'utf8', cwd, timeout: 10000 });
}

describe('Bell CLI', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'bell-cli-'));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  describe('convert command', () => {
    it('exits 1 when input file does not exist', () => {
      const result = bell(['convert', '/no/such/file.json'], tmpDir);
      expect(result.status).to.equal(1);
      expect(result.stderr).to.include('not found');
    });
  });

  describe('run command', () => {
    it('exits 1 when file does not exist', () => {
      const result = bell(['run', '/no/such/file.bel'], tmpDir);
      expect(result.status).to.equal(1);
      expect(result.stderr).to.include('not found');
    });

    it('runs a Bell file with no HTTP and exits 0', () => {
      const result = bell(['run', HELLO_BEL], tmpDir);
      expect(result.status).to.equal(0);
    });
  });

  describe('format command', () => {
    it('exits 1 when file does not exist', () => {
      const result = bell(['format', '/no/such/file.bel'], tmpDir);
      expect(result.status).to.equal(1);
      expect(result.stderr).to.include('not found');
    });

    it('--stdout prints formatted output', () => {
      const filePath = path.join(tmpDir, 'test.bel');
      fs.writeFileSync(filePath, `url "http://example.com"\nparam 'foo' 1\nGET\n`);
      const result = bell(['format', filePath, '--stdout'], tmpDir);
      expect(result.status).to.equal(0);
      // Single quotes normalized to double quotes by formatter
      expect(result.stdout).to.include('"foo"');
    });

    it('--check exits 1 for unformatted file', () => {
      const filePath = path.join(tmpDir, 'dirty.bel');
      fs.writeFileSync(filePath, `url "http://example.com"\nparam 'foo' 1\nGET\n`);
      const result = bell(['format', filePath, '--check'], tmpDir);
      expect(result.status).to.equal(1);
    });

    it('--check exits 0 for already-formatted file', () => {
      const filePath = path.join(tmpDir, 'clean.bel');
      fs.writeFileSync(filePath, `url "http://example.com"\nparam 'foo' 1\nGET\n`);
      // Format in-place first, then --check should pass
      bell(['format', filePath], tmpDir);
      const result = bell(['format', filePath, '--check'], tmpDir);
      expect(result.status).to.equal(0);
    });

    it('formats file in-place', () => {
      const filePath = path.join(tmpDir, 'inplace.bel');
      fs.writeFileSync(filePath, `url "http://example.com"\nparam 'foo' 1\nGET\n`);
      const result = bell(['format', filePath], tmpDir);
      expect(result.status).to.equal(0);
      const content = fs.readFileSync(filePath, 'utf8');
      expect(content).to.include('"foo"');
      expect(content).not.to.include("'foo'");
    });
  });

  describe('skill command', () => {
    it('prints skill content to stdout', () => {
      const result = bell(['skill'], tmpDir);
      expect(result.status).to.equal(0);
      expect(result.stdout.length).to.be.greaterThan(100);
    });

    it('--install writes bell.md to .claude/commands/', () => {
      const result = bell(['skill', '--install'], tmpDir);
      expect(result.status).to.equal(0);
      const dest = path.join(tmpDir, '.claude', 'commands', 'bell.md');
      expect(fs.existsSync(dest)).to.be.true;
      expect(fs.readFileSync(dest, 'utf8').length).to.be.greaterThan(0);
    });
  });

  describe('init command', () => {
    it('creates bell/example.GET.bel', () => {
      const result = bell(['init'], tmpDir);
      expect(result.status).to.equal(0);
      const file = path.join(tmpDir, 'bell', 'example.GET.bel');
      expect(fs.existsSync(file)).to.be.true;
      expect(fs.readFileSync(file, 'utf8')).to.include('GET');
    });

    it('exits 1 when bell/ directory already exists', () => {
      fs.mkdirSync(path.join(tmpDir, 'bell'));
      const result = bell(['init'], tmpDir);
      expect(result.status).to.equal(1);
      expect(result.stderr).to.include('already exists');
    });
  });
});
