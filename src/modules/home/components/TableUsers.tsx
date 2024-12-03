import { Table } from "antd";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../shared/services/userServices";
import { UserInterface } from "../../../shared/interfaces/UserInterface";

const TableUsers = () => {
  const [allUsers, setAllUsers] = useState<UserInterface[]>([]);

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

  const dtoUsers = (data: any[]) => {
    let results = data.map((item) => {
      return {
        id: item?.id || "",
        name: item?.name || "",
        lastName: item?.lastName || "",
        email: item?.email || "",
      };
    });

    return results;
  };

  useEffect(() => {
    getAllUsers().then((data) => {
      setAllUsers(dtoUsers(data));
      console.log(data);
    });
  }, []);

  return (
    <div>
      <Table dataSource={allUsers} columns={columns} />
    </div>
  );
};

export default TableUsers;
