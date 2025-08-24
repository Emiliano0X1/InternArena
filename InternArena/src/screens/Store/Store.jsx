// src/screens/Store/StoreView.jsx
import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";

const StoreView = () => {
  const [selectedCosmetic, setSelectedCosmetic] = useState(null);

  const cosmetics = [
    { name: "Cool Hat", avatar: "https://i.pravatar.cc/150?img=1" },
    { name: "Sunglasses", avatar: "https://i.pravatar.cc/150?img=2" },
    { name: "Beard", avatar: "https://i.pravatar.cc/150?img=3" },
    { name: "Headphones", avatar: "https://i.pravatar.cc/150?img=4" },
    { name: "Mask", avatar: "https://i.pravatar.cc/150?img=5" },
  ];

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
      {/* Preview izquierdo */}
      <Box
        sx={{
          flex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 2,
        }}
      >
        {selectedCosmetic ? (
          <Box sx={{ textAlign: "center" }}>
            <img
              src={selectedCosmetic.avatar}
              alt={selectedCosmetic.name}
              style={{ width: 200, height: 200, borderRadius: "50%" }}
            />
            <Typography variant="h6" sx={{ color: "white", mt: 1 }}>
              {selectedCosmetic.name}
            </Typography>
          </Box>
        ) : (
          <Typography variant="h6" sx={{ color: "white" }}>
            Selecciona un cosmético
          </Typography>
        )}
      </Box>

      {/* Lista derecha */}
      <Box
        sx={{
          flex: 1,
          maxWidth: 300,
          backgroundColor: "#343333",
          borderRadius: 2,
          padding: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography variant="h5" align="center" sx={{ color: "white", mb: 2 }}>
          Cosméticos disponibles
        </Typography>
        {cosmetics.map((cosmetic, index) => (
          <Button
            key={index}
            variant={selectedCosmetic === cosmetic ? "contained" : "outlined"}
            onClick={() => setSelectedCosmetic(cosmetic)}
            sx={{
              backgroundColor:
                selectedCosmetic === cosmetic ? "#00FFAA" : "#555",
              color: "white",
              textTransform: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 1,
              borderRadius: 2,
            }}
          >
            <img
              src={cosmetic.avatar}
              alt={cosmetic.name}
              style={{ width: 40, height: 40, borderRadius: "50%" }}
            />
            {cosmetic.name}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default StoreView;
