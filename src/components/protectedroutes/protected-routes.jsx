import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedLogin = ({ children }) => {
  if (localStorage.getItem("token")) {
    return children;
  }
  return <Navigate to={"/login"} />;
};

export default ProtectedLogin;
