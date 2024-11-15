import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface LoginPageProps {
  setAuth: (isAuthenticated: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setAuth }) => {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/v1/auth/login`,
        formData
      );

      const { accessToken } = response.data.responseObject;
      localStorage.setItem("accessToken", accessToken);
      setAuth(true);
    } catch (err) {
      console.error("Error during login:", err);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="usernameOrEmail"
          placeholder="Username or Email"
          value={formData.usernameOrEmail}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
        <Link to={"/signup"}>Signup</Link>
      </form>
    </div>
  );
};

export default LoginPage;
