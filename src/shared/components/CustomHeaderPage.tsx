import { useNavigate } from "react-router-dom";
import { Flex, Button } from "antd";

const CustomHeaderPage = () => {
  const navigate = useNavigate();
  return (
    <Flex align="center" style={{ height: "5%" }}>
      <div style={{ flex: 1 }}>
        <h2>Task Manager</h2>
      </div>
      <div>
        <Flex gap="small" wrap>
          <Button onClick={() => navigate("/404")} type="primary">
            Sign in
          </Button>
        </Flex>
      </div>
    </Flex>
  );
};

export default CustomHeaderPage;
