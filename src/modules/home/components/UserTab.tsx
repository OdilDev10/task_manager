import { Input, Button } from "antd";
import { Form } from "antd";
import ContainerTask from "./ContainerTask";
import TableUsers from "./TableUsers";
import { postCreateUser } from "../../../shared/services/userServices";

const UserTab = () => {
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    console.log(values, form.validateFields());
    await postCreateUser(values);
  };
  return (
    <ContainerTask>
      <div style={{ flex: 3 }}>
        <TableUsers />
      </div>
      <div style={{ flex: 1 }}>
        <Form
          style={{
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: "20%",
          }}
          form={form}
          onFinish={onFinish}
          layout="vertical">
          <Form.Item
            name={"name"}
            label={"Name"}
            rules={[
              {
                min: 1,
                max: 100,
                message: "Name must be between 1 and 100 characters",
              },
              { required: true, message: "Name is required" },
              {
                pattern: /^[a-zA-Z\s]+$/,
                message: "Only letters and spaces are allowed",
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name={"lastName"}
            label={"Last Name"}
            rules={[
              {
                min: 1,
                max: 100,
                message: "Last name must be between 1 and 100 characters",
              },
              { required: true, message: "Last name is required" },
              {
                pattern: /^[a-zA-Z\s]+$/,
                message: "Only letters and spaces are allowed",
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name={"email"}
            label={"Email"}
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              { required: true, message: "Email is required" },
            ]}>
            <Input />
          </Form.Item>

          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Create user
          </Button>
        </Form>
      </div>
    </ContainerTask>
  );
};

export default UserTab;
