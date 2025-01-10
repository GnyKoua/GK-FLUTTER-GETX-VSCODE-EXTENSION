import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as path from 'path';
import * as vscode from 'vscode';
import { errorMessage, execShell, infoMessage } from '../utils/function';
import {
    createAppRouter,
    createRouterNotifier,
    createAppProviders,
    createI18n,
    createThemeNotifier,
    createHttpClient,
    rewriteMainFileRiverpod,
    createStorageService
} from '../utils/init-riverpod-utils';

const dependencies = [
    "flutter_riverpod", "riverpod_annotation", "go_router", "freezed_annotation",
    "json_annotation", "dio", "flutter_hooks", "hooks_riverpod", "shared_preferences"
];

const devDependencies = [
    "build_runner", "riverpod_generator", "freezed", "json_serializable"
];

let riverpodCommand = vscode.commands.registerCommand('gk-flutter-getx-pattern.riverpodInit', async () => {
    if (vscode.workspace.workspaceFolders !== undefined) {
        let mainDir = vscode.workspace.workspaceFolders[0].uri.fsPath;

        if (fs.existsSync(path.join(mainDir, "pubspec.yaml"))) {
            let yamlFile: any = yaml.load(fs.readFileSync(path.join(mainDir, "pubspec.yaml"), 'utf8'),
                { schema: yaml.JSON_SCHEMA, json: true });

            // Installation des dépendances
            let depCommands: string[] = [];
            let depToInst = "";
            dependencies.forEach(e => {
                if (!yamlFile.dependencies[e]) {
                    depToInst += ` ${e}`;
                }
            });

            let devDepToInst = "";
            devDependencies.forEach(e => {
                if (!yamlFile.dev_dependencies?.[e]) {
                    devDepToInst += ` ${e}`;
                }
            });

            if (depToInst.trim().length > 0) {
                depCommands = [...depCommands, `flutter pub add ${depToInst}`];
            }
            if (devDepToInst.trim().length > 0) {
                depCommands = [...depCommands, `flutter pub add --dev ${devDepToInst}`];
            }

            if (depCommands.length > 0) {
                const resDepInstall = await installationDependances(mainDir, depCommands);
                if (resDepInstall === "SUCCESSED") {
                    infoMessage("Installation réussie !");
                } else if (resDepInstall === "CANCELED") {
                    errorMessage("Processus annulé !");
                }
            }

            infoMessage("Création des dossiers et fichiers de base...");
            creationDossiersRiverpod(mainDir);
            creationFichiersRiverpod(mainDir, yamlFile.name);
            infoMessage("Dossiers et fichiers créés...");
        }
    }
});

const creationDossiersRiverpod = (mainDir: string) => {
    // Structure similaire mais adaptée pour Riverpod
    const libFolder = path.join(mainDir, "lib");

    // Core
    const coreFolder = path.join(libFolder, "core");
    fs.mkdirSync(path.join(coreFolder, "router"));
    fs.mkdirSync(path.join(coreFolder, "theme"));
    fs.mkdirSync(path.join(coreFolder, "network"));
    fs.mkdirSync(path.join(coreFolder, "storage"));
    fs.mkdirSync(path.join(coreFolder, "providers"));

    // Features
    const featuresFolder = path.join(libFolder, "features");
    fs.mkdirSync(path.join(featuresFolder, "auth"));
    fs.mkdirSync(path.join(featuresFolder, "home"));

    // Shared
    const sharedFolder = path.join(libFolder, "shared");
    fs.mkdirSync(path.join(sharedFolder, "widgets"));
    fs.mkdirSync(path.join(sharedFolder, "models"));
    fs.mkdirSync(path.join(sharedFolder, "utils"));
};

const installationDependances = (mainDir: string, commands: string[]) => {
    let customCancellationToken: vscode.CancellationTokenSource | null = null;
    return vscode.window.withProgress<"SUCCESSED" | "CANCELED" | "ERROR">({
        title: 'Installation des dépendances...',
        location: vscode.ProgressLocation.Notification,
        cancellable: true
    }, async (progress, token) => {
        return new Promise((async (resolve) => {
            customCancellationToken = new vscode.CancellationTokenSource();

            customCancellationToken.token.onCancellationRequested(() => {
                customCancellationToken?.dispose();
                customCancellationToken = null;

                resolve("CANCELED");
                return;
            });
            for (let i = 0; i < commands.length; i++) {
                const command = commands[i];
                await execShell(`${command}`, mainDir).catch(err => {
                    errorMessage(err);
                    resolve("ERROR");
                    return;
                });
            }

            resolve("SUCCESSED");
        }));
    });
};

const creationFichiersRiverpod = (mainDir: string, appNameID: string) => {
    // Core files
    const routerFile = path.join(mainDir, "lib/core/router/app_router.dart");
    if (!fs.existsSync(routerFile)) {
        fs.appendFileSync(routerFile, createAppRouter(appNameID));
    }

    const routerNotifierFile = path.join(mainDir, "lib/core/router/router_notifier.dart");
    if (!fs.existsSync(routerNotifierFile)) {
        fs.appendFileSync(routerNotifierFile, createRouterNotifier());
    }

    const themeNotifierFile = path.join(mainDir, "lib/core/theme/theme_notifier.dart");
    if (!fs.existsSync(themeNotifierFile)) {
        fs.appendFileSync(themeNotifierFile, createThemeNotifier());
    }

    const httpClientFile = path.join(mainDir, "lib/core/network/dio_client.dart");
    if (!fs.existsSync(httpClientFile)) {
        fs.appendFileSync(httpClientFile, createHttpClient());
    }

    const storageServiceFile = path.join(mainDir, "lib/core/storage/storage_service.dart");
    if (!fs.existsSync(storageServiceFile)) {
        fs.appendFileSync(storageServiceFile, createStorageService());
    }

    const providersFile = path.join(mainDir, "lib/core/providers/app_providers.dart");
    if (!fs.existsSync(providersFile)) {
        fs.appendFileSync(providersFile, createAppProviders());
    }

    // i18n
    const i18nFile = path.join(mainDir, "lib/shared/utils/app_localizations.dart");
    if (!fs.existsSync(i18nFile)) {
        fs.appendFileSync(i18nFile, createI18n('en'));
    }

    // Main file
    const mainFile = path.join(mainDir, "lib/main.dart");
    fs.writeFileSync(mainFile, rewriteMainFileRiverpod(appNameID));
};

export default riverpodCommand; 