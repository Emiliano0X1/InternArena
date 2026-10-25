import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SaveIcon from "@mui/icons-material/Save";
import { FaPaintBrush, FaGift } from "react-icons/fa";

function InventoryHeader({
    activeMainTab,
    onChangeTab,
    onBack,
    onSave,
    isSaving,
    hasUnsavedChanges,
}) {
    return (
        <Stack spacing={3} sx={{ mb: 4 }}>
            {/* Top Bar with Back and Save Changes Action */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
                <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={onBack}
                    sx={{
                        color: "text.secondary",
                        borderColor: "rgba(255, 255, 255, 0.12)",
                        borderRadius: "10px",
                        textTransform: "none",
                        fontWeight: 600,
                    }}
                >
                    Back to Home
                </Button>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onSave}
                        disabled={isSaving || !hasUnsavedChanges}
                        startIcon={isSaving ? <CircularProgress size={16} color="inherit" /> : <SaveIcon />}
                        sx={{
                            px: 3.5,
                            py: 1.2,
                            borderRadius: "12px",
                            fontWeight: 800,
                            boxShadow: hasUnsavedChanges ? "0 4px 20px rgba(249, 115, 22, 0.4)" : "none",
                            bgcolor: hasUnsavedChanges ? "#f97316" : "rgba(255, 255, 255, 0.08)",
                            color: hasUnsavedChanges ? "#ffffff" : "text.disabled",
                            "&:hover": {
                                bgcolor: hasUnsavedChanges ? "#ea580c" : "rgba(255, 255, 255, 0.08)",
                            },
                        }}
                    >
                        {isSaving ? "Saving..." : hasUnsavedChanges ? "Save Changes" : "Cosmetics Saved"}
                    </Button>
                </Box>
            </Box>

            {/* Title & View Description */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 2 }}>
                <Box>
                    <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: -0.5, color: "text.primary" }}>
                        My Inventory & Profile Customizer
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        Equip purchased cosmetics to customize your live profile card and view real-life rewards.
                    </Typography>
                </Box>
            </Box>

            {/* Main Tabs Separation */}
            <Box sx={{ borderBottom: 1, borderColor: "rgba(255, 255, 255, 0.08)" }}>
                <Tabs
                    value={activeMainTab}
                    onChange={(_, val) => onChangeTab(val)}
                    textColor="primary"
                    indicatorColor="primary"
                    sx={{
                        "& .MuiTab-root": {
                            textTransform: "none",
                            fontWeight: 700,
                            fontSize: "0.95rem",
                            minHeight: 48,
                            gap: 1,
                        },
                    }}
                >
                    <Tab
                        icon={<FaPaintBrush size={15} />}
                        iconPosition="start"
                        label="Digital Cosmetics (Equippable)"
                        value="digital"
                    />
                    <Tab
                        icon={<FaGift size={15} />}
                        iconPosition="start"
                        label="Real-Life Redeemables (Claim Codes)"
                        value="redeemables"
                    />
                </Tabs>
            </Box>
        </Stack>
    );
}

InventoryHeader.propTypes = {
    activeMainTab: PropTypes.string.isRequired,
    onChangeTab: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    isSaving: PropTypes.bool.isRequired,
    hasUnsavedChanges: PropTypes.bool.isRequired,
};

export default InventoryHeader;
