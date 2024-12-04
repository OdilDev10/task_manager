import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { Flex, Input, Button } from "antd";
import { Form } from "antd";
import { AuthProps } from "../../../shared/interfaces/AuthProps";

const Login = ({ setAuthenticationStatus }: AuthProps) => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  return (
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
            rules={[{ required: true, message: "Please input your name!" }]}>
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
            rules={[{ required: true, message: "Please input your email!" }]}>
            <Input prefix={<MailOutlined />} type="email" placeholder="Email" />
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
  );
};

export default Login;
