import 'package:flutter/material.dart';
import 'package:flutter_background_fetch/flutter_background_fetch.dart';
import 'services/location_service.dart';
import 'helpers/database_helper.dart';
import 'services/connectivity_service.dart';
import 'services/sync_service.dart';
import 'helpers/background_fetch_helper.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();

  FlutterBackgroundFetch.registerHeadlessTask(backgroundFetchHeadlessTask);
  initializeBackgroundFetch();

  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  final LocationService _locationService = LocationService();
  final DatabaseHelper _dbHelper = DatabaseHelper.instance;
  final ConnectivityService _connectivityService = ConnectivityService();
  final SyncService _syncService = SyncService();

  @override
  void initState() {
    super.initState();

    _connectivityService.startMonitoring(() async {
      await _syncService.syncLocations();
    });
  }

  @override
  void dispose() {
    _connectivityService.stopMonitoring();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Delivery Tracker'),
        ),
        body: Center(
          child: Text('Tracking delivery location...'),
        ),
      ),
    );
  }
}