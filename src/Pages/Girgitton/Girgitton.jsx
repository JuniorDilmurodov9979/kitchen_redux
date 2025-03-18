import React from "react";
import tablePic from "/images/tablePic.png";
import { Link } from "react-router-dom";
export default function Girgitton() {
  const items = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <>
      <div className="container mx-auto my-15">
        <div className="grid grid-cols-4 gap-4">
          {items.map((num) => (
            <Link
              to={`/client/${num}`}
              key={num}
              className="flex items-center flex-col"
            >
              <img className="" src={tablePic} alt={`Table ${num}`} />
              <strong className="text-4xl">{num}</strong>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
