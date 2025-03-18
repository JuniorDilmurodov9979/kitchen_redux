import React from "react";
import salads from "../Constants/Salads";
import Item from "./Item";
const Salads = () => {
//   console.log(salads);

  return (
    <div className="">
      <Item type={salads} />
    </div>
  );
};

export default Salads;
