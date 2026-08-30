import { Routes, Route } from "react-router-dom";
import LandingPage from "./screens/LandingPage/LandingPage";
import MatchConfig from "./screens/MatchConfig/MatchConfig";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";
import MatchPage from "./screens/MatchPage/MatchPage";
import StoreView from "./screens/Store/Store";
import JoinLobby from "./screens/JoinLobby/JoinLobby";
import { PartyProvider, useParty } from "./context/PartyContext";
import ErrorDialog from "./components/ErrorDialog";

function GlobalErrorDialog() {
    const { errorDialog, closeErrorDialog, createLobby } = useParty();
    return (
        <ErrorDialog
            open={errorDialog.open}
            title={errorDialog.title}
            message={errorDialog.message}
            status={errorDialog.status}
            onClose={closeErrorDialog}
            onRetry={() => {
                closeErrorDialog();
                createLobby(1).catch(() => {});
            }}
        />
    );
}

function App() {
    return (
        <PartyProvider>
            <GlobalErrorDialog />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/match" element={<MatchConfig />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/matchpage" element={<MatchPage />} />
                <Route path="/store" element={<StoreView />} />
                <Route path="/join" element={<JoinLobby />} />
            </Routes>
        </PartyProvider>
    );
}

export default App;
