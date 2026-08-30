import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import GroupsIcon from "@mui/icons-material/Groups";
import ShieldIcon from "@mui/icons-material/Shield";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SyncIcon from "@mui/icons-material/Sync";

import { useParty } from "../../context/PartyContext";
import joeswag from "../../assets/joeswag.png";

function GuestWaitingRoom() {
    const navigate = useNavigate();
    const { currentParty, partyId, invitationCode, refreshParty, clearParty } = useParty();

    const [copied, setCopied] = useState(false);
    const [toast, setToast] = useState({ open: false, severity: "success", message: "" });
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Auto-polling interval to keep joined players and status updated in real-time
    useEffect(() => {
        if (!partyId) return;

        const interval = setInterval(async () => {
            setIsRefreshing(true);
            const updated = await refreshParty(partyId);
            setIsRefreshing(false);

            // If the host completed the party configuration and activated the match
            if (updated?.party_status === "ACTIVATED") {
                setToast({ open: true, severity: "info", message: "Match started by host! Launching arena..." });
                setTimeout(() => {
                    navigate("/matchpage");
                }, 1500);
            }
        }, 2500);

        return () => clearInterval(interval);
    }, [partyId, refreshParty, navigate]);

    const handleCopyCode = async () => {
        const code = invitationCode || currentParty?.invitation_code;
        if (!code) return;
        try {
            if (navigator?.clipboard?.writeText) {
                await navigator.clipboard.writeText(String(code));
            }
            setCopied(true);
            setToast({ open: true, severity: "success", message: `Lobby code ${code} copied to clipboard!` });
            setTimeout(() => setCopied(false), 2500);
        } catch {
            setToast({ open: true, severity: "error", message: "Failed to copy code." });
        }
    };

    const handleLeaveLobby = () => {
        clearParty();
        navigate("/");
    };

    const playersList = currentParty?.players || [
        { player_id: 1, playerUsername: currentParty?.user?.userEmail?.split("@")[0] || "Host Admin" },
        { player_id: 2, playerUsername: "You (Guest)" },
    ];

    const hostEmail = currentParty?.user?.userEmail || "Host";

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default", color: "text.primary", py: { xs: 2, md: 4 } }}>
            <Container maxWidth="lg" sx={{ height: "100%", display: "flex", flexDirection: "column", gap: 3.5 }}>
                
                {/* Top Action Bar */}
                <Stack 
                    direction={{ xs: "column", sm: "row" }} 
                    alignItems={{ xs: "flex-start", sm: "center" }} 
                    justifyContent="space-between"
                    spacing={2}
                >
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <Button
                            variant="outlined"
                            onClick={handleLeaveLobby}
                            startIcon={<ArrowBackIcon />}
                            sx={{ color: "text.secondary", borderColor: "rgba(255,255,255,0.1)", borderRadius: 1 }}
                        >
                            Leave Lobby
                        </Button>
                        <Chip
                            label={`Lobby #${partyId || "—"}`}
                            color="primary"
                            size="small"
                            sx={{ fontWeight: 800, bgcolor: "rgba(249, 115, 22, 0.15)", color: "#f97316", border: "1px solid rgba(249, 115, 22, 0.3)" }}
                        />
                        <Chip
                            label={currentParty?.party_status || "WAITING"}
                            color="warning"
                            size="small"
                            variant="outlined"
                            sx={{ fontWeight: 700 }}
                        />
                    </Stack>

                    {/* Sharable Code Badge */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            bgcolor: "#383434",
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            border: "1px solid rgba(249, 115, 22, 0.3)",
                            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                        }}
                    >
                        <VpnKeyIcon sx={{ color: "#f97316", fontSize: 18 }} />
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                            Invite Code:
                        </Typography>
                        <Typography
                            component="span"
                            sx={{
                                fontFamily: "monospace",
                                fontWeight: 800,
                                fontSize: "1.05rem",
                                color: "#f97316",
                                letterSpacing: 1.5,
                                bgcolor: "rgba(249, 115, 22, 0.1)",
                                px: 1.2,
                                py: 0.2,
                                borderRadius: 1,
                            }}
                        >
                            {invitationCode || currentParty?.invitation_code || "—"}
                        </Typography>
                        <Tooltip title={copied ? "Copied!" : "Copy code"} arrow>
                            <IconButton
                                size="small"
                                onClick={handleCopyCode}
                                sx={{
                                    color: copied ? "success.main" : "#f97316",
                                    bgcolor: copied ? "rgba(34, 197, 94, 0.15)" : "rgba(249, 115, 22, 0.15)",
                                }}
                            >
                                {copied ? <CheckCircleOutlineIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Stack>

                {/* Real-time Status Banner Card */}
                <Paper
                    sx={{
                        p: { xs: 3, md: 4 },
                        borderRadius: 3,
                        bgcolor: "#242020",
                        border: "1px solid rgba(249, 115, 22, 0.25)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    {/* Glowing background gradient */}
                    <Box
                        sx={{
                            position: "absolute",
                            top: -50,
                            right: -50,
                            width: 200,
                            height: 200,
                            borderRadius: "50%",
                            background: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(0,0,0,0) 70%)",
                            pointerEvents: "none",
                        }}
                    />

                    <Stack direction={{ xs: "column", md: "row" }} spacing={3} alignItems="center" justifyContent="space-between">
                        <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
                            <Box
                                sx={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: "50%",
                                    bgcolor: "rgba(249, 115, 22, 0.15)",
                                    border: "2px solid rgba(249, 115, 22, 0.4)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#f97316",
                                    boxShadow: "0 0 20px rgba(249, 115, 22, 0.25)",
                                }}
                            >
                                <motion.div
                                    animate={{ rotate: [0, 180, 360] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    style={{ display: "flex" }}
                                >
                                    <HourglassEmptyIcon sx={{ fontSize: 32 }} />
                                </motion.div>
                            </Box>

                            <Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.5 }}>
                                    <Typography variant="h5" sx={{ fontWeight: 900, color: "text.primary" }}>
                                        Guest Waiting Room
                                    </Typography>
                                    <Chip
                                        icon={<SyncIcon sx={{ fontSize: "14px !important", animation: isRefreshing ? "spin 1s linear infinite" : "none" }} />}
                                        label="Live Sync"
                                        size="small"
                                        color="success"
                                        variant="outlined"
                                        sx={{ height: 22, fontSize: "0.7rem", fontWeight: 700 }}
                                    />
                                </Box>
                                <Typography variant="body1" sx={{ color: "#f97316", fontWeight: 700 }}>
                                    Waiting for host to configure match settings...
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                                    Host ({hostEmail}) is currently selecting the difficulty, contest duration, and problems.
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ textAlign: { xs: "left", md: "right" }, width: { xs: "100%", md: "auto" } }}>
                            <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", display: "block" }}>
                                Active Queue
                            </Typography>
                            <Typography variant="h4" sx={{ fontWeight: 900, color: "primary.main" }}>
                                {playersList.length} <span style={{ fontSize: "1rem", color: "#a3a3a3" }}>/ 10 Players</span>
                            </Typography>
                        </Box>
                    </Stack>
                </Paper>

                {/* Joined Players Roster */}
                <Box>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                            <GroupsIcon sx={{ color: "primary.main" }} />
                            <Typography variant="h6" sx={{ fontWeight: 800 }}>
                                Joined Players ({playersList.length})
                            </Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                            Auto-refreshes in real-time
                        </Typography>
                    </Box>

                    <Grid container spacing={2.5}>
                        <AnimatePresence>
                            {playersList.map((player, index) => {
                                const isHost = index === 0;
                                const playerName = player.playerUsername || `Player #${player.player_id || index + 1}`;
                                return (
                                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={player.player_id || index}>
                                        <motion.div
                                            initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Paper
                                                sx={{
                                                    p: 2.5,
                                                    bgcolor: "#2e2929",
                                                    borderRadius: 2.5,
                                                    border: isHost ? "1px solid rgba(249, 115, 22, 0.4)" : "1px solid rgba(255, 255, 255, 0.06)",
                                                    boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 2,
                                                    position: "relative",
                                                }}
                                            >
                                                <Box sx={{ position: "relative" }}>
                                                    <Box
                                                        component="img"
                                                        src={joeswag}
                                                        alt={playerName}
                                                        sx={{
                                                            width: 48,
                                                            height: 48,
                                                            borderRadius: "50%",
                                                            border: isHost ? "2px solid #f97316" : "2px solid rgba(255,255,255,0.1)",
                                                            bgcolor: "#1a1818",
                                                        }}
                                                    />
                                                    <Box
                                                        sx={{
                                                            width: 10,
                                                            height: 10,
                                                            borderRadius: "50%",
                                                            bgcolor: "#22c55e",
                                                            position: "absolute",
                                                            bottom: 0,
                                                            right: 0,
                                                            border: "2px solid #2e2929",
                                                        }}
                                                    />
                                                </Box>

                                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                        <Typography variant="subtitle1" sx={{ fontWeight: 800, truncate: true }}>
                                                            {playerName}
                                                        </Typography>
                                                        {isHost && (
                                                            <Chip
                                                                icon={<ShieldIcon sx={{ fontSize: "12px !important" }} />}
                                                                label="HOST"
                                                                size="small"
                                                                color="primary"
                                                                sx={{ height: 18, fontSize: "0.65rem", fontWeight: 800 }}
                                                            />
                                                        )}
                                                    </Box>
                                                    <Typography variant="caption" sx={{ color: "success.main", fontWeight: 600 }}>
                                                        ● Ready in lobby
                                                    </Typography>
                                                </Box>
                                            </Paper>
                                        </motion.div>
                                    </Grid>
                                );
                            })}
                        </AnimatePresence>
                    </Grid>
                </Box>

                {/* Footer Controls */}
                <Box sx={{ display: "flex", justifyContent: "center", mt: "auto", pt: 4 }}>
                    <Button
                        variant="outlined"
                        color="inherit"
                        startIcon={<ExitToAppIcon />}
                        onClick={handleLeaveLobby}
                        sx={{
                            color: "text.secondary",
                            borderColor: "rgba(255, 255, 255, 0.15)",
                            "&:hover": { borderColor: "rgba(255, 255, 255, 0.3)" },
                        }}
                    >
                        Exit Waiting Room
                    </Button>
                </Box>
            </Container>

            <Snackbar
                open={toast.open}
                autoHideDuration={3500}
                onClose={() => setToast((t) => ({ ...t, open: false }))}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setToast((t) => ({ ...t, open: false }))}
                    severity={toast.severity}
                    variant="filled"
                    sx={{ width: "100%", borderRadius: 3 }}
                >
                    {toast.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default GuestWaitingRoom;
