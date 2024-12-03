import React from 'react';
import { Product } from '../types/Product';
import './ProductComponent.css';
import { useCart } from '../providers/CartProvider.tsx';

export const ProductComponent: React.FC<{ product: Product }> = ({ product }) => {
    const { addItemToCart } = useCart();

    const handleClick = () => {
        addItemToCart(product.id);
    };

    return (
        <div className={'product-component'} onClick={handleClick}>
            <h4 className={'product-name'}>{product.name}</h4>
            <p className={'product-desc'}>{product.description}</p>
            <p className={'product-price'}>{product.price} €</p>
            <p className={'product-stock'}>{product.stock} in stock</p>
        </div>
    );
};