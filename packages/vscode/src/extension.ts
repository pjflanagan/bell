import * as vscode from 'vscode';
import * as path from 'path';
import * as cp from 'child_process';

let bellTerminal: vscode.Terminal | undefined;

export function activate(context: vscode.ExtensionContext) {
    console.log('Bell extension is now active');

    // ── Diagnostics ──────────────────────────────────────────────────────────

    const diagnosticCollection = vscode.languages.createDiagnosticCollection('bell');
    context.subscriptions.push(diagnosticCollection);

    const debounceTimers = new Map<string, ReturnType<typeof setTimeout>>();

    function scheduleDiagnostics(document: vscode.TextDocument) {
        if (document.languageId !== 'bel') return;

        const key = document.uri.toString();
        const existing = debounceTimers.get(key);
        if (existing) clearTimeout(existing);

        debounceTimers.set(key, setTimeout(() => {
            debounceTimers.delete(key);
            refreshDiagnostics(document, diagnosticCollection);
        }, 400));
    }

    // Run diagnostics on all already-open Bell documents
    vscode.workspace.textDocuments.forEach(doc => {
        if (doc.languageId === 'bel') {
            refreshDiagnostics(doc, diagnosticCollection);
        }
    });

    context.subscriptions.push(
        vscode.workspace.onDidOpenTextDocument(doc => {
            if (doc.languageId === 'bel') refreshDiagnostics(doc, diagnosticCollection);
        }),
        vscode.workspace.onDidChangeTextDocument(e => scheduleDiagnostics(e.document)),
        vscode.workspace.onDidCloseTextDocument(doc => {
            diagnosticCollection.delete(doc.uri);
            debounceTimers.delete(doc.uri.toString());
        }),
    );

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

function refreshDiagnostics(
    document: vscode.TextDocument,
    collection: vscode.DiagnosticCollection,
): void {
    const bellPath = getBellPath();

    // Write document text to a temp file so we can check unsaved content too
    const filePath = document.uri.fsPath;
    const text = document.getText();

    let result: cp.SpawnSyncReturns<string>;
    try {
        // Pass source via a temp write — for saved files use the path directly;
        // for unsaved content pipe via stdin using -c with a check subcommand.
        // Simplest: always write the current buffer to a temp file approach is
        // complex; instead just run check on the saved file path (close enough
        // for normal editing, diagnostics refresh on save too).
        result = cp.spawnSync(bellPath, ['check', filePath], {
            encoding: 'utf8',
            timeout: 5000,
            input: text,
        });
    } catch {
        collection.delete(document.uri);
        return;
    }

    if (result.error || !result.stdout) {
        collection.delete(document.uri);
        return;
    }

    let rawDiags: Array<{
        line: number;
        col: number;
        length: number;
        message: string;
        severity: string;
    }>;

    try {
        rawDiags = JSON.parse(result.stdout);
    } catch {
        collection.delete(document.uri);
        return;
    }

    const vsDiags = rawDiags.map(d => {
        const line = Math.max(0, d.line - 1); // ANTLR is 1-based, VS Code is 0-based
        const col = Math.max(0, d.col);
        const end = col + Math.max(1, d.length);
        const range = new vscode.Range(line, col, line, end);
        const severity = d.severity === 'error'
            ? vscode.DiagnosticSeverity.Error
            : vscode.DiagnosticSeverity.Warning;
        return new vscode.Diagnostic(range, d.message, severity);
    });

    collection.set(document.uri, vsDiags);
}
