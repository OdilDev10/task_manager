import { Table } from "antd";
import { UserInterface } from "../../../shared/interfaces/UserInterface";

const TableUsers = ({ allUsers }: { allUsers: UserInterface[] }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Correo",
      dataIndex: "email",
      key: "email",
    },
  ];

  return (
    <div>
      <Table dataSource={allUsers} columns={columns} />
    </div>
  );
};

export default TableUsers;
