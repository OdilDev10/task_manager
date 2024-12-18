import { Button, Form, Input, Radio } from "antd";
import ContainerTask from "./ContainerTask";
import TaskListDashboard from "./TaskListDashboard";
import { postCreateTask } from "../../../shared/services/taskServices";

const TaskList = ({ listado }: { listado: any[] }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    let user = localStorage.getItem("user");
    if (!user) return;
    values["userId"] = JSON.parse(user).id;
    postCreateTask(values);
    console.log(values, form.validateFields());
    form.resetFields();
  };
  return (
    <ContainerTask styles={{ overflowY: "auto", height: "75vh" }}>
      <div style={{ flex: 3 }}>
        <TaskListDashboard data={listado} />
      </div>
      <div style={{ flex: 1, position: "relative", padding: "20px" }}>
        <Form
          form={form}
          onFinish={onFinish}
          style={{
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: "20%",
          }}
          layout="vertical">
          <Form.Item
            name={"title"}
            label={"Title"}
            rules={[
              {
                min: 3,
                max: 50,
                message: "Title must be between 3 and 50 characters",
              },
              { required: true, message: "Title is required" },
              {
                pattern: /^[a-zA-Z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/,
                message: "Only letters and spaces are allowed",
              },
            ]}
            style={{ width: "100%" }}>
            <Input />
          </Form.Item>
          <Form.Item
            name={"content"}
            label={"Description"}
            rules={[
              {
                pattern: /^[a-zA-Z0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/,
                message: "Only letters, numbers and spaces are allowed",
              },
              // {
              //   validator: (_, value) =>
              //     value && value.includes("safe")
              //       ? Promise.resolve()
              //       : Promise.reject(
              //           new Error(
              //             "The input must contain the word 'safe'"
              //           )
              //         ),
              // },

              { required: true, message: "Description is required" },
              {
                min: 10,
                message: "Description must have at least 10 characters",
              },
            ]}
            style={{ width: "100%" }}>
            <Input.TextArea
              size="large"
              style={{ height: "200px", maxHeight: "350px" }}
            />
          </Form.Item>

          <Form.Item
            name={"status"}
            label={"Status"}
            rules={[
              // {
              //   min: 3,
              //   max: 50,
              //   message: "Title must be between 3 and 50 characters",
              // },
              // { required: true, message: "Title is required" },
              // {
              //   pattern: /^[a-zA-Z0-9\s]+$/,
              //   message:
              //     "Only letters, numbers, and spaces are allowed",
              // },
              { required: true, message: "Status is required" },
            ]}>
            <Radio.Group>
              <Radio
                value="COMPLETED"
                style={{ color: "var(--primary-color)" }}>
                Completed
              </Radio>
              <Radio value="PENDING" style={{ color: "orange" }}>
                Pending
              </Radio>
              <Radio value="CANCELLED" style={{ color: "red" }}>
                Cancelled
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Send
          </Button>
        </Form>
      </div>
    </ContainerTask>
  );
};

export default TaskList;
