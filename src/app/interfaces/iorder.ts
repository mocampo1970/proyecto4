import { Product } from "../models/product";

// interface que va a contener un array de productos, importamos el modelo producto
export interface IOrder {
    productsOrder: Product[]
}
