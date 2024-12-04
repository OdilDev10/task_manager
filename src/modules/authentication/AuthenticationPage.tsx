import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex } from "antd";
import { useState } from "react";

const AuthenticationPage = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  const [authenticationStatus, setAuthenticationStatus] = useState<
    "register" | "login"
  >("login");

  return (
    <Flex align="center" justify="center" style={{ height: "100%" }}>
      {authenticationStatus === "login" && (
        <>
          <Flex vertical justify="center" align="center" gap="middle">
            <h1>Login to your account</h1>
            <Form
              name="login"
              initialValues={{ remember: true }}
              style={{ width: 360 }}
              onFinish={onFinish}>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}>
                <Input
                  prefix={<MailOutlined />}
                  type="email"
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}>
                <Input
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Flex justify="space-between" align="center">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                  <a href="">Forgot password</a>
                </Flex>
              </Form.Item>

              <Form.Item>
                <Button block type="primary" htmlType="submit">
                  Log in
                </Button>
                or{" "}
                <span
                  onClick={() => setAuthenticationStatus("register")}
                  style={{ cursor: "pointer", color: "#1677ff" }}>
                  Register now!
                </span>
              </Form.Item>
            </Form>
          </Flex>
        </>
      )}

      {authenticationStatus === "register" && (
        <>
          <Flex vertical justify="center" align="center" gap="middle">
            <h1>Register for free</h1>
            <Form
              name="register"
              initialValues={{ remember: true }}
              style={{ width: 360 }}
              onFinish={onFinish}>
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: "Please input your name!" },
                ]}>
                <Input prefix={<UserOutlined />} placeholder="Name" />
              </Form.Item>
              <Form.Item
                name="lastName"
                rules={[
                  { required: true, message: "Please input your last name!" },
                ]}>
                <Input prefix={<UserOutlined />} placeholder="Last name" />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}>
                <Input
                  prefix={<MailOutlined />}
                  type="email"
                  placeholder="Email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}>
                <Input
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Button block type="primary" htmlType="submit">
                  Register
                </Button>
                or{" "}
                <span
                  onClick={() => setAuthenticationStatus("login")}
                  style={{ cursor: "pointer", color: "#1677ff" }}>
                  Login to your account!
                </span>
              </Form.Item>
            </Form>
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default AuthenticationPage;
