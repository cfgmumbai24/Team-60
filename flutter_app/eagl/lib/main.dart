import 'dart:io';
import 'package:eagl/bene.dart';
import 'package:flutter/material.dart';
import 'capture.dart';
import 'display.dart';
import 'form.dart'; // Assuming form.dart contains FormScreen
import 'location.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  final LocationService _locationService = LocationService();
  final PhotoCaptureService _photoCaptureService = PhotoCaptureService();

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Current Location ',
      theme: ThemeData(
        primarySwatch: Colors.blueGrey, // Change primarySwatch to dark blue
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: HomeScreen(locationService: _locationService, photoCaptureService: _photoCaptureService),
    );
  }
}

class HomeScreen extends StatefulWidget {
  final LocationService locationService;
  final PhotoCaptureService photoCaptureService;

  const HomeScreen({Key? key, required this.locationService, required this.photoCaptureService}) : super(key: key);

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  List<Map<String, dynamic>> _capturedPhotos = [];

  @override
  void initState() {
    super.initState();
    _initServices();
  }

  Future<void> _initServices() async {
    await widget.locationService.init();
  }

  Future<void> _capturePhoto() async {
    var photoData = await widget.photoCaptureService.capturePhoto();
    if (photoData != null) {
      setState(() {
        _capturedPhotos.add(photoData);
      });
    }
  }

  void _navigateToPhotoDisplayPage() {
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (context) => DisplayImagePage(capturedPhotos: _capturedPhotos),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Location & Photo Capture'),
        actions: [
          IconButton(
            icon: Icon(Icons.camera_alt),
            onPressed: _capturePhoto,
          ),
        ],
      ),
      drawer: Drawer(
        child: Container(
          color: Colors.blueGrey[900], // Dark blue background color
          child: ListView(
            padding: EdgeInsets.zero,
            children: <Widget>[
              Container(
                height: 100, // Smaller header height
                child: DrawerHeader(
                  decoration: BoxDecoration(
                    color: Colors.blueGrey[900], // Dark blue background color
                  ),
                  child: Center(
                    child: Text(
                      'Navigation',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ),
              ),
              ListTile(
                leading: Icon(Icons.photo, color: Colors.white),
                title: Text(
                  'Captured Photos',
                  style: TextStyle(fontSize: 18, color: Colors.white),
                ),
                onTap: () {
                  Navigator.pop(context);
                  _navigateToPhotoDisplayPage();
                },
              ),
              Divider(color: Colors.white),
              ListTile(
                leading: Icon(Icons.edit, color: Colors.white),
                title: Text(
                  'Fill Form',
                  style: TextStyle(fontSize: 18, color: Colors.white),
                ),
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => FormScreen()),
                  );
                },

              ),
          Divider(color: Colors.white),
          ListTile(
            leading: Icon(Icons.edit, color: Colors.white),
            title: Text(
              'Beneficiary',
              style: TextStyle(fontSize: 18, color: Colors.white),
            ),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => DataDisplayPage()),
              );
            },)
            ],
          ),
        ),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            if (widget.locationService.currentLocation != null)
              Column(
                children: [
                  Text(
                    'Latitude: ${widget.locationService.currentLocation!.latitude}',
                    style: TextStyle(fontSize: 20),
                  ),
                  SizedBox(height: 10),
                  Text(
                    'Longitude: ${widget.locationService.currentLocation!.longitude}',
                    style: TextStyle(fontSize: 20),
                  ),
                ],
              ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () async {
                await widget.locationService.init();
                setState(() {});
              },
              child: Text('Enter Location'),
            ),
          ],
        ),
      ),
    );
  }
}
