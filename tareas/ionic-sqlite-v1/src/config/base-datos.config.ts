import { Injectable } from '@angular/core';

import {
    CapacitorSQLite, SQLiteConnection, SQLiteDBConnection
} from '@capacitor-community/sqlite';

@Injectable({ providedIn: 'root'})
export class BaseDatosConfig{
    private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
    private baseDatos!: SQLiteConnection;
    private dbListo!: Promise<SQLiteConnection>;

    constructor(){
        this.dbListo = this.iniciarConexion();
    }

    private async iniciarConexion(): Promise<SQLiteDBConnection>{
        this.baseDatos = await this.sqlite.createConnection(
            'persona_db',
            false,
            'no-encryption',
            1,
            false
        );

        await this.baseDatos.open();

        const createTabla = `CREATE TABLE IF NOT EXISTS persona(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL
        );`

        await this.baseDatos.execute(createTabla)
        return this.baseDatos
    }

    obtenerConexionDB():Promise<SQLiteDBConnection>{
        return this.dbListo
    }
}

function Injectable(arg0: { providedIn: string; }): (target: typeof BaseDatosConfig) => void | typeof BaseDatosConfig {
    throw new Error('Function not implemented.');
}
