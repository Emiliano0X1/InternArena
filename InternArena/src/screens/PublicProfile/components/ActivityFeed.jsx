import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import ActivityPostCard from "./ActivityPostCard";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function ActivityFeed({
    posts = [],
    page,
    totalPages,
    totalElements,
    onPageChange,
    isLoading,
    userAvatar,
    username,
}) {
    const [filterType, setFilterType] = useState("all");

    const filteredPosts = useMemo(() => {
        if (filterType === "all") return posts;
        return posts.filter((p) => p.type === filterType);
    }, [posts, filterType]);

    return (
        <Stack spacing={3}>
            {/* Header & Sub-filters */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 900, color: "text.primary" }}>
                        Recent Match Activity & Posts
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Showing {posts.length} of {totalElements} match records and game logs.
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 1 }}>
                    {[
                        { id: "all", label: "All Activity" },
                        { id: "match_recap", label: "Match Recaps" },
                        { id: "game_log", label: "Game Logs" },
                    ].map((tab) => (
                        <Chip
                            key={tab.id}
                            label={tab.label}
                            clickable
                            size="small"
                            onClick={() => setFilterType(tab.id)}
                            sx={{
                                fontWeight: 700,
                                fontSize: "0.75rem",
                                bgcolor: filterType === tab.id ? "primary.main" : "rgba(255, 255, 255, 0.05)",
                                color: filterType === tab.id ? "#ffffff" : "text.secondary",
                                border: filterType === tab.id ? "1px solid #f97316" : "1px solid rgba(255, 255, 255, 0.08)",
                            }}
                        />
                    ))}
                </Box>
            </Box>

            {/* Loading state */}
            {isLoading && (
                <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                    <CircularProgress color="primary" />
                </Box>
            )}

            {/* Posts List */}
            {!isLoading && (
                <Stack spacing={2.5}>
                    {filteredPosts.map((post) => (
                        <ActivityPostCard
                            key={post.id}
                            post={post}
                            userAvatar={userAvatar}
                            username={username}
                        />
                    ))}

                    {filteredPosts.length === 0 && (
                        <Box sx={{ p: 6, textAlign: "center", bgcolor: "#2e2929", borderRadius: 3, border: "1px dashed rgba(255,255,255,0.1)" }}>
                            <Typography variant="body1" color="text.secondary">
                                No activity posts found in this category.
                            </Typography>
                        </Box>
                    )}
                </Stack>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <Box
                    sx={{
                        p: 2,
                        borderRadius: 3,
                        bgcolor: "#242020",
                        border: "1px solid rgba(255, 255, 255, 0.06)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 2,
                    }}
                >
                    <Button
                        size="small"
                        variant="outlined"
                        disabled={page <= 1}
                        onClick={() => onPageChange(page - 1)}
                        startIcon={<ArrowBackIosNewIcon sx={{ fontSize: "12px !important" }} />}
                        sx={{ color: "text.secondary", borderColor: "rgba(255,255,255,0.1)", textTransform: "none" }}
                    >
                        Previous
                    </Button>

                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(_, val) => onPageChange(val)}
                        color="primary"
                        shape="rounded"
                        size="medium"
                        sx={{
                            "& .MuiPaginationItem-root": {
                                color: "text.secondary",
                                fontWeight: 700,
                            },
                            "& .Mui-selected": {
                                bgcolor: "primary.main !important",
                                color: "#ffffff",
                            },
                        }}
                    />

                    <Button
                        size="small"
                        variant="outlined"
                        disabled={page >= totalPages}
                        onClick={() => onPageChange(page + 1)}
                        endIcon={<ArrowForwardIosIcon sx={{ fontSize: "12px !important" }} />}
                        sx={{ color: "text.secondary", borderColor: "rgba(255,255,255,0.1)", textTransform: "none" }}
                    >
                        Next
                    </Button>
                </Box>
            )}
        </Stack>
    );
}

ActivityFeed.propTypes = {
    posts: PropTypes.array,
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    totalElements: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    userAvatar: PropTypes.string,
    username: PropTypes.string,
};

export default ActivityFeed;
