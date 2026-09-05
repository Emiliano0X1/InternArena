import { useState, useEffect } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Players from "./components/Players";
import Popup from "../../components/Popup";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import SpeedIcon from "@mui/icons-material/Speed";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import TopicIcon from "@mui/icons-material/Topic";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import CircularProgress from "@mui/material/CircularProgress";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { useParty } from "../../context/PartyContext";
import { useCreateMatch } from "../../hooks/useCreateMatch";

function MatchConfig() {
    const navigate = useNavigate();
    const { currentParty, partyId, invitationCode, createLobby, refreshParty, isLoading: isLobbyLoading } = useParty();

    const [copied, setCopied] = useState(false);

    // Auto-polling interval to keep joined and leaving players updated in real-time
    useEffect(() => {
        if (!partyId) return;

        const interval = setInterval(async () => {
            await refreshParty(partyId);
        }, 2500);

        return () => clearInterval(interval);
    }, [partyId, refreshParty]);

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

    const [toast, setToast] = useState({ open: false, severity: "success", message: "" });

    const createMatchMutation = useCreateMatch(
        () => setToast({ open: true, severity: "success", message: "Match configured and started successfully!" }),
        (err) => setToast({ open: true, severity: "error", message: err?.message || "Failed to configure match." })
    );

    // Popups state
    const [showDiff, setShowDiff] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const [showPrize, setShowPrize] = useState(false);
    const [showTopic, setShowTopic] = useState(false);

    // Form values
    const [difficulty, setDifficulty] = useState("");
    const [matchEndDate, setMatchEndDate] = useState("");
    const [prize, setPrize] = useState("");

    // Draft values (edited inside popups)
    const [draftDifficulty, setDraftDifficulty] = useState("");
    const [draftMatchEndDate, setDraftMatchEndDate] = useState("");
    const [draftPrize, setDraftPrize] = useState("");

    const [formErrors, setFormErrors] = useState({
        difficulty: "",
        matchEndDate: "",
        prize: "",
    });

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

    // Copy to Clipboard Utility
    const handleCopyCode = async () => {
        const codeToCopy = invitationCode || currentParty?.invitation_code;
        if (!codeToCopy) {
            setToast({ open: true, severity: "warning", message: "No active invitation code to copy." });
            return;
        }

        try {
            if (navigator?.clipboard?.writeText) {
                await navigator.clipboard.writeText(String(codeToCopy));
            } else {
                // Fallback for environments where clipboard API is restricted
                const textarea = document.createElement("textarea");
                textarea.value = String(codeToCopy);
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand("copy");
                document.body.removeChild(textarea);
            }
            setCopied(true);
            setToast({ open: true, severity: "success", message: `Invitation code ${codeToCopy} copied to clipboard!` });
            setTimeout(() => setCopied(false), 2500);
        } catch (e) {
            console.error("Clipboard copy failed:", e);
            setToast({ open: true, severity: "error", message: "Failed to copy code to clipboard." });
        }
    };

    const handleInitLobby = async () => {
        try {
            await createLobby();
            setToast({ open: true, severity: "success", message: "New default party lobby initialized!" });
        } catch {
            // ErrorDialog handles stopping and feedback
        }
    };

    const validateForm = () => {
        const nextErrors = {
            difficulty: difficulty ? "" : "Select a difficulty",
            matchEndDate: matchEndDate ? "" : "Select a match end date",
            prize: prize.trim() ? "" : "Enter a prize",
        };

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
            setToast({ open: true, severity: "error", message: "Fill all required fields before starting the match." });
            return;
        }

        const payload = {
            party_id: Number(partyId) || currentParty?.party_id || 1,
            difficulty: difficulty.toLowerCase(), // "easy" | "medium" | "hard"
            partyPrize: prize,
            endTime: `${matchEndDate}T23:59:59`,
        };

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

    const displayCode = invitationCode || currentParty?.invitation_code || null;

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default", color: "text.primary", py: { xs: 2, md: 4 } }}>
            <Container maxWidth="xl" sx={{ height: "100%" }}>
                {/* Header Action Bar */}
                <Stack 
                    direction={{ xs: "column", sm: "row" }} 
                    alignItems={{ xs: "flex-start", sm: "center" }} 
                    justifyContent="space-between"
                    spacing={2} 
                    sx={{ mb: 4 }}
                >
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <Button
                            variant="outlined"
                            onClick={() => navigate("/")}
                            startIcon={<FaLongArrowAltLeft />}
                            sx={{ color: "text.secondary", borderColor: "rgba(255,255,255,0.1)", borderRadius: 1 }}
                        >
                            Back
                        </Button>
                        {partyId && (
                            <Chip
                                label={`Lobby #${partyId}`}
                                color="primary"
                                size="small"
                                sx={{ fontWeight: 800, bgcolor: "rgba(249, 115, 22, 0.15)", color: "#f97316", border: "1px solid rgba(249, 115, 22, 0.3)" }}
                            />
                        )}
                        <Chip
                            label={currentParty?.party_status || "WAITING"}
                            color="warning"
                            size="small"
                            variant="outlined"
                            sx={{ fontWeight: 700, fontSize: "0.75rem" }}
                        />
                    </Stack>

                    {/* Sharable Invitation Code Widget with Copy to Clipboard Utility */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            bgcolor: "#383434",
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            border: "1px solid rgba(249, 115, 22, 0.3)",
                            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
                        }}
                    >
                        <VpnKeyIcon sx={{ color: "#f97316", fontSize: 18 }} />
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                            Invite Code:
                        </Typography>

                        {displayCode ? (
                            <Typography
                                component="span"
                                sx={{
                                    fontFamily: "monospace",
                                    fontWeight: 800,
                                    fontSize: "1.05rem",
                                    color: "#f97316",
                                    letterSpacing: 1.5,
                                    bgcolor: "rgba(249, 115, 22, 0.1)",
                                    px: 1.2,
                                    py: 0.2,
                                    borderRadius: 1,
                                }}
                            >
                                {displayCode}
                            </Typography>
                        ) : (
                            <Typography component="span" variant="body2" sx={{ color: "text.disabled", fontStyle: "italic" }}>
                                Not generated
                            </Typography>
                        )}

                        <Tooltip title={copied ? "Copied to clipboard!" : "Copy code to share"} arrow>
                            <IconButton
                                size="small"
                                onClick={handleCopyCode}
                                disabled={!displayCode}
                                sx={{
                                    color: copied ? "success.main" : "#f97316",
                                    bgcolor: copied ? "rgba(34, 197, 94, 0.15)" : "rgba(249, 115, 22, 0.15)",
                                    "&:hover": {
                                        bgcolor: copied ? "rgba(34, 197, 94, 0.25)" : "rgba(249, 115, 22, 0.3)",
                                    },
                                    transition: "all 0.2s",
                                }}
                            >
                                {copied ? <CheckCircleOutlineIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Stack>

                {/* Notice if no party session exists */}
                {!partyId && (
                    <Paper
                        sx={{
                            p: 2.5,
                            mb: 3,
                            bgcolor: "rgba(249, 115, 22, 0.08)",
                            border: "1px solid rgba(249, 115, 22, 0.3)",
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            alignItems: { xs: "flex-start", sm: "center" },
                            justifyContent: "space-between",
                            gap: 2,
                        }}
                    >
                        <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#f97316" }}>
                                No Active Lobby Session Detected
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Initialize a default party session to get your sharable invitation code and connect with players.
                            </Typography>
                        </Box>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleInitLobby}
                            disabled={isLobbyLoading}
                            startIcon={isLobbyLoading ? <CircularProgress size={16} color="inherit" /> : <AddCircleOutlineIcon />}
                            sx={{ fontWeight: 700, whiteSpace: "nowrap" }}
                        >
                            {isLobbyLoading ? "Initializing..." : "Initialize Default Lobby"}
                        </Button>
                    </Paper>
                )}

                <Grid container spacing={4} alignItems="flex-start">
                    {/* Left Form Panel */}
                    <Grid size={{ xs: 12, md: 7, lg: 8 }}>
                        <Paper sx={{ p: { xs: 3, md: 4.5 } }}>
                            <Typography variant="h3" sx={{ mb: 1, fontWeight: 900, textAlign: "left" }}>
                                Lobby Configuration
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 4, textAlign: "left" }}>
                                Define the parameters for the arena lobby to start the contest with your participants.
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
                                    disabled={createMatchMutation.isPending}
                                    sx={{
                                        px: 6,
                                        py: 2,
                                        borderRadius: 3,
                                        fontSize: "1rem",
                                        fontWeight: 700
                                    }}
                                >
                                    {createMatchMutation.isPending ? "Starting Match..." : "Start Arena Contest"}
                                </Button>
                            </Stack>
                        </Paper>
                    </Grid>

                    {/* Right Players Panel */}
                    <Grid size={{ xs: 12, md: 5, lg: 4 }}>
                        <Players
                            initialPlayers={currentParty?.players || []}
                            onPlayerRemoved={() => partyId && refreshParty(partyId)}
                        />
                    </Grid>
                </Grid>
            </Container>

            <Snackbar
                open={toast.open}
                autoHideDuration={3500}
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
