import { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "motion/react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import { FaCopy, FaCheck, FaShippingFast, FaBox, FaTicketAlt, FaClock } from "react-icons/fa";

const STATUS_CONFIG = {
    READY_TO_CLAIM: {
        label: "Ready to Claim",
        color: "success",
        icon: <FaTicketAlt size={12} />,
        bg: "rgba(34, 197, 94, 0.15)",
        text: "#22c55e",
        border: "rgba(34, 197, 94, 0.3)",
    },
    PROCESSING: {
        label: "Processing Order",
        color: "warning",
        icon: <FaClock size={12} />,
        bg: "rgba(234, 179, 8, 0.15)",
        text: "#eab308",
        border: "rgba(234, 179, 8, 0.3)",
    },
    SHIPPED: {
        label: "In Transit / Shipped",
        color: "info",
        icon: <FaShippingFast size={12} />,
        bg: "rgba(59, 130, 246, 0.15)",
        text: "#3b82f6",
        border: "rgba(59, 130, 246, 0.3)",
    },
    CLAIMED: {
        label: "Completed & Delivered",
        color: "default",
        icon: <FaBox size={12} />,
        bg: "rgba(255, 255, 255, 0.08)",
        text: "#a3a3a3",
        border: "rgba(255, 255, 255, 0.15)",
    },
};

function RedeemablesTab({ items = [] }) {
    const [copiedCode, setCopiedCode] = useState(null);

    const handleCopyCode = async (code) => {
        try {
            await navigator.clipboard.writeText(code);
            setCopiedCode(code);
            setTimeout(() => setCopiedCode(null), 2500);
        } catch (e) {
            console.error("Clipboard copy error:", e);
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Box sx={{ p: 2, bgcolor: "rgba(249, 115, 22, 0.06)", borderRadius: 3, border: "1px solid rgba(249, 115, 22, 0.2)" }}>
                <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.5 }}>
                    <strong style={{ color: "#f97316" }}>Notice:</strong> Real-life physical merchandise and vouchers are redeemable via claim codes. They are not equippable onto your digital avatar.
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {items.map((item) => {
                    const statusCfg = STATUS_CONFIG[item.status] || STATUS_CONFIG.CLAIMED;
                    const isCopied = copiedCode === item.claimCode;

                    return (
                        <Grid size={{ xs: 12, md: 6 }} key={item.id}>
                            <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.2 }}>
                                <Paper
                                    sx={{
                                        p: 3,
                                        borderRadius: "16px",
                                        bgcolor: "#2e2929",
                                        border: "1px solid rgba(255, 255, 255, 0.06)",
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 2,
                                    }}
                                >
                                    {/* Product Image & Status */}
                                    <Box sx={{ position: "relative", height: 140, borderRadius: 2.5, overflow: "hidden" }}>
                                        <Box
                                            component="img"
                                            src={item.image}
                                            alt={item.name}
                                            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        />
                                        <Box sx={{ position: "absolute", top: 10, left: 10 }}>
                                            <Chip
                                                icon={statusCfg.icon}
                                                label={statusCfg.label}
                                                size="small"
                                                sx={{
                                                    fontWeight: 800,
                                                    fontSize: "0.7rem",
                                                    bgcolor: statusCfg.bg,
                                                    color: statusCfg.text,
                                                    border: `1px solid ${statusCfg.border}`,
                                                    backdropFilter: "blur(6px)",
                                                }}
                                            />
                                        </Box>
                                        <Box sx={{ position: "absolute", bottom: 10, right: 10 }}>
                                            <Chip
                                                label={item.category}
                                                size="small"
                                                sx={{ fontWeight: 700, fontSize: "0.68rem", bgcolor: "rgba(0,0,0,0.7)", color: "#ffffff" }}
                                            />
                                        </Box>
                                    </Box>

                                    {/* Title and details */}
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 800, color: "text.primary", mb: 0.5, fontSize: "1.05rem" }}>
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.82rem", lineHeight: 1.5, mb: 2 }}>
                                            {item.description}
                                        </Typography>

                                        {/* Claim Code Widget */}
                                        <Box
                                            sx={{
                                                p: 1.5,
                                                borderRadius: 2,
                                                bgcolor: "rgba(0, 0, 0, 0.4)",
                                                border: "1px solid rgba(255, 255, 255, 0.06)",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <Box>
                                                <Typography variant="caption" sx={{ color: "text.disabled", display: "block", fontSize: "0.68rem", textTransform: "uppercase" }}>
                                                    Redemption Code
                                                </Typography>
                                                <Typography variant="body2" sx={{ fontFamily: "monospace", fontWeight: 800, color: "#f97316", letterSpacing: 1.2 }}>
                                                    {item.claimCode}
                                                </Typography>
                                            </Box>
                                            <Tooltip title={isCopied ? "Copied!" : "Copy Code"} arrow>
                                                <IconButton
                                                    size="small"
                                                    onClick={() => handleCopyCode(item.claimCode)}
                                                    sx={{
                                                        color: isCopied ? "success.main" : "text.secondary",
                                                        bgcolor: isCopied ? "rgba(34, 197, 94, 0.15)" : "rgba(255, 255, 255, 0.05)",
                                                    }}
                                                >
                                                    {isCopied ? <FaCheck size={14} /> : <FaCopy size={14} />}
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </Box>

                                    {/* Shipping / Tracking Info */}
                                    {item.trackingNumber && (
                                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ pt: 1, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                                            <Typography variant="caption" color="text.secondary">
                                                Tracking: <span style={{ color: "#3b82f6", fontWeight: 700 }}>{item.trackingNumber}</span>
                                            </Typography>
                                            <Typography variant="caption" color="text.disabled">
                                                Claimed on {item.claimedDate}
                                            </Typography>
                                        </Stack>
                                    )}
                                </Paper>
                            </motion.div>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
}

RedeemablesTab.propTypes = {
    items: PropTypes.array.isRequired,
};

export default RedeemablesTab;
