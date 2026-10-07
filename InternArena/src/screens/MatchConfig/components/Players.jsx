import { useState, useEffect } from "react";
import Player from "./Player";
import { AnimatePresence } from "motion/react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GroupIcon from "@mui/icons-material/Group";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import PropTypes from "prop-types";
import { DEFAULT_HOST_NAME } from "../../../constants/party";
import { deletePlayer } from "../../../services/playerService";
import ErrorDialog from "../../../components/ErrorDialog";

function Players({ initialPlayers = [], onPlayerRemoved }) {
    const [players, setPlayers] = useState([]);
    const [confirmDialog, setConfirmDialog] = useState({ open: false, playerId: null, playerName: "" });
    const [kickError, setKickError] = useState({ open: false, message: "" });

    useEffect(() => {
        if (Array.isArray(initialPlayers)) {
            setPlayers(
                initialPlayers.map((p) => ({
                    id: p.player_id || p.id || Math.random(),
                    name: p.playerUsername || p.name || `Player #${p.player_id || 1}`,
                }))
            );
        } else {
            setPlayers([]);
        }
    }, [initialPlayers]);

    const handleDeleteClick = (id, name) => {
        setConfirmDialog({ open: true, playerId: id, playerName: name });
    };

    const handleCancelKick = () => {
        setConfirmDialog({ open: false, playerId: null, playerName: "" });
    };

    const handleConfirmKick = async () => {
        const { playerId } = confirmDialog;
        setConfirmDialog({ open: false, playerId: null, playerName: "" });
        setPlayers((prev) => prev.filter((p) => p.id !== playerId));
        try {
            if (playerId && typeof playerId === "number" && playerId > 0) {
                await deletePlayer(playerId);
                onPlayerRemoved?.(playerId);
            }
        } catch (err) {
            console.error(`Failed to kick player ${playerId}:`, err);
            setKickError({ open: true, message: err?.message || "Failed to remove player. Please try again." });
        }
    };

    return (
        <>
            <Paper
                sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                    overflow: "hidden",
                }}
            >
                <Box sx={{ p: 3, pb: 2, borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 0.5 }}>
                        <GroupIcon sx={{ color: "primary.main" }} />
                        <Typography variant="body1" sx={{ fontWeight: 800 }}>
                            Lobby Players
                        </Typography>
                    </Box>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        Active queue: {players.length} / 10 players max
                    </Typography>
                </Box>

                <Box
                    className="scrollbar-hide"
                    sx={{
                        flex: 1,
                        overflowY: "auto",
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.5,
                    }}
                >
                    <AnimatePresence initial={false}>
                        {players.map((player) => (
                            <Player
                                key={player.id}
                                id={player.id}
                                name={player.name}
                                onDelete={handleDeleteClick}
                                isHost={player.name === DEFAULT_HOST_NAME}
                            />
                        ))}
                    </AnimatePresence>

                    {players.length === 0 && (
                        <Box sx={{ py: 6, textAlign: "center" }}>
                            <Typography variant="body2" sx={{ color: "text.secondary", fontStyle: "italic" }}>
                                No players in lobby.
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Paper>

            {/* Confirmation Dialog */}
            <Dialog open={confirmDialog.open} onClose={handleCancelKick}>
                <DialogTitle>Remove Player</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to remove <strong>{confirmDialog.playerName}</strong> from the lobby?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelKick} color="inherit">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmKick} variant="contained" color="error">
                        Remove
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Error Dialog */}
            <ErrorDialog
                open={kickError.open}
                title="Failed to Remove Player"
                message={kickError.message}
                status="error"
                onClose={() => setKickError({ open: false, message: "" })}
            />
        </>
    );
}

Players.propTypes = {
    initialPlayers: PropTypes.array,
    onPlayerRemoved: PropTypes.func,
};

export default Players;