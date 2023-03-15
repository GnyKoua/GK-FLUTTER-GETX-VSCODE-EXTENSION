import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';
import { errorMessage, infoMessage } from '../utils/function';
import { createStatefull } from '../utils/statefull.file';

let statefullCommand = vscode.commands.registerCommand('gk-flutter-getx-pattern.statefullfile', async () => {
    // The code you place here will be executed every time your command is executed
    let folderPath = "";
    const options: vscode.OpenDialogOptions = {
        canSelectMany: false,
        openLabel: 'Sélectionner le dossier',
        canSelectFiles: false,
        canSelectFolders: true,
        title: "Sélectionner le dossier",
    };
    const fileUri = await vscode.window.showOpenDialog(options);
    if (fileUri && fileUri[0]) {
        folderPath = fileUri[0].fsPath;
        console.log('Selected folder: ' + folderPath);
    } else {
        errorMessage("Dossier non sélectionné !");
    }

    const type = await vscode.window.showQuickPick(
        ["Screen", "Widget", "Page"],
        {
            canPickMany: false,
            title: "Sélectionner le type"
        }
    );
    if (type) {
        const name = await vscode.window.showInputBox({
            title: "Nom du fichier",
            placeHolder: "Entrer le nom du fichier",
            validateInput(value) {
                if (value.trim().length === 0) {
                    return "Nom du fichier obligatoire";
                }
                return null;
            },
        });
        if (name) {
            const fileName = name + "." + type?.toLowerCase() + ".dart";
            const filePath = path.join(folderPath, fileName);
            if (fs.existsSync(filePath)) {
                errorMessage("Fichier déjà existant !");
            } else {
                const capitalizeName = name.length > 1 ? name?.charAt(0).toUpperCase() + name?.slice(1) : name?.charAt(0);
                fs.appendFile(filePath, createStatefull(capitalizeName, type), () => {
                    infoMessage(`${fileName} créé avec succès !`);
                });
            }
        } else {
            errorMessage("Aucun nom de fichier saisi !");
        }
    } else {
        errorMessage("Type de fichier non sélectionné !");
    }
});

export default statefullCommand;