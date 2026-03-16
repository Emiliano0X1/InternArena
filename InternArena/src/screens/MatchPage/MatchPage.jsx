import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LeetcodeSet from "./components/LeetcodeSet";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function MatchPage() {
    const navigate = useNavigate();
    
    return (
        <Box sx={{ height: "100vh", bgcolor: "background.default", color: "text.primary", overflow: "hidden" }}>
            <Container maxWidth={false} sx={{ py: 2, height: "100%" }}>
                <Paper sx={{ p: { xs: 1.5, md: 2 }, mb: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                        <Button
                            variant="text"
                            onClick={() => navigate("/")}
                            startIcon={<FaLongArrowAltLeft />}
                            sx={{ color: "text.secondary" }}
                        >
                            Back
                        </Button>

                        <Box sx={{ flex: 1, textAlign: "center" }}>
                            <Typography variant="h3" sx={{ fontWeight: 800, letterSpacing: -0.6 }}>
                                Match of Emiliano
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                Time left: 00:14:23:09
                            </Typography>
                        </Box>

                        <Button variant="contained" onClick={() => navigate("/login")}>
                            Log In / Register
                        </Button>
                    </Stack>
                </Paper>

                <Paper sx={{ p: { xs: 2, md: 3 }, height: "calc(100% - 104px)", overflow: "auto" }}>
                    <LeetcodeSet/>
                </Paper>
            </Container>
        </Box>    
    );
}

export default MatchPage;
