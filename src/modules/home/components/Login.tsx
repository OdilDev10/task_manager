import {
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { Flex, Input, Checkbox, Button } from "antd";
import { Form } from "antd";
import { AuthProps } from "../../../shared/interfaces/AuthProps";
import { postLoginUser } from "../../../shared/services/authServices";
import { useNavigate } from "react-router-dom";
import { IUserLogin } from "../../../shared/schemas/authSchemas";
import Swal from "sweetalert2";

const Login = ({ setAuthenticationStatus }: AuthProps) => {
  const navigate = useNavigate();

  const onFinish = async (values: Partial<IUserLogin>) => {
    console.log("Received values of form: ", values);
    const response = (await postLoginUser(values)) == true;

    if (response) {
      Swal.fire({
        timer: 4000,
        title: "Login Success",
        text: "Login Exitoso",
      });
      navigate("/dashboard");
    }
  };
  return (
    <>
      <Flex vertical justify="center" align="center" gap="middle">
        <h1>Login to your account</h1>
        <Form
          name="login"
          initialValues={{ remember: true }}
          style={{ width: 360 }}
          onFinish={onFinish}
        >
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
              style={{ cursor: "pointer", color: "#1677ff" }}
            >
              Register now!
            </span>
          </Form.Item>
        </Form>
      </Flex>
    </>
  );
};

export default Login;
