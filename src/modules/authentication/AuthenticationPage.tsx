import { Flex } from "antd";
import { useState } from "react";
import Login from "../home/components/Register";
import Register from "../home/components/Login";

const AuthenticationPage = () => {
  const [authenticationStatus, setAuthenticationStatus] = useState<
    "register" | "login"
  >("login");

  return (
    <Flex align="center" justify="center" style={{ height: "100%" }}>
      {authenticationStatus === "login" && (
        <Register setAuthenticationStatus={setAuthenticationStatus} />
      )}

      {authenticationStatus === "register" && (
        <Login setAuthenticationStatus={setAuthenticationStatus} />
      )}
    </Flex>
  );
};

export default AuthenticationPage;
