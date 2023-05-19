import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-6xl text-gray-700 font-semibold">404</h1>
        <p className="text-gray-500 text-xl mt-4">
          We're sorry, but the page you requested was not found.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-500 underline text-lg"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
