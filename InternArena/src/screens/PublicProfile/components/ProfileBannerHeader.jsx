import { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "motion/react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import { FaShareAlt, FaCheck, FaCrown, FaTrophy, FaBolt, FaGem, FaMedal } from "react-icons/fa";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const BADGE_ICON_MAP = {
    FaCrown: <FaCrown className="text-pink-400" size={16} />,
    FaTrophy: <FaTrophy className="text-amber-400" size={16} />,
    FaBolt: <FaBolt className="text-orange-400" size={16} />,
    FaGem: <FaGem className="text-purple-400" size={16} />,
    FaMedal: <FaMedal className="text-emerald-400" size={16} />,
};

function ProfileBannerHeader({ profile }) {
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch {
            // Clipboard fallback
        }
    };

    return (
        <Paper
            elevation={4}
            sx={{
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                bgcolor: "#242020",
                boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
                mb: 4,
            }}
        >
            {/* Equipped Banner Hero */}
            <Box
                sx={{
                    position: "relative",
                    height: { xs: 170, sm: 220, md: 240 },
                    width: "100%",
                    overflow: "hidden",
                    bgcolor: "#171515",
                }}
            >
                <Box
                    component="img"
                    src={profile.bannerUrl}
                    alt="Equipped Profile Banner"
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        filter: "brightness(0.9)",
                        display: "block",
                    }}
                />

                {/* Subtle dark bottom gradient overlay to merge banner seamlessly into card */}
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(20,20,20,0.1) 45%, rgba(36,32,32,0.92) 100%)",
                        pointerEvents: "none",
                    }}
                />

                {/* Back and Share buttons over banner */}
                <Box sx={{ position: "absolute", top: 16, left: 16, zIndex: 2 }}>
                    <Button
                        size="small"
                        variant="contained"
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate("/")}
                        sx={{
                            backdropFilter: "blur(8px)",
                            bgcolor: "rgba(0,0,0,0.55)",
                            color: "#ffffff",
                            borderRadius: "10px",
                            border: "1px solid rgba(255, 255, 255, 0.15)",
                            "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
                        }}
                    >
                        Back
                    </Button>
                </Box>

                <Box sx={{ position: "absolute", top: 16, right: 16, zIndex: 2 }}>
                    <Button
                        size="small"
                        variant="contained"
                        startIcon={copied ? <FaCheck /> : <FaShareAlt />}
                        onClick={handleShare}
                        sx={{
                            backdropFilter: "blur(8px)",
                            bgcolor: copied ? "rgba(34, 197, 94, 0.85)" : "rgba(0,0,0,0.55)",
                            color: "#ffffff",
                            borderRadius: "10px",
                            border: "1px solid rgba(255, 255, 255, 0.15)",
                            "&:hover": { bgcolor: copied ? "#16a34a" : "rgba(0,0,0,0.8)" },
                        }}
                    >
                        {copied ? "Link Copied!" : "Share Profile"}
                    </Button>
                </Box>
            </Box>

            {/* Profile Avatar, Title Tag, Badges and Overview */}
            <Box sx={{ px: { xs: 3, md: 5 }, pb: 4, pt: 0 }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        alignItems: { xs: "center", md: "flex-end" },
                        justifyContent: "space-between",
                        gap: 2.5,
                    }}
                >
                    {/* Left: Avatar + Identity */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            alignItems: { xs: "center", md: "flex-end" },
                            gap: 3,
                            textAlign: { xs: "center", md: "left" },
                        }}
                    >
                        {/* Avatar protruding up into banner */}
                        <Box sx={{ position: "relative", mt: { xs: -8, md: -9 }, flexShrink: 0 }}>
                            <Box
                                component="img"
                                src={profile.avatarUrl}
                                alt={profile.username}
                                sx={{
                                    width: { xs: 110, md: 130 },
                                    height: { xs: 110, md: 130 },
                                    borderRadius: "50%",
                                    border: "5px solid #242020",
                                    bgcolor: "#1a1818",
                                    boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
                                    objectFit: "cover",
                                    display: "block",
                                }}
                            />
                            <Box
                                sx={{
                                    position: "absolute",
                                    bottom: 8,
                                    right: 8,
                                    width: 18,
                                    height: 18,
                                    borderRadius: "50%",
                                    bgcolor: "#22c55e",
                                    border: "3px solid #242020",
                                }}
                            />
                        </Box>

                        {/* Identity Information cleanly below the banner */}
                        <Box sx={{ pb: { xs: 0, md: 1 }, pt: { xs: 1, md: 2 } }}>
                            <Stack
                                direction={{ xs: "column", sm: "row" }}
                                alignItems={{ xs: "center", sm: "center" }}
                                spacing={1.5}
                                sx={{ mb: 0.5 }}
                            >
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: 900,
                                        color: "text.primary",
                                        lineHeight: 1.2,
                                        letterSpacing: "-0.02em",
                                    }}
                                >
                                    {profile.username}
                                </Typography>

                                {/* Equipped Title Tag */}
                                {profile.tagText && (
                                    <Chip
                                        label={profile.tagText}
                                        size="small"
                                        sx={{
                                            fontWeight: 800,
                                            fontSize: "0.75rem",
                                            bgcolor: `${profile.tagColor || "#f97316"}20`,
                                            color: profile.tagColor || "#f97316",
                                            border: `1px solid ${profile.tagColor || "#f97316"}50`,
                                            boxShadow: `0 0 12px ${profile.tagColor || "#f97316"}25`,
                                        }}
                                    />
                                )}
                            </Stack>

                            <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500 }}>
                                {profile.userEmail} • Public Arena Competitor
                            </Typography>
                        </Box>
                    </Box>

                    {/* Right: Equipped Badges Showcase */}
                    <Box sx={{ textAlign: { xs: "center", md: "right" }, pb: { xs: 0, md: 1 }, pt: { xs: 1, md: 2 } }}>
                        <Typography
                            variant="caption"
                            sx={{
                                color: "text.secondary",
                                fontWeight: 800,
                                textTransform: "uppercase",
                                display: "block",
                                mb: 1,
                                letterSpacing: "0.06em",
                            }}
                        >
                            Equipped Badges
                        </Typography>
                        <Stack direction="row" spacing={1.2} justifyContent={{ xs: "center", md: "flex-end" }}>
                            {profile.badges?.map((badge) => (
                                <Tooltip key={badge.id} title={`${badge.name}: ${badge.description}`} arrow>
                                    <motion.div
                                        whileHover={{ scale: 1.15, y: -2 }}
                                        transition={{ type: "spring", stiffness: 400 }}
                                        style={{
                                            width: 42,
                                            height: 42,
                                            borderRadius: "12px",
                                            backgroundColor: "rgba(0, 0, 0, 0.4)",
                                            border: `1.5px solid ${badge.badgeColor || "#f97316"}50`,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            cursor: "pointer",
                                            boxShadow: `0 0 16px ${badge.badgeColor || "#f97316"}25`,
                                        }}
                                    >
                                        {BADGE_ICON_MAP[badge.iconName] || <FaMedal className="text-orange-400" size={16} />}
                                    </motion.div>
                                </Tooltip>
                            ))}
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
}

ProfileBannerHeader.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileBannerHeader;
