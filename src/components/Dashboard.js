// components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to Quikpoll</h1>
      <div className="flex space-x-4">
        <Link
          to="/chat"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Go to Chat
        </Link>
        <Link
          to="/polls"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Go to Polls
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;