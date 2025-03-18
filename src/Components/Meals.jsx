import React from "react";
import meals from "../Constants/Meals";
import Item from "./Item";

const Meals = () => {
//   console.log(meals);

  return (
    <>
      <Item type={meals} />
    </>
  );
};

export default Meals;
