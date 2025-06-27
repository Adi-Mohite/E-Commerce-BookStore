import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthProvider.jsx";

const AdminRoute = ({ children }) => {
  const { authUser, loading } = useAuth();
  const location = useLocation();

 
  if (loading) {
    return <div>Loading...</div>; 
  }

  
  if (!authUser || !authUser._id || authUser.role !== "admin") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  



  return children;
};

export default AdminRoute;
