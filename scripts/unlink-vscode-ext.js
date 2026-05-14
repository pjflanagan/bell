const { rmSync } = require('fs');
const { homedir } = require('os');

const dst = `${homedir()}/.vscode/extensions/bell.bell-vscode-local`;

rmSync(dst, { recursive: true, force: true });
console.log(`Removed: ${dst}`);
console.log('Reload VS Code window (Cmd+Shift+P → "Reload Window") to restore the marketplace version.');
