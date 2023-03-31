import { IOrder } from "../interfaces/iorder";
// importamos lodash 
import * as _ from 'lodash';
import { Product } from "./product";

// Model implmenta la interface y aqui arriba importa la clase entidad product para tener todos los
// campos del producto
export class Order implements IOrder{

    // Constructor
    constructor(data){
        _.set(this, 'data', data)
        // Para que empiece con algo vacio
        this.productsOrder = [];
    }

    // get
    get productsOrder(): Product[]{
        return _.get(this, 'data.productsOrder');
    }

    // set
    set productsOrder(value: Product[]){
        _.set(this, 'data.productsOrder', value);    
    }

    // metodo para adicionar un producto
    addProduct(product: Product){

        // Pero puede ser que nuestro producto ya exista por ejm pido una ensalada y voy a pedir otra
        // debe sumar 2 y asi sucesivamente.
        const productFound = _.find(this.productsOrder, p =>{

            // Puede que el producto sea = pero la cantidad no, para eso hacemos el clonedeep y el unset
            let copy = _.cloneDeep(p);
            // y en esta va a descartar la cantidad
            _.unset(copy, 'data.quantity')
            // Con eso comparamos los productos excepto la cantidad
            return _.isEqual(copy, product);
        })

        // Si lo encuentra añado 1 a la cantidad
        if (productFound) {
            product.quantity++;
        }else{

            // Sino lo encuentra le asignamos 1 a la cantidad en el product, lo tenia como 
            // productFound y saco error
            product.quantity = 1;

            // Crea el push que es el que crea el producto
            this.productsOrder.push(product);                

        }

    }

    /**
     * Añade en uno mas la cantidad del producto pasado
     * @param product producto a incrementar
     */
     oneMoreProduct(product: Product) {
        product.quantity++;
    }

    /**
     * Quito en uno la cantidad del producto pasado
     * @param product producto a restar
     */
    oneLessProduct(product: Product) {
        product.quantity--;
        // Si la cantidad es cero, se borra de los productos
        if (product.quantity === 0) {
            // IMPORTANTE: en este caso no es necesario modificar ningun producto,
            // ya que en este caso estaran con las mismas propiedades
            _.remove(this.productsOrder, p => _.isEqual(p, product))
        }
    }

    /**
     * Devuelve el numero de productos en el pedido
     */
     numProducts() {
        return this.productsOrder.length;
    }

    /**
     * Devuelve el precio total de un pedido
     */
    totalOrder() {

        let total = 0;

        // Recorro los productos y sumo los productos
        _.forEach(this.productsOrder, p => {
            total += p.totalPrice() * p.quantity;
        });

        return total;
    }    


}
