import React from "react";
import { Box } from "@mui/material";
import LeetDisplay from "./components/LeetDisplay";
import RankingDisplay from "./components/RankingDisplay";
import PredictionDisplay from "./components/PredictDisplay";

const MatchView = () => {
  // Datos simulados
  const players = [
    { name: "Player 1", avatar: "", score: 120 },
    { name: "Player 2", avatar: "", score: 110 },
    { name: "Player 3", avatar: "", score: 95 },
    { name: "Player 4", avatar: "", score: 85 },
  ];

  const predictions = players.map((p) => ({
    name: p.name,
    prediction: Math.floor(Math.random() * 100),
  }));

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        gap: 2,
        padding: 2,
        backgroundColor: "#272727",
      }}
    >
      {/* Columna izquierda */}
      <Box sx={{ flex: 1, backgroundColor: "#343333", borderRadius: 2 }}>
        <LeetDisplay />
      </Box>

      {/* Columna derecha */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <RankingDisplay players={players} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <PredictionDisplay title="Who Will Win?" predictions={predictions} />
        </Box>
      </Box>
    </Box>
  );
};

export default MatchView;
