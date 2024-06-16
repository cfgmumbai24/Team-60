// data_model.dart
class FormData {
  final String name;
  final String village;
  final int goats;
  final String certificate;
  final String timestamp;
  final double latitude;
  final double longitude;

  FormData({
    required this.name,
    required this.village,
    required this.goats,
    required this.certificate,
    required this.timestamp,
    required this.latitude,
    required this.longitude,
  });

  factory FormData.fromJson(Map<String, dynamic> json) {
    return FormData(
      name: json['name'],
      village: json['village'],
      goats: json['goats'],
      certificate: json['certificate'],
      timestamp: json['timestamp'],
      latitude: json['latitude'],
      longitude: json['longitude'],
    );
  }
}
