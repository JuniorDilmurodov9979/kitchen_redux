import { Button, Form, Input, Modal, Table } from "antd";
import React, { useState } from "react";
import { notification } from "antd";

import users from "../../Constants/User";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [isRole, setIsRole] = useState();
  const [visible, setVisible] = useState(false);
  const columns = [
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Password", dataIndex: "password", key: "password" },
  ];

  console.log(isRole);

  const setStorage = (role) => {
    localStorage.setItem("isRole", role);
  };

  const errorLogin = () => {
    alert("Username yoki Parol xato");
  };

  const loginHandle = (values) => {
    console.log(values);
    let findedUser = users.find(
      (user) =>
        user.name.trim() === values.username.trim() &&
        user.password.trim() === values.password.trim()
    );

    if (!findedUser) {
      errorLogin();
      return;
    }

    const role = findedUser.role;
    setStorage(role);
    setIsRole(role);

    if (role === "oshpaz") {
      navigate("/oshpaz");
    } else if (role === "girgitton") {
      navigate("/girgitton");
    } else {
      navigate("/login");
    }
  };

  const showPasswords = () => {
    setVisible(true);
  };

  return (
    <>
      <div className="flex justify-center mt-10">
        <Button type="primary" onClick={showPasswords}>
          Show Passwords
        </Button>

        <Modal
          title="User Passwords"
          open={visible}
          onCancel={() => setVisible(false)}
          footer={null}
        >
          <Table
            dataSource={users}
            columns={columns}
            rowKey="name"
            pagination={false}
            className="mt-4"
          />
        </Modal>
      </div>

      <div className="container mx-auto flex justify-center items-center h-screen">
        <Form
          className="max-w-[500px] w-full"
          layout="vertical"
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={loginHandle}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item className="flex justify-center" label={null}>
            <Button
              className="w-full "
              size="large"
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
