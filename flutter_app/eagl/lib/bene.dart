import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Data Display',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: DataDisplayPage(),
    );
  }
}

class DataDisplayPage extends StatefulWidget {
  @override
  _DataDisplayPageState createState() => _DataDisplayPageState();
}

class _DataDisplayPageState extends State<DataDisplayPage> {
  late Future<List<FormData>> futureData;

  @override
  void initState() {
    super.initState();
    futureData = fetchData();
  }

  Future<List<FormData>> fetchData() async {
    final String url = 'https://cfg-backend.vercel.app/api/beni';
    final response = await http.get(Uri.parse(url));

    if (response.statusCode == 200) {
      List<dynamic> responseData = jsonDecode(response.body);
      List<FormData> formDataList = responseData
          .map((data) => FormData.fromJson(data))
          .toList(); // Ensure FormData list is created
      return formDataList; // Return List<FormData>
    } else {
      throw Exception('Failed to load data');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Fetched Data Display'),
      ),
      body: FutureBuilder<List<FormData>>(
        future: futureData,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (snapshot.hasData && snapshot.data!.isNotEmpty) {
            return _buildDataDisplay(snapshot.data!);
          } else {
            return Center(child: Text('No data found'));
          }
        },
      ),
    );
  }

  Widget _buildDataDisplay(List<FormData> dataList) {
    return ListView.builder(
      padding: const EdgeInsets.all(16.0),
      itemCount: dataList.length,
      itemBuilder: (context, index) {
        final data = dataList[index];
        return Padding(
          padding: const EdgeInsets.symmetric(vertical: 8.0),
          child: Card(
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(10),
            ),
            elevation: 5,
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  _buildDataRow('Name:', data.name),
                  _buildDataRow('Village:', data.village),
                  _buildDataRow('Number of Goats:', data.goats.toString()),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildDataRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: TextStyle(
              fontWeight: FontWeight.bold,
            ),
          ),
          Text(value),
        ],
      ),
    );
  }
}

class FormData {
  final String name;
  final String village;
  final int goats;

  FormData({
    required this.name,
    required this.village,
    required this.goats,
  });

  factory FormData.fromJson(Map<String, dynamic> json) {
    return FormData(
      name: json['name'] ?? '',
      village: json['village'] ?? '',
      goats: json['goats'] ?? 0,
    );
  }
}
