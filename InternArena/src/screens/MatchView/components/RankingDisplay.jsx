// src/screens/MatchView/components/RankingDisplay.jsx
import React from "react";
import { Box, Typography, Grid, Avatar } from "@mui/material";

const RankingDisplay = ({ players }) => {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        p: 3,
        backgroundColor: "#343333",
        borderRadius: 2,
        color: "white",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Player Rankings
      </Typography>

      <Grid container spacing={2}>
        {players.slice(0, 6).map((player, index) => (
          <Grid item xs={4} key={index}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Avatar
                src={player.avatar}
                alt={player.name}
                sx={{ width: 64, height: 64, mb: 1 }}
              />
              <Typography variant="body2">{player.name}</Typography>
              <Typography variant="caption" sx={{ color: "#00FFAA" }}>
                {player.score} pts
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RankingDisplay;
