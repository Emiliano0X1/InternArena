import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Container,
    CircularProgress,
    Stack,
    InputAdornment,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PersonIcon from "@mui/icons-material/Person";
import Header from "../LandingPage/components/Header";
import { useParty } from "../../context/PartyContext";

function JoinLobby() {
    const [invitationCode, setInvitationCode] = useState("");
    const [userId, setUserId] = useState(() => sessionStorage.getItem("internarena_user_id") || "2");
    const [formErrors, setFormErrors] = useState({ invitationCode: "", userId: "" });
    const { joinLobby, isLoading } = useParty();
    const navigate = useNavigate();

    const validate = () => {
        const errors = { invitationCode: "", userId: "" };
        const trimmedCode = invitationCode.trim();
        const trimmedUserId = String(userId).trim();

        if (!trimmedCode) {
            errors.invitationCode = "Please enter a 6-digit invitation code";
        } else if (!/^[A-Za-z0-9-_]{4,10}$/.test(trimmedCode)) {
            errors.invitationCode = "Invalid invitation code format";
        }

        if (!trimmedUserId) {
            errors.userId = "Please specify a User ID";
        } else if (isNaN(Number(trimmedUserId)) || Number(trimmedUserId) <= 0) {
            errors.userId = "User ID must be a positive number";
        }

        setFormErrors(errors);
        return !errors.invitationCode && !errors.userId;
    };

    const handleJoin = async (e) => {
        if (e) e.preventDefault();
        if (!validate()) return;

        try {
            // Call addNewPlayerToWaitingParty with payload { userId, invitationCode }
            await joinLobby({
                userId: Number(userId),
                invitationCode: invitationCode.trim(),
            });

            // Route to Guest Waiting Room only upon confirmed success
            navigate("/guest-room");
        } catch {
            // Redirection is blocked automatically.
            // Error alert dialog is handled and presented by GlobalErrorDialog in PartyContext.
        }
    };

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default", color: "text.primary", display: "flex", flexDirection: "column" }}>
            <Header />

            <Container maxWidth="sm" sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", py: 4 }}>
                <Paper 
                    elevation={0}
                    component="form"
                    onSubmit={handleJoin}
                    sx={{ 
                        width: "100%", 
                        p: { xs: 4, md: 5 }, 
                        borderRadius: 4, 
                        border: "1px solid rgba(255, 255, 255, 0.06)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                        display: "flex",
                        flexDirection: "column",
                        gap: 3.5,
                        position: "relative"
                    }}
                >
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate("/")}
                        sx={{ 
                            alignSelf: "flex-start",
                            borderColor: "rgba(255,255,255,0.1)",
                            color: "text.secondary"
                        }}
                    >
                        Back to Arena
                    </Button>

                    <Box sx={{ textAlign: "center" }}>
                        <Typography variant="h4" sx={{ fontWeight: 900, mb: 1 }}>
                            Join Battle Lobby
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Enter the 6-digit invitation code shared by the host and your User ID to enter the waiting room.
                        </Typography>
                    </Box>

                    <Stack spacing={2.5}>
                        <TextField
                            label="Invitation Code"
                            placeholder="e.g. 482910"
                            value={invitationCode}
                            onChange={(e) => {
                                setInvitationCode(e.target.value.trim());
                                if (formErrors.invitationCode) {
                                    setFormErrors((prev) => ({ ...prev, invitationCode: "" }));
                                }
                            }}
                            error={!!formErrors.invitationCode}
                            helperText={formErrors.invitationCode}
                            fullWidth
                            slotProps={{
                                inputLabel: { shrink: true },
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <VpnKeyIcon sx={{ color: "primary.main", fontSize: 20 }} />
                                        </InputAdornment>
                                    ),
                                }
                            }}
                        />

                        <TextField
                            label="Your User ID"
                            placeholder="e.g. 2"
                            type="number"
                            value={userId}
                            onChange={(e) => {
                                setUserId(e.target.value);
                                if (formErrors.userId) {
                                    setFormErrors((prev) => ({ ...prev, userId: "" }));
                                }
                            }}
                            error={!!formErrors.userId}
                            helperText={formErrors.userId || "User ID registered in the backend"}
                            fullWidth
                            slotProps={{
                                inputLabel: { shrink: true },
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon sx={{ color: "text.secondary", fontSize: 20 }} />
                                        </InputAdornment>
                                    ),
                                }
                            }}
                        />

                        <Button 
                            type="submit"
                            variant="contained" 
                            size="large" 
                            disabled={isLoading}
                            startIcon={isLoading ? <CircularProgress size={18} color="inherit" /> : null}
                            sx={{ 
                                py: 1.8, 
                                fontWeight: 700,
                                fontSize: "1rem",
                                boxShadow: "0 4px 14px rgba(249, 115, 22, 0.25)",
                            }}
                        >
                            {isLoading ? "Validating & Joining..." : "Join Waiting Room"}
                        </Button>
                    </Stack>
                </Paper>
            </Container>
        </Box>
    );
}

export default JoinLobby;