import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Register from './components/Register';
import Login from "./components/Login.tsx";
import Home from './components/Home';
import Layout from './components/Layout';
import "./App.css";
import {UserProvider} from "./providers/UserProvider.tsx";
import {Products} from "./components/Products.tsx";
import {LayoutProvider} from "./providers/LayoutProvider.tsx";
import {Cart} from "./components/Cart.tsx";
import Payment from "./components/Payment.tsx";

function App() {
    return (
        <Router>
            <UserProvider>
                <LayoutProvider>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/payment-success" element={<Payment />} />
                        </Routes>
                    </Layout>
                </LayoutProvider>
            </UserProvider>
        </Router>
    );
}

export default App;