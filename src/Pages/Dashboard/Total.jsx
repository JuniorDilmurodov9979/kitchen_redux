import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Card, Button, Empty } from "antd";
import { DeleteOutlined, PrinterOutlined } from "@ant-design/icons";
import { removeClientOrders } from "../../Store/Slices/OrderSlice";
import { useParams } from "react-router-dom";

const Total = () => {
  const dispatch = useDispatch();
  const printRefs = useRef({});
  const { id } = useParams();

  // its for only exact client
  const client = useSelector((state) =>
    state.order.clients.find((client) => client.clientId === id)
  );
  console.log(client);

  // its for all clients
  const ordersClient = useSelector((state) => state.order.clients);
  console.log(ordersClient);

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

  const handlePrint = (clientId) => {
    const printContent = printRefs.current[clientId]?.innerHTML;
    if (printContent) {
      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
        <html>
          <head>
            <title>Print</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { text-align: center; }
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid black; padding: 8px; text-align: left; }
            </style>
          </head>
          <body>${printContent}</body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleRemoveClient = (clientId) => {
    dispatch(removeClientOrders({ id: clientId }));
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
    <div className="p-6 flex flex-col gap-7 items-center min-h-screen bg-gray-100">
      {ordersClient.length > 0 &&
        ordersClient.map((client) => {
          if (!client.orders || client.orders.length === 0) return null;
          return (
            <Card
              key={client.clientId}
              className="w-full max-w-4xl shadow-xl rounded-2xl bg-white p-6"
            >
              <div ref={(el) => (printRefs.current[client.clientId] = el)}>
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
                  {client.clientId} - Mijoz buyurtmasi
                </h1>

                <Table
                  dataSource={client.orders}
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
                      onClick={() => handlePrint(client.clientId)}
                      className="px-6 py-2 text-lg rounded-lg shadow-md"
                    >
                      Print Order
                    </Button>
                    <Button
                      type="primary"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleRemoveClient(client.clientId)}
                      className="px-6 py-2 text-lg rounded-lg shadow-md"
                    >
                      Yakunlash
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
    </div>
  );
};

export default Total;
