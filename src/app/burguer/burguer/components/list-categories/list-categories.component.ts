import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {

  // definimos la lista de categorias
  public listCategories: any[];

  // Inyectamos el productService y el productService tiene los productos y categorias, vamos a
  // utilizar en el list-categories.html el productService
  constructor(
    private productService: ProductService
  ) { 
    this.listCategories = [];
  }

  // Cuando empezemos cargamos  
  ngOnInit(): void {
    this.listCategories = this.productService.categories;
  }

  // Metodo que se llama en el html cuando click sobre una categoria y se le pasa como parametro
  // la categoria para que obtenga los productos.
  // category es un parametro que esta asociado al products.json y en ese json tiene products
  // y dentro de products tiene name, img, price, extras etc
  selectCategory(category){
    //console.log("entro a selectCategory con categoria: ", category);
    this.productService.productsSelected = category.products;
  }

}
