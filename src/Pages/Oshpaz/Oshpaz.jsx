import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { removeClientOrders } from "../../Store/Slices/OrderSlice";
const tablePic = "/images/tablePic.png";

const Oshpaz = () => {
  const [clientId, setClientId] = useState(null);
  const [clientOrders, setClientOrders] = useState([]);
  const selector = useSelector((state) => state.order);
  const clients = selector.clients;
  const dispatch = useDispatch();

  const handleDeleteClient = (id) => {
    dispatch(removeClientOrders({ id }));
    if (clientId === id) {
      setClientId(null);
      setClientOrders([]);
    }
  };

  const handleClientOrders = () => {
    if (clientId) {
      const client = clients.find((client) => client.clientId === clientId);
      setClientOrders(client ? client.orders : []);
    } else {
      setClientOrders([]);
    }
  };

  useEffect(() => {
    handleClientOrders();
  }, [clientId, clients]);

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl text-center font-semibold mt-10">Oshpaz</h1>
      <div className="grid grid-cols-4 items-start my-10">
        <div className="grid col-span-1">
          <ul className="flex flex-col gap-5 justify-center pr-5 items-center border-r-2">
            {clients.length > 0 ? (
              clients.map((client) => (
                <li
                  className={`border rounded-2xl flex flex-col items-center border-gray-300 p-5 w-full ${
                    clientId === client.clientId ? "bg-blue-50" : ""
                  }`}
                  key={client.clientId}
                >
                  <div className="flex gap-5 items-center">
                    <NavLink
                      onClick={() => setClientId(client.clientId)}
                      className="flex gap-5 items-center"
                    >
                      <p className="font-bold text-3xl">{client.clientId}</p>
                      <img className="w-20 h-20" src={tablePic} alt="" />
                    </NavLink>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-500">Hozircha clientlar yuq</p>
            )}
          </ul>
        </div>
        <div className="col-span-3 bg-white ml-5 p-6 shadow-md rounded-lg">
          {clientId ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">
                  {clientId} - Haridor uchun buyurtma{" "}
                </h2>
                <button
                  onClick={() => handleDeleteClient(clientId)}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
                >
                  Yakunlash
                </button>
              </div>

              {clientOrders.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {clientOrders.map((order, index) => (
                    <div
                      key={index}
                      className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50"
                    >
                      <span className="inline-block bg-blue-100 text-blue-600 text-sm font-semibold px-3 py-1 rounded-full mb-2">
                        {order.category}
                      </span>
                      <h3 className="text-xl font-medium text-gray-700">
                        {order.name}
                      </h3>
                      <p className="text-gray-600">
                        Soni:
                        <span className="font-bold text-lg ml-1">
                          {order.count}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-xl text-center my-20">
                  Bu haridor hali buyurtma qilmagan.
                </p>
              )}
            </>
          ) : (
            <p className="text-gray-500 text-xl text-center my-20">
              Iltimost haridorni tanlang
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Oshpaz;
