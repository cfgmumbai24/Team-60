import 'dart:io';
import 'package:image_picker/image_picker.dart';
import 'package:intl/intl.dart';
import 'package:location/location.dart';

class PhotoCaptureService {
  final picker = ImagePicker();
  final Location locationService = Location();

  Future<Map<String, dynamic>?> capturePhoto() async {
    final pickedFile = await picker.pickImage(source: ImageSource.camera);

    if (pickedFile != null) {
      final File imageFile = File(pickedFile.path);

      // Request location permissions if not already granted
      bool serviceEnabled = await locationService.serviceEnabled();
      if (!serviceEnabled) {
        serviceEnabled = await locationService.requestService();
        if (!serviceEnabled) {
          return null;
        }
      }

      PermissionStatus permissionGranted = await locationService.hasPermission();
      if (permissionGranted == PermissionStatus.denied) {
        permissionGranted = await locationService.requestPermission();
        if (permissionGranted != PermissionStatus.granted) {
          return null;
        }
      }

      // Get the current location
      LocationData locationData = await locationService.getLocation();

      // Get the current timestamp
      final timestamp = DateFormat('yyyy-MM-dd – kk:mm:ss').format(DateTime.now());

      return {
        'file': imageFile,
        'location': 'Lat: ${locationData.latitude}, Lng: ${locationData.longitude}',
        'timestamp': timestamp,
      };
    } else {
      return null;
    }
  }
}
