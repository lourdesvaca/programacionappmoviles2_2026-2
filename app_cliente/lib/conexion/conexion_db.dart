import 'package:path/path.dart';


class ConexionDb {
  ConexionDb._();
  static final ConexionDb instancia = ConexionDb._();

  static const String _nombreBd = 'clientes_db';
  static const int _version = 1;
  static const String tablaClientes = 'clientes';

  Database? _db;

  Future<Database> get database async => _db ??= await _abrir();

  Future<Database> _abrir() async {
    final ruta = join(await getDatabasesPath(), _nombreBd);
    return openDatabase(
      ruta,
      version: _version,
      onCreate: (db, version) async {
        await db.execute('''
          CREATE TABLE $tablaClientes (
            id INTEGER NOT NULL,
            nombre TEXT NOT NULL,
            apellido TEXT NOT NULL,
            telefono INTEGER,
            correo TEXT,
            contraseña TEXT NOT NULL
          )
        ''');
      },
    );
  }
}