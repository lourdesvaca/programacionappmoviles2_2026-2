import { Injectable } from "@angular/core";

import {
    CapacitorSQLite,
    SQLiteConnection,
    SQLiteDBConnection
} from '@capacitor-community/sqlite';

@Injectable({ providedIn: 'root'})
export class BaseDatosConfig{
     private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
     private baseDatos!: SQLiteDBConnection;
     private dbListo!: Promise<SQLiteDBConnection>;

     constructor(){
        this.dbListo = this.iniciarConexion();
     }

     private async iniciarConexion(): Promise<SQLiteDBConnection>{
        this.baseDatos = await this.sqlite.createConnection(
           'nota_db',
           false,
           'no-encryption',
           1,
           false
        );

        await this.baseDatos.open();

        const crearTabla = `CREATE TABLE IF NOT EXISTS nota(
           id INTEGER  PRIMARY KEY AUTOINCREMENT,
           descripcion TEXT NOT NULL
        );`

        await this.baseDatos.execute(crearTabla)
        return this.baseDatos
     }

     obtenerConexionDB(): Promise<SQLiteDBConnection>{
        return this.dbListo
     }
}