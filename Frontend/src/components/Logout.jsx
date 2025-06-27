import React from "react";
import { useAuth } from "./context/AuthProvider";

const Logout = () => {
  const {authUser, setAuthUser} = useAuth();

  const handleLogout = () => {
   
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setAuthUser(null);
  };

  return (
    <button
      className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-700 duration-300"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
