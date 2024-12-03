import React, {useRef, useState} from "react";
import {loginUser} from "../services/loginUser";
import {logoutUser} from "../services/logoutUser";
import {useNavigate} from "react-router-dom";
import {useUser} from "../providers/UserProvider";
import './Login.css';
import {useCart} from "../providers/CartProvider.tsx";

const Login : React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const redirect = useRef(
      new URLSearchParams(window.location.search).get("redirect")
  );

  const navigate = useNavigate();
  const { reloadUser } = useUser();
  const { refreshCart } = useCart();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    await logoutUser();

    const response = await loginUser(email, password);
    if (response.success) {
      console.log('User logged in:', response.data);
      localStorage.removeItem('user');
      localStorage.removeItem('token_expiration');
      await reloadUser();
      setLoading(false);

      refreshCart();

      if (redirect.current) navigate(redirect.current);
      else navigate('/');

    } else {
      console.error('Login error:', response.data);

      let errorMsg : string = "";

      if (response.data.username) {
        errorMsg += " Vous devez entrer un email.";
      }

      if (response.data.password) {
        errorMsg += " Vous devez entrer un mot de passe.";
      }

      if (response.data.detail === "No active account found with the given credentials") {
        errorMsg = "Email ou mot de passe incorrect";
      }

      setLoginError(errorMsg);
    }
  };

  return (
      <div className={"login-block"}>
        <h2>Connexion</h2>
        <form action="/auth/Login" method={"post"} onSubmit={handleLogin} autoComplete="on">
          <label>
            <span>Email</span>
            <input
                type="email" placeholder={"Email"} required={true} autoComplete={"on"} name={"email"}
                value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <span>Password</span>
            <input
                type="password" placeholder={"Password"} required={true} autoComplete={"current-password"} name={"password"}
                value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
              type={"submit"}
              disabled={email === "" || password === ""}
              className={email === "" || password === "" ? "disabled" : ""}
          >
            {loading ? 'Chargement...' : 'Se connecter'}
          </button>
        </form>
        <span id="login-error">{loginError}</span>
      </div>
  );
};

export default Login;