import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ImagenService } from '../services/imagen.service';

@Component({
  selector: 'app-nueva',
  templateUrl: './nueva.component.html',
  styleUrls: ['./nueva.component.css']
})
export class NuevaComponent implements OnInit {

  // Creamos un Viewchild, y con este nombre imagenFile estoy accediendo al formulario html, alla lo llamamos
  // imagenInputFile y este imagenFile lo vamos a utilizar en el reset y es el nombre de la vble
  @ViewChild('imagenInputFile', {static: false}) imagenFile: ElementRef;

  public imagenMin: File;
  public imagen: File;

  // Inyectamos el imagenservice, el router para que me dirija a la pagina ppal
  constructor(private imagenService: ImagenService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  // Cargamos la imagen y si carga bien redirijimos a la lista, sino muestra alerta
  onUpLoad(): void{
    this.imagenService.upload(this.imagen).subscribe(
      data => {
        this.router.navigate(['/']);
      }, err =>{
        // Este mensaje es el que definimos en en backend
        alert(err.error.mensaje);
        this.reset();
      }
    );
  }

  // Accedemos al elemento seleccionado y lo cargamos a la vble imagen
  onFileChange(event){
    this.imagen = event.target.files[0];
    const fr    = new FileReader();
    fr.onload   = (evento: any) =>{
      this.imagenMin = evento.target.result;
    };
    fr.readAsDataURL(this.imagen);
  }

  reset(){
    this.imagen = null;
    this.imagenMin = null;

    this.imagenFile.nativeElement.value = '';

  }

}
