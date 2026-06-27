import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function JoinLobby() {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleJoin = () => {
        if (!code.trim()) {
            setError("Please enter a lobby code");
            return;
        }
        // veriify with backend if the lobby exist
        console.log("Joining lobby:", code);
    };

    return (
        <Box sx={{ position: "relative", mt: 10 }}>
            <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
                sx={{ position: "absolute", top: -60, left: 24 }}
            >
                Back
            </Button>

            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <Typography variant="h4">Join a Lobby</Typography>
                <TextField
                    label="Lobby Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    error={!!error}
                    helperText={error}
                />
                <Button variant="contained" size="large" onClick={handleJoin}>
                    Join
                </Button>
            </Box>
        </Box>
    );
}

export default JoinLobby;