import { Component, OnInit } from '@angular/core';
import { version } from 'process';
import { Ibusqueda } from '../interfaces/ibusqueda';
import { Busqueda } from '../models/busqueda';
import { CochesService } from './coches.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-coches',
  templateUrl: './coches.component.html',
  styleUrls: ['./coches.component.css']
})
export class CochesComponent implements OnInit {

  coches: any[] = [];
  // se va a utilizar en el html en el select de marcas para que traiga todas las marcas
  // y se llena en el ngOnit y se llena cochesservice.marcas().subscribe desde el servicio
  // rest
  marcas: any[] = [];   
  marcaElegida: any = null;

  apiResponse: any = [];

  // Inicializamos vacios los campos de la interfaz ibusqueda
  busqueda: Ibusqueda = {
    marca: '',
    modelo: '',
    version: '',
    cambio: '',
    color: '',
    kmDesde: null,
    kmHasta: null
  };

  // Inyectamos servicio
  constructor(private cochesservice: CochesService) { }

  // propiedad que se utiliza en el coches.html en el filtro
  filterMarca = '';  

  ngOnInit(): void {
    this.listaMarcas();
    this.listaCoches();

  }

  // Listas de marcas y coches
  // Como es un observable en el service en este metodo marcas se necesita un subscribe aqui
  // y aqui me llena marcas que se va a utilizar en el ngFor del select de marcaElegida
  listaMarcas(): void{
    this.cochesservice.marcas().subscribe(
      data => {
        this.marcas = data;
      }, err =>{
        console.log(err);
      }
      );
  }

  listaCoches(): void{
    this.cochesservice.coches(this.busqueda).subscribe(
      data =>{
        this.coches = data;
      }, err =>{
        console.log(err);
      }
    )
  }

  // Metodo que se va a utilizar cuando cambie la marca que muestre solo en pantalla los datos 
  // de esa marca. 
  onChangeMarca(): void {

    console.log("onChangeMarca(), Marca elegida", this.marcaElegida)

    if (this.marcaElegida) {
      this.busqueda.marca = this.marcaElegida.nombre;
    } else {
      this.busqueda.marca = '';
    }
    this.listaCoches();
  }

  onChange($event: any){
    console.log("Entro a onChange ")

    console.log("$event-> ", $event)

    let filteredData = _.filter(this.apiResponse,(item) =>{
      return item.marca.toLowerCase() == $event.value.toLowerCase();
    })
  }

  onSelect(id: number): void{
    console.log("id", id)
  } 

  // Estos metodos de clear se van a utilizar cuando presionen vaciar
  clearVersion(): void{
    this.busqueda.version = '';
    this.listaCoches();
  }

  clearKmDesde(){
    this.busqueda.kmDesde = null;
    this.listaCoches();
  }

  clearKmHasta(){
    this.busqueda.kmHasta = null;
    this.listaCoches();    
  }

  clear(): void{
    this.marcaElegida = null;
    this.busqueda.marca = '';
    this.busqueda.modelo = ''; 
    this.busqueda.version = '';
    this.busqueda.cambio = '';
    this.busqueda.color = '';
    this.busqueda.kmDesde = null;
    this.busqueda.kmHasta = null;  
    this.listaCoches();       
  }


}
