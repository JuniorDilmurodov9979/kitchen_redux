import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
export default function App() {
  const isAuth = localStorage.getItem("isAuth");
  if (isAuth) {
    return (
      <>
        <Navbar></Navbar>
        <Outlet />
      </>
    );
  } else {
    return <Navigate to={"/login"}></Navigate>;
  }
}
