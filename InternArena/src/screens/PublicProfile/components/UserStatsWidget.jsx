import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import Tooltip from "@mui/material/Tooltip";
import { LuCoins } from "react-icons/lu";
import { LiaMedalSolid } from "react-icons/lia";
import { FaFire, FaTrophy } from "react-icons/fa";

function UserStatsWidget({ profile }) {
    const totalProblems = profile.problemStats?.total || 274;

    return (
        <Stack spacing={3}>
            {/* 1. Rank Tier & Ladder Rating Card */}
            <Paper
                sx={{
                    p: 3,
                    borderRadius: "18px",
                    bgcolor: "#2e2929",
                    border: "1px solid rgba(249, 115, 22, 0.25)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Box
                            sx={{
                                width: 44,
                                height: 44,
                                borderRadius: "12px",
                                bgcolor: "rgba(249, 115, 22, 0.15)",
                                border: "1px solid rgba(249, 115, 22, 0.35)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "1.4rem",
                            }}
                        >
                            {profile.tierIcon || "👑"}
                        </Box>
                        <Box>
                            <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, textTransform: "uppercase" }}>
                                Current Tier
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 800, color: "#f97316", lineHeight: 1.2 }}>
                                {profile.rankTier || "Grandmaster Tier"}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ textAlign: "right" }}>
                        <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, textTransform: "uppercase" }}>
                            Global Rank
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 900, color: "text.primary" }}>
                            {profile.globalRank || "#1"}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ p: 2, borderRadius: 2, bgcolor: "rgba(0, 0, 0, 0.3)", border: "1px solid rgba(255, 255, 255, 0.05)" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.8 }}>
                        <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.82rem" }}>
                            Competitive Rating
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 800, color: "#f97316" }}>
                            {profile.ladderRating || 2450} ELO
                        </Typography>
                    </Box>
                    <LinearProgress
                        variant="determinate"
                        value={82}
                        sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: "rgba(255, 255, 255, 0.08)",
                            "& .MuiLinearProgress-bar": {
                                bgcolor: "#f97316",
                                borderRadius: 3,
                            },
                        }}
                    />
                </Box>
            </Paper>

            {/* 2. Recent Ladder Performance & Win Streak */}
            <Paper
                sx={{
                    p: 3,
                    borderRadius: "18px",
                    bgcolor: "#2e2929",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                }}
            >
                <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2, color: "text.primary" }}>
                    Recent Ladder Performance
                </Typography>

                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mb: 2.5 }}>
                    <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.04)" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                            <LiaMedalSolid className="text-orange-400" size={18} />
                            <Typography variant="caption" color="text.secondary">Win Rate</Typography>
                        </Box>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: "#22c55e" }}>
                            {profile.winRate || "78.4%"}
                        </Typography>
                    </Box>

                    <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.04)" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                            <FaFire className="text-orange-500" size={14} />
                            <Typography variant="caption" color="text.secondary">Streak</Typography>
                        </Box>
                        <Stack direction="row" spacing={0.6}>
                            {profile.recentStreak?.map((res, i) => (
                                <Box
                                    key={i}
                                    sx={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: "4px",
                                        bgcolor: res === "W" ? "rgba(34, 197, 94, 0.2)" : "rgba(239, 68, 68, 0.2)",
                                        color: res === "W" ? "#22c55e" : "#ef4444",
                                        fontWeight: 800,
                                        fontSize: "0.68rem",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    {res}
                                </Box>
                            ))}
                        </Stack>
                    </Box>
                </Box>

                {/* Problem Breakdown */}
                <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, mb: 1, display: "block" }}>
                    PROBLEMS CONQUERED ({totalProblems})
                </Typography>
                <Stack spacing={1}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem" }}>
                        <span style={{ color: "#22c55e", fontWeight: 700 }}>Easy: {profile.problemStats?.easy || 142}</span>
                        <span style={{ color: "#eab308", fontWeight: 700 }}>Med: {profile.problemStats?.medium || 98}</span>
                        <span style={{ color: "#ef4444", fontWeight: 700 }}>Hard: {profile.problemStats?.hard || 34}</span>
                    </Box>
                    <Box sx={{ display: "flex", height: 6, borderRadius: 3, overflow: "hidden", bgcolor: "rgba(255,255,255,0.06)" }}>
                        <Box sx={{ width: "52%", bgcolor: "#22c55e" }} />
                        <Box sx={{ width: "36%", bgcolor: "#eab308" }} />
                        <Box sx={{ width: "12%", bgcolor: "#ef4444" }} />
                    </Box>
                </Stack>
            </Paper>

            {/* 3. LeetCoin Trophies & Awards */}
            <Paper
                sx={{
                    p: 3,
                    borderRadius: "18px",
                    bgcolor: "#2e2929",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <FaTrophy className="text-yellow-500" size={16} />
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "text.primary" }}>
                            LeetCoin Trophies
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, bgcolor: "rgba(234, 179, 8, 0.12)", px: 1.5, py: 0.4, borderRadius: 2 }}>
                        <LuCoins className="text-yellow-400" size={16} />
                        <Typography variant="body2" sx={{ fontWeight: 800, color: "#eab308" }}>
                            {(profile.leetcoins || 0).toLocaleString()}
                        </Typography>
                    </Box>
                </Box>

                <Stack spacing={1.5}>
                    {profile.trophies?.map((t) => (
                        <Tooltip key={t.id} title={`${t.name} - ${t.count}x claimed`} arrow>
                            <Box
                                sx={{
                                    p: 1.5,
                                    borderRadius: 2,
                                    bgcolor: "rgba(0, 0, 0, 0.25)",
                                    border: "1px solid rgba(255, 255, 255, 0.04)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                    <span style={{ fontSize: "1.2rem" }}>{t.icon}</span>
                                    <Box>
                                        <Typography variant="body2" sx={{ fontWeight: 700, color: "text.primary", fontSize: "0.85rem" }}>
                                            {t.name}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                            {t.tier} Tier Award
                                        </Typography>
                                    </Box>
                                </Box>
                                <Typography variant="body2" sx={{ fontWeight: 900, color: "#f97316" }}>
                                    x{t.count}
                                </Typography>
                            </Box>
                        </Tooltip>
                    ))}
                </Stack>
            </Paper>
        </Stack>
    );
}

UserStatsWidget.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default UserStatsWidget;
