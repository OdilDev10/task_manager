import { Form } from "antd";
import TaskListDashboard from "./components/TaskListDashboard";
import CustomTabs from "../../shared/components/CustomTabs";
import ContainerTask from "./components/ContainerTask";

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
              <ContainerTask>
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
                    ]}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <Form></Form>
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
