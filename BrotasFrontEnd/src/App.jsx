import { Navigate, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/principalPage/login";
import LandingPage from "./pages/principalPage/landingPage";
import Pessoa from "./pages/pessoa/pessoa";
import Bag from "./pages/bag/bag";
import Alocacao from "./pages/alocacao/alocacao";
import { lazy } from "react";
const PrivatePageLayout = lazy(
  () => import("./layout/private/privatePageLayout"),
);
const PublicPageLayout = lazy(() => import("./layout/public/publicPageLayout"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicPageLayout />}>
        <Route index element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
      </Route>

      <Route path="/" element={<PrivatePageLayout />}>
        <Route path="/home" element={<LandingPage />} />
        <Route path="/pessoa" element={<Pessoa />} />
        <Route path="/bag" element={<Bag />} />
        <Route path="/alocacao" element={<Alocacao />} />
      </Route>
    </Routes>
  );
}

export default App;
