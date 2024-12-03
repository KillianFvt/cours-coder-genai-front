import React, {useEffect} from 'react';
import './Payment.css';
import {useNavigate} from "react-router-dom";
import {useCart} from "../providers/CartProvider.tsx";

const Payment: React.FC = () => {

    const navigate = useNavigate();
    const { refreshCart } = useCart();

    useEffect(() => {
        
        refreshCart();
        
        setTimeout(() => {
            navigate('/');
        }, 5000);
    }, [navigate, refreshCart]);

    return (
        <div className={"payment"}>
            <h2> Thank you for your payment! </h2>
            <p> You will be redirected to the home page in 5 seconds </p>
        </div>
    );
};

export default Payment;