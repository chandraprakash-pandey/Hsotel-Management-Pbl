import React from 'react';
import { NavLink } from 'react-router-dom';

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold text-blue-600 mb-6">Login / Signup As</h2>

        <div className="flex flex-col gap-4">
          <NavLink
            to="/Student"
            className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 text-lg font-medium"
          >
            Student
          </NavLink>

          <NavLink
            to="/Owner"
            className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 text-lg font-medium"
          >
            Owner
          </NavLink>

          <NavLink
            to="/Admin"
            className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 text-lg font-medium"
          >
            Admin
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Signup;
