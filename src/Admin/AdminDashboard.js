import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col p-4">
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-300 shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">ZEITT</h1>
      </div>

      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">Admin Dashboard</h2>
          <div className="flex flex-col space-y-4">
            <Link
              to="/add-employee"
              className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-center"
            >
              Add Employee
            </Link>
            <Link
              to="/add-job-post"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-center"
            >
              Add Job Post
            </Link>
            <Link
              to="/view-employees"
              className="w-full py-2 px-4 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 text-center"
            >
              View Employees
            </Link>
            <Link
              to="/view-job-posts"
              className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-center"
            >
              View Job Posts
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
