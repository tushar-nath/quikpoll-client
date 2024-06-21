import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/users/login",
        formData
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/chat");
    } catch (error) {
      console.error("Login error:", error.response.data.error);
    }
  };

  return (
    <form
      className="w-full h-screen flex flex-col items-center justify-center space-y-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-6">Login to Open Chat</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
        className="w-1/2 p-2 border border-gray-300 rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
        className="w-1/2 p-2 border border-gray-300 rounded"
      />
      <button className="w-[200px] py-2 text-center text-base cursor-pointer bg-[#607EAA] text-[#F9F5EB] rounded">
        LOGIN
      </button>
    </form>
  );
};

export default Login;
