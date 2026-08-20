import Match from "./Match"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import Paper from "@mui/material/Paper";

function ActiveMatches() {
    return(
        <Paper 
            sx={{ 
                width: "100%", 
                p: 3, 
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)"
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 2.5 }}>
                <SportsEsportsIcon sx={{ color: "primary.main", fontSize: 22 }} />
                <Typography variant="body1" sx={{ fontWeight: 700, color: "text.primary" }}>
                    Active Matches
                </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Match player="Lobby #283 - Easy Run" timeLeft="4 hours left" currentRank="1" predictionRank="1" />
                <Match player="Emiliano's Arena" timeLeft="14 hours left" currentRank="4" predictionRank="3" />
                <Match player="LeetCode Grind Elite" timeLeft="1 day left" currentRank="12" predictionRank="8" />
            </Box>
        </Paper>  
    )
}

export default ActiveMatches;