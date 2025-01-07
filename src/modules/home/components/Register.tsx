import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { Flex, Input, Button } from "antd";
import { Form } from "antd";
import { AuthProps } from "../../../shared/interfaces/AuthProps";
import { postRegisterUser } from "../../../shared/services/authServices";
import Swal from "sweetalert2";
import { IUserRegister } from "../../../shared/schemas/authSchemas";

const Register = ({ setAuthenticationStatus }: AuthProps) => {
  const onFinish = async (values: Partial<IUserRegister>) => {
    console.log("Received values of form: ", values);
    const results = await postRegisterUser(values);
    if (results?.user?.id) {
      Swal.fire(results?.message);
      setAuthenticationStatus("login");
    }
  };
  return (
    <>
      <Flex vertical justify="center" align="center" gap="middle">
        <h1>Register for free</h1>
        <Form
          name="register"
          initialValues={{ remember: true }}
          style={{ width: 360 }}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Last name" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input prefix={<MailOutlined />} type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              placeholder="Password"
              prefix={<LockOutlined />}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Register
            </Button>
            or{" "}
            <span
              onClick={() => setAuthenticationStatus("login")}
              style={{ cursor: "pointer", color: "#1677ff" }}
            >
              Login to your account!
            </span>
          </Form.Item>
        </Form>
      </Flex>
    </>
  );
};

export default Register;
