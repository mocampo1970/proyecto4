import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Imagen } from '../models/imagen';
import { ImagenService } from '../services/imagen.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  // este viene de lista.component.html
  @Input() index;

  // se importa imagen
  imagenes: Imagen[] = [];

  // Inyectamos el NgbActiveModal, activeModal se declara en el detalle.ts public porque lo coloque private
  // y sale error, este activeModal hace que se cierre el modal de la X y se usa en el html
  constructor(public activeModal: NgbActiveModal, private imagenService: ImagenService) { }

  ngOnInit(): void {
    this.imagenService.List().subscribe(
      data => {
        this.imagenes = data;
      },
      err => {
        console.log("Error", err)
      }
    );
  }

}
