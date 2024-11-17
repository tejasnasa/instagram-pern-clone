import React, { useState, useEffect } from "react";
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

  const [showTimer, setShowTimer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    if (showTimer) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showTimer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowTimer(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/v1/auth/register`,
        formData
      );

      const { accessToken } = response.data.responseObject;
      localStorage.setItem("accessToken", accessToken);
      setAuth(true);
    } catch (err) {
      console.error("Error during signup:", err);
    }
  };

  return (
    <main className="flex justify-center bg-black text-white h-dvh w-dvw">
      <section className="flex flex-col mt-24">
        <div className="flex flex-col items-center border-gray-600 border-2 p-8">
          <img src="images/login2.png" alt="instagram" className="w-60" />
          <h2 className="text-gray-400 font-semibold">
            Sign up to see photos and videos
          </h2>
          <h2 className="text-gray-400 font-semibold mb-4">
            from your friends.
          </h2>
          {!showTimer ? (
            <>
              <input
                className="bg-[#121212] p-2 w-64 text-sm rounded-sm m-1 border-2 border-gray-600"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                className="bg-[#121212] p-2 w-64 text-sm rounded-sm m-1 border-2 border-gray-600"
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
              <input
                className="bg-[#121212] p-2 w-64 text-sm rounded-sm m-1 border-2 border-gray-600"
                type="text"
                name="fullname"
                placeholder="Full Name"
                value={formData.fullname}
                onChange={handleChange}
              />
              <input
                className="bg-[#121212] p-2 w-64 text-sm rounded-sm m-1 border-2 border-gray-600"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                onClick={handleSignUp}
                className="bg-blue-500 p-2 w-64 mt-5 font-semibold rounded-lg text-sm"
              >
                Sign Up
              </button>
            </>
          ) : (
            <div className="text-center">
              <p className="text-lg font-semibold text-green-500">
                Verification email sent!
              </p>
              <p className="text-gray-400 mt-2">
                Please check your inbox.
              </p>
              <p className="text-gray-300 mt-2">{`Time left: ${timeLeft}s`}</p>
            </div>
          )}
        </div>

        <div className="text-center p-6 border-2 border-gray-600 mt-6">
          Have an account?{" "}
          <Link to={"/login"} className="font-semibold text-blue-500">
            Log in
          </Link>
        </div>
      </section>
    </main>
  );
};

export default SignUpPage;
