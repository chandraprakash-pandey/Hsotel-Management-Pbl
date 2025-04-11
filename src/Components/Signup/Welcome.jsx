import React from 'react';
import { useLocation } from 'react-router-dom';

function Welcome() {
  const location = useLocation();
  const user = location.state?.user || 'User';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">Welcome, {user}!</h1>
      <p className="text-lg">You have successfully signed up 🎉</p>
    </div>
  );
}

export default Welcome;
