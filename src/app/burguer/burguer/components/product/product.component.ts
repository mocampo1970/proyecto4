import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/models/product';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  // Viewchild para el manejo de los modales y tambien inyectamos un servicio modalService
  @ViewChild("modal_add_product", {static:false}) modalAddProduct;

  // Definimos el producto debe ser public para que se pueda usar en el html
  public product: Product;
  public loadProduct: boolean;  

    // Extras del producto
    public extras: any;
    // Indice del extra actual
    public extraSelected: number;

  // Inyectamos el ProductService la orderService y el ngbModal para abrir el modal
  constructor(
    private productService: ProductService,
    private router: Router,
    private orderService: OrderService,
    private modalService: NgbModal
  ) { 
    // Iniciamos en null el producto
    this.product = null;
    this.extras = null;
    this.extraSelected = 0;
    this.loadProduct = false;    
  }

  // le llevamos al producto el productService seleccionado
  ngOnInit(): void {
    this.product = this.productService.productSelected;

    // Si el producto no existe lo mandamos de nuevo a las categorias, si existe como ya aqui tenemos 
    // el modelo creamos el producto
    if (!this.product) {
      this.router.navigate(['/list-categories'])
    }else{
      this.product = new Product(this.productService.productSelected);

      // Si tiene extras, se los añadimos
      if (this.product.extras) {
        this.extras = this.product.extras[this.extraSelected];
      }
      this.loadProduct = true;      
      }

  }

  /**
   * Indica si tiene un extra previo
   */
   hasPrevious() {
    // Compruebo si hay extras
    if (!this.product.extras) {
      return false;
    }
    
    return this.product.extras[this.extraSelected - 1];
  }

  /**
   * Indica si hay un extra siguiente
   */
  hasNext() {
    // Compruebo si tiene extras
    if (!this.product.extras) {
      return false;
    }
    return this.product.extras[this.extraSelected + 1];
  }  

  /**
   * Cambia los extras al anterior
   */
   previous() {
    this.extraSelected = this.extraSelected - 1;
    this.extras = this.product.extras[this.extraSelected];
  }

  /**
   * Cambia los extras al siguiente
   */
  next() {
    this.extraSelected = this.extraSelected + 1;
    this.extras = this.product.extras[this.extraSelected];
  }  

  // Metodo que va a utilizar la orden para adicionar productos al pedido mediante 
  // el servicio orderService y con orderService.order accedemos al model
  // y alli tenemos un metodo que se llama addProduct.
  // y este metodo se llama desde product.component.html
  addProductOrder(){
    this.orderService.order.addProduct(this.product);

    console.log(this.orderService.order);    

    // Reseteamos los productos
    this.productService.resetProducts();

    // Cuando adicionemos un producto abrimos el modal
    this.modalService.open(this.modalAddProduct);

    // Volvemos al inicio
    this.router.navigate(['/list-categories']);
  }

  /**
   * Añade el producto al pedido
   */
   //addProductOrder(){
    /*
    // añado el producto
    this.orderService.order.addProduct(this.product);
    console.log(this.orderService.order);
    // Reseteamos los productos
    this.productService.resetProducts();
    // Mostramos el modal de confirmación
    this.modalService.open(this.modalAddProduct);
    // Volvemos al inicio
    this.router.navigate(['/list-categories']);
    */

  //}  

}
