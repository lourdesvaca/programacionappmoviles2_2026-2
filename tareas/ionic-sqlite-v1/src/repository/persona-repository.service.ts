import { inject, Inject, Injectable } from '@angular/core';
import { BaseDatosConfig } from '../config/base-datos.config' 
import { Persona } from '../modelos/persona.model';

@Injectable({
    providedIn: 'root'
})
export class PersonaRepository{
    private baseDatosConfig = inject(BaseDatosConfig)

    
    async obtenerTodos(): Promise<Persona[]>{
       const db = await this.baseDatosConfig.obtenerConexionDB();
       const respuesta = await db.query(`SELECT * FROM persona`) 
       return respuesta.values as Persona[] || []
    }
    
    async crearPersona(usuario: Persona): Promise<void>{
        const db = await this.baseDatosConfig.obtenerConexionDB();
        const insert = `INSERT INTO persona(nombre) VALUES (?)`

        await db.run(insert, [usuario.nombre])
    }
    
    async actualizarPersona(id: number, nombre: string): Promise<void>{
        const db = await this.baseDatosConfig.obtenerConexionDB();
        const actualizar = `UPDATE persona SET nombre = ? WHERE id = ?)`

        await db.run(actualizar, [nombre, id])
    }
    

    async eliminarPersona(id: number): Promise<void>{
        const db = await this.baseDatosConfig.obtenerConexionDB();
        const eliminar = `DELETE FROM persona WHERE id = ?`
            
        await db.run(eliminar, [id]);
    }

}