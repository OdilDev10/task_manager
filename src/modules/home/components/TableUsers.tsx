import { Table } from "antd";
import { IUserRegister } from "../../../shared/schemas/authSchemas";

const TableUsers = ({ allUsers }: { allUsers: IUserRegister[] }) => {
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
