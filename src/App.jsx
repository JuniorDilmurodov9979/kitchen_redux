import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Oshpaz from "./Pages/Oshpaz/Oshpaz";
export default function App() {
  const isRole = localStorage.getItem("isRole");
  console.log(isRole);

  if (isRole == "girgitton") {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  } else if (isRole == "oshpaz") {
    return (
      <>
        <Oshpaz />
      </>
    );
  } else {
    return <Navigate to={"/login"}></Navigate>;
  }
}
