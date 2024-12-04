import { Flex, Button } from "antd";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Landing page</h1>
      <Flex gap="small" wrap>
        <Button onClick={() => navigate("/authentication")} type="primary">
          Sign in
        </Button>
      </Flex>
    </div>
  );
};

export default LandingPage;
