import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react"; 

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
     
      <div className="md:hidden flex items-center bg-sky-500 dark:bg-slate-700 p-4">
        <h2 className="font-bold text-yellow-300 text-3xl flex-1">ReadLaB</h2>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-sky-500 dark:bg-slate-700 text-white h-auto md:h-screen p-6 space-y-4 md:rounded-br-full fixed md:static z-50`}
      >
        
        <h2 className="font-bold text-yellow-300 text-4xl mb-2 hidden md:block">
          ReadLaB
        </h2>

       
        <nav className="space-y-2">
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `block p-2 rounded-md ${
                isActive
                  ? "bg-blue-700 font-semibold"
                  : "hover:bg-blue-600 duration-500"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            USERS
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `block p-2 rounded-md ${
                isActive
                  ? "bg-blue-700 font-semibold"
                  : "hover:bg-blue-600 duration-500"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            ORDERS
          </NavLink>

          <NavLink
            to="/admin/sales"
            className={({ isActive }) =>
              `block p-2 rounded-md ${
                isActive
                  ? "bg-blue-700 font-semibold"
                  : "hover:bg-blue-600 duration-500"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            SALES
          </NavLink>

          <NavLink
            to="/admin/feedback"
            className={({ isActive }) =>
              `block p-2 rounded-md ${
                isActive
                  ? "bg-blue-700 font-semibold"
                  : "hover:bg-blue-600 duration-500"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            USERS FEEDBACK
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
