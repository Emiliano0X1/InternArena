import { Routes, Route, Link } from "react-router-dom";
import LandingPage from "./screens/LandingPage/LandingPage"
import MatchConfig from "./screens/MatchConfig/MatchConfig"

function App() {
  return (
    <div>
      {/* Menú de navegación */}
      <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <Link to="/">Landing</Link>
        <Link to="/match">Match Config</Link>
      </nav>

      {/* Rutas */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/match" element={<MatchConfig />} />
      </Routes>
    </div>
  );
}

export default App;
