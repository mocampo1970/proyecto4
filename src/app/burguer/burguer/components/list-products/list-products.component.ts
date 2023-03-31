import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  public listProducts: Product[];

 // Inyectamos el productService y el productService tiene los productos y categorias, vamos a
  // utilizar en el list-productos.html el productService
  constructor(
    private productService: ProductService,
    private router: Router
  ) { 
    this.listProducts = [];
  }

  ngOnInit(): void {
    this.listProducts = this.productService.productsSelected;

    // Se coloca este IF por si llega de afuera o sea desde la url, si no existe
    if (!this.listProducts) {
      this.router.navigate(['/list-categories']);
    }

  }

  // Metodo que se llama en el html cuando click sobre un producto y se le pasa como parametro
  // el producto. Ese producto viene en el html en el *ngFor
  selectProduct(product){
    this.productService.productSelected = product;
  }  

}
