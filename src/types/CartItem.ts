import {Product} from "./Product.ts";

export type CartItem = {
    id: string;
    quantity: number;
    product: Product;
}