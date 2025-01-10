export const createAppRouter = (appNameID: string) => `
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'app_router.g.dart';

final _rootNavigatorKey = GlobalKey<NavigatorState>();

@riverpod
GoRouter appRouter(AppRouterRef ref) {
  return GoRouter(
    navigatorKey: _rootNavigatorKey,
    initialLocation: '/',
    routes: [
      GoRoute(
        path: '/',
        builder: (context, state) => const SplashScreen(),
      ),
      // Add more routes here
    ],
    errorBuilder: (context, state) => const NotFoundScreen(),
  );
}`;

export const createRouterNotifier = () => `
import 'package:flutter/material.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'router_notifier.g.dart';

@riverpod
class RouterNotifier extends _$RouterNotifier {
  @override
  Future<void> build() async {
    // Initialize
  }

  Future<bool> canPop() async {
    return state.whenOrNull(
      data: (_) => true,
    ) ?? false;
  }
}`;

export const createThemeNotifier = () => `
import 'package:flutter/material.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:shared_preferences.dart';

part 'theme_notifier.g.dart';

@riverpod
class ThemeNotifier extends _$ThemeNotifier {
  static const _themeKey = 'theme_mode';
  
  @override
  ThemeMode build() {
    return ThemeMode.system;
  }

  Future<void> toggleTheme() async {
    final prefs = await SharedPreferences.getInstance();
    state = state == ThemeMode.light ? ThemeMode.dark : ThemeMode.light;
    await prefs.setString(_themeKey, state.name);
  }
}`;

export const createAppProviders = () => `
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';

final sharedPrefsProvider = Provider<SharedPreferences>((ref) {
  throw UnimplementedError();
});

final themeNotifierProvider = NotifierProvider<ThemeNotifier, ThemeMode>(ThemeNotifier.new);
`;

export const createHttpClient = () => `
import 'package:dio/dio.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'dio_client.g.dart';

@riverpod
Dio dioClient(DioClientRef ref) {
  final dio = Dio(
    BaseOptions(
      baseUrl: 'YOUR_BASE_URL',
      connectTimeout: const Duration(seconds: 30),
      receiveTimeout: const Duration(seconds: 30),
      responseType: ResponseType.json,
    ),
  );

  dio.interceptors.addAll([
    LogInterceptor(
      requestBody: true,
      responseBody: true,
    ),
  ]);

  return dio;
}`;

export const createI18n = (lang: string) => `
import 'package:flutter/material.dart';

class AppLocalizations {
  final Locale locale;

  AppLocalizations(this.locale);

  static final Map<String, Map<String, String>> _localizedValues = {
    'en': {
      'welcome': 'Welcome',
      'settings': 'Settings',
      // Add more translations
    },
    'fr': {
      'welcome': 'Bienvenue',
      'settings': 'Paramètres',
      // Add more translations
    },
  };

  String get welcome => _localizedValues[locale.languageCode]?['welcome'] ?? 'Welcome';
  String get settings => _localizedValues[locale.languageCode]?['settings'] ?? 'Settings';
}`;

export const rewriteMainFileRiverpod = (appNameID: string) => `
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:${appNameID}/core/providers/app_providers.dart';
import 'package:${appNameID}/core/router/app_router.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  final sharedPreferences = await SharedPreferences.getInstance();
  
  runApp(
    ProviderScope(
      overrides: [
        sharedPrefsProvider.overrideWithValue(sharedPreferences),
      ],
      child: const MainApp(),
    ),
  );
}

class MainApp extends ConsumerWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final router = ref.watch(appRouterProvider);
    final themeMode = ref.watch(themeNotifierProvider);

    return MaterialApp.router(
      title: '${appNameID}',
      themeMode: themeMode,
      theme: ThemeData.light(useMaterial3: true),
      darkTheme: ThemeData.dark(useMaterial3: true),
      routerConfig: router,
    );
  }
}`;

export const createStorageService = () => `
import 'package:shared_preferences/shared_preferences.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

part 'storage_service.g.dart';

@riverpod
class StorageService extends _$StorageService {
  late final SharedPreferences _prefs;

  @override
  Future<void> build() async {
    _prefs = await SharedPreferences.getInstance();
  }

  Future<void> setString(String key, String value) async {
    await _prefs.setString(key, value);
  }

  String? getString(String key) {
    return _prefs.getString(key);
  }

  Future<void> setBool(String key, bool value) async {
    await _prefs.setBool(key, value);
  }

  bool? getBool(String key) {
    return _prefs.getBool(key);
  }

  Future<void> remove(String key) async {
    await _prefs.remove(key);
  }

  Future<void> clear() async {
    await _prefs.clear();
  }
}`;

// Ajoutez d'autres fonctions utilitaires pour Riverpod... 