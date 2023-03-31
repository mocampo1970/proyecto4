import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ImagenService } from 'src/app/services/imagen.service';  //'../services/imagen.service';
import { Proveedor } from 'src/app/proveedores/proveedor';

@Component({
  selector: 'app-addproveedor',
  templateUrl: './addproveedor.component.html',
  styleUrls: ['./addproveedor.component.css']
})
export class AddproveedorComponent implements OnInit {

  // Aqui vamos a declarar un objeto de tipo estudiante para poder mapearlo en la vista
  proveedor: Proveedor = new Proveedor();
  titulo: string= "Registro de proveedor";  

  // Creamos un Viewchild, y con este nombre imagenFile estoy accediendo al formulario html, alla lo llamamos
  // imagenInputFile y este imagenFile lo vamos a utilizar en el reset y es el nombre de la vble
  @ViewChild('imagenInputFile', {static: false}) imagenFile: ElementRef;

  public imagenMin: File;
  public imagen: File;

  constructor(private imagenService: ImagenService,
    private router: Router) { }

  ngOnInit(): void {
  }

  // Cargamos la imagen y si carga bien redirijimos a la lista, sino muestra alerta
  onUpLoad(): void{
    this.imagenService.upload(this.imagen).subscribe(
      data => {
        this.router.navigate(['/proveedor']);
      }, err =>{
        // Este mensaje es el que definimos en en backend
        alert(err.error.mensaje);
        this.reset();
      }
    );
  }  


  reset() {
      this.imagen = null;
      this.imagenMin = null;
      this.imagenFile.nativeElement.value = '';
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

}
