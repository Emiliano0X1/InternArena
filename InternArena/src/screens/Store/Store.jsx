import React, { useState } from "react";
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import Header from "../LandingPage/components/Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";


const StoreView = () => {
  const [selectedCosmetic, setSelectedCosmetic] = useState(null);
  const navigate = useNavigate();

  const cosmetics = [
    { name: "Cool Hat", avatar: "https://i.pravatar.cc/150?img=11", price: 150 },
    { name: "Cyber Glasses", avatar: "https://i.pravatar.cc/150?img=12", price: 200 },
    { name: "Golden Crown", avatar: "https://i.pravatar.cc/150?img=13", price: 500 },
    { name: "Pro Headphones", avatar: "https://i.pravatar.cc/150?img=14", price: 350 },
    { name: "Neon Mask", avatar: "https://i.pravatar.cc/150?img=15", price: 300 },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", color: "text.primary", display: "flex", flexDirection: "column" }}>
      <Header />

      <Container maxWidth="xl" sx={{ flex: 1, py: { xs: 3, md: 5 }, display: "flex", flexDirection: "column", gap: 3.5 }}>
        
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
            sx={{ borderRadius: 10, borderColor: "rgba(255,255,255,0.1)", color: "text.secondary" }}
          >
            Back
          </Button>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, bgcolor: "rgba(249, 115, 22, 0.1)", px: 2.5, py: 1, borderRadius: 2, border: "1px solid rgba(249, 115, 22, 0.2)" }}>
            <span style={{ color: "#f97316", fontWeight: 700 }}>12,345</span>
            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, textTransform: "uppercase" }}>Leetcoins</Typography>
          </Box>
        </Box>

        <Grid container spacing={4} alignItems="stretch" sx={{ flex: 1 }}>
          
          {/* Left Preview Box */}
          <Grid size={{ xs: 12, md: 6, lg: 7 }}>
            <Paper 
              sx={{ 
                height: "100%", 
                minHeight: 380,
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                p: 4,
                position: "relative",
                overflow: "hidden"
              }}
            >
              {selectedCosmetic ? (
                <Box sx={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                  <Box 
                    sx={{ 
                      width: 200, 
                      height: 200, 
                      borderRadius: "50%", 
                      overflow: "hidden", 
                      border: "4px solid #f97316",
                      padding: "4px",
                      boxShadow: "0 0 30px rgba(249, 115, 22, 0.35)",
                      backgroundColor: "rgba(0, 0, 0, 0.2)"
                    }}
                  >
                    <img
                      src={selectedCosmetic.avatar}
                      alt={selectedCosmetic.name}
                      style={{ width: "100%", height: "100%", borderRadius: "50%", objectCover: "cover" }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                      {selectedCosmetic.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      Special avatar accessory to show off in competition lobbies.
                    </Typography>
                  </Box>
                  <Button 
                    variant="contained" 
                    size="large"
                    sx={{ 
                      px: 5, 
                      py: 1.5,
                      borderRadius: 2, 
                      fontWeight: 700, 
                      boxShadow: "0 4px 15px rgba(249, 115, 22, 0.25)" 
                    }}
                  >
                    Purchase for {selectedCosmetic.price} Coins
                  </Button>
                </Box>
              ) : (
                <Box sx={{ textAlign: "center", color: "text.secondary" }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, opacity: 0.6 }}>
                    Select an item to preview
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Right Cosmetic Selection list */}
          <Grid size={{ xs: 12, md: 6, lg: 5 }}>
            <Paper sx={{ p: 4, height: "100%", display: "flex", flexDirection: "column", gap: 3.5 }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 900, mb: 0.5 }}>
                  Cosmetics Shop
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Customize your gaming avatar card.
                </Typography>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, overflowY: "auto", flex: 1, pr: 0.5 }}>
                {cosmetics.map((cosmetic, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    onClick={() => setSelectedCosmetic(cosmetic)}
                    sx={{
                      p: 2,
                      borderColor: selectedCosmetic === cosmetic ? "primary.main" : "rgba(255, 255, 255, 0.05)",
                      bgcolor: selectedCosmetic === cosmetic ? "rgba(249, 115, 22, 0.04)" : "rgba(0, 0, 0, 0.1)",
                      color: "text.primary",
                      textTransform: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderRadius: 2,
                      "&:hover": {
                        borderColor: selectedCosmetic === cosmetic ? "primary.main" : "rgba(255, 255, 255, 0.2)",
                        bgcolor: selectedCosmetic === cosmetic ? "rgba(249, 115, 22, 0.04)" : "rgba(255, 255, 255, 0.02)"
                      }
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <img
                        src={cosmetic.avatar}
                        alt={cosmetic.name}
                        style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.1)" }}
                      />
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        {cosmetic.name}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, bgcolor: "rgba(0, 0, 0, 0.2)", px: 1.5, py: 0.5, borderRadius: 2 }}>
                      <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#eab308" }}>{cosmetic.price}</span>
                      <span style={{ fontSize: "0.7rem", color: "#a3a3a3", fontWeight: 600 }}>COINS</span>
                    </Box>
                  </Button>
                ))}
              </Box>
            </Paper>
          </Grid>
          
        </Grid>
      </Container>
    </Box>
  );
};

export default StoreView;

