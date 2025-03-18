import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setOrder } from "../Store/Slices/OrderSlice";
import { setId } from "../Store/Slices/GetId";

const Item = ({ type }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  dispatch(setId(id));

  const [counts, setCounts] = useState({});
  const orders = useSelector((state) => state.order);
  console.log(orders);

  const incr = (item) => {
    const newCount = (counts[item.name] || 0) + 1;
    setCounts((prevCounts) => ({
      ...prevCounts,
      [item.name]: newCount,
    }));
    dispatch(setOrder({ clientId: id, order: { ...item, count: newCount } }));
  };

  const decr = (item) => {
    const newCount = Math.max((counts[item.name] || 0) - 1, 0);
    setCounts((prevCounts) => ({
      ...prevCounts,
      [item.name]: newCount,
    }));
    dispatch(setOrder({ clientId: id, order: { ...item, count: newCount } }));
  };

  return (
    <div className="p-6 bg-gray-50">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {type?.map((item) => (
          <li key={item.id} className="bg-white rounded-xl shadow-md p-4">
            <img
              className="w-full h-40 object-contain"
              src={item.image}
              alt={item.name}
            />
            <h2 className="font-semibold text-xl text-center">{item.name}</h2>
            <p className="text-gray-600 font-semibold text-lg">${item.price}</p>
            <div className="flex items-center justify-center gap-5 mt-3">
              <button
                className="bg-gray-200 cursor-pointer hover:bg-gray-400 px-3 py-2 rounded"
                onClick={() => decr(item)}
              >
                -
              </button>
              <p className="font-bold text-xl">{counts[item.name] || 0}</p>
              <button
                className="bg-gray-200 cursor-pointer hover:bg-gray-400 px-3 py-2 rounded"
                onClick={() => incr(item)}
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Item;
