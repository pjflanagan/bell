#!/usr/bin/env node
'use strict';

const { execSync, spawnSync } = require('child_process');
const readline = require('readline');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');
const CORE_DIR = path.join(ROOT, 'packages', 'core');
const VSCODE_DIR = path.join(ROOT, 'packages', 'vscode');

// ─── ANSI helpers ────────────────────────────────────────────────────────────

const c = {
  bold:  s => `\x1b[1m${s}\x1b[0m`,
  dim:   s => `\x1b[2m${s}\x1b[0m`,
  green: s => `\x1b[32m${s}\x1b[0m`,
  blue:  s => `\x1b[34m${s}\x1b[0m`,
  yellow:s => `\x1b[33m${s}\x1b[0m`,
  red:   s => `\x1b[31m${s}\x1b[0m`,
  cyan:  s => `\x1b[36m${s}\x1b[0m`,
};

const log   = (...a) => console.log(...a);
const ok    = msg  => log(c.green('  ✔ ') + msg);
const info  = msg  => log(c.blue('  → ') + msg);
const warn  = msg  => log(c.yellow('  ⚠ ') + msg);
const fail  = msg  => { log(c.red('  ✖ ') + msg); process.exit(1); };
const step  = msg  => log('\n' + c.bold(c.cyan('●')) + ' ' + c.bold(msg));

// ─── Prompt helpers ───────────────────────────────────────────────────────────

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function ask(question) {
  return new Promise(resolve => rl.question('  ' + question + ' ', ans => resolve(ans.trim())));
}

async function choose(prompt, options, defaultVal) {
  const hint = options.map(o => o === defaultVal ? c.bold(o) : o).join('/');
  while (true) {
    const ans = await ask(`${prompt} [${hint}]:`);
    const val = ans || defaultVal;
    if (options.includes(val)) return val;
    warn(`Please enter one of: ${options.join(', ')}`);
  }
}

async function confirm(question) {
  const ans = await choose(question, ['y', 'n'], 'y');
  return ans === 'y';
}

// ─── Shell helpers ────────────────────────────────────────────────────────────

function run(cmd, cwd = ROOT) {
  const result = spawnSync(cmd, { shell: true, cwd, stdio: 'inherit' });
  if (result.status !== 0) fail(`Command failed: ${cmd}`);
}

function capture(cmd, cwd = ROOT) {
  try {
    return execSync(cmd, { cwd, encoding: 'utf8' }).trim();
  } catch {
    return '';
  }
}

function pkgVersion(dir) {
  return JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8')).version;
}

function bumpVersion(version, type) {
  const [major, minor, patch] = version.split('.').map(Number);
  if (type === 'major') return `${major + 1}.0.0`;
  if (type === 'minor') return `${major}.${minor + 1}.0`;
  return `${major}.${minor}.${patch + 1}`;
}

function setVersion(dir, version) {
  const pkgPath = path.join(dir, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  pkg.version = version;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  log('\n' + c.bold('Bell Release Script'));
  log(c.dim('─────────────────────────────────────'));

  // ── 1. Find last tag and what changed ─────────────────────────────────────

  step('Checking git state');

  const dirty = capture('git status --porcelain');
  if (dirty) {
    warn('Working tree has uncommitted changes:');
    log(dirty.split('\n').map(l => '    ' + c.dim(l)).join('\n'));
    if (!await confirm('Continue anyway?')) process.exit(0);
  }

  const lastTag = capture('git tag --sort=-v:refname | head -1');
  if (lastTag) {
    info(`Last tag: ${c.bold(lastTag)}`);
  } else {
    info('No previous tags found — treating everything as changed.');
  }

  const sinceRef = lastTag || capture('git rev-list --max-parents=0 HEAD');
  const coreChanged  = !!capture(`git log ${sinceRef}..HEAD --oneline -- packages/core`);
  const vscodeChanged = !!capture(`git log ${sinceRef}..HEAD --oneline -- packages/vscode`);

  const coreVersion  = pkgVersion(CORE_DIR);
  const vscodeVersion = pkgVersion(VSCODE_DIR);

  info(`bell-lang    v${coreVersion}   ${coreChanged  ? c.yellow('has changes') : c.dim('no changes')}`);
  info(`bell-vscode  v${vscodeVersion}  ${vscodeChanged ? c.yellow('has changes') : c.dim('no changes')}`);

  if (!coreChanged && !vscodeChanged) {
    ok('Nothing to release. Both packages are unchanged since last tag.');
    rl.close();
    return;
  }

  // ── 2. Decide what to release ─────────────────────────────────────────────

  step('What to release');

  let releaseCore   = coreChanged;
  let releaseVscode = vscodeChanged;

  if (coreChanged) {
    releaseCore = await confirm(`Release bell-lang (core)?`);
  }
  if (vscodeChanged) {
    releaseVscode = await confirm(`Release bell-vscode (VS Code extension)?`);
  }

  if (!releaseCore && !releaseVscode) {
    info('Nothing selected. Exiting.');
    rl.close();
    return;
  }

  // ── 3. Choose bump types ───────────────────────────────────────────────────

  let newCoreVersion, newVscodeVersion;

  if (releaseCore) {
    step(`bell-lang version bump  ${c.dim(`(current: ${coreVersion})`)}`);
    const bumpType = await choose('Bump type?', ['patch', 'minor', 'major'], 'patch');
    newCoreVersion = bumpVersion(coreVersion, bumpType);
    info(`${coreVersion}  →  ${c.bold(newCoreVersion)}`);
  }

  if (releaseVscode) {
    step(`bell-vscode version bump  ${c.dim(`(current: ${vscodeVersion})`)}`);
    const bumpType = await choose('Bump type?', ['patch', 'minor', 'major'], 'patch');
    newVscodeVersion = bumpVersion(vscodeVersion, bumpType);
    info(`${vscodeVersion}  →  ${c.bold(newVscodeVersion)}`);
  }

  log('');
  if (!await confirm('Proceed with release?')) {
    info('Aborted.');
    rl.close();
    return;
  }

  // ── 4. Release core ────────────────────────────────────────────────────────

  if (releaseCore) {
    step(`Releasing bell-lang v${newCoreVersion}`);

    info('Building…');
    run('npm run build', CORE_DIR);
    ok('Build passed');

    info('Running tests…');
    run('npm test', CORE_DIR);
    ok('Tests passed');

    setVersion(CORE_DIR, newCoreVersion);
    ok(`Version set to ${newCoreVersion}`);

    info('Publishing to npm…');
    run('npm publish --access public', CORE_DIR);
    ok(`bell-lang@${newCoreVersion} published`);
  }

  // ── 5. Release vscode extension ────────────────────────────────────────────

  if (releaseVscode) {
    step(`Releasing bell-vscode v${newVscodeVersion}`);

    info('Compiling…');
    run('npm run compile', VSCODE_DIR);
    ok('Compile passed');

    setVersion(VSCODE_DIR, newVscodeVersion);
    ok(`Version set to ${newVscodeVersion}`);

    info('Packaging extension…');
    run('vsce package --no-dependencies', VSCODE_DIR);
    ok('Extension packaged');

    info('Publishing to VS Code Marketplace…');
    run('vsce publish --no-dependencies', VSCODE_DIR);
    ok(`bell-vscode@${newVscodeVersion} published`);
  }

  // ── 6. Commit version bumps, tag, push ────────────────────────────────────

  step('Tagging and pushing');

  const tag = releaseCore
    ? `v${newCoreVersion}`
    : `vscode-v${newVscodeVersion}`;

  const bumpedFiles = [
    releaseCore   && 'packages/core/package.json',
    releaseVscode && 'packages/vscode/package.json',
  ].filter(Boolean);

  run(`git add ${bumpedFiles.join(' ')}`);
  run(`git commit -m "release ${tag}"`);
  run(`git tag ${tag}`);
  info(`Created tag ${c.bold(tag)}`);

  run('git push && git push --tags');
  ok('Pushed commits and tags');

  // ── Done ───────────────────────────────────────────────────────────────────

  log('\n' + c.green(c.bold('  Release complete!')));
  if (releaseCore)   log(c.dim(`    bell-lang    → https://www.npmjs.com/package/bell-lang`));
  if (releaseVscode) log(c.dim(`    bell-vscode  → https://marketplace.visualstudio.com/manage/publishers/bell`));
  log('');

  rl.close();
}

main().catch(err => {
  console.error(c.red('\nUnexpected error:'), err.message);
  rl.close();
  process.exit(1);
});
