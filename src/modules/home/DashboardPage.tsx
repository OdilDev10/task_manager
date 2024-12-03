import { Button, Form, Input } from "antd";
import CustomTabs from "../../shared/components/CustomTabs";
import { postCreateUser } from "../../shared/services/userServices";
import CompletedTasks from "./components/CompletedTasks";
import ContainerTask from "./components/ContainerTask";
import TableUsers from "./components/TableUsers";
import { TaskInterface } from "../../shared/interfaces/TaskInterface";
import { useState, useEffect } from "react";
import { getAllTasks } from "../../shared/services/taskServices";

const DashboardPage = () => {
  const [form] = Form.useForm();
  const [completedTasks, setCompletedTasks] = useState<TaskInterface[]>([]);

  const onFinish = async (values: any) => {
    console.log(values, form.validateFields());
    await postCreateUser(values);
  };

  const dtoTasks = (data: any[]) => {
    let results = data.map((item) => {
      return {
        id: item?.id || "",
        title: item?.title || "",
        content: item?.content || "",
        status: item?.status || "",
      };
    });
    return results;
  };

  useEffect(() => {
    getAllTasks().then((data) => {
      setCompletedTasks(dtoTasks(data));
      console.log(data);
    });
  }, []);
  return (
    <div>
      <CustomTabs
        styles={{ flex: 3 }}
        tabs={[
          {
            key: "Tab1",
            label: "Hechas",
            children: <CompletedTasks listado={completedTasks} />,
          },
          {
            key: "Tab2",
            label: "Pendientes",
            children: <CompletedTasks listado={completedTasks} />,
          },
          {
            key: "Tab3",
            label: "Canceladas",
            children: <CompletedTasks listado={completedTasks} />,
          },
          {
            key: "Tab4",
            label: "Usuarios",
            children: (
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
                          message:
                            "Last name must be between 1 and 100 characters",
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

                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%" }}>
                      Create user
                    </Button>
                  </Form>
                </div>
              </ContainerTask>
            ),
          },
        ]}
      />
    </div>
  );
};

export default DashboardPage;
