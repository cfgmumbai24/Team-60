import 'dart:convert';
import 'package:http/http.dart' as http;
import 'database_helper.dart';

class SyncService {
  Future<void> syncLocations() async {
    final dbHelper = DatabaseHelper.instance;
    final List<Map<String, dynamic>> unsyncedLocations = await dbHelper.queryUnsynced();

    for (var location in unsyncedLocations) {
      final response = await http.post(
        Uri.parse('http://your-server-ip:3000/locations'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'latitude': location['latitude'],
          'longitude': location['longitude'],
          'timestamp': location['timestamp'],
        }),
      );

      if (response.statusCode == 200) {
        await dbHelper.update(location['id'], {'synced': 1});
      }
    }
  }
}