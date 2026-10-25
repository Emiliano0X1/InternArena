import PropTypes from "prop-types";
import { motion } from "motion/react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { FaCrown, FaTrophy, FaBolt, FaGem, FaMedal, FaUndo } from "react-icons/fa";
import { LuCoins } from "react-icons/lu";
import { LiaMedalSolid } from "react-icons/lia";
import leetcode from "../../../assets/leetcode.png";

const BADGE_ICON_MAP = {
    FaCrown: <FaCrown className="text-pink-400" />,
    FaTrophy: <FaTrophy className="text-amber-400" />,
    FaBolt: <FaBolt className="text-orange-400" />,
    FaGem: <FaGem className="text-purple-400" />,
    FaMedal: <FaMedal className="text-emerald-400" />,
};

function LiveProfilePreview({ draft, hasUnsavedChanges, onReset, profile, digitalCosmetics = [] }) {
    const equippedBadges = digitalCosmetics.filter(
        (c) => c.type === "badge" && draft.badgeIds?.includes(c.id)
    );

    return (
        <Paper
            elevation={4}
            sx={{
                borderRadius: "18px",
                overflow: "hidden",
                border: hasUnsavedChanges ? "1px solid rgba(249, 115, 22, 0.4)" : "1px solid rgba(255, 255, 255, 0.08)",
                bgcolor: "#242020",
                position: "sticky",
                top: 88,
                transition: "all 0.3s ease",
                boxShadow: hasUnsavedChanges ? "0 8px 32px rgba(249, 115, 22, 0.15)" : "0 8px 32px rgba(0,0,0,0.3)",
            }}
        >
            {/* Banner Section with Live Updating Visuals */}
            <Box sx={{ position: "relative", height: 145, width: "100%", overflow: "hidden", bgcolor: "#171515" }}>
                <motion.div
                    key={draft.bannerUrl}
                    initial={{ opacity: 0.6, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    style={{ width: "100%", height: "100%" }}
                >
                    <Box
                        component="img"
                        src={draft.bannerUrl}
                        alt="Profile Banner"
                        sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center",
                            filter: "brightness(0.9)",
                            display: "block",
                        }}
                    />
                </motion.div>

                {/* Subtle bottom gradient to blend into card */}
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(36,32,32,0.1) 40%, rgba(36,32,32,0.9) 100%)",
                        pointerEvents: "none",
                    }}
                />

                {/* Unsaved Preview indicator */}
                {hasUnsavedChanges && (
                    <Box sx={{ position: "absolute", top: 12, right: 12 }}>
                        <Chip
                            label="Live Preview (Unsaved)"
                            size="small"
                            color="primary"
                            sx={{
                                fontWeight: 800,
                                fontSize: "0.68rem",
                                backdropFilter: "blur(6px)",
                                bgcolor: "rgba(249, 115, 22, 0.85)",
                            }}
                        />
                    </Box>
                )}
            </Box>

            {/* Profile Avatar & Metadata */}
            <Box sx={{ px: 3.5, pb: 3.5, pt: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Box sx={{ position: "relative", mt: -6, mb: 1.5 }}>
                    <Box
                        component="img"
                        src={draft.avatarUrl}
                        alt="Avatar"
                        sx={{
                            width: 90,
                            height: 90,
                            borderRadius: "50%",
                            border: "4px solid #242020",
                            bgcolor: "#1a1818",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                            objectFit: "cover",
                        }}
                    />
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: 4,
                            right: 4,
                            width: 14,
                            height: 14,
                            borderRadius: "50%",
                            bgcolor: "#22c55e",
                            border: "2px solid #242020",
                        }}
                    />
                </Box>

                {/* Username */}
                <Typography variant="h6" sx={{ fontWeight: 800, color: "text.primary", textAlign: "center" }}>
                    {profile?.username || "Competitive Coder"}
                </Typography>

                {/* Equipped Title / Tag */}
                <motion.div
                    key={draft.tagText}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <Chip
                        label={draft.tagText || "Arena Challenger"}
                        size="small"
                        sx={{
                            mt: 0.5,
                            mb: 2,
                            fontWeight: 800,
                            fontSize: "0.72rem",
                            bgcolor: `${draft.tagColor || "#f97316"}18`,
                            color: draft.tagColor || "#f97316",
                            border: `1px solid ${draft.tagColor || "#f97316"}40`,
                        }}
                    />
                </motion.div>

                {/* Equipped Badges Showcase */}
                <Box sx={{ width: "100%", mb: 2.5 }}>
                    <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700, mb: 1, display: "block" }}>
                        EQUIPPED BADGES ({equippedBadges.length}/3)
                    </Typography>
                    <Stack direction="row" spacing={1} justifyContent="center" sx={{ minHeight: 38 }}>
                        {equippedBadges.map((badge) => (
                            <Tooltip key={badge.id} title={`${badge.name}: ${badge.description}`} arrow>
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    whileHover={{ scale: 1.15 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                    style={{
                                        width: 38,
                                        height: 38,
                                        borderRadius: "10px",
                                        backgroundColor: "rgba(0, 0, 0, 0.4)",
                                        border: `1px solid ${badge.badgeColor}50`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                    }}
                                >
                                    {BADGE_ICON_MAP[badge.iconName] || <FaMedal className="text-orange-400" />}
                                </motion.div>
                            </Tooltip>
                        ))}
                        {equippedBadges.length === 0 && (
                            <Typography variant="caption" sx={{ color: "text.disabled", fontStyle: "italic", py: 1 }}>
                                No badges equipped
                            </Typography>
                        )}
                    </Stack>
                </Box>

                {/* Stats Panel */}
                <Stack spacing={1} sx={{ width: "100%", mb: 2.5 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 1.5, borderRadius: 2, bgcolor: "#1e1b1b", border: "1px solid rgba(255,255,255,0.04)" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                            <img src={leetcode} alt="LC" style={{ width: 18, height: 18 }} />
                            <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.85rem" }}>Rank</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ fontWeight: 800, color: "#f97316" }}>#1 Global</Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 1.5, borderRadius: 2, bgcolor: "#1e1b1b", border: "1px solid rgba(255,255,255,0.04)" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                            <LiaMedalSolid size={20} className="text-neutral-400" />
                            <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.85rem" }}>Match Wins</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ fontWeight: 800 }}>{profile?.matchWins ?? 0}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 1.5, borderRadius: 2, bgcolor: "#1e1b1b", border: "1px solid rgba(255,255,255,0.04)" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
                            <LuCoins size={18} className="text-yellow-500" />
                            <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.85rem" }}>Leetcoins</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ fontWeight: 800, color: "#eab308" }}>{(profile?.leetcoins ?? 0).toLocaleString()}</Typography>
                    </Box>
                </Stack>

                {hasUnsavedChanges && (
                    <Button
                        fullWidth
                        variant="outlined"
                        size="small"
                        color="inherit"
                        onClick={onReset}
                        startIcon={<FaUndo />}
                        sx={{ borderColor: "rgba(255,255,255,0.15)", color: "text.secondary", textTransform: "none" }}
                    >
                        Reset Live Preview
                    </Button>
                )}
            </Box>
        </Paper>
    );
}

LiveProfilePreview.propTypes = {
    draft: PropTypes.object.isRequired,
    hasUnsavedChanges: PropTypes.bool.isRequired,
    onReset: PropTypes.func.isRequired,
    profile: PropTypes.object,
    digitalCosmetics: PropTypes.array,
};

export default LiveProfilePreview;
