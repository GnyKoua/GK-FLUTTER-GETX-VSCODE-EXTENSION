import * as vscode from 'vscode';
import { infoMessage } from '../utils/function';

const dependencies = [
    "get", "get_storage", "cached_network_image", "change_app_package_name", "json_annotation",
    "jiffy", "skeletons", "equatable", "flutter_staggered_grid_view", "flutter_svg", "connectivity_plus",
    "internet_connection_checker", "flutter_spinkit", "cool_alert"
];

let initGetXCommand = vscode.commands.registerCommand('gk-flutter-getx-pattern.getxinit', async () => {
    // const terminal = vscode.window.createTerminal("GK flutter GetX init");
    // terminal.show();
    // terminal.sendText("flutter pub get");
    // terminal.sendText("flutter pub get");

    // dependencies.forEach(val => terminal.sendText(`flutter pub add ${val}`));

    // if (vscode.workspace.workspaceFolders !== undefined) {
    //     let pathDir = vscode.workspace.workspaceFolders[0].uri.fsPath;
    //     console.log(pathDir);

    //     terminal.sendText(`cd ${pathDir}`);

    //     const res = await execShell('flutter pub get');
    //     console.log("Res : ", res);
    // }
    // else {
    //     errorMessage("YOUR-EXTENSION: Working folder not found, open a folder an try again");
    // }

    infoMessage("En cours de développement !");
});

export default initGetXCommand;