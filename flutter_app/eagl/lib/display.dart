import 'dart:io';
import 'package:flutter/material.dart';

class DisplayImagePage extends StatelessWidget {
  final List<Map<String, dynamic>> capturedPhotos;

  const DisplayImagePage({Key? key, required this.capturedPhotos}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Captured Photos'),
      ),
      body: ListView.builder(
        itemCount: capturedPhotos.length,
        itemBuilder: (context, index) {
          return ListTile(
            title: Image.file(
              capturedPhotos[index]['file'],
              width: 200,
              height: 200,
              fit: BoxFit.cover,
            ),
            subtitle: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Location: ${capturedPhotos[index]['location']}'),
                Text('Timestamp: ${capturedPhotos[index]['timestamp']}'),
              ],
            ),
          );
        },
      ),
    );
  }
}
