import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-200 dark:bg-gray-900">
     
      <div className="w-full md:w-64">
        <Sidebar />
      </div>

      
      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="p-4 overflow-y-auto bg-slate-100 dark:bg-gray-800 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
