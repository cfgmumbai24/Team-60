import 'package:flutter_background_fetch/flutter_background_fetch.dart';
import 'location_service.dart';
import 'database_helper.dart';

void backgroundFetchHeadlessTask(String taskId) async {
  final locationService = LocationService();
  final dbHelper = DatabaseHelper.instance;

  final location = await locationService.getLocation();
  if (location != null) {
    await dbHelper.insert({
      'latitude': location.latitude,
      'longitude': location.longitude,
      'timestamp': DateTime.now().millisecondsSinceEpoch,
      'synced': 0,
    });
  }

  FlutterBackgroundFetch.finish(taskId);
}

void initializeBackgroundFetch() {
  FlutterBackgroundFetch.configure(
    BackgroundFetchConfig(
      minimumFetchInterval: 15,
      stopOnTerminate: false,
      enableHeadless: true,
      requiresBatteryNotLow: false,
      requiresCharging: false,
      requiresStorageNotLow: false,
      requiresDeviceIdle: false,
      requiredNetworkType: NetworkType.ANY,
    ),
    _onBackgroundFetch,
  ).then((int status) {
    print('[BackgroundFetch] configure success: $status');
  }).catchError((e) {
    print('[BackgroundFetch] configure ERROR: $e');
  });
}

void _onBackgroundFetch(String taskId) async {
  final locationService = LocationService();
  final dbHelper = DatabaseHelper.instance;

  final location = await locationService.getLocation();
  if (location != null) {
    await dbHelper.insert({
      'latitude': location.latitude,
      'longitude': location.longitude,
      'timestamp': DateTime.now().millisecondsSinceEpoch,
      'synced': 0,
    });
  }

  FlutterBackgroundFetch.finish(taskId);
}