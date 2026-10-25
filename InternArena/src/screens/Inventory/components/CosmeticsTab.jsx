import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { motion } from "motion/react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { FaCheck, FaCrown, FaTrophy, FaBolt, FaGem, FaMedal } from "react-icons/fa";

const BADGE_ICON_MAP = {
    FaCrown: <FaCrown size={22} className="text-pink-400" />,
    FaTrophy: <FaTrophy size={22} className="text-amber-400" />,
    FaBolt: <FaBolt size={22} className="text-orange-400" />,
    FaGem: <FaGem size={22} className="text-purple-400" />,
    FaMedal: <FaMedal size={22} className="text-emerald-400" />,
};

function CosmeticsTab({ items = [], draft, onEquip }) {
    const [activeFilter, setActiveFilter] = useState("all");

    const filteredItems = useMemo(() => {
        if (activeFilter === "all") return items;
        return items.filter((i) => i.type === activeFilter);
    }, [items, activeFilter]);

    const isItemEquipped = (item) => {
        if (item.type === "banner") return draft.bannerId === item.id;
        if (item.type === "tag") return draft.tagId === item.id;
        if (item.type === "badge") return draft.badgeIds?.includes(item.id);
        if (item.type === "avatar") return draft.avatarId === item.id;
        return false;
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Filter Pills */}
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {[
                    { id: "all", label: "All Items" },
                    { id: "banner", label: "Banners" },
                    { id: "tag", label: "Titles & Tags" },
                    { id: "badge", label: "Badges" },
                ].map((tab) => (
                    <Chip
                        key={tab.id}
                        label={tab.label}
                        clickable
                        onClick={() => setActiveFilter(tab.id)}
                        sx={{
                            fontWeight: 700,
                            fontSize: "0.82rem",
                            px: 1,
                            py: 2,
                            borderRadius: "10px",
                            bgcolor: activeFilter === tab.id ? "primary.main" : "rgba(255, 255, 255, 0.05)",
                            color: activeFilter === tab.id ? "#ffffff" : "text.secondary",
                            border: activeFilter === tab.id ? "1px solid #f97316" : "1px solid rgba(255, 255, 255, 0.08)",
                            "&:hover": {
                                bgcolor: activeFilter === tab.id ? "primary.dark" : "rgba(255, 255, 255, 0.1)",
                            },
                        }}
                    />
                ))}
            </Box>

            {/* Items Grid */}
            <Grid container spacing={2.5}>
                {filteredItems.map((item) => {
                    const equipped = isItemEquipped(item);
                    return (
                        <Grid size={{ xs: 12, sm: 6 }} key={item.id}>
                            <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                                <Paper
                                    sx={{
                                        p: 2.5,
                                        borderRadius: "14px",
                                        bgcolor: equipped ? "rgba(249, 115, 22, 0.06)" : "#2e2929",
                                        border: equipped ? "1.5px solid #f97316" : "1px solid rgba(255, 255, 255, 0.06)",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 2,
                                        height: "100%",
                                    }}
                                >
                                    {/* Preview header based on item type */}
                                    {item.type === "banner" && (
                                        <Box sx={{ height: 75, width: "100%", borderRadius: 2, overflow: "hidden", position: "relative" }}>
                                            <Box
                                                component="img"
                                                src={item.image}
                                                alt={item.name}
                                                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                                            />
                                        </Box>
                                    )}

                                    {item.type === "badge" && (
                                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: 65, borderRadius: 2, bgcolor: "rgba(0,0,0,0.3)", border: `1px solid ${item.badgeColor}30` }}>
                                            {BADGE_ICON_MAP[item.iconName] || <FaMedal className="text-orange-400" size={24} />}
                                        </Box>
                                    )}

                                    {item.type === "tag" && (
                                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: 60, borderRadius: 2, bgcolor: "rgba(0,0,0,0.3)" }}>
                                            <Chip
                                                label={item.tagText}
                                                size="small"
                                                sx={{
                                                    fontWeight: 800,
                                                    fontSize: "0.75rem",
                                                    bgcolor: `${item.tagColor}18`,
                                                    color: item.tagColor,
                                                    border: `1px solid ${item.tagColor}40`,
                                                }}
                                            />
                                        </Box>
                                    )}

                                    {/* Details */}
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 0.5 }}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "text.primary" }}>
                                                {item.name}
                                            </Typography>
                                            <Chip
                                                label={item.rarity}
                                                size="small"
                                                sx={{
                                                    height: 20,
                                                    fontSize: "0.65rem",
                                                    fontWeight: 800,
                                                    bgcolor: `${item.rarityColor}18`,
                                                    color: item.rarityColor,
                                                    border: `1px solid ${item.rarityColor}30`,
                                                }}
                                            />
                                        </Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.8rem", lineHeight: 1.4 }}>
                                            {item.description}
                                        </Typography>
                                    </Box>

                                    {/* Action Button */}
                                    <Button
                                        fullWidth
                                        variant={equipped ? "contained" : "outlined"}
                                        color="primary"
                                        size="small"
                                        startIcon={equipped ? <FaCheck /> : null}
                                        onClick={() => onEquip(item)}
                                        sx={{
                                            fontWeight: 700,
                                            fontSize: "0.82rem",
                                            py: 1,
                                            borderRadius: "10px",
                                            bgcolor: equipped ? "#f97316" : "transparent",
                                            borderColor: equipped ? "#f97316" : "rgba(255, 255, 255, 0.15)",
                                            "&:hover": {
                                                bgcolor: equipped ? "#ea580c" : "rgba(249, 115, 22, 0.1)",
                                                borderColor: "#f97316",
                                            },
                                        }}
                                    >
                                        {equipped ? (item.type === "badge" ? "Equipped (Toggle)" : "Equipped") : "Equip"}
                                    </Button>
                                </Paper>
                            </motion.div>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
}

CosmeticsTab.propTypes = {
    items: PropTypes.array.isRequired,
    draft: PropTypes.object.isRequired,
    onEquip: PropTypes.func.isRequired,
};

export default CosmeticsTab;
