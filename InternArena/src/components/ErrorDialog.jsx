import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";

/**
 * User-facing Error Dialog for API failures.
 * Prevents progression and presents error details clearly.
 */
function ErrorDialog({ open, title = "Action Failed", message, status, onRetry, onClose }) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="xs"
            slotProps={{
                backdrop: {
                    sx: {
                        backdropFilter: "blur(8px)",
                        backgroundColor: "rgba(15, 12, 12, 0.75)",
                    },
                },
            }}
            PaperProps={{
                sx: {
                    bgcolor: "#1e1b1b",
                    backgroundImage: "none",
                    border: "1px solid rgba(239, 68, 68, 0.3)",
                    borderRadius: 3,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(239, 68, 68, 0.15)",
                    overflow: "hidden",
                },
            }}
        >
            <Box
                sx={{
                    height: 4,
                    width: "100%",
                    bgcolor: "error.main",
                }}
            />

            <DialogTitle sx={{ p: 3, pb: 1.5, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            bgcolor: "rgba(239, 68, 68, 0.12)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "error.main",
                        }}
                    >
                        <ErrorOutlineIcon fontSize="medium" />
                    </Box>
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 800, color: "text.primary", lineHeight: 1.2 }}>
                            {title}
                        </Typography>
                        {status && (
                            <Chip
                                label={`Status ${status}`}
                                size="small"
                                color="error"
                                variant="outlined"
                                sx={{ height: 20, fontSize: "0.7rem", mt: 0.5, fontWeight: 700 }}
                            />
                        )}
                    </Box>
                </Box>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{ color: "text.secondary", "&:hover": { color: "text.primary" } }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ p: 3, pt: 1 }}>
                <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                    {message || "We encountered an unexpected error while communicating with the server. Please try again."}
                </Typography>
                <Box
                    sx={{
                        mt: 2,
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: "rgba(0, 0, 0, 0.3)",
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                    }}
                >
                    <Typography variant="caption" sx={{ color: "text.disabled", display: "block", fontFamily: "monospace" }}>
                        Endpoint: /api/v1/partys/create
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.disabled", display: "block" }}>
                        Redirection halted. Check backend connection or server logs.
                    </Typography>
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3, pt: 1, gap: 1.5 }}>
                <Button
                    variant="outlined"
                    onClick={onClose}
                    sx={{
                        color: "text.secondary",
                        borderColor: "rgba(255, 255, 255, 0.15)",
                        "&:hover": { borderColor: "rgba(255, 255, 255, 0.3)" },
                    }}
                >
                    Dismiss
                </Button>
                {onRetry && (
                    <Button
                        variant="contained"
                        color="error"
                        onClick={onRetry}
                        startIcon={<RefreshIcon />}
                        sx={{
                            fontWeight: 700,
                            boxShadow: "0 4px 14px rgba(239, 68, 68, 0.3)",
                        }}
                    >
                        Retry
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}

export default ErrorDialog;
