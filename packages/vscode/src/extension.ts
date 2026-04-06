import * as vscode from 'vscode';
import * as path from 'path';
import * as cp from 'child_process';

let bellTerminal: vscode.Terminal | undefined;

export function activate(context: vscode.ExtensionContext) {
    console.log('Bell extension is now active');

    // ── Run command ──────────────────────────────────────────────────────────

    const runFileCommand = vscode.commands.registerCommand('bell.runFile', async (uri: vscode.Uri) => {
        const activeEditor = vscode.window.activeTextEditor;
        const fileToRun = uri || activeEditor?.document.uri;

        if (!fileToRun || path.extname(fileToRun.fsPath) !== '.bel') {
            vscode.window.showErrorMessage('Not a Bell file.');
            return;
        }

        if (activeEditor?.document.uri.fsPath === fileToRun.fsPath && activeEditor.document.isDirty) {
            await activeEditor.document.save();
        }

        if (!bellTerminal || bellTerminal.exitStatus !== undefined) {
            bellTerminal = vscode.window.createTerminal('Bell');
        }

        bellTerminal.show(true);

        const bellPath = getBellPath();
        bellTerminal.sendText(`${bellPath} run "${fileToRun.fsPath}"`);
    });

    // ── Formatter ────────────────────────────────────────────────────────────

    const formatter = vscode.languages.registerDocumentFormattingEditProvider('bel', {
        provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
            const bellPath = getBellPath();
            const filePath = document.uri.fsPath;

            try {
                const result = cp.spawnSync(bellPath, ['format', '--stdout', filePath], {
                    encoding: 'utf8',
                    timeout: 5000,
                });

                if (result.error) {
                    vscode.window.showErrorMessage(`Bell formatter error: ${result.error.message}`);
                    return [];
                }
                if (result.status !== 0) {
                    vscode.window.showErrorMessage(`Bell formatter failed: ${result.stderr}`);
                    return [];
                }

                const formatted = result.stdout;
                const fullRange = new vscode.Range(
                    document.positionAt(0),
                    document.positionAt(document.getText().length)
                );
                return [vscode.TextEdit.replace(fullRange, formatted)];
            } catch (err: any) {
                vscode.window.showErrorMessage(`Bell formatter error: ${err.message}`);
                return [];
            }
        }
    });

    // ── Format on save ───────────────────────────────────────────────────────

    const saveListener = vscode.workspace.onWillSaveTextDocument(event => {
        if (event.document.languageId !== 'bel') return;

        const config = vscode.workspace.getConfiguration('bell');
        if (!config.get<boolean>('formatOnSave')) return;

        const bellPath = getBellPath();
        const filePath = event.document.uri.fsPath;

        event.waitUntil(
            Promise.resolve().then(() => {
                const result = cp.spawnSync(bellPath, ['format', '--stdout', filePath], {
                    encoding: 'utf8',
                    timeout: 5000,
                });

                if (result.error || result.status !== 0) return [];

                const fullRange = new vscode.Range(
                    event.document.positionAt(0),
                    event.document.positionAt(event.document.getText().length)
                );
                return [vscode.TextEdit.replace(fullRange, result.stdout)];
            })
        );
    });

    context.subscriptions.push(runFileCommand, formatter, saveListener);
}

export function deactivate() {}

function getBellPath(): string {
    const config = vscode.workspace.getConfiguration('bell');
    return config.get<string>('executablePath') || 'bell';
}
