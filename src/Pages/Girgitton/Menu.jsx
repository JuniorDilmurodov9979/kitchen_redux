import { Tabs } from "antd";
import React, { use, useState } from "react";
import { Link, useParams } from "react-router-dom";
import tablePic from "/images/tablePic.png";
import Meals from "../../Components/Meals";
import Drinks from "../../Components/Drinks";
import Salads from "../../Components/Salads";
import mealsIcon from "/icons/mealsIcon.png";
import saladsIcon from "/icons/saladsIcon.jpeg";
import drinksIcon from "/icons/drinksIcon.png";
import { useDispatch, useSelector } from "react-redux";

const Menu = () => {
  const id = useParams();

  const [activeKey, setActiveKey] = useState("1");
  const dispatch = useDispatch();
  // const selector = useSelector((state) => state.counter);
  // console.log(selector.value);

  const onChange = (key) => {
    // console.log(key);
    setActiveKey(key);
  };

  const items = [
    {
      key: "1",
      label: (
        <button
          className={`flex items-center gap-2 cursor-pointer p-3 rounded-lg text-white font-semibold text-3xl ${
            activeKey === "1" ? "bg-[#6B3C08]" : "bg-[#D4A068]"
          }`}
        >
          <img className="w-[50px] h-10" src={mealsIcon} alt="" />
          Taomlar
        </button>
      ),
      children: <Meals />,
    },
    {
      key: "2",
      label: (
        <button
          className={`flex items-center cursor-pointer gap-2 p-3 rounded-lg text-white font-semibold text-3xl ${
            activeKey === "2" ? "bg-[#6B3C08]" : "bg-[#D4A068]"
          }`}
        >
          <img className="w-[50px] h-10" src={drinksIcon} alt="" />
          Ichimliklar
        </button>
      ),
      children: <Drinks />,
    },
    {
      key: "3",
      label: (
        <button
          className={`flex items-center cursor-pointer gap-2 p-3 rounded-lg text-white font-semibold text-3xl ${
            activeKey === "3" ? "bg-[#6B3C08]" : "bg-[#D4A068]"
          }`}
        >
          <img className="w-[50px] h-10" src={saladsIcon} alt="" />
          Salatlar
        </button>
      ),
      children: <Salads />,
    },
  ];

  return (
    <>
      <div className="container mx-auto">
        <div className="menu my-10">
          <div className="menu__top-wrapper gap-23">
            <div className="flex items-center gap-5 mb-5">
              <div className="shadow-lg rounded-lg bg-gray-50 p-3">
                <img className="w-20 h-20 object-cover" src={tablePic} />
              </div>
              <h1 className="font-bold text-3xl">{id.id}</h1>
            </div>
            <div className="tabs_wrapper">
              <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </div>
          </div>
          <div className="menu__content"></div>
        </div>
      </div>
    </>
  );
};

export default Menu;
