import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isRole = localStorage.getItem("isRole");

  return isRole ? children : <Navigate to="/login" />;
}
