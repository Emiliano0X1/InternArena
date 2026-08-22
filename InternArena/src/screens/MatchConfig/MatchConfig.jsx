import { FaLongArrowAltLeft } from "react-icons/fa";
import Players from "./components/Players";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "../../components/Popup";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useCreateMatch } from "../../hooks/useCreateMatch";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import SpeedIcon from "@mui/icons-material/Speed";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import TopicIcon from "@mui/icons-material/Topic";

function MatchConfig() {
    const navigate = useNavigate();
    const LEETCODE_TOPICS = [
        "Array", "String", "Hash Table", "Math", "Dynamic Programming",
        "Sorting", "Greedy", "Depth-First Search", "Binary Search", "Database",
        "Bit Manipulation", "Matrix", "Tree", "Prefix Sum", "Breadth-First Search",
        "Two Pointers", "Heap (Priority Queue)", "Stack", "Graph", "Sliding Window",
        "Backtracking", "Linked List", "Recursion", "Divide and Conquer", "Memoization",
        "Trie", "Union Find", "Monotonic Stack", "Topological Sort", "Number Theory",
        "String Matching", "Simulation", "Combinatorics", "Queue", "Game Theory"
    ];

    const [selectedTopics, setSelectedTopics] = useState([]);
    const [draftTopics, setDraftTopics] = useState([]);
    const [topicSearch, setTopicSearch] = useState("");
    const createMatchMutation = useCreateMatch(
        () => setToast({ open: true, severity: "success", message: "Match created successfully!" }),
        () => setToast({ open: true, severity: "error", message: "Failed to create match." })
    );

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
            topics: selectedTopics,
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
        createMatchMutation.mutate(payload);
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
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default", color: "text.primary", py: { xs: 2, md: 4 } }}>
            <Container maxWidth="xl" sx={{ height: "100%" }}>
                <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "flex-start", sm: "center" }} spacing={1.5} sx={{ mb: 4 }}>
                    <Button
                        variant="outlined"
                        onClick={() => navigate("/")}
                        startIcon={<FaLongArrowAltLeft />}
                        sx={{ color: "text.secondary", borderColor: "rgba(255,255,255,0.1)", borderRadius: 1 }}
                    >
                        Back
                    </Button>
                    <Typography variant="body2" color="text.secondary" sx={{ ml: { xs: 0, sm: "auto" }, mt: { xs: 1.5, sm: 0 }, fontFamily: "monospace" }}>
                        Invite Code: <span style={{ color: "#f97316" }}>ARENA-9283</span>
                    </Typography>
                </Stack>

                <Grid container spacing={4} alignItems="flex-start">
                    {/* Left Form Panel */}
                    <Grid size={{ xs: 12, md: 7, lg: 8 }}>
                        <Paper sx={{ p: { xs: 3, md: 4.5 } }}>
                            <Typography variant="h3" sx={{ mb: 1, fontWeight: 900, textAlign: "left" }}>
                                Lobby Configuration
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 4, textAlign: "left" }}>
                                Define the parameters for the arena lobby to start the contest.
                            </Typography>

                            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 3, mb: 4 }}>
                                {/* Difficulty Option */}
                                <Button
                                    size="large"
                                    variant="outlined"
                                    onClick={openDifficulty}
                                    color={formErrors.difficulty ? "error" : "primary"}
                                    startIcon={<SpeedIcon />}
                                    sx={{
                                        py: 3,
                                        flexDirection: "column",
                                        gap: 1,
                                        fontSize: "0.95rem",
                                        borderColor: difficulty ? "primary.main" : "rgba(255,255,255,0.1)",
                                        bgcolor: difficulty ? "rgba(249, 115, 22, 0.03)" : "transparent",
                                        "& .MuiButton-startIcon": { margin: 0 }
                                    }}
                                >
                                    <span style={{ fontSize: "0.75rem", textTransform: "uppercase", opacity: 0.6 }}>Difficulty</span>
                                    <strong>{difficulty || "Select Difficulty"}</strong>
                                </Button>

                                {/* Difficulty Popup */}
                                {showDiff && (
                                    <Popup title="Choose Difficulty" onClose={() => setShowDiff(false)}>
                                        <Stack direction="row" spacing={1.5} justifyContent="center" sx={{ my: 1 }}>
                                            {["Easy", "Medium", "Hard"].map((d) => (
                                                <Button
                                                    key={d}
                                                    variant={draftDifficulty === d ? "contained" : "outlined"}
                                                    onClick={() => setDraftDifficulty(d)}
                                                    color={d === "Easy" ? "success" : d === "Medium" ? "warning" : "error"}
                                                    sx={{ flex: 1, py: 1.5 }}
                                                >
                                                    {d}
                                                </Button>
                                            ))}
                                        </Stack>
                                        <Button
                                            variant="contained"
                                            onClick={() => {
                                                setDifficulty(draftDifficulty);
                                                setFormErrors((prev) => ({ ...prev, difficulty: "" }));
                                                setShowDiff(false);
                                            }}
                                            disabled={!draftDifficulty}
                                            sx={{ mt: 2, py: 1.5 }}
                                        >
                                            Confirm
                                        </Button>
                                    </Popup>
                                )}

                                {/* Time Option */}
                                <Button
                                    size="large"
                                    variant="outlined"
                                    onClick={openTime}
                                    color={formErrors.matchEndDate ? "error" : "primary"}
                                    startIcon={<CalendarMonthIcon />}
                                    sx={{
                                        py: 3,
                                        flexDirection: "column",
                                        gap: 1,
                                        fontSize: "0.95rem",
                                        borderColor: matchEndDate ? "primary.main" : "rgba(255,255,255,0.1)",
                                        bgcolor: matchEndDate ? "rgba(249, 115, 22, 0.03)" : "transparent",
                                        "& .MuiButton-startIcon": { margin: 0 }
                                    }}
                                >
                                    <span style={{ fontSize: "0.75rem", textTransform: "uppercase", opacity: 0.6 }}>Duration / End Date</span>
                                    <strong>{matchEndDate || "Select End Date"}</strong>
                                </Button>

                                {/* Time Popup */}
                                {showTime && (
                                    <Popup title="Choose End Date" onClose={() => setShowTime(false)}>
                                        <Box sx={{ my: 1 }}>
                                            <input
                                                type="date"
                                                min={minEndStr}
                                                max={maxEndStr}
                                                value={draftMatchEndDate}
                                                onChange={(e) => setDraftMatchEndDate(e.target.value)}
                                                className="w-full bg-[#282424] text-white rounded-lg border border-neutral-700/60 p-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                                            />
                                            {formErrors.matchEndDate && (
                                                <Typography variant="caption" color="error" sx={{ display: "block", mt: 1 }}>
                                                    {formErrors.matchEndDate}
                                                </Typography>
                                            )}
                                        </Box>
                                        <Button
                                            variant="contained"
                                            onClick={() => {
                                                setMatchEndDate(draftMatchEndDate);
                                                setFormErrors((prev) => ({ ...prev, matchEndDate: "" }));
                                                setShowTime(false);
                                            }}
                                            disabled={!draftMatchEndDate}
                                            sx={{ mt: 2, py: 1.5 }}
                                        >
                                            Submit
                                        </Button>
                                    </Popup>
                                )}

                                {/* Prize Option */}
                                <Button
                                    size="large"
                                    variant="outlined"
                                    onClick={openPrize}
                                    color={formErrors.prize ? "error" : "primary"}
                                    startIcon={<EmojiEventsIcon />}
                                    sx={{
                                        py: 3,
                                        flexDirection: "column",
                                        gap: 1,
                                        fontSize: "0.95rem",
                                        borderColor: prize ? "primary.main" : "rgba(255,255,255,0.1)",
                                        bgcolor: prize ? "rgba(249, 115, 22, 0.03)" : "transparent",
                                        "& .MuiButton-startIcon": { margin: 0 }
                                    }}
                                >
                                    <span style={{ fontSize: "0.75rem", textTransform: "uppercase", opacity: 0.6 }}>Winner Prize</span>
                                    <strong>{prize || "Enter Prize Details"}</strong>
                                </Button>

                                {/* Prize Popup */}
                                {showPrize && (
                                    <Popup title="Enter Winner Prize" onClose={() => setShowPrize(false)}>
                                        <Box sx={{ my: 1 }}>
                                            <input
                                                type="text"
                                                placeholder="Cool prize for winner"
                                                value={draftPrize}
                                                onChange={(e) => setDraftPrize(e.target.value)}
                                                className="w-full bg-[#282424] text-white rounded-lg border border-neutral-700/60 p-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                                            />
                                            {formErrors.prize && (
                                                <Typography variant="caption" color="error" sx={{ display: "block", mt: 1 }}>
                                                    {formErrors.prize}
                                                </Typography>
                                            )}
                                        </Box>
                                        <Button
                                            variant="contained"
                                            onClick={() => {
                                                setPrize(draftPrize.trim());
                                                setFormErrors((prev) => ({ ...prev, prize: "" }));
                                                setShowPrize(false);
                                            }}
                                            disabled={!draftPrize.trim()}
                                            sx={{ mt: 2, py: 1.5 }}
                                        >
                                            Submit
                                        </Button>
                                    </Popup>
                                )}

                                {/* Topics Option */}
                                <Button
                                    size="large"
                                    variant="outlined"
                                    onClick={() => {
                                        setDraftTopics(selectedTopics);
                                        setTopicSearch("");
                                        setShowTopic(true);
                                    }}
                                    startIcon={<TopicIcon />}
                                    sx={{
                                        py: 3,
                                        flexDirection: "column",
                                        gap: 1,
                                        fontSize: "0.95rem",
                                        borderColor: selectedTopics.length > 0 ? "primary.main" : "rgba(255,255,255,0.1)",
                                        bgcolor: selectedTopics.length > 0 ? "rgba(249, 115, 22, 0.03)" : "transparent",
                                        "& .MuiButton-startIcon": { margin: 0 }
                                    }}
                                >
                                    <span style={{ fontSize: "0.75rem", textTransform: "uppercase", opacity: 0.6 }}>Topics Selected</span>
                                    <strong>{selectedTopics.length > 0 ? `${selectedTopics.length} Topics` : "All Topics"}</strong>
                                </Button>

                                {/* Topics Popup */}
                                {showTopic && (
                                    <Popup title="Choose Topics" onClose={() => setShowTopic(false)}>
                                        <TextField
                                            placeholder="Search topics..."
                                            size="small"
                                            value={topicSearch}
                                            onChange={(e) => setTopicSearch(e.target.value)}
                                            fullWidth
                                        />
                                        <Box sx={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: 1,
                                            maxHeight: 220,
                                            overflowY: "auto",
                                            py: 1,
                                            my: 1
                                        }}>
                                            {LEETCODE_TOPICS
                                                .filter(t => t.toLowerCase().includes(topicSearch.toLowerCase()))
                                                .map((topic) => (
                                                    <Chip
                                                        key={topic}
                                                        label={topic}
                                                        clickable
                                                        color={draftTopics.includes(topic) ? "primary" : "default"}
                                                        onClick={() => {
                                                            setDraftTopics(prev =>
                                                                prev.includes(topic)
                                                                    ? prev.filter(t => t !== topic)
                                                                    : [...prev, topic]
                                                            );
                                                        }}
                                                        sx={{ borderRadius: 1 }}
                                                    />
                                                ))
                                            }
                                        </Box>
                                        <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
                                            <Button
                                                variant="text"
                                                color="error"
                                                onClick={() => setDraftTopics([])}
                                            >
                                                Reset
                                            </Button>
                                            <Button
                                                variant="contained"
                                                onClick={() => {
                                                    setSelectedTopics(draftTopics);
                                                    setShowTopic(false);
                                                }}
                                            >
                                                Confirm
                                            </Button>
                                        </Stack>
                                    </Popup>
                                )}
                            </Box>

                            <Stack direction="row" justifyContent="center" sx={{ mt: 4 }}>
                                <Button
                                    size="large"
                                    variant="contained"
                                    onClick={handleCreateMatch}
                                    sx={{
                                        px: 6,
                                        py: 2,
                                        borderRadius: 3,
                                        fontSize: "1rem",
                                        fontWeight: 700
                                    }}
                                >
                                    Create Arena Lobby
                                </Button>
                            </Stack>
                        </Paper>
                    </Grid>

                    {/* Right Players Panel */}
                    <Grid size={{ xs: 12, md: 5, lg: 4 }}>
                        <Players />
                    </Grid>
                </Grid>
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
                    sx={{ width: "100%", borderRadius: 3 }}
                >
                    {toast.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default MatchConfig;

