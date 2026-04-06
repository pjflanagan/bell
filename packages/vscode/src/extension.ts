import * as vscode from 'vscode';
import * as path from 'path';

let bellTerminal: vscode.Terminal | undefined;

export function activate(context: vscode.ExtensionContext) {
    console.log('Bell extension is now active');

    let runFileCommand = vscode.commands.registerCommand('bell.runFile', async (uri: vscode.Uri) => {
        const activeEditor = vscode.window.activeTextEditor;
        const fileToRun = uri || activeEditor?.document.uri;

        if (!fileToRun || path.extname(fileToRun.fsPath) !== '.bel') {
            vscode.window.showErrorMessage('Not a Bell file.');
            return;
        }

        // Save if dirty
        if (activeEditor?.document.uri.fsPath === fileToRun.fsPath && activeEditor.document.isDirty) {
            await activeEditor.document.save();
        }

        if (!bellTerminal || bellTerminal.exitStatus !== undefined) {
            bellTerminal = vscode.window.createTerminal('Bell');
        }

        bellTerminal.show(true);

        // Assuming 'bell' is in the PATH or we run it via npx from the workspace root
        // For a better experience, we could try to find the bell bin in the workspace node_modules
        const bellPath = 'bell'; 
        const command = `${bellPath} run "${fileToRun.fsPath}"`;

        bellTerminal.sendText(command);
    });

    context.subscriptions.push(runFileCommand);
}

export function deactivate() {}
