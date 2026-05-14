const { rmSync, symlinkSync } = require('fs');
const { resolve } = require('path');
const { homedir } = require('os');

const src = resolve(__dirname, '..', 'packages', 'vscode');
const dst = `${homedir()}/.vscode/extensions/bell.bell-vscode-local`;

rmSync(dst, { recursive: true, force: true });
symlinkSync(src, dst);
console.log(`Linked: ${dst} -> ${src}`);
console.log('Reload VS Code window (Cmd+Shift+P → "Reload Window") to pick up changes.');
