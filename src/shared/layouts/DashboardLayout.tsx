import { Outlet } from "react-router-dom";
import CustomHeaderPage from "../components/CustomHeaderPage";
import CustomFooterPage from "../components/CustomFooterPage";

const DashboardLayout = () => {
  return (
    <div
      style={{
        width: "80%",
        margin: "auto",
        padding: "20px 0",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "90vh",
        }}
      >
        <CustomHeaderPage />Prueba
        <div style={{ height: "95%",    }}>
          <Outlet />
        </div>
      </div>
      <CustomFooterPage/>
    </div>
  );
};

export default DashboardLayout;
