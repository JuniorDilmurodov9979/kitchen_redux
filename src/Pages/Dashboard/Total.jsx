import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Card, Button, Empty } from "antd";
import { DeleteOutlined, PrinterOutlined } from "@ant-design/icons";
import { removeClientOrders } from "../../Store/Slices/OrderSlice";
import { useParams } from "react-router-dom";

const Total = () => {
  const dispatch = useDispatch();
  const printRef = useRef(null);
  const { id } = useParams();

  const client = useSelector((state) =>
    state.order.clients.find((client) => client.clientId === id)
  );
  console.log(client);

  if (!client || client.orders.length === 0)
    return (
      <div className="flex justify-center items-center h-screen">
        <Empty description="Hech qanday narsa harid qilinmagan" />
      </div>
    );

  const orders = client.orders;

  const totalPrice = orders.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  const handlePrint = () => {
    if (printRef.current) {
      const printContent = printRef.current.innerHTML;
      const originalContent = document.body.innerHTML;

      document.body.innerHTML = printContent;
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload();
    }
  };

  const handleRemoveClient = () => {
    dispatch(removeClientOrders({ id }));
  };

  const columns = [
    { title: "Nomi", dataIndex: "name", key: "name" },
    { title: "Turi", dataIndex: "category", key: "category" },
    {
      title: "Narxi",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price} Sum`,
    },
    { title: "Soni", dataIndex: "count", key: "count" },
    {
      title: "Umumiy",
      key: "total",
      render: (_, record) => `${record.price * record.count} Sum`,
    },
  ];

  return (
    <div className="p-6 flex flex-col items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-4xl shadow-xl rounded-2xl bg-white p-6">
        <div ref={printRef}>
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
            Order Summary for Client {id}
          </h1>

          <Table
            dataSource={orders}
            columns={columns}
            pagination={false}
            rowKey="name"
            className="shadow-md rounded-xl"
          />

          <div className="mt-6 text-xl font-semibold text-gray-900 flex justify-between border-t pt-4">
            <span>Umumiy narxi:</span>
            <span className="text-green-600">{totalPrice} Sum </span>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          {orders.length > 0 && (
            <div className="flex gap-6">
              <Button
                type="primary"
                icon={<PrinterOutlined />}
                onClick={handlePrint}
                className="px-6 py-2 text-lg rounded-lg shadow-md"
              >
                Print Order
              </Button>
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={handleRemoveClient}
                className="px-6 py-2 text-lg rounded-lg shadow-md"
              >
                Yakunlash
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Total;
