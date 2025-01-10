import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as path from 'path';
import * as vscode from 'vscode';
import { errorMessage, execShell, infoMessage } from '../utils/function';
import { createAppRouting, createAppTheme, createColorsConstantes, createFeaturesConstantes, createHandleResponse, createHttpException, createI18n, createMainApp, createMainProvider, createRoutes, createStylesConstantes, createTheme, createThemeController, createUtilsFunctions, createUtilsInternetConnectivity, rewriteMainFile, rewriteTestFile } from '../utils/init-getx-utils';
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
    // Assets
    const assetsFolder = path.join(mainDir, "assets");
    if (!fs.existsSync(assetsFolder)) {
        fs.mkdirSync(assetsFolder);
    }

    const libFolder = path.join(mainDir, "lib");

    // App
    const appFolder = path.join(libFolder, "app");
    if (!fs.existsSync(appFolder)) {
        fs.mkdirSync(appFolder);
    }

    // Components
    const componentsFolder = path.join(libFolder, "components");
    if (!fs.existsSync(componentsFolder)) {
        fs.mkdirSync(componentsFolder);
        fs.mkdirSync(path.join(componentsFolder, "widgets"));
        fs.mkdirSync(path.join(componentsFolder, "styles"));
        fs.mkdirSync(path.join(componentsFolder, "validators"));
    }

    // Features
    const featuresFolder = path.join(libFolder, "features");
    if (!fs.existsSync(featuresFolder)) {
        fs.mkdirSync(featuresFolder);
        fs.mkdirSync(path.join(featuresFolder, "http"));
        fs.mkdirSync(path.join(featuresFolder, "global"));
        fs.mkdirSync(path.join(featuresFolder, "global/models"));
        fs.mkdirSync(path.join(featuresFolder, "global/providers"));
    }

    // i18n
    const i18nFolder = path.join(libFolder, "i18n");
    if (!fs.existsSync(i18nFolder)) {
        fs.mkdirSync(i18nFolder);
    }

    // Theme
    const themeFolder = path.join(libFolder, "theme");
    if (!fs.existsSync(themeFolder)) {
        fs.mkdirSync(themeFolder);
    }

    // Utils
    const utilsFolder = path.join(libFolder, "utils");
    if (!fs.existsSync(utilsFolder)) {
        fs.mkdirSync(utilsFolder);
        fs.mkdirSync(path.join(utilsFolder, "functions"));
        fs.mkdirSync(path.join(utilsFolder, "constants"));
    }

    // UI
    const uiFolder = path.join(libFolder, "ui");
    if (!fs.existsSync(uiFolder)) {
        fs.mkdirSync(uiFolder);
        fs.mkdirSync(path.join(uiFolder, "screens"));
        fs.mkdirSync(path.join(uiFolder, "screens/styles"));
        fs.mkdirSync(path.join(uiFolder, "screens/widgets"));
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

    // HTTP files
    const httpException = path.join(mainDir, "lib/features/http/exception.dart");
    if (!fs.existsSync(httpException)) {
        fs.appendFileSync(httpException, createHttpException());
    }

    const handleResponse = path.join(mainDir, "lib/features/http/handle_response.dart");
    if (!fs.existsSync(handleResponse)) {
        fs.appendFileSync(handleResponse, createHandleResponse());
    }

    // i18n files
    const enTranslation = path.join(mainDir, "lib/i18n/en.dart");
    if (!fs.existsSync(enTranslation)) {
        fs.appendFileSync(enTranslation, createI18n('en'));
    }

    const frTranslation = path.join(mainDir, "lib/i18n/fr.dart");
    if (!fs.existsSync(frTranslation)) {
        fs.appendFileSync(frTranslation, createI18n('fr'));
    }

    // Theme files
    const darkTheme = path.join(mainDir, "lib/theme/dark_theme.dart");
    if (!fs.existsSync(darkTheme)) {
        fs.appendFileSync(darkTheme, createTheme(true));
    }

    const lightTheme = path.join(mainDir, "lib/theme/light_theme.dart");
    if (!fs.existsSync(lightTheme)) {
        fs.appendFileSync(lightTheme, createTheme(false));
    }
};

export default initGetXCommand;