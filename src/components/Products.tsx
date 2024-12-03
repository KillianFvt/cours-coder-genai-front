import {useEffect, useState} from "react";
import {fetchProducts} from "../services/fetchProducts.ts";
import {Product} from "../types/Product.ts";
import './Products.css';
import {ProductComponent} from "./ProductComponent.tsx";

export const Products = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {

        try {
            fetchProducts().then((products: Product[]) => {
                setProducts(products);
            });
        } catch (error) {
            console.error(error);
            setError(true);
        }


        setLoading(false);
    }, []);

    return (
        <div className={'products'}>
            <h3>Products</h3>
            {loading && <p>Loading...</p>}
            {error && <p>Error loading products</p>}
            <div className={'products-list'}>
            {products.map((product: Product) => {
                return (
                    <ProductComponent product={product} key={product.id}/>
                );
            })}
            </div>
        </div>
    );
}