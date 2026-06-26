import { Navigate, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/principalPage/login";
import LandingPage from "./pages/principalPage/landingPage";
import Pessoa from "./pages/pessoa/pessoa";
import Bag from "./pages/bag/bag";
import Alocacao from "./pages/alocacao/alocacao";
import { lazy } from "react";
const Pagelayout = lazy(() => import("./layout/pageLayout"));

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <Pagelayout />
      }>
        <Route index element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/pessoa" element={<Pessoa />}/>
        <Route path="/bag" element={<Bag />}/>
        <Route path="/alocacao" element={<Alocacao />}/>
      </Route>
    </Routes>
  );
}

export default App;
