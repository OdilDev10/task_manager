import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../shared/services/users";

const UsersList = () => {
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    getAllUsers({
      search: "",
      page: 0,
      ordering: "",
      limit: 0,
      total: 0,
    }).then((users) => {
      setAllUsers(users);
      console.log(users);
    });
  }, []);

  return <div>Users List</div>;
};

export default UsersList;
