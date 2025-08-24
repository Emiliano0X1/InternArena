import { Routes, Route, Link } from "react-router-dom";
import LandingPage from "./screens/LandingPage/LandingPage"
import MatchConfig from "./screens/MatchConfig/MatchConfig"

function App() {
  return (
    <div>
      {/* Rutas */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/match" element={<MatchConfig />} />
      </Routes>
    </div>
  );
}

export default App;
