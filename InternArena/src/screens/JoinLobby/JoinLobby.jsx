import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Paper, Container } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "../LandingPage/components/Header";

function JoinLobby() {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleJoin = () => {
        if (!code.trim()) {
            setError("Please enter a lobby code");
            return;
        }
        console.log("Joining lobby:", code);
    };

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default", color: "text.primary", display: "flex", flexDirection: "column" }}>
            <Header />

            <Container maxWidth="sm" sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", py: 4 }}>
                <Paper 
                    elevation={0}
                    sx={{ 
                        width: "100%", 
                        p: { xs: 4, md: 5 }, 
                        borderRadius: 4, 
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
                        display: "flex",
                        flexDirection: "column",
                        gap: 3.5,
                        position: "relative"
                    }}
                >
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate(-1)}
                        sx={{ 
                            alignSelf: "flex-start",
                            borderColor: "rgba(255,255,255,0.1)",
                            color: "text.secondary"
                        }}
                    >
                        Back
                    </Button>

                    <Box sx={{ textAlign: "center" }}>
                        <Typography variant="h4" sx={{ fontWeight: 900, mb: 1 }}>
                            Join Lobby
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Enter the code shared by your teammate to enter the battle arena.
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        <TextField
                            label="Lobby Access Code"
                            placeholder="e.g. ARENA-9283"
                            value={code}
                            onChange={(e) => {
                                setCode(e.target.value);
                                if (error) setError("");
                            }}
                            error={!!error}
                            helperText={error}
                            fullWidth
                            slotProps={{
                                inputLabel: { shrink: true }
                            }}
                        />
                        <Button 
                            variant="contained" 
                            size="large" 
                            onClick={handleJoin}
                            sx={{ 
                                py: 1.8, 
                                fontWeight: 700,
                                boxShadow: "0 4px 12px rgba(249, 115, 22, 0.2)",
                            }}
                        >
                            Join Battle
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}

export default JoinLobby;