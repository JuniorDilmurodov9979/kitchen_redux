import { Button, Form, Input } from "antd";
import React from "react";
import { notification } from "antd";

import users from "../../Constants/User";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const setStorage = () => {
    localStorage.setItem("isAuth", true);
  };

  const errorLogin = () => {
    alert("Username yoki Parol xato");
  };
  const loginHandle = (values) => {
    console.log(values);
    let findedUser = users.find(
      (user) =>
        user.name === values.username && user.password === values.password
    );

    if (!findedUser) {
      errorLogin();
    }
    if (findedUser?.role === "oshpaz") {
      setStorage();
      navigate("/oshpaz");
    } else if (findedUser?.role === "girgitton") {
      setStorage();
      navigate("/girgitton");
    }

    console.log(findedUser);
  };

  return (
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
  );
}
