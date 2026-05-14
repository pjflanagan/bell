import { expect } from 'chai';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { convertPostmanToBell } from '../src/converters/postman';

// __dirname is dist/test/ at runtime; fixtures live in the source test/ directory
function fixturePath(caseName: string): string {
  return path.join(__dirname, '..', '..', 'test', 'converter', caseName, 'input.json');
}

function expectedFile(caseName: string, ...parts: string[]): string {
  return fs.readFileSync(
    path.join(__dirname, '..', '..', 'test', 'converter', caseName, ...parts),
    'utf8'
  );
}

describe('Postman Converter', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'bell-converter-'));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('converts a simple GET request', () => {
    convertPostmanToBell(fixturePath('simple-get'), tmpDir);
    const output = fs.readFileSync(path.join(tmpDir, 'get_users.GET.bel'), 'utf8');
    expect(output).to.equal(expectedFile('simple-get', 'get_users.GET.bel'));
  });

  it('converts a POST request with JSON body and headers', () => {
    convertPostmanToBell(fixturePath('post-with-body'), tmpDir);
    const output = fs.readFileSync(path.join(tmpDir, 'create_user.POST.bel'), 'utf8');
    expect(output).to.equal(expectedFile('post-with-body', 'create_user.POST.bel'));
  });

  it('converts Postman {{variables}} to Bell {variables}', () => {
    convertPostmanToBell(fixturePath('variables'), tmpDir);
    const output = fs.readFileSync(path.join(tmpDir, 'search.GET.bel'), 'utf8');
    expect(output).to.equal(expectedFile('variables', 'search.GET.bel'));
  });

  it('omits disabled headers', () => {
    convertPostmanToBell(fixturePath('disabled-headers'), tmpDir);
    const output = fs.readFileSync(path.join(tmpDir, 'get_profile.GET.bel'), 'utf8');
    expect(output).to.equal(expectedFile('disabled-headers', 'get_profile.GET.bel'));
  });

  it('creates subdirectories for collection folders', () => {
    convertPostmanToBell(fixturePath('folders'), tmpDir);
    const userOutput = fs.readFileSync(path.join(tmpDir, 'users', 'get_user.GET.bel'), 'utf8');
    const authOutput = fs.readFileSync(path.join(tmpDir, 'auth', 'login.POST.bel'), 'utf8');
    expect(userOutput).to.equal(expectedFile('folders', 'users', 'get_user.GET.bel'));
    expect(authOutput).to.equal(expectedFile('folders', 'auth', 'login.POST.bel'));
  });
});
