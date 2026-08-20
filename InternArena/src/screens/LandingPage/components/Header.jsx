import { useState } from 'react';
import joeswag from '../../../assets/joeswag.png';
import { useNavigate, useLocation } from 'react-router-dom';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { label: "Create Lobby", path: "/match" },
        { label: "Join Lobby", path: "/join" },
        { label: "Shop", path: "/store" },
        { label: "Log In", path: "/login", primary: true },
    ];

    return (
        <AppBar 
            position="sticky" 
            color="transparent" 
            elevation={0} 
            sx={{ 
                backdropFilter: "blur(12px)", 
                backgroundColor: "rgba(40, 36, 36, 0.75)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
            }}
        >
            <Toolbar sx={{ px: { xs: 2, md: 6 }, py: 1.5, gap: 2, justifyContent: "space-between" }}>
                <Stack 
                    direction="row" 
                    spacing={1.5} 
                    alignItems="center" 
                    sx={{ minWidth: 0, cursor: "pointer" }}
                    onClick={() => navigate("/")}
                >
                    <Box 
                        component="img" 
                        src={joeswag} 
                        alt="Intern Arena Logo" 
                        sx={{ 
                            width: 40, 
                            height: 40, 
                            borderRadius: "50%",
                            border: "2px solid #f97316",
                            padding: "2px",
                            boxShadow: "0 0 10px rgba(249, 115, 22, 0.3)"
                        }} 
                    />
                    <Typography 
                        variant="h5" 
                        sx={{ 
                            fontWeight: 800, 
                            letterSpacing: -0.8, 
                            whiteSpace: "nowrap",
                            background: "linear-gradient(135deg, #ffffff 0%, #a3a3a3 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            "& span": {
                                color: "#f97316",
                                textShadow: "0 0 15px rgba(249, 115, 22, 0.4)"
                            }
                        }}
                    >
                        Leet <span>Arena</span>
                    </Typography>
                </Stack>

                {/* Desktop Menu */}
                <Stack 
                    direction="row" 
                    spacing={1.5} 
                    alignItems="center"
                    sx={{ display: { xs: "none", md: "flex" } }}
                >
                    <Button 
                        variant={isActive("/match") ? "contained" : "outlined"} 
                        onClick={() => navigate("/match")}
                        sx={{
                            px: 3,
                        }}
                    >
                        Create Lobby
                    </Button>
                    <Button 
                        variant={isActive("/join") ? "contained" : "outlined"} 
                        onClick={() => navigate("/join")}
                        sx={{
                            px: 3,
                        }}
                    >
                        Join Lobby
                    </Button>
                    <Button 
                        variant={isActive("/store") ? "contained" : "outlined"} 
                        onClick={() => navigate("/store")}
                        sx={{
                            px: 3,
                        }}
                    >
                        Shop
                    </Button>
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={() => navigate("/login")}
                        sx={{
                            px: 3,
                            boxShadow: "0 4px 12px rgba(249, 115, 22, 0.2)",
                        }}
                    >
                        Log In
                    </Button>
                </Stack>

                {/* Mobile Menu Icon */}
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={() => setDrawerOpen(true)}
                    sx={{ display: { xs: "flex", md: "none" } }}
                >
                    <MenuIcon />
                </IconButton>

                {/* Mobile Drawer */}
                <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={() => setDrawerOpen(false)}
                    PaperProps={{
                        sx: {
                            width: 250,
                            bgcolor: "#282424",
                            backgroundImage: "none",
                            borderLeft: "1px solid rgba(255, 255, 255, 0.05)",
                            p: 3,
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                        }
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: "text.primary" }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Stack spacing={2} sx={{ mt: 2 }}>
                        {navItems.map((item) => (
                            <Button
                                key={item.label}
                                variant={item.primary ? "contained" : (isActive(item.path) ? "contained" : "outlined")}
                                color={item.primary ? "primary" : "inherit"}
                                onClick={() => {
                                    navigate(item.path);
                                    setDrawerOpen(false);
                                }}
                                sx={{
                                    py: 1.5,
                                    fontSize: "1rem",
                                    fontWeight: 700,
                                    borderColor: item.primary ? "none" : (isActive(item.path) ? "none" : "rgba(255, 255, 255, 0.1)"),
                                    boxShadow: item.primary ? "0 4px 12px rgba(249, 115, 22, 0.2)" : "none"
                                }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Stack>
                </Drawer>
            </Toolbar>
        </AppBar>
    );
}

export default Header;