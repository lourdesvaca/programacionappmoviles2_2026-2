import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonInput, IonButton, IonItem, IonList,
  IonItemOption, IonItemOptions, IonItemSliding
} from '@ionic/angular';
import { PersonaRepository } from '../../repository/persona-repository.service';
import { FormControl, Validators } from '@angular/forms';
import { Persona } from '../../modelos/persona.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonList, IonInput, IonButton,
    IonItemOption, IonItemOptions, IonItemSliding],
})
export class HomePage {
  private usuarioRepo = inject(PersonaRepository)
  private personas = signal<Persona[] | null>(null)

  protected nombreInput = new FormControl("",[Validators.required])
  private cdr = inject(ChangeDetectorRef)
  
  ngOnInit(): void{
    this.cargarTodos()
  }

  async agregar() {
    //if (this.nombreInput.valid && this.nombreInput != null) {
    const persona: Persona = { nombre: this.nombreInput?.value }
    await this.usuarioRepo.crearPersona(persona)
    this.nombreInput.setValue("")
    this.cargarTodos()
      /*  .then((respuesta) => {
          console.log(respuesta)
          this.personas.set(respuesta)
          this.cdr.detectChanges()
      })
    }*/
  }

  cargarTodos() {
    this.usuarioRepo.obtenerTodos()
      .then((respuesta) => {
        console.log(respuesta)
        this.personas.set(respuesta)
        this.cdr.detectChanges()
    })
  }

  editar(persona: Persona) {
    if (!persona.id) return
    const nombreActualizado = prompt("Nombre nombre: ", persona.nombre)
    if (nombreActualizado && nombreActualizado.trim().length > 0) {
      this.usuarioRepo.actualizarPersona(persona.id, nombreActualizado)
        .then((respuesta) => {
          this.cargarTodos();
      })
    }
  }

  eliminar(id: number | null) {
    if (id) {
      this.usuarioRepo.eliminarPersona(id)
      .then((respuesta) => {
        this.cargarTodos()
      })
    }
  }
}
