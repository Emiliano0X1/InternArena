import joeswag from '../../../assets/joeswag.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Popup from '../../../components/Popup';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function Header() {
    const [showShop, setShowShop] = useState(false);
    const navigate = useNavigate();

    return(
        <AppBar position="sticky" color="transparent" elevation={0} sx={{ backdropFilter: "blur(10px)" }}>
            <Toolbar sx={{ px: { xs: 2, md: 4 }, py: 1, gap: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ minWidth: 0 }}>
                    <img src={joeswag} alt="Intern Arena Logo" style={{ width: 44, height: 44 }} />
                    <Typography variant="h4" sx={{ fontWeight: 700, letterSpacing: -0.5, whiteSpace: "nowrap" }}>
                        Leet Arena
                    </Typography>
                </Stack>

                <Stack direction="row" spacing={1.5} sx={{ ml: "auto" }}>
                    <Button variant="outlined" size="large" onClick={() => navigate("/match")}>
                        Create Lobby
                    </Button>
                    <Button variant="outlined" size="large" onClick={() => setShowShop(true)}>
                        Shop
                    </Button>
                    <Button variant="contained" size="large" onClick={() => navigate("/login")}>
                        Log In / Register
                    </Button>
                </Stack>

                {showShop && (
                    <Popup title="Shop" onClose={() => setShowShop(false)}>
                        <Button variant="outlined" onClick={() => setShowShop(false)}>
                            Coming Soon
                        </Button>
                    </Popup>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Header