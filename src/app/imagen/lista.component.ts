import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Imagen } from '../models/imagen';
import { ImagenService } from '../services/imagen.service';
import { DetalleComponent } from './detalle.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  imagenes: Imagen[]  = [];

  // Inyectamos el imagenservice
  constructor(private imagenService: ImagenService,
    private modalservice: NgbModal) { }

  ngOnInit(): void {
    this.cargarImegenes();
  }

  // carga las imagenes
  cargarImegenes(): void{
    this.imagenService.List().subscribe(
      data => {
        this.imagenes = data;
      }
    );
  }

  // Borrar imagenes
  borrar(id: number): void{
    // se puede cargar el spinner de ngmodel
    this.imagenService.delete(id).subscribe(
      data => {
        this.cargarImegenes();
      },
      error => {
        console.log(error);
      }
    );
  }

  abrirModal(): void {
    // mensajito en pantalla
    alert('modal');
    // abre el modal de la clase DetalleComponent que es el componente detallado
    this.modalservice.open(DetalleComponent);
  }

}
