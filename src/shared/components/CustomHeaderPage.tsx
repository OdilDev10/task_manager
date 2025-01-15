import { useNavigate } from "react-router-dom";
import { Flex, Button } from "antd";
import Swal from "sweetalert2";
import { LogoutOutlined } from "@ant-design/icons";

const CustomHeaderPage = () => {
  const navigate = useNavigate();

  const signOut = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Vas a salir de tu cuenta",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, quiero salir",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        navigate("/authentication");
      }
    });
  };
  return (
    <Flex align="center" style={{ height: "5%" }}>
      <div style={{ flex: 1 }}>
        <h2>Task Manager</h2>
      </div>
      <div>
        <Flex gap="small" wrap>
          <Button
            onClick={signOut}
            type="primary"
            style={{ background: "red" }}
          >
            <LogoutOutlined />
          </Button>
        </Flex>
      </div>
    </Flex>
  );
};

export default CustomHeaderPage;
