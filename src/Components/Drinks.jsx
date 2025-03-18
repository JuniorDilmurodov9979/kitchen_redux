import React from "react";
import drinks from "../Constants/Drinks";
import Item from "./Item";
const Drinks = () => {
//   console.log(drinks);

  return (
    <>
      <div className="drinks__wrapper">
        <Item type={drinks} />
      </div>
    </>
  );
};

export default Drinks;
