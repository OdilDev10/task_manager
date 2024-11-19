import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DashboardPage from "./modules/home/DashboardPage";
import DashboardLayout from "./shared/layouts/DashboardLayout";
import ButtonBackToHome from "./shared/components/ButtonBackToHome";

function App() {
  return (
    <>
      <BrowserRouter>
        <>
          <Routes>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/hola" element={<DashboardPage />} />
              <Route path="/" element={<DashboardPage />} />
              <Route path="/" element={<DashboardPage />} />

            </Route>

            <Route
              path="*"
              element={
               <ButtonBackToHome/>
              }
            ></Route>
          </Routes>
        </>
      </BrowserRouter>
    </>
  );
}

export default App;
