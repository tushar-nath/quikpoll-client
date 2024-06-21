import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center space-y-3">
      <h2 className="text-2xl font-bold mb-7">Welcome to Quikpoll</h2>
      <Link
        to="/signup"
        className="w-[200px] py-2 text-center text-base cursor-pointer bg-[#607EAA] text-[#F9F5EB] rounded"
      >
        SIGN UP
      </Link>
      <Link
        to="/login"
        className="w-[200px] py-2 text-center text-base cursor-pointer bg-[#607EAA] text-[#F9F5EB] rounded"
      >
        LOGIN
      </Link>
    </div>
  );
};

export default Home;
