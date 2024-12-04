import { Outlet } from "react-router-dom";

const AuthenticationLayout = () => {
  return (
    <div>
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
        }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "90vh",
          }}>
          Prueba
          <div style={{ height: "95%" }}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationLayout;
