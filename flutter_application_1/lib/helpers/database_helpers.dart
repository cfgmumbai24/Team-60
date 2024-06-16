import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';

class DatabaseHelper {
  static final _databaseName = "LocationDB.db";
  static final _databaseVersion = 1;
  static final table = 'location';

  static final columnId = '_id';
  static final columnLatitude = 'latitude';
  static final columnLongitude = 'longitude';
  static final columnTimestamp = 'timestamp';
  static final columnSynced = 'synced';

  DatabaseHelper._privateConstructor();
  static final DatabaseHelper instance = DatabaseHelper._privateConstructor();

  static Database? _database;

  Future<Database?> get database async {
    if (_database != null) return _database;
    _database = await _initDatabase();
    return _database;
  }

  _initDatabase() async {
    String path = join(await getDatabasesPath(), _databaseName);
    return await openDatabase(path, version: _databaseVersion, onCreate: _onCreate);
  }

  Future _onCreate(Database db, int version) async {
    await db.execute('''
      CREATE TABLE $table (
        $columnId INTEGER PRIMARY KEY,
        $columnLatitude REAL NOT NULL,
        $columnLongitude REAL NOT NULL,
        $columnTimestamp INTEGER NOT NULL,
        $columnSynced INTEGER NOT NULL
      )
      ''');
  }

  Future<int> insert(Map<String, dynamic> row) async {
    Database? db = await instance.database;
    return await db!.insert(table, row);
  }

  Future<List<Map<String, dynamic>>> queryUnsynced() async {
    Database? db = await instance.database;
    return await db!.query(table, where: '$columnSynced = ?', whereArgs: [0]);
  }

  Future<int> update(int id, Map<String, dynamic> row) async {
    Database? db = await instance.database;
    return await db!.update(table, row, where: '$columnId = ?', whereArgs: [id]);
  }
}