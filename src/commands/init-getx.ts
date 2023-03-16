import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as path from 'path';
import * as vscode from 'vscode';
import { errorMessage, execShell, infoMessage } from '../utils/function';
import { createAppRouting, createAppTheme, createColorsConstantes, createFeaturesConstantes, createMainApp, createMainProvider, createRoutes, createStylesConstantes, createThemeController, createUtilsFunctions, createUtilsInternetConnectivity, rewriteMainFile, rewriteTestFile } from '../utils/init-getx-utils';
import { createStatefull } from '../utils/statefull.file';

const dependencies = [
    "intl", "get", "get_storage", "cached_network_image", "change_app_package_name", "json_annotation",
    "skeletons", "equatable", "flutter_staggered_grid_view", "flutter_svg", "connectivity_plus",
    "internet_connection_checker", "flutter_spinkit", "cool_alert"
];

let initGetXCommand = vscode.commands.registerCommand('gk-flutter-getx-pattern.getxinit', async () => {

    if (vscode.workspace.workspaceFolders !== undefined) {
        let mainDir = vscode.workspace.workspaceFolders[0].uri.fsPath;

        if (fs.existsSync(path.join(mainDir, "pubspec.yaml"))) {
            let yamlFile: any = yaml.load(fs.readFileSync(path.join(mainDir, "pubspec.yaml"), 'utf8'),
                { schema: yaml.JSON_SCHEMA, json: true });
            let depCommands: string[] = [];
            let depToInst = "";
            dependencies.forEach(e => {
                if (!yamlFile.dependencies[e]) {
                    depToInst += ` ${e}`;
                }
            });
            if (depToInst.trim().length > 0) {
                depCommands = [...depCommands, `flutter pub add ${depToInst}`];
            }
            if (!yamlFile.dependencies["flutter_localizations"]) {
                depCommands = [...depCommands, "flutter pub add flutter_localizations --sdk=flutter"];
            }
            if (depCommands.length > 0) {
                const resDepInstall = await installationDependances(mainDir, depCommands);
                if (resDepInstall === "SUCCESSED") {
                    infoMessage("Installation réussie !");
                } else if (resDepInstall === "CANCELED") {
                    errorMessage("Processus annulé !");
                }
            } else {
                infoMessage("Dépendances déjà installées !");
            }

            infoMessage("Création des dossiers et fichiers de base...");
            creationDossiers(mainDir);
            creationFichiers(mainDir, yamlFile.name);
            infoMessage("Dossiers et fichiers créés...");

        } else {
            errorMessage("Il ne s'agit pas d'un projet flutter !");
        }
    }
    else {
        errorMessage("Dossier de travail introuvable, ouvrez un dossier et réessayez.");
    }
});

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

const creationDossiers = (mainDir: string) => {
    const assetsFolder = path.join(mainDir, "assets");
    if (!fs.existsSync(assetsFolder)) {
        fs.mkdirSync(assetsFolder);
    }
    const imagesFolder = path.join(assetsFolder, "images");
    if (!fs.existsSync(imagesFolder)) {
        fs.mkdirSync(imagesFolder);
    }
    const iconsFolder = path.join(assetsFolder, "icons");
    if (!fs.existsSync(iconsFolder)) {
        fs.mkdirSync(iconsFolder);
    }

    const libFolder = path.join(mainDir, "lib");

    const appFolder = path.join(libFolder, "app");
    if (!fs.existsSync(appFolder)) {
        fs.mkdirSync(appFolder);
    }
    const featuresFolder = path.join(libFolder, "features");
    if (!fs.existsSync(featuresFolder)) {
        fs.mkdirSync(featuresFolder);
    }
    const themeFeature = path.join(mainDir, "lib", "features", "theme");
    if (!fs.existsSync(themeFeature)) {
        fs.mkdirSync(themeFeature);
    }
    const themeFeatureCtrl = path.join(mainDir, "lib", "features", "theme", "controllers");
    if (!fs.existsSync(themeFeatureCtrl)) {
        fs.mkdirSync(themeFeatureCtrl);
    }
    const globalFeature = path.join(mainDir, "lib", "features", "global");
    if (!fs.existsSync(globalFeature)) {
        fs.mkdirSync(globalFeature);
    }
    const globalFeatureProviders = path.join(mainDir, "lib", "features", "global", "providers");
    if (!fs.existsSync(globalFeatureProviders)) {
        fs.mkdirSync(globalFeatureProviders);
    }
    const uiFolder = path.join(libFolder, "ui");
    if (!fs.existsSync(uiFolder)) {
        fs.mkdirSync(uiFolder);
    }
    const screensFolder = path.join(uiFolder, "screens");
    if (!fs.existsSync(screensFolder)) {
        fs.mkdirSync(screensFolder);
    }

    const splash = path.join(screensFolder, "splash");
    if (!fs.existsSync(splash)) {
        fs.mkdirSync(splash);
    }

    const stylesFolder = path.join(uiFolder, "styles");
    if (!fs.existsSync(stylesFolder)) {
        fs.mkdirSync(stylesFolder);
    }
    const themeFolder = path.join(stylesFolder, "theme");
    if (!fs.existsSync(themeFolder)) {
        fs.mkdirSync(themeFolder);
    }
    const widgetsFolder = path.join(uiFolder, "widgets");
    if (!fs.existsSync(widgetsFolder)) {
        fs.mkdirSync(widgetsFolder);
    }
    const utilsFolder = path.join(libFolder, "utils");
    if (!fs.existsSync(utilsFolder)) {
        fs.mkdirSync(utilsFolder);
    }
};


const creationFichiers = (mainDir: string, appNameID: string) => {

    const utilsFunction = path.join(mainDir, "lib", "utils", "functions.dart");
    if (!fs.existsSync(utilsFunction)) {
        fs.appendFileSync(utilsFunction, createUtilsFunctions(appNameID));
    }
    const utilsInternetConnectivity = path.join(mainDir, "lib", "utils", "internet_connectivity.dart");
    if (!fs.existsSync(utilsInternetConnectivity)) {
        fs.appendFileSync(utilsInternetConnectivity, createUtilsInternetConnectivity());
    }

    const featuresConstants = path.join(mainDir, "lib", "features", "constants.feature.dart");
    if (!fs.existsSync(featuresConstants)) {
        fs.appendFileSync(featuresConstants, createFeaturesConstantes());
    }

    const stylesConstants = path.join(mainDir, "lib", "ui", "styles", "constants.style.dart");
    if (!fs.existsSync(stylesConstants)) {
        fs.appendFileSync(stylesConstants, createStylesConstantes());
    }
    const colorsConstants = path.join(mainDir, "lib", "ui", "styles", "colors.style.dart");
    if (!fs.existsSync(colorsConstants)) {
        fs.appendFileSync(colorsConstants, createColorsConstantes());
    }

    const themeConstants = path.join(mainDir, "lib", "ui", "styles", "theme", "app.theme.dart");
    if (!fs.existsSync(themeConstants)) {
        fs.appendFileSync(themeConstants, createAppTheme(appNameID));
    }
    const themeCtrlConstants = path.join(mainDir, "lib", "features", "theme", "controllers", "theme.controller.dart");
    if (!fs.existsSync(themeCtrlConstants)) {
        fs.appendFileSync(themeCtrlConstants, createThemeController(appNameID));
    }

    const mainProvider = path.join(mainDir, "lib", "features", "global", "providers", "main.provider.dart");
    if (!fs.existsSync(mainProvider)) {
        fs.appendFileSync(mainProvider, createMainProvider(appNameID));
    }

    const routes = path.join(mainDir, "lib", "app", "routes.dart");
    if (!fs.existsSync(routes)) {
        fs.appendFileSync(routes, createRoutes());
    }

    const splash = path.join(mainDir, "lib", "ui", "screens", "splash", "splash.screen.dart");
    if (!fs.existsSync(splash)) {
        fs.appendFile(splash, createStatefull("Splash", "Screen"), () => { });
    }

    const appRouting = path.join(mainDir, "lib", "app", "app.routing.dart");
    if (!fs.existsSync(appRouting)) {
        fs.appendFileSync(appRouting, createAppRouting(appNameID));
    }
    const mainApp = path.join(mainDir, "lib", "app", "app.dart");
    if (!fs.existsSync(mainApp)) {
        fs.appendFileSync(mainApp, createMainApp(appNameID));
    }
    const mainFile = path.join(mainDir, "lib", "main.dart");
    fs.writeFileSync(mainFile, rewriteMainFile(appNameID));

    const testFile = path.join(mainDir, "test", "widget_test.dart");
    fs.writeFileSync(testFile, rewriteTestFile(appNameID));
};

export default initGetXCommand;