import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => { 
  const isAuth = sessionStorage.getItem("token"); // later replace with real auth

  return isAuth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
