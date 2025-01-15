import { Outlet, useNavigate } from "react-router-dom";
import CustomHeaderPage from "../components/CustomHeaderPage";
import CustomFooterPage from "../components/CustomFooterPage";
import { useEffect, useState } from "react";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const globalUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [token] = useState<string | null>(localStorage.getItem("token"));

  useEffect(() => {
    if (!token) {
      navigate("/authentication", { replace: true });
    }
  }, [token]);
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
        <CustomHeaderPage />
        <div style={{
          
        }}>
          <p
            style={{
              fontWeight: "600",
              fontSize: "16px",
              display: "flex",
              flexDirection: "column",
              gap: '4px'
            }}
          >
            <span>
              User: {globalUser?.name} {globalUser?.lastName}{" "}
            </span>
            <span>ID: {globalUser?.id}</span>
          </p>
        </div>
        <div style={{ height: "95%" }}>
          <Outlet />
        </div>
      </div>
      <CustomFooterPage />
    </div>
  );
};

export default DashboardLayout;
