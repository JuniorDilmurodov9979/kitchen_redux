import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setOrder } from "../Store/Slices/OrderSlice";
import { setId } from "../Store/Slices/GetId";

const Item = ({ type }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setId(id));
  }, [dispatch, id]);

  const orders = useSelector((state) => state.order);
  console.log(orders);

  // Find the exact client's orders
  let countItem = orders.clients.find((client) => client.clientId === id);
  let countItemOrders = countItem?.orders || [];

  // Initialize state with existing order counts
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const initialCounts = {};
    countItemOrders.forEach((order) => {
      initialCounts[order.name] = Math.max(order.count, 0); // Ensure count is not negative
    });
    setCounts(initialCounts);
  }, [countItemOrders]);

  const incr = (item) => {
    const newCount = (counts[item.name] || 0) + 1;
    setCounts((prevCounts) => ({
      ...prevCounts,
      [item.name]: newCount,
    }));

    dispatch(setOrder({ clientId: id, order: { ...item, count: newCount } }));
  };

  const decr = (item) => {
    const existingOrder = countItemOrders.find(
      (order) => order.name === item.name
    );
    const currentCount = existingOrder ? existingOrder.count : 0;

    const newCount = Math.max(currentCount - 1, 0);
    setCounts((prevCounts) => ({
      ...prevCounts,
      [item.name]: newCount,
    }));

    dispatch(setOrder({ clientId: id, order: { ...item, count: newCount } }));
  };

  return (
    <div className="p-6 bg-gray-50">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {type?.map((item) => {
          const existingOrder = countItemOrders.find(
            (order) => order.name === item.name
          );
          const itemCount = existingOrder
            ? Math.max(existingOrder.count, 0)
            : 0;

          return (
            <li key={item.id} className="bg-white rounded-xl shadow-md p-4">
              <img
                className="w-full h-40 object-contain"
                src={item.image}
                alt={item.name}
              />
              <h2 className="font-semibold text-xl text-center">{item.name}</h2>
              <p className="text-gray-600 font-semibold text-lg">
                ${item.price}
              </p>
              <div className="flex items-center justify-center gap-5 mt-3">
                <button
                  className="bg-gray-200 cursor-pointer hover:bg-gray-400 px-3 py-2 rounded"
                  onClick={() => decr(item)}
                >
                  -
                </button>
                <p className="font-bold text-xl">{itemCount}</p>
                <button
                  className="bg-gray-200 cursor-pointer hover:bg-gray-400 px-3 py-2 rounded"
                  onClick={() => incr(item)}
                >
                  +
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Item;
