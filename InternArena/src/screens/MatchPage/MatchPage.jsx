import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LeetcodeSet from "./components/LeetcodeSet";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useMatchInfo } from "../../hooks/useMatchInfo";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PeopleIcon from "@mui/icons-material/People";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

const MATCH_ID = 1;

function MatchPage() {
    const navigate = useNavigate();
    const { data: matchInfo, isLoading } = useMatchInfo(MATCH_ID);

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default", color: "text.primary", py: { xs: 2, md: 4 } }}>
            <Container maxWidth="xl" sx={{ height: "100%", display: "flex", flexDirection: "column", gap: 3 }}>
                
                {/* Header Card */}
                <Paper sx={{ p: { xs: 2.5, md: 3.5 }, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
                    <Stack 
                        direction={{ xs: "column", md: "row" }} 
                        spacing={3} 
                        alignItems="center" 
                        justifyContent="space-between"
                        sx={{ width: "100%" }}
                    >
                        {/* Navigation back and stats */}
                        <Stack direction={{ xs: "row", md: "column" }} spacing={1.5} alignItems="flex-start" sx={{ width: { xs: "100%", md: "auto" }, justifyContent: "space-between" }}>
                            <Button
                                variant="outlined"
                                onClick={() => navigate("/")}
                                startIcon={<FaLongArrowAltLeft />}
                                sx={{ color: "text.secondary", borderColor: "rgba(255,255,255,0.1)", px: 2.5, mb: { md: 1 } }}
                            >
                                Back
                            </Button>

                            <Stack direction="row" spacing={2.5}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <EmojiEventsIcon sx={{ color: "warning.main", fontSize: 20 }} />
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: "block", textTransform: "uppercase" }}>Prize</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                                            {isLoading ? "..." : matchInfo?.prize ?? "—"}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <PeopleIcon sx={{ color: "primary.main", fontSize: 20 }} />
                                    <Box>
                                        <Typography variant="caption" color="text.secondary" sx={{ display: "block", textTransform: "uppercase" }}>Players</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                                            {isLoading ? "..." : matchInfo?.currentPlayers ?? "—"}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Stack>
                        </Stack>

                        {/* Title & Countdown */}
                        <Box sx={{ textAlign: "center", flex: 1 }}>
                            <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: -0.8, mb: 0.5 }}>
                                {isLoading ? "Arena Match" : `Match of ${matchInfo?.creatorName || "Emiliano"}`}
                            </Typography>
                            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                                <HourglassEmptyIcon sx={{ color: "primary.main", fontSize: 18 }} />
                                <Typography 
                                    variant="h6" 
                                    sx={{ 
                                        fontFamily: "monospace", 
                                        fontWeight: 700, 
                                        color: "primary.main",
                                        letterSpacing: 1,
                                        textShadow: "0 0 10px rgba(249, 115, 22, 0.25)" 
                                    }}
                                >
                                    Time left: 00:14:23:09
                                </Typography>
                            </Stack>
                        </Box>

                        {/* CTA / Auth Actions */}
                        <Button 
                            variant="contained" 
                            onClick={() => navigate("/login")}
                            sx={{
                                width: { xs: "100%", md: "auto" },
                                borderRadius: 10,
                                px: 4,
                                py: 1.5,
                                boxShadow: "0 4px 12px rgba(249, 115, 22, 0.2)",
                            }}
                        >
                            Log In
                        </Button>
                    </Stack>
                </Paper>

                {/* Leetcode Set Card */}
                <Paper sx={{ p: { xs: 3, md: 4.5 }, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
                    <LeetcodeSet/>
                </Paper>
            </Container>
        </Box>
    );
}

export default MatchPage;