import React, {useState} from 'react';
import { useCart } from '../providers/CartProvider.tsx';
import './Cart.css';
import {payCart} from "../services/payCart.ts";
import {useNavigate} from "react-router-dom";

export const Cart: React.FC = () => {
    const { items, totalItems } = useCart();
    const [loadingPay, setLoadingPay] = useState<boolean>(false);
    const navigate = useNavigate();

    const handlePay = () => {
        setLoadingPay(true);
        payCart().then((success) => {
            if (!success) {
                alert('An error occurred while paying');
            }
            navigate('/payment-success');
            setLoadingPay(false);
        });
    }

    return (
        <div className={'cart'}>
            <h2>Cart</h2>
            {totalItems === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div>
                    <h3>Total cost : {items.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2)} €</h3>
                    <div className={'cart-list'}>
                        {items.map((item) => (
                            <div className={'cart-item'} key={item.id}>
                                <h4 className={'cart-item-name'}>{item.product.name}</h4>
                                <p className={'cart-item-desc'}>{item.product.description}</p>
                                <p className={'cart-item-price'}>{(item.product.price * item.quantity).toFixed(2)} €</p>
                                <p className={'cart-item-quantity'}>Quantity: {item.quantity}</p>
                            </div>
                        ))}
                    </div>
                    <button className={'cart-pay-btn'} onClick={handlePay}>
                        {loadingPay ? 'Paying...' : 'Pay'}
                    </button>
                </div>
            )}
        </div>
    );
};