import { useState, useEffect } from "react";
import Player from "./Player";
import { AnimatePresence } from "motion/react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GroupIcon from "@mui/icons-material/Group";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import { DEFAULT_HOST_ID, DEFAULT_HOST_NAME } from "../../../constants/party";

import { deletePlayer } from "../../../services/playerService";

function Players({ initialPlayers = [], onPlayerRemoved }) {
    const [players, setPlayers] = useState([]);

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

    const handleDelete = async (id) => {
        setPlayers((prev) => prev.filter((p) => p.id !== id));
        try {
            if (id && typeof id === "number" && id > 0) {
                await deletePlayer(id);
                onPlayerRemoved?.(id);
            }
        } catch (err) {
            console.error(`Failed to delete player ${id} on backend:`, err);
        }
    };

    return (
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
                            onDelete={handleDelete}
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
    );
}

Players.propTypes = {
    initialPlayers: PropTypes.array,
};

export default Players;