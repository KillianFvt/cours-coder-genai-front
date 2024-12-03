import {API_URL} from "../constants.ts";
import {Product} from "../types/Product.ts";

export const fetchProducts: () => Promise<Product[]> = async () => {

    const response: Response = await fetch(`${API_URL}/shopping/products/all/`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const products: Product[] = data.map((product: Product) => {
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock
        }
    });

    return products;

};