import * as cp from "child_process";
import * as vscode from 'vscode';

export function infoMessage(message: string) {
    vscode.window.showInformationMessage(message);
}

export function warningMessage(message: string) {
    vscode.window.showWarningMessage(message);
}

export function errorMessage(message: string) {
    vscode.window.showErrorMessage(message);
}

export const execShell = (cmd: string) =>
    new Promise<string>((resolve, reject) => {
        cp.exec(cmd, (err, out) => {
            if (err) {
                return reject(err);
            }
            return resolve(out);
        });
    });