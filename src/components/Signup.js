import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
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
        "http://localhost:4000/api/users/signup",
        formData
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/chat");
    } catch (error) {
      console.error("Signup error:", error.response.data.error);
    }
  };

  return (
    <form
      className="w-full h-screen flex flex-col items-center justify-center space-y-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-6">Sign up for Open Chat</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
        required
        className="w-1/2 p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="username"
        placeholder="Username"
        onChange={handleChange}
        required
        className="w-1/2 p-2 border border-gray-300 rounded"
      />
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
        SIGN UP
      </button>
    </form>
  );
};

export default Signup;
