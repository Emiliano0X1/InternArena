import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";

function JoinLobby() {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleJoin = () => {
        if (!code.trim()) {
            setError("Please enter a lobby code");
            return;
        }
        // TODO: validar con backend que el código existe
        console.log("Joining lobby:", code);
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 10, gap: 2 }}>
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
    );
}

export default JoinLobby;