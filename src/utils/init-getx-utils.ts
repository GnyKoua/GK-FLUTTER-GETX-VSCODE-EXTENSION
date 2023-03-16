export const createFeaturesConstantes = () =>
`// ignore_for_file: constant_identifier_names, non_constant_identifier_names

import 'package:flutter/foundation.dart';

// APP CONSTANTS
const APP_CODE = "";
const APP_NAME = "";
const BACKEND_ROOT = "";
const BACKEND_API = "$BACKEND_ROOT/api/";

// STORAGES KEYs
const STORAGE_KEY = kDebugMode ? "$APP_CODE-STORE" : "$APP_CODE-LOCAL_STORE_PROD";
const THEME_KEY = kDebugMode ? "ThemeMode" : "$APP_CODE-THEME_MODE_PROD";
const ACCESS_TOKEN = kDebugMode ? "$APP_CODE-USER-ACCESS-TOKEN" : "$APP_CODE-USER_ACCESS_TOKEN_PROD";
const USER_INFOS = kDebugMode ? "$APP_CODE-USER-INFOS" : "$APP_CODE-USER_INFOS_PROD";
const IS_FIRST_OPEN_APP_KEY =
    kDebugMode ? "$APP_CODE-FIRST-OPEN-APP" : "$APP_CODE-FIRST_OPEN_APP_PROD";`;


export const createStylesConstantes = () =>
`// ignore_for_file: constant_identifier_names

import 'package:flutter/animation.dart';

const BUTTON_MIN_SIZE = Size(150, 45);
const BUTTON_MAX_SIZE = Size(300, 45);
`;

export const createColorsConstantes = () =>
`import 'package:flutter/material.dart';

const Color primaryColor = Colors.deepPurpleAccent;
const Color primaryConstratColor = Colors.deepPurple;
const Color darkColor = Color(0xff000000);
const Color secondaryColor = Color(0xff434B5D);
const Color backgroundColor = Colors.white;
Color pageBackgroundColor = Colors.grey.shade300;
const Color canvasColor = Color(0xffFFF4DE);
const Color textPrimaryColor = Color(0xff042C5C);
const Color textSecondaryColor = Color(0xff77869E);
const Color successColor = Color(0xff00D793);
const Color dangerColor = Color(0xffF88166);
const Color warningColor = Color(0xffF5B403);
const Color starRateColor = Color(0xffb0d12b);

const Color associative1Color = Color(0xff2c0001);
const Color associative2Color = Color(0xffdc471c);
const Color associative3Color = Color(0xfff6c046);

const Color facebookColor = Color(0xff3b5998);

const Color darkPrimaryColor = Color(0xffF88166);
const Color darkSecondaryColor = Colors.white; //work as secondary color
const Color darkBackgroundColor = Color(0xff393939);
const Color darkPageBackgroundColor = Color(0xFF3D3D3D);
const Color darkCanvasColor = Color(0xff5A5A5A);

//it will be same for both light and dark theme
const Color greyColor = Colors.grey;
const Color addCoinColor = Colors.green;
const Color hurryUpTimerColor = Colors.red; //timer color when 25% time left

// Icons colors
const Color personnalCarColor = Color(0xff0084d7);
const Color busColor = Color(0xff6C0884);
const Color taxiColor = Color(0xffD13F1C);
const Color motoColor = Color(0xffD1A01C);
const Color vtcColor = Color(0xff656565);
const Color camionColor = Color(0xff76A50D);
`;

export const createAppTheme = (appNameID:string) =>
`import 'package:flutter/material.dart';
import 'package:${appNameID}/ui/styles/colors.style.dart';
import 'package:${appNameID}/ui/styles/constants.style.dart';

abstract class AppTheme {
  static ThemeData light = ThemeData(
    shadowColor: primaryColor.withOpacity(0.25),
    brightness: Brightness.light,
    primaryColor: primaryColor,
    // fontFamily: "Avenir",
    scaffoldBackgroundColor: backgroundColor,
    backgroundColor: backgroundColor,
    canvasColor: canvasColor,
    colorScheme: ThemeData().colorScheme.copyWith(
          primary: primaryColor,
          secondary: secondaryColor,
        ),
    appBarTheme: const AppBarTheme(
      elevation: 0,
      backgroundColor: backgroundColor,
      titleTextStyle: TextStyle(
        color: secondaryColor,
        fontSize: 20,
      ),
      iconTheme: IconThemeData(color: secondaryColor),
      actionsIconTheme: IconThemeData(color: secondaryColor),
    ),
    textTheme: const TextTheme(
      displayLarge: TextStyle(
        fontSize: 18,
        color: darkColor,
      ),
      displayMedium: TextStyle(
        fontSize: 15,
        color: darkColor,
      ),
      displaySmall: TextStyle(
        fontSize: 15,
        color: darkColor,
      ),
      headlineLarge: TextStyle(
        fontSize: 30,
        color: primaryColor,
        fontWeight: FontWeight.bold,
      ),
      headlineMedium: TextStyle(
        fontSize: 27,
        color: primaryColor,
        fontWeight: FontWeight.bold,
      ),
      headlineSmall: TextStyle(
        fontSize: 24,
        color: primaryColor,
        fontWeight: FontWeight.bold,
      ),
      titleLarge: TextStyle(
        fontSize: 25,
        color: primaryColor,
        fontWeight: FontWeight.bold,
      ),
      titleMedium: TextStyle(
        fontSize: 21,
        color: primaryColor,
        fontWeight: FontWeight.bold,
      ),
      titleSmall: TextStyle(
        fontSize: 18,
        color: primaryColor,
        fontWeight: FontWeight.bold,
      ),
      bodyLarge: TextStyle(
        fontSize: 20,
        color: darkColor,
      ),
      bodyMedium: TextStyle(
        fontSize: 17,
        color: darkColor,
      ),
      bodySmall: TextStyle(
        fontSize: 14,
        color: darkColor,
      ),
      labelLarge: TextStyle(
        fontSize: 14,
        color: textSecondaryColor,
      ),
      labelMedium: TextStyle(
        fontSize: 12,
        color: textSecondaryColor,
      ),
      labelSmall: TextStyle(
        fontSize: 10,
        color: textSecondaryColor,
      ),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: primaryColor,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(22.5),
        ),
        elevation: 12.0,
        textStyle: const TextStyle(color: backgroundColor),
        minimumSize: BUTTON_MIN_SIZE,
        maximumSize: BUTTON_MAX_SIZE,
      ),
    ),
    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        backgroundColor: backgroundColor,
        foregroundColor: primaryColor,
        side: const BorderSide(
          color: primaryColor,
        ),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(22.5),
        ),
        elevation: 0,
        textStyle: const TextStyle(color: primaryColor),
        minimumSize: BUTTON_MIN_SIZE,
        maximumSize: BUTTON_MAX_SIZE,
      ),
    ),
    textButtonTheme: TextButtonThemeData(
      style: TextButton.styleFrom(
        foregroundColor: primaryColor,
        minimumSize: BUTTON_MIN_SIZE,
        maximumSize: BUTTON_MAX_SIZE,
      ),
    ),
    buttonTheme: ButtonThemeData(
      buttonColor: primaryColor,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(22.0),
      ),
    ),
  );
  static ThemeData dark = ThemeData(
    shadowColor: darkPrimaryColor.withOpacity(0.25),
    brightness: Brightness.dark,
    primaryColor: darkPrimaryColor,
    // fontFamily: "Avenir",
    scaffoldBackgroundColor: darkPageBackgroundColor,
    backgroundColor: darkBackgroundColor,
    canvasColor: darkCanvasColor,
    colorScheme: ThemeData().colorScheme.copyWith(
          brightness: Brightness.dark,
          secondary: darkSecondaryColor,
        ),
  );
}
`;

export const createThemeController = (appNameID:string) =>
`import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:${appNameID}/features/constants.feature.dart';

class ThemeController extends GetxController {
  final _getStore = GetStorage();

  ThemeMode get theme => _loadTheme() ? ThemeMode.dark : ThemeMode.light;
  bool _loadTheme() => _getStore.read(THEME_KEY) ?? false;

  void saveTheme(bool isDarkMode) => _getStore.write(THEME_KEY, isDarkMode);
  void changeTheme(ThemeData theme) => Get.changeTheme(theme);
  void changeThemeMode(ThemeMode themeMode) => Get.changeThemeMode(themeMode);
}
`;

export const createMainProvider = (appNameID:string) =>
`import 'package:get/get.dart';
import 'package:${appNameID}/features/constants.feature.dart';

class MainProvider extends GetConnect {
  @override
  GetHttpClient get httpClient => GetHttpClient(
        baseUrl: BACKEND_API,
        timeout: const Duration(seconds: 25),
      );
}
`;

export const createRoutes = () =>
`abstract class Routes {
    static const splash = '/splash';
    static const onboarding = '/onboarding';
    static const auth = '/auth';
    static const login = '/login';
    static const signup = '/signup';
    static const forgot = '/forgot';
    static const checkotp = '/check-otp';
}`;

export const createAppRouting = (appNameID:string) =>
`import 'package:get/get.dart';
import 'package:${appNameID}/app/routes.dart';
import 'package:${appNameID}/ui/screens/splash/splash.screen.dart';

class AppRouting {
  static final List<GetPage> appRoutes = [
    GetPage(
        name: Routes.splash,
        page: () => const SplashScreen(),
        transition: Transition.fade,
        transitionDuration: const Duration(milliseconds: 350),
    ),
  ];
}
`;

export const createMainApp = (appNameID:string) =>
`import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:get/get.dart';
import 'package:${appNameID}/app/app.routing.dart';
import 'package:${appNameID}/app/routes.dart';
import 'package:${appNameID}/features/constants.feature.dart';
import 'package:${appNameID}/features/theme/controllers/theme.controller.dart';
import 'package:${appNameID}/ui/styles/theme/app.theme.dart';
import 'package:${appNameID}/utils/functions.dart';

class MainApp extends StatefulWidget {
  const MainApp({Key? key}) : super(key: key);

  @override
  State<MainApp> createState() => _MainAppState();
}

class _MainAppState extends State<MainApp> {
  @override
  void didChangeDependencies() {
    preCacheImages(context);
    super.didChangeDependencies();
  }

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    final themeController = Get.find<ThemeController>();

    return GetMaterialApp(
      debugShowCheckedModeBanner: false,
      title: APP_NAME,
      theme: AppTheme.light,
      darkTheme: AppTheme.dark,
      themeMode: themeController.theme,
      getPages: AppRouting.appRoutes,
      initialRoute: Routes.splash,
      localizationsDelegates: const [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      supportedLocales: const [
        Locale('fr', ''),
        Locale('en', ''),
      ],
    );
  }
}
`;

export const createUtilsFunctions = (appNameID:string) =>
`import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:${appNameID}/ui/styles/colors.style.dart';

MaterialColor createMaterialColor(Color color) {
  List strengths = <double>[.05];
  final swatch = <int, Color>{};
  final int r = color.red, g = color.green, b = color.blue;

  for (int i = 1; i < 10; i++) {
    strengths.add(0.1 * i);
  }
  for (var strength in strengths) {
    final double ds = 0.5 - strength;
    swatch[(strength * 1000).round()] = Color.fromRGBO(
      r + ((ds < 0 ? r : (255 - r)) * ds).round(),
      g + ((ds < 0 ? g : (255 - g)) * ds).round(),
      b + ((ds < 0 ? b : (255 - b)) * ds).round(),
      1,
    );
  }
  return MaterialColor(color.value, swatch);
}

void preCacheImages(BuildContext context) {
  // PRECACHE SVG
  // precachePicture(
  //     SvgPicture.asset("<<path>>").pictureProvider, context);

  // PRECACHE PNG, JPG, JPEG
  // precacheImage(Image.asset("<<path>>").image, context);
}

// ignore: non_constant_identifier_names
Future<dynamic> confirmAlert(
  BuildContext context,
  String? title,
  String message,
  String confirmButtonText,
  String cancelButtonText,
  dynamic Function() onConfirm,
) {
  return showDialog(
    context: context,
    barrierDismissible: false,
    builder: (BuildContext context) {
      return AlertDialog(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(15),
        ),
        title: title != null
            ? Text(
                title,
                style: const TextStyle(
                  color: textSecondaryColor,
                  fontSize: 20,
                ),
              )
            : null,
        content: Text(
          message,
          style: const TextStyle(
            color: textPrimaryColor,
          ),
        ),
        actionsAlignment: MainAxisAlignment.spaceAround,
        actions: [
          OutlinedButton(
            onPressed: () => Get.back(result: false),
            style: OutlinedButton.styleFrom(
              side: const BorderSide(color: dangerColor, width: 1.5),
            ),
            child: Text(
              cancelButtonText,
              style: const TextStyle(
                color: dangerColor,
              ),
            ),
          ),
          OutlinedButton(
            onPressed: onConfirm,
            style: OutlinedButton.styleFrom(
              side: const BorderSide(color: primaryColor, width: 1.5),
            ),
            child: Text(
              confirmButtonText,
              style: const TextStyle(
                color: primaryColor,
              ),
            ),
          ),
        ],
      );
    },
  );
}

// ignore: non_constant_identifier_names
void ShowSimpleAlert(
    BuildContext context, String? title, String? message, String buttonText) {
  showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(15),
          ),
          title: Text(
            title!,
            style: const TextStyle(
              color: secondaryColor,
              fontSize: 20,
            ),
          ),
          content: Text(
            message!,
            style: const TextStyle(
              color: textPrimaryColor,
            ),
          ),
          actions: [
            TextButton(
              onPressed: () => Get.back(),
              child: Text(
                buttonText,
                style: const TextStyle(
                  color: primaryColor,
                ),
              ),
            ),
          ],
        );
      });
}

void showSnackbar(
    {required String title,
    required String message,
    required Color backgroundcolor}) {
  Get.snackbar(
    title,
    message,
    colorText: backgroundColor,
    backgroundColor: backgroundcolor,
    snackPosition: SnackPosition.BOTTOM,
  );
}
`;

export const createUtilsInternetConnectivity = () =>
`import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:internet_connection_checker/internet_connection_checker.dart';

class InternetConnectivity {
  static Future<bool> isUserOffline() async {
    final ConnectivityResult connectivityResult =
        await Connectivity().checkConnectivity();
    if (connectivityResult == ConnectivityResult.none) {
      return true;
    } else {
      final hasConnection = await InternetConnectionChecker().hasConnection;
      return !hasConnection;
    }
  }
}
`;

export const rewriteMainFile = (appNameID:string) =>
`import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get.dart';
import 'package:${appNameID}/app/app.dart';
import 'package:${appNameID}/features/constants.feature.dart';
import 'package:get_storage/get_storage.dart';
import 'package:get/get.dart';
import 'package:${appNameID}/features/theme/controllers/theme.controller.dart';

Future<void> initServices() async {
  await GetStorage.init(STORAGE_KEY);

  Get.put(ThemeController());
  // Get.put(<<ServiceClass>>);
}

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  if (!kIsWeb) {
    // Set device orientation
    await SystemChrome.setPreferredOrientations([
      DeviceOrientation.portraitUp,
      DeviceOrientation.portraitDown,
    ]);
    // Set status bar color
    SystemChrome.setSystemUIOverlayStyle(
      const SystemUiOverlayStyle(
        statusBarColor: Colors.transparent,
        statusBarBrightness: Brightness.light,
        statusBarIconBrightness: Brightness.dark,
      ),
    );
  }

  //Load Services
  initServices().then((value) async {
    runApp(const MainApp());
  });
}
`;

export const rewriteTestFile = (appNameID:string) =>
`// This is a basic Flutter widget test.
//
// To perform an interaction with a widget in your test, use the WidgetTester
// utility in the flutter_test package. For example, you can send tap and scroll
// gestures. You can also use WidgetTester to find child widgets in the widget
// tree, read text, and verify that the values of widget properties are correct.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:${appNameID}/app/app.dart';

void main() {
  testWidgets('Counter increments smoke test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const MainApp());

    // Verify that our counter starts at 0.
    expect(find.text('0'), findsOneWidget);
    expect(find.text('1'), findsNothing);

    // Tap the '+' icon and trigger a frame.
    await tester.tap(find.byIcon(Icons.add));
    await tester.pump();

    // Verify that our counter has incremented.
    expect(find.text('0'), findsNothing);
    expect(find.text('1'), findsOneWidget);
  });
}
`;
