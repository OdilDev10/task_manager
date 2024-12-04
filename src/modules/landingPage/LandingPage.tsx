import { Flex, Button } from "antd";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div
        style={{
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          gap: "25px",
          minHeight: "100vh",
        }}
      >
        <h1>Landing page</h1>
        <Flex gap="small" wrap>
          <Button onClick={() => navigate("/authentication")} type="primary">
            Sign in
          </Button>
        </Flex>
      </div>
    </div>
  );
};

export default LandingPage;
