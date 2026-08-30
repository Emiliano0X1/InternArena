import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Paper, Container, CircularProgress, Alert } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "../LandingPage/components/Header";
import { joinPartyByCode } from "../../services/partyService";
import { savePartySession } from "../../utils/partyStorage";
import { useParty } from "../../context/PartyContext";

function JoinLobby() {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { setCurrentParty } = useParty();

    const handleJoin = async () => {
        const trimmedCode = code.trim();
        if (!trimmedCode) {
            setError("Please enter a valid 6-digit lobby code");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            // Default user_id=2 for joining guest/participant
            const party = await joinPartyByCode(2, trimmedCode);
            savePartySession(party);
            setCurrentParty(party);
            setIsLoading(false);
            navigate("/match");
        } catch (err) {
            setIsLoading(false);
            const errMsg =
                err.message ||
                err.response?.data?.error ||
                `The party with code "${trimmedCode}" could not be joined.`;
            setError(errMsg);
        }
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
                            Enter the 6-digit code shared by your host to enter the battle arena.
                        </Typography>
                    </Box>

                    {error && (
                        <Alert severity="error" variant="outlined" sx={{ borderRadius: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        <TextField
                            label="Lobby Access Code"
                            placeholder="e.g. 482910"
                            value={code}
                            onChange={(e) => {
                                setCode(e.target.value);
                                if (error) setError("");
                            }}
                            error={!!error}
                            fullWidth
                            slotProps={{
                                inputLabel: { shrink: true }
                            }}
                        />
                        <Button 
                            variant="contained" 
                            size="large" 
                            onClick={handleJoin}
                            disabled={isLoading}
                            startIcon={isLoading ? <CircularProgress size={18} color="inherit" /> : null}
                            sx={{ 
                                py: 1.8, 
                                fontWeight: 700,
                                boxShadow: "0 4px 12px rgba(249, 115, 22, 0.2)",
                            }}
                        >
                            {isLoading ? "Joining..." : "Join Battle"}
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}

export default JoinLobby;