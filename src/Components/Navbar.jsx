import { Button } from "antd";
import React, { use, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const id = useSelector((state) => state.getId.id);
  // console.log(id);
  const navigate = useNavigate();
  function LogOut() {
    localStorage.removeItem("isRole");
    navigate("/login");
  }

  return (
    <header className=" bg-white/10 backdrop-blur-lg shadow-lg py-5 flex items-center gap-6 justify-center  border border-white/20">
      <NavLink
        to={id ? "total/" + id : "/total"}
        className={({ isActive }) =>
          `px-8 py-2 text-lg font-semibold rounded-full shadow-lg transition-all duration-300 ${
            isActive
              ? "bg-green-700 text-white"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`
        }
      >
        🛒 Korzinka
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `px-8 py-2 text-lg font-semibold rounded-full shadow-lg transition-all duration-300 ${
            isActive
              ? "bg-blue-700 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`
        }
        to="/girgitton"
      >
        💺 Stullar
      </NavLink>
      <Button
        onClick={LogOut}
        className="ml-20"
        variant="solid"
        size="large"
        color="danger"
      >
        Log out
      </Button>
      <Link
        className="border rounded-lg bg-blue-500 text-white hover:bg-blue-600 p-2"
        to={"/login"}
      >
        Login
      </Link>
    </header>
  );
};

export default Navbar;
