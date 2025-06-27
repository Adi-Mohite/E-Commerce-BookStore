import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";

const PrivateRoute = ({ children }) => {
  const {authUser, loading} = useAuth();
  const location = useLocation();

  if (loading) return null; 

  if (!authUser || !authUser._id) {
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
