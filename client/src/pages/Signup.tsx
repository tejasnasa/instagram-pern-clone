import React, { useState } from "react";
import axios from "axios";

interface SignUpPageProps {
  setAuth: (isAuthenticated: boolean) => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ setAuth }) => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullname: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        "${import.meta.env.VITE_BASE_URL}/v1/auth/register",
        formData
      );

      const { accessToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      setAuth(true);
      console.log("Stored accessToken in localStorage and updated auth state.");
    } catch (err) {
      console.error("Error during signup:", err);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="text"
        name="fullname"
        placeholder="Full Name"
        value={formData.fullname}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default SignUpPage;
