import { inject, Injectable } from "@angular/core";
import { BaseDatosConfig } from "../config/base-datos.config";
import { Nota } from "../modelos/nota.model";

@Injectable({
    providedIn: 'root'
})
    
export class NotaRepository{
    private baseDatosConfig = inject(BaseDatosConfig)

    async obtenerTodos(): Promise<Nota[]>{

       const db = await this.baseDatosConfig.obtenerConexionDB();
       const respuesta = await db.query(`SELECT * FROM nota`)

       return respuesta.values as Nota[] || []
    }

    async crearNota(tarea: Nota): Promise<void>{
       const db = await this.baseDatosConfig.obtenerConexionDB();
       const insert = `INSERT INTO nota (descripcion) VALUES (?)`

       await db.run(insert, [tarea.descripcion])
    }

    async actualizarNota(id: number, descripcion: string): Promise<void>{
        const db = await this.baseDatosConfig.obtenerConexionDB()
        const actualizar = `UPDATE nota SET descripcion = ?  WHERE id = ?`

        await db.run(actualizar, [descripcion, id])
    }

    async eliminarNota(id: number): Promise<void> {
       const db = await this.baseDatosConfig.obtenerConexionDB()
       const eliminar = `DELETE FROM nota WHERE id = ?`

       await db.run(eliminar, [id])
    }
}