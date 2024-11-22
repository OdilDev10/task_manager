import { Button, Form, Input, Radio } from "antd";
import CustomTabs from "../../shared/components/CustomTabs";
import ContainerTask from "./components/ContainerTask";
import TaskListDashboard from "./components/TaskListDashboard";

const DashboardPage = () => {
  return (
    <div>
      <CustomTabs
        styles={{ flex: 3 }}
        tabs={[
          {
            key: "Tab1",
            label: "Hechas",
            children: (
              <ContainerTask styles={{ overflowY: "auto", height: "75vh" }}>
                <div style={{ flex: 3 }}>
                  <TaskListDashboard
                    data={[
                      {
                        title: "Ant Design Title 1",
                      },
                      {
                        title: "Ant Design Title 2",
                      },
                      {
                        title: "Ant Design Title 3",
                      },
                      {
                        title: "Ant Design Title 4",
                      },
                      {
                        title: "Ant Design Title 1",
                      },
                      {
                        title: "Ant Design Title 2",
                      },
                      {
                        title: "Ant Design Title 3",
                      },
                      {
                        title: "Ant Design Title 4",
                      },
                      {
                        title: "Ant Design Title 1",
                      },
                      {
                        title: "Ant Design Title 2",
                      },
                      {
                        title: "Ant Design Title 3",
                      },
                      {
                        title: "Ant Design Title 4",
                      },
                    ]}
                  />
                </div>
                <div style={{ flex: 1, position: "relative", padding: "20px" }}>
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
                    layout="vertical"
                  >
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
                          pattern: /^[a-zA-Z0-9\s]+$/,
                          message:
                            "Only letters, numbers, and spaces are allowed",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name={"description"}
                      label={"Description"}
                      rules={[
                        {
                          pattern: /^[a-zA-Z0-9\s]+$/,
                          message:
                            "Only letters, numbers, and spaces are allowed",
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
                          message:
                            "Description must have at least 10 characters",
                        },
                      ]}
                    >
                      <Input.TextArea
                        size="large"
                        style={{ height: "200px", maxHeight: "350px" }}
                      />
                    </Form.Item>

                    <Form.Item
                      name={"status"}
                      label={"Status"}
                      rules={
                        [
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
                        ]
                      }
                    >
                      <Radio.Group>
                        <Radio value={1} style={{color: "var(--primary-color)"}} >Ready</Radio>
                        <Radio value={2}  style={{color: "orange"}}>Earring</Radio>
                        <Radio value={3}  style={{color: "red"}}>Canceled</Radio>
                      </Radio.Group>
                    </Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%" }}
                    >
                      Send
                    </Button>
                  </Form>
                </div>
              </ContainerTask>
            ),
          },
          {
            key: "Tab2",
            label: "Pendientes",
            children: (
              <ContainerTask>
                <div style={{ flex: 3 }}>
                  <TaskListDashboard data={[]} />
                </div>
                <div style={{ flex: 1 }}>
                  <Form></Form>
                </div>
              </ContainerTask>
            ),
          },
          {
            key: "Tab3",
            label: "Canceladas",
            children: (
              <ContainerTask>
                <div style={{ flex: 3 }}>
                  <TaskListDashboard data={[]} />
                </div>
                <div style={{ flex: 1 }}>
                  <Form></Form>
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
