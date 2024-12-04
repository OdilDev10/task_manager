import { Flex } from "antd";
import { useState } from "react";
import Login from "../home/components/Login";
import Register from "../home/components/Register";

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
