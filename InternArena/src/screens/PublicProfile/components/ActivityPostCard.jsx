import { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "motion/react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { BiHeart, BiSolidHeart, BiComment, BiShareAlt } from "react-icons/bi";
import { LuCoins } from "react-icons/lu";

function ActivityPostCard({ post, userAvatar, username }) {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes || 0);

    const toggleLike = () => {
        if (liked) {
            setLiked(false);
            setLikeCount((prev) => prev - 1);
        } else {
            setLiked(true);
            setLikeCount((prev) => prev + 1);
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Paper
                sx={{
                    p: { xs: 2.5, md: 3 },
                    borderRadius: "16px",
                    bgcolor: "#2e2929",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                {/* Header */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Avatar
                            src={userAvatar}
                            alt={username}
                            sx={{ width: 44, height: 44, border: "2px solid rgba(249, 115, 22, 0.4)" }}
                        />
                        <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "text.primary", lineHeight: 1.2 }}>
                                {username}
                            </Typography>
                            <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                {post.timestamp} • Match #{post.matchId}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Match Badge */}
                    <Stack direction="row" spacing={1}>
                        <Chip
                            label={`${post.ranking}${post.ranking === 1 ? "st" : post.ranking === 2 ? "nd" : "rd"} Place`}
                            size="small"
                            color={post.ranking === 1 ? "primary" : "default"}
                            sx={{
                                fontWeight: 800,
                                fontSize: "0.7rem",
                                bgcolor: post.ranking === 1 ? "rgba(249, 115, 22, 0.2)" : "rgba(255, 255, 255, 0.08)",
                                color: post.ranking === 1 ? "#f97316" : "text.secondary",
                                border: post.ranking === 1 ? "1px solid rgba(249, 115, 22, 0.4)" : "none",
                            }}
                        />
                        <Chip
                            label={post.difficulty}
                            size="small"
                            sx={{
                                fontWeight: 800,
                                fontSize: "0.68rem",
                                bgcolor: post.difficulty === "HARD" ? "rgba(239, 68, 68, 0.15)" : "rgba(234, 179, 8, 0.15)",
                                color: post.difficulty === "HARD" ? "#ef4444" : "#eab308",
                            }}
                        />
                    </Stack>
                </Box>

                {/* Content */}
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: "text.primary", mb: 0.8, fontSize: "1rem" }}>
                        {post.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6, fontSize: "0.85rem" }}>
                        {post.description}
                    </Typography>
                </Box>

                {/* Problems Solved Pills */}
                {post.problemsSolved?.length > 0 && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap", pt: 0.5 }}>
                        <Typography variant="caption" sx={{ color: "text.disabled", fontWeight: 700 }}>
                            Solved:
                        </Typography>
                        {post.problemsSolved.map((prob) => (
                            <Chip
                                key={prob}
                                label={prob}
                                size="small"
                                sx={{
                                    height: 22,
                                    fontSize: "0.7rem",
                                    fontWeight: 700,
                                    bgcolor: "rgba(0, 0, 0, 0.4)",
                                    border: "1px solid rgba(255, 255, 255, 0.08)",
                                    color: "#22c55e",
                                }}
                            />
                        ))}
                    </Box>
                )}

                {/* Media Image if present */}
                {post.media && (
                    <Box sx={{ borderRadius: 2, overflow: "hidden", maxHeight: 240, border: "1px solid rgba(255, 255, 255, 0.05)" }}>
                        <Box component="img" src={post.media} alt="Post screenshot" sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </Box>
                )}

                {/* Footer Actions */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 1, borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}>
                    <Stack direction="row" spacing={1}>
                        <Button
                            size="small"
                            variant="text"
                            onClick={toggleLike}
                            startIcon={liked ? <BiSolidHeart className="text-red-500" /> : <BiHeart />}
                            sx={{ color: liked ? "#ef4444" : "text.secondary", textTransform: "none", fontWeight: 700 }}
                        >
                            {likeCount}
                        </Button>
                        <Button
                            size="small"
                            variant="text"
                            startIcon={<BiComment />}
                            sx={{ color: "text.secondary", textTransform: "none", fontWeight: 700 }}
                        >
                            {post.comments}
                        </Button>
                        <Button
                            size="small"
                            variant="text"
                            startIcon={<BiShareAlt />}
                            sx={{ color: "text.secondary", textTransform: "none", fontWeight: 700 }}
                        >
                            Share
                        </Button>
                    </Stack>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, bgcolor: "rgba(234, 179, 8, 0.1)", px: 1.5, py: 0.3, borderRadius: 2 }}>
                        <LuCoins className="text-yellow-400" size={14} />
                        <Typography variant="caption" sx={{ fontWeight: 800, color: "#eab308" }}>
                            +{post.leetcoinsWon} Coins
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </motion.div>
    );
}

ActivityPostCard.propTypes = {
    post: PropTypes.object.isRequired,
    userAvatar: PropTypes.string,
    username: PropTypes.string,
};

export default ActivityPostCard;
