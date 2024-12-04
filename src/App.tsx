import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DashboardPage from "./modules/home/DashboardPage";
import DashboardLayout from "./shared/layouts/DashboardLayout";
import ButtonBackToHome from "./shared/components/ButtonBackToHome";
import LandingPage from "./modules/landingPage/LandingPage";
import AuthenticationPage from "./modules/authentication/AuthenticationPage";
import AuthenticationLayout from "./shared/layouts/AuthenticationLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <>
          <Routes>
            <Route element={<DashboardLayout />} path="/dashboard">
              <Route path="" element={<DashboardPage />} />
            </Route>
            <Route element={<AuthenticationLayout />} path="/authentication">
              <Route path="" element={<AuthenticationPage />} />
            </Route>
            <Route element={<LandingPage />} path="/" />

            <Route path="*" element={<ButtonBackToHome />}></Route>
          </Routes>
        </>
      </BrowserRouter>
    </>
  );
}

export default App;
