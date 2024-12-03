import React, { useState } from 'react';
import { registerUser } from '../services/registerUser';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    const response = await registerUser({ email, password, firstName, lastName });
    if (response.success) {
      console.log('User registered:', response.data);
      setLoading(false);
      navigate('/login');
    } else {
      console.error('Register error:', response.data);

      let errorMsg: string = "Registration failed. Please check your inputs.";

      if (response.data.email) {
        errorMsg += " Invalid email.";
      }

      if (response.data.password) {
        errorMsg += " Invalid password.";
      }

      setRegisterError(errorMsg);
      setLoading(false);
    }
  };

  return (
    <div className={"register-block"}>
      <h2>Register</h2>
      <form onSubmit={handleRegister} autoComplete="on">
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
            type="password" placeholder={"Password"} required={true} autoComplete={"new-password"} name={"password"}
            value={password} onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          <span>First Name</span>
          <input
            type="text" placeholder={"First Name"} required={true} autoComplete={"given-name"} name={"firstName"}
            value={firstName} onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          <span>Last Name</span>
          <input
            type="text" placeholder={"Last Name"} required={true} autoComplete={"family-name"} name={"lastName"}
            value={lastName} onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <button
          type={"submit"}
          disabled={email === "" || password === "" || firstName === "" || lastName === ""}
          className={email === "" || password === "" || firstName === "" || lastName === "" ? "disabled" : ""}
        >
          {loading ? 'Loading...' : 'Register'}
        </button>
      </form>
      <span id="register-error">{registerError}</span>
    </div>
  );
};

export default Register;