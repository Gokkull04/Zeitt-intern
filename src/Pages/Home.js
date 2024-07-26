import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-screen bg-gray-100 justify-center items-center">
      <div className="flex flex-col space-y-4">
        <div 
          className="cursor-pointer border border-gray-300 bg-white p-6 rounded-lg shadow-md hover:bg-gray-50 transition duration-300 ease-in-out"
          onClick={() => navigate('/employee')}
        >
          <h2 className="text-xl font-semibold text-gray-800">Employee</h2>
        </div>
        <div 
          className="cursor-pointer border border-gray-300 bg-white p-6 rounded-lg shadow-md hover:bg-gray-50 transition duration-300 ease-in-out"
          onClick={() => navigate("/login")}
        >
          <h2 className="text-xl font-semibold text-gray-800">Admin</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
