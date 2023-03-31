import { Component, OnInit } from '@angular/core';
import { find, forEach } from 'lodash';
import { Imagen } from '../models/imagen';
import { ImagenService } from '../services/imagen.service';
import { TranslateService } from '../services/translate.service';
import { Proveedor } from './proveedor';
import { ProveedorService } from './proveedor.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {


  public titulo: string = "Lista de proveedores";
  // definimos la vble proveedores que va a devolver una lista y esta tambien se va a utilizar en el 
  // html, hacemos uso del model y lo importamos,  lo va a almacenar en una lista porque llegan varios
  // registros
  proveedores: Proveedor[];  

  // Carga el model
  imagenes: Imagen[]  = [];

  public cols: any[];
  public showCategories: boolean;
  public selectCategories: string[];
  public searchWord: string;  
  
  selectedCustomers: Proveedor[];
  //representatives: Representative[];
  statuses: any[];
  loading: boolean = true;

  constructor(private translateService: TranslateService, private proveedorService: ProveedorService,
    private imagenService: ImagenService) { 
    //this.proveedores = [];
    this.selectCategories = [];
    // Creo las columnas para la tabla
    /*this.cols = [
      { header: this.translateService.getTranslate("label.id.supplier") },
      { header: this.translateService.getTranslate("label.name.supplier") },
      { header: this.translateService.getTranslate("label.lastname.supplier") },
      { header: this.translateService.getTranslate("businessname.supplier") }
    ];*/
    this.showCategories = false;  
  }

  // Cuando cargue la aplicación ejecuta el metodo recuperar todos y con el subscribe ocurre la
  // magia de obtener la lista de proveedores, con funciones de flecha => y donde 
  // e es una vble si tuviera mas 
  // debe declararse con private para poder acceder a ella desde aqui    
  ngOnInit(): void {
    //this.cargarProveedores();
    this.cargarProveedoresImagenes();
  }

  // Carga la lista de proveedores
  cargarProveedores(){
    this.proveedorService.getAll().subscribe(
      pr => this.proveedores = pr
    );
  }

  // Carga la lista de proveedores imagenes
  cargarProveedoresImagenes(){
    this.proveedorService.getAll().subscribe(prov => {
      
      // Obtengo las imagenes
      this.imagenService.List().subscribe(imagen => {

        forEach(prov, p => {
          forEach(p, (c_prov, index) => {

            const imagenFound = find(imagen, i => i.id === c_prov);
            console.log("imagenFound", imagenFound)
            if (imagenFound) {
              //p.idFoto[index] = imagenFound.id
              console.log("p.idFoto", p.idFoto[index]);
              console.log("p.idFoto", p.idFoto);
            }

          }); // Cierra foreach imagen
        });   // Cierra foreach proveedor
        console.log("prov", prov)
        this.proveedores = prov;    
      }, error => {
        console.error("Error al recuperar las imagenes: " ,  error);
      })  // cierra el subscribe de imagenes      
    }, error => {
      alert("error recuperando los provedores por favor verifique que tenga imagenes");
      console.error("error recuperando los provedores por favor verifique que tenga imagenes" , error);
    });
  }
 

  // carga las imagenes
  cargarImegenes(): void{
    this.imagenService.List().subscribe(
      data => {
        this.imagenes = data;
      }
    );
  }  

  // Cargar imagen
  cargarImagen(id: number): void{
    // se puede cargar el spinner de ngmodel
    this.imagenService.cargarImagen(id).subscribe(
      data => this.imagenes = data)
  }

}
