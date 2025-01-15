import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthenticationPage from "./modules/authentication/AuthenticationPage";
import DashboardPage from "./modules/home/DashboardPage";
import LandingPage from "./modules/landingPage/LandingPage";
import ButtonBackToHome from "./shared/components/ButtonBackToHome";
import AuthenticationLayout from "./shared/layouts/AuthenticationLayout";
import DashboardLayout from "./shared/layouts/DashboardLayout";
import ThemeProvider from "./context/ThemeContext";

function App() {
  return (
    <>
      <ThemeProvider>
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
      </ThemeProvider>
    </>
  );
}

export default App;
