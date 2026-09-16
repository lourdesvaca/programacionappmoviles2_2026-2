import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonList, 
  IonLabel, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/angular';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { Nota } from '../modelos/nota.model';
import { NotaRepository } from '../repository/nota-repository.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonItemOption, IonItem, IonButton, IonItemSliding, IonList, IonInput,
    IonHeader, IonToolbar, IonTitle, IonContent, IonLabel, IonItemOptions,
    FormsModule, ReactiveFormsModule],
})
  
export class HomePage implements OnInit {
  private tareaRepo = inject(NotaRepository);
  protected notas = signal<Nota[] | null>([]);

  protected descripcionInput = new FormControl("", [Validators.required]);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.cargarTodos();
  }
  
  async agregarNota() {
    const nota: Nota = { descripcion: this.descripcionInput?.value ?? "" }
    this.tareaRepo.crearNota(nota);
    .then((respuesta) => {
      this.descripcionInput.setValue("")
      this.cargarTodos()
    })
  }

  cargarTodos() {
    this.tareaRepo.obtenerTodos()
      .then((respuesta) => {
        console.log(respuesta)
        this.notas.set(respuesta)
        this.cdr.detectChanges()
      })
  }

  editarNota(nota: Nota) {
    if (!nota.id) return
    const descripcionActualizada = prompt("Editar nota: ", nota.descripcion);
    if (descripcionActualizada && descripcionActualizada.trim().length > 0) {
      this.tareaRepo.actualizarNota(nota.id, descripcionActualizada)
        .then((respuesta) => {
          this.cargarTodos();
        })
    }
  }

  eliminarNota(id: number | null) {
    if (id){
    this.tareaRepo.eliminarNota(id)
      .then((respuesta) => {
        this.cargarTodos();
      })
    }

  }
}
