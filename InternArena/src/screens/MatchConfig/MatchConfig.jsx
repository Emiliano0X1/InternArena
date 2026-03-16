import { FaLongArrowAltLeft } from "react-icons/fa";
import Players from "./components/Players";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "./components/Popup";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function MatchConfig() {
    const navigate = useNavigate();
    //Difficulty
    //Time
    //Prize
    //Topics
    const [showDiff, setShowDiff] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [showPrize, setShowPrize] = useState(false);
    const [showTopic, setShowTopic] = useState(false);
    // "Saved" values (only change on confirm)
    const [difficulty, setDifficulty] = useState("");
    const [matchEndDate, setMatchEndDate] = useState("");
    const [prize, setPrize] = useState("");

    // "Draft" values (edited inside popups)
    const [draftDifficulty, setDraftDifficulty] = useState("");
    const [draftMatchEndDate, setDraftMatchEndDate] = useState("");
    const [draftPrize, setDraftPrize] = useState("");

    const [formErrors, setFormErrors] = useState({
        difficulty: "",
        matchEndDate: "",
        prize: "",
    });
    const [toast, setToast] = useState({ open: false, severity: "success", message: "" });

    const formatDateYYYYMMDD = (date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, "0");
        const d = String(date.getDate()).padStart(2, "0");
        return `${y}-${m}-${d}`;
    };

    const today = new Date();
    const minEnd = new Date(today);
    minEnd.setDate(minEnd.getDate() + 1);
    const maxEnd = new Date(today);
    maxEnd.setDate(maxEnd.getDate() + 31);

    const minEndStr = formatDateYYYYMMDD(minEnd);
    const maxEndStr = formatDateYYYYMMDD(maxEnd);

    const parseYYYYMMDDAsUTCDate = (yyyyMmDd) => {
        const [y, m, d] = yyyyMmDd.split("-").map(Number);
        return new Date(Date.UTC(y, m - 1, d));
    };

    const diffDaysUTC = (startUtc, endUtc) => {
        const ms = endUtc.getTime() - startUtc.getTime();
        return Math.round(ms / (1000 * 60 * 60 * 24));
    };

    const buildPayloadForBackend = () => {
        const now = new Date();
        const startYYYYMMDD = formatDateYYYYMMDD(now);

        const startUtc = parseYYYYMMDDAsUTCDate(startYYYYMMDD);
        const endUtc = parseYYYYMMDDAsUTCDate(matchEndDate);
        const durationDays = diffDaysUTC(startUtc, endUtc);

        return {
            difficulty,              // "Easy" | "Medium" | "Hard"
            prize,                   // string
            startDate: startYYYYMMDD, // "YYYY-MM-DD"
            endDate: matchEndDate,    // "YYYY-MM-DD"
            durationDays,             // number (1..31)
        };
    };

    const validateForm = () => {
        const nextErrors = {
            difficulty: difficulty ? "" : "Select a difficulty",
            matchEndDate: matchEndDate ? "" : "Select a match end date",
            prize: prize.trim() ? "" : "Enter a prize",
        };

        // Validate duration range defensively (even though the input is constrained)
        if (matchEndDate) {
            const startUtc = parseYYYYMMDDAsUTCDate(formatDateYYYYMMDD(new Date()));
            const endUtc = parseYYYYMMDDAsUTCDate(matchEndDate);
            const durationDays = diffDaysUTC(startUtc, endUtc);
            if (durationDays < 1 || durationDays > 31) {
                nextErrors.matchEndDate = "Match duration must be between 1 and 31 days";
            }
        }

        setFormErrors(nextErrors);
        return !nextErrors.difficulty && !nextErrors.matchEndDate && !nextErrors.prize;
    };

    const handleCreateMatch = () => {
        if (!validateForm()) {
            setToast({ open: true, severity: "error", message: "Fill all required fields before creating the match." });
            return;
        }

        const payload = buildPayloadForBackend();

        // TODO: replace with your real backend call (fetch/axios)
        console.log("CreateMatch payload:", payload);
        setToast({ open: true, severity: "success", message: "Match payload ready to send." });
    };

    const openDifficulty = () => {
        setDraftDifficulty(difficulty);
        setShowDiff(true);
    };

    const openTime = () => {
        setDraftMatchEndDate(matchEndDate);
        setShowTime(true);
    };

    const openPrize = () => {
        setDraftPrize(prize);
        setShowPrize(true);
    };
    
    return (
        <Box sx={{ height: "100vh", bgcolor: "background.default", color: "text.primary", overflow: "hidden" }}>
            <Container maxWidth={false} sx={{ py: 2, height: "50%" }}>
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                    <Button
                        variant="text"
                        onClick={() => navigate("/")}
                        startIcon={<FaLongArrowAltLeft />}
                        sx={{ color: "text.secondary" }}
                    >
                        Back
                    </Button>
                    <Typography variant="body1" color="text.secondary" sx={{ ml: 1 }}>
                        Invitation Code: https://www.linkedin.com/feed/
                    </Typography>
                </Stack>

                <Box sx={{ display: "flex", gap: 2, height: "calc(100% - 56px)", minHeight: 0 }}>
                    <Paper sx={{ flex: 1, p: { xs: 2, md: 3 }, overflow: "auto" }}>
                        <Typography variant="h3" sx={{ textAlign: "center", mb: 3, fontWeight: 800, letterSpacing: -0.5 }}>
                            Match Configuration
                        </Typography>

                        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 2, justifyItems: "stretch" }}>
                            <Button
                                size="large"
                                variant="outlined"
                                onClick={openDifficulty}
                                color={formErrors.difficulty ? "error" : "primary"}
                                sx={{ py: 2.5 }}
                            >
                                {difficulty ? `Difficulty: ${difficulty}` : "Difficulty"}
                            </Button>

                        {/* Render del Popup */}
                        {showDiff && (
                            <Popup title="Choose Difficulty" onClose={() => setShowDiff(false)}>
                            <Button
                                variant={draftDifficulty === "Easy" ? "contained" : "outlined"}
                                onClick={() => setDraftDifficulty("Easy")}
                            >
                                Easy
                            </Button>
                            <Button
                                variant={draftDifficulty === "Medium" ? "contained" : "outlined"}
                                onClick={() => setDraftDifficulty("Medium")}
                            >
                                Medium
                            </Button>
                            <Button
                                variant={draftDifficulty === "Hard" ? "contained" : "outlined"}
                                onClick={() => setDraftDifficulty("Hard")}
                            >
                                Hard
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    setDifficulty(draftDifficulty);
                                    setFormErrors((prev) => ({ ...prev, difficulty: "" }));
                                    setShowDiff(false);
                                }}
                                disabled={!draftDifficulty}
                            >
                                Confirm
                            </Button>
                            </Popup>
                        )}

                        {/*Time*/}
                        <Button
                            size="large"
                            variant="outlined"
                            onClick={openTime}
                            color={formErrors.matchEndDate ? "error" : "primary"}
                            sx={{ py: 2.5 }}
                        >
                            {matchEndDate ? `Time: ${matchEndDate}` : "Time"}
                        </Button>

                        {/* Render del Popup */}
                        {showTime && (
                            <Popup title="Choose Time" onClose={() => setShowTime(false)}>
                            <Box>
                                <input
                                    type="date"
                                    min={minEndStr}
                                    max={maxEndStr}
                                    value={draftMatchEndDate}
                                    onChange={(e) => setDraftMatchEndDate(e.target.value)}
                                />
                                {formErrors.matchEndDate ? (
                                    <Typography variant="caption" color="error" sx={{ display: "block", mt: 1 }}>
                                        {formErrors.matchEndDate}
                                    </Typography>
                                ) : null}
                            </Box>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    setMatchEndDate(draftMatchEndDate);
                                    setFormErrors((prev) => ({ ...prev, matchEndDate: "" }));
                                    setShowTime(false);
                                }}
                                disabled={!draftMatchEndDate}
                            >
                                Submit
                            </Button>
                            
                            </Popup>
                        )}

                        {/*Prize*/}
                        <Button
                            size="large"
                            variant="outlined"
                            onClick={openPrize}
                            color={formErrors.prize ? "error" : "primary"}
                            sx={{ py: 2.5 }}
                        >
                            {prize ? `Prize: ${prize}` : "Prize"}
                        </Button>

                        {/* Render del Popup */}
                        {showPrize && (
                            <Popup title="Choose Prize" onClose={() => setShowPrize(false)}>
                            <Box>
                                <input
                                    type="text"
                                    placeholder="Cool prize for winner"
                                    className="border rounded-xl p-2"
                                    value={draftPrize}
                                    onChange={(e) => setDraftPrize(e.target.value)}
                                />
                                {formErrors.prize ? (
                                    <Typography variant="caption" color="error" sx={{ display: "block", mt: 1 }}>
                                        {formErrors.prize}
                                    </Typography>
                                ) : null}
                            </Box>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    setPrize(draftPrize.trim());
                                    setFormErrors((prev) => ({ ...prev, prize: "" }));
                                    setShowPrize(false);
                                }}
                                disabled={!draftPrize.trim()}
                            >
                                Submit
                            </Button>
                            </Popup>
                        )}

                        {/*Topics*/}
                        <Button size="large" variant="outlined" onClick={() => setShowTopic(true)} sx={{ py: 2.5 }}>
                            Topics
                        </Button>

                        {/* Render del Popup */}
                        {showTopic && (
                            <Popup title="Choose Topics" onClose={() => setShowTopic(false)}>
                            <Typography variant="outlined">Coming Soon</Typography>
                            </Popup>
                        )}
                        </Box>

                        <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
                            <Button
                                size="large"
                                variant="contained"
                                sx={{ px: 5, py: 1.75 }}
                                onClick={handleCreateMatch}
                            >
                                Create Match
                            </Button>
                        </Stack>
                    </Paper>

                    <Box sx={{ width: 420, maxWidth: "40vw", flexShrink: 0, display: { xs: "none", md: "flex" }, alignItems: "flex-start" }}>
                        <Players />
                    </Box>
                </Box>
            </Container>

            <Snackbar
                open={toast.open}
                autoHideDuration={3000}
                onClose={() => setToast((t) => ({ ...t, open: false }))}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setToast((t) => ({ ...t, open: false }))}
                    severity={toast.severity}
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {toast.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default MatchConfig;
