import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';
import 'package:location/location.dart';

class FormScreen extends StatefulWidget {
  @override
  _FormScreenState createState() => _FormScreenState();
}

class _FormScreenState extends State<FormScreen> {
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _villageNameController = TextEditingController();
  final TextEditingController _goatsController = TextEditingController();
  final TextEditingController _certificatesController = TextEditingController();

  LocationData? _currentLocation;

  @override
  void initState() {
    super.initState();
    _getCurrentLocation();
  }

  Future<void> _getCurrentLocation() async {
    Location location = Location();

    bool _serviceEnabled;
    PermissionStatus _permissionGranted;
    LocationData _locationData;

    _serviceEnabled = await location.serviceEnabled();
    if (!_serviceEnabled) {
      _serviceEnabled = await location.requestService();
      if (!_serviceEnabled) {
        return;
      }
    }

    _permissionGranted = await location.hasPermission();
    if (_permissionGranted == PermissionStatus.denied) {
      _permissionGranted = await location.requestPermission();
      if (_permissionGranted != PermissionStatus.granted) {
        return;
      }
    }

    _locationData = await location.getLocation();
    setState(() {
      _currentLocation = _locationData;
    });
  }

  Future<void> _submitForm() async {
    String name = _nameController.text;
    String village = _villageNameController.text;
    String goats = _goatsController.text;
    String certificate = _certificatesController.text;

    String timestamp = DateFormat('yyyy-MM-dd – kk:mm:ss').format(DateTime.now());

    // Ensure goats is parsed as an integer
    int parsedGoats = int.tryParse(goats) ?? 0;

    // Ensure latitude and longitude are correctly formatted
    double latitude = _currentLocation?.latitude ?? 0.0;
    double longitude = _currentLocation?.longitude ?? 0.0;

    // Prepare the JSON data to send
    Map<String, dynamic> formData = {
      'name': name,
      'village': village,
      'goats': parsedGoats,
      'certificate': certificate,
      'timestamp': timestamp,
      'latitude': latitude,
      'longitude': longitude,
    };

    // Convert form data to JSON string
    String jsonData = jsonEncode(formData);
    print('Sending JSON data: $jsonData'); // Print the JSON data being sent

    // Replace with your backend server URL
    String url = 'https://cfg-backend.vercel.app/api/beni';

    try {
      final response = await http.post(
        Uri.parse(url),
        headers: <String, String>{
          'Content-Type': 'application/json'
        },
        body: jsonData,
      );

      if (response.statusCode == 200) {
        // Handle successful submission
        print('Form submitted successfully!');
      } else {
        // Handle other status codes
        print('Failed to submit form. Status code: ${response.statusCode}');
        print('Response body: ${response.body}');
      }
    } catch (e) {
      // Handle network errors
      print('Error submitting form: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Submit Form'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            TextField(
              controller: _nameController,
              decoration: InputDecoration(
                labelText: 'Name',
              ),
            ),
            SizedBox(height: 20),
            TextField(
              controller: _villageNameController,
              decoration: InputDecoration(
                labelText: 'Village Name',
              ),
            ),
            SizedBox(height: 20),
            TextField(
              controller: _goatsController,
              decoration: InputDecoration(
                labelText: 'Number of Goats',
              ),
              keyboardType: TextInputType.number,
            ),
            SizedBox(height: 20),
            TextField(
              controller: _certificatesController,
              decoration: InputDecoration(
                labelText: 'Certificates',
              ),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: _submitForm,
              child: Text('Submit'),
            ),
          ],
        ),
      ),
    );
  }

  @override
  void dispose() {
    _nameController.dispose();
    _villageNameController.dispose();
    _goatsController.dispose();
    _certificatesController.dispose();
    super.dispose();
  }
}
