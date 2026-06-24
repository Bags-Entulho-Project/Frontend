import { Navigate, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from "./pages/login";

function App() {
  return( 
    <Routes>
      <Route index element={<Navigate to="/login"/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
  )
}

export default App
