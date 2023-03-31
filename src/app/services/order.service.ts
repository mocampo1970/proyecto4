import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  // Creamos un atributo del tipo model order con esto enlazamos este servicio con el modelo y el 
  // modelo con la interface
  // Pedido actual  
  private _order: Order;

  // Numero de pedido actual
  private _numOrder: number;      

  constructor(private http: HttpClient) {
    // Inicializamos para que empiece con algo vacio, yo lo coloque con [] y slaio error 
    //  verifique como lo tenia el profe {} y ya ok
    this._order = new Order({});
    // que la orden empiece en 1
    this._numOrder = 1;    
  }

  // Devuelve el numero de pedido actual
  get numOrder(): number {
    return this._numOrder;
  }

  //Setea el numero de pedido actual
  set numOrder(value: number) {
    this._numOrder = value;
  }

  // Luego refactorizamos para obtener los get y set del modelo orden
  public get order(): Order {
    return this._order;
  }

  public set order(value: Order) {
    this._order = value;
  }

  //Guarda el pedido en FireBase
  // va a retornar un observable de cualquier tipo  
  createOrder(): Observable<any> {

    // HttpHeaders Representa las opciones de configuración del encabezado para una solicitud HTTP.
    // El objeto original nunca se cambia.
    let headers = new HttpHeaders();
    // el content type es para que nos devuelva la respuesta    
    headers = headers.set('Content-type', 'application/json');

    // IMPORTANTE: esta ruta la cree en firebase cree un nuevo proyecto, cree el burguer-queen-app y allí cree
    //             la bd con ubicacion north america, con alguna regla y con mi cuenta de  
    //             correo de personalsoft.    
    const url = "https://burguer-queen-app-3be36-default-rtdb.firebaseio.com/orders.json";    

    // Crea el body para el POST
    // stringify -> Convierte un valor de JavaScript en una cadena de notación de objetos 
    // de JavaScript (JSON).
    const body = JSON.stringify(this.convertOrder());

    // Post inserta con la url, body y headers    
    return this.http.post(url, body, { headers: headers })      

  }

  // Convertir una orden para enviarla a Firebase  
  /**
   * Convierte el pedido actual a un formato especifico:
   *  - products: productos del pedido
   *  - date: fecha del pedido
   *  - numOrder: numero de pedido
   *  - priceOrder: precio del pedido
   */
  convertOrder() {

    const finalOrder = {
      "products": [],
      "date": new Date(),
      "numOrder": this._numOrder,
      "priceOrder": this.order.totalOrder()
    }  

    _.forEach(this.order.productsOrder, product => {

      // Creo una estructura del producto
      //  - name: nombre del producto
      //  - priceFinal: precio final del producto (precio * cantidad)
      //  - extras: los extras del producto (menu grande, patatas, etc.)
      //  - quantity: cantidad del producto pedido
      const finalProduct = {
        "name": product.name,
        "priceFinal": product.totalPrice() * product.quantity,
        "extras": product.getExtras(),
        "quantity": product.quantity
      }

      // añado el producto a nuestros productos.
      finalOrder.products.push(finalProduct);     

    });

    // Incremento el numero de pedido
    this._numOrder++;

    return finalOrder;

  }

  /**
   * Limpia la orden, creando una nueva orden
   */
  clearOrder() {
    this.order = new Order({});
  }
  
}
