import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <main className="flex justify-center bg-black text-white h-dvh w-dvw">
      <section className="flex flex-col mt-24">
        <div className="flex flex-col items-center border-gray-600 border-2 p-8">
          <img src="images/login2.png" alt="instagram" className="w-60" />
          <h2
            className="text-gray-400 font-semibold
          "
          >
            Sign up to see photos and videos
          </h2>
          <h2
            className="text-gray-400 font-semibold 
           mb-4"
          >
            from your friends.
          </h2>
          <input className="bg-[#121212] p-2 w-64 text-sm rounded-sm m-1 border-2 border-gray-600"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input className="bg-[#121212] p-2 w-64 text-sm rounded-sm m-1 border-2 border-gray-600"
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <input className="bg-[#121212] p-2 w-64 text-sm rounded-sm m-1 border-2 border-gray-600"
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={formData.fullname}
            onChange={handleChange}
          />
          <input className="bg-[#121212] p-2 w-64 text-sm rounded-sm m-1 border-2 border-gray-600"
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button onClick={handleSignUp} className="bg-blue-500 p-2 w-64 mt-5 font-semibold rounded-lg text-sm">Sign Up</button>
        </div>

        <div className="text-center p-6 border-2 border-gray-600 mt-6">
          Have an account? <Link to={"/login"} className="font-semibold text-blue-500">Log in</Link>
        </div>
      </section>
    </main>
  );
};

export default SignUpPage;
