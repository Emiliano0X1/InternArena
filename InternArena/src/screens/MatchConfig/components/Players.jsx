import { useState } from "react"
import Player from "./Player"
import { AnimatePresence } from "motion/react"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GroupIcon from "@mui/icons-material/Group";
import Paper from "@mui/material/Paper";

const INITIAL_PLAYERS = [
    { id: 1, name: "Emiliano Gonsales" },
    { id: 2, name: "Lucas Ferreira" },
    { id: 3, name: "Mateo Silva" },
    { id: 4, name: "Sofia Rodríguez" },
    { id: 5, name: "Isabella Martinez" },
    { id: 6, name: "Juan Pérez" },
    { id: 7, name: "Ana Gomez" },
    { id: 8, name: "Carlos Ruiz" },
    { id: 9, name: "Elena Ramos" },
]

function Players() {
    const [players, setPlayers] = useState(INITIAL_PLAYERS)

    const handleDelete = (id) => {
        setPlayers((prev) => prev.filter((p) => p.id !== id))
    }

    return(
        <Paper 
            sx={{ 
                width: "100%", 
                height: "100%", 
                display: "flex", 
                flexDirection: "column", 
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                overflow: "hidden"
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
                    Active queue: {players.length} / 12 players max
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
                    gap: 0.5
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
    )
}

export default Players;