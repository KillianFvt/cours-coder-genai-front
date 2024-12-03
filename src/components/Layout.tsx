import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';
import { useUser } from '../providers/UserProvider.tsx';
import { useCart } from '../providers/CartProvider.tsx';
import { User } from '../types/User.ts';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user }: { user: User | null } = useUser();
  const { totalItems } = useCart();

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/cart">Cart
              {totalItems > 0 &&
                <span className={'cart-amt'}>{totalItems}</span>
              }
          </Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
        <div className="user-section">
          {user ? <span>Welcome, {user.firstName}</span> : <Link to="/login">Login</Link>}
        </div>
      </nav>
      <main>
        <div className="layout-container">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;