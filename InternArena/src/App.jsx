import { Routes, Route, Link } from "react-router-dom";
import LandingPage from "./screens/LandingPage/LandingPage"
import MatchConfig from "./screens/MatchConfig/MatchConfig"
import Login from "./screens/Login/Login"
import Register from "./screens/Register/Register"

function App() {
  return (
    <div>
      {/* Rutas */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/match" element={<MatchConfig />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </div>
  );
}

export default App;
