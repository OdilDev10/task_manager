import { Button, Form, Input } from "antd";
import Swal from "sweetalert2";
import TaskStatusEnum from "../../../shared/enums/TaskStatusEnum";
import { postCreateTask } from "../../../shared/services/taskServices";

const FormTask = ({
  localGetAllTask,
  status,
  setIsModalOpen,
}: {
  localGetAllTask: (selectedTab: TaskStatusEnum) => void;
  status: TaskStatusEnum;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    let user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user) return;
    values["createdBy"] = user.id;

    postCreateTask(values)
      .then((response) => {
        console.log(response, "response");
      })
      .catch((error) => {
        console.log(error, "error");
      });
    console.log(values, form.validateFields());
    form.resetFields();
    alert("Status: " + status);
    localGetAllTask(status);
    setIsModalOpen(false);
    Swal.fire({
      timer: 4000,
      title: "Tarea agregada",
      text: "Has agregado la tarea exitosamente",
    });
  };

  return (
    <div style={{ flex: 1, padding: "20px" }}>
      <Form
        form={form}
        onFinish={onFinish}
        style={{
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
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

        {/* <Form.Item
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
            <Radio value="COMPLETED" style={{ color: "var(--primary-color)" }}>
              Completed
            </Radio>
            <Radio value="PENDING" style={{ color: "orange" }}>
              Pending
            </Radio>
            <Radio value="CANCELLED" style={{ color: "red" }}>
              Cancelled
            </Radio>
          </Radio.Group>
        </Form.Item> */}
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Send
        </Button>
      </Form>
    </div>
  );
};

export default FormTask;
