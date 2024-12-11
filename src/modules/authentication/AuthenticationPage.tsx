import { Flex } from "antd";
import { useEffect, useState } from "react";
import Register from "../home/components/Register";
import Login from "../home/components/Login";
import { useNavigate } from "react-router-dom";

const AuthenticationPage = () => {
  const navigate = useNavigate();
  const [authenticationStatus, setAuthenticationStatus] = useState<
    "register" | "login"
  >("login");

  const [token] = useState<string | null>(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [token]);

  return (
    <Flex align="center" justify="center" style={{ height: "100%" }}>
      {authenticationStatus === "login" && (
        <Login setAuthenticationStatus={setAuthenticationStatus} />
      )}

      {authenticationStatus === "register" && (
        <Register setAuthenticationStatus={setAuthenticationStatus} />
      )}
    </Flex>
  );
};

export default AuthenticationPage;
