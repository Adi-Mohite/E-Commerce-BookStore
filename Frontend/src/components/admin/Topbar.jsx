import React from "react";
import { Link } from "react-router-dom";

const Topbar = () => {
  return (
    <div className="bg-sky-500 dark:bg-slate-700 shadow px-4 md:px-6 py-3 md:py-4 rounded-br-full flex justify-between items-center">
     
      <h1 className="text-2xl md:text-3xl text-white font-semibold cursor-pointer">
        Admin Dashboard
      </h1>

      
      <Link
        to="/"
        className="bg-slate-600 dark:bg-gray-700 text-white px-3 md:px-4 py-1.5 rounded-md hover:bg-slate-800 dark:hover:bg-gray-600 duration-300 text-sm md:text-base"
      >
        Home
      </Link>
    </div>
  );
};

export default Topbar;
