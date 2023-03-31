import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _data: any;
  private _dataOriginal: any;  

  // importamos el modelo arriba -> import { Product } from '../models/product';
  // porque necesitamos acceder a los productos
  private _productsSelected: Product[];

  // definimos vble _productSelected para un solo producto, porque cuando estemos en la app y presionamos
  // click sobre los productos en 1 en particular lo va a mostrar ese solo. Lo refactoriamos para que nos 
  // cree el get y set abajo. Y ese _productSelected se usa en el list-products.component.html
  private _productSelected: Product;

  // Como casi a todos los servicios se inyecta el http 
  constructor(private http: HttpClient) { }

  // Estos 2 metodos get y set se obtienen, click derecho en _productsSelected y le decimos 
  // refactorizar y el me trae inmediatamente los  2 metodos.
  // para obtener los get y set del model producto
  get productsSelected(): Product[] {
    return this._productsSelected;
  }

  set productsSelected(value: Product[]) {
    this._productsSelected = value;
  } 

  // metodos get/set refactorizados del atributo _productsSelected
  public get productSelected(): Product {
    return this._productSelected;
  }

  public set productSelected(value: Product) {
    this._productSelected = value;
  }

  // Recupera las categorias solamente abajo son los productos aqui las categorias
  get categories(){
    return _.get(this._data, 'categories');
  }

  // Metodo que trae los datos de productos
  // voy a guardar la respuesta del http en _data y el cloneDeep es para clonar un objeto
  public getData(){
    return new Promise((resolve, reject) =>{
      this.http.get('assets/data/products.json').subscribe(data =>{
        this._data          = _.cloneDeep(data);
        this._dataOriginal  = _.cloneDeep(data);
        console.log(this._data);   
        resolve(true);
      }, error =>{
        console.error("Error al recuperar los productos" + error);
        reject(true);
      })
    })
  }

  /**
   * Resetea los datos al fichero json original.
   */
   resetProducts() {
    this._data = _.cloneDeep(this._dataOriginal);
  }

}
