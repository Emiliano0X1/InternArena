import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

function Popup({ title, children, onClose }) {
  return (
    <Dialog 
      open 
      onClose={onClose} 
      fullWidth 
      maxWidth="xs"
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: "blur(6px)",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }
        }
      }}
    >
      {title ? (
        <DialogTitle sx={{ m: 0, p: 2.5, display: "flex", justifyContent: "between", alignItems: "center" }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 12,
              top: 12,
              color: "text.secondary",
              "&:hover": { color: "text.primary" }
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      ) : null}
      <DialogContent sx={{ p: 3, pt: title ? 1 : 3, display: "flex", flexDirection: "column", gap: 2 }}>
        {children}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5, pt: 1, gap: 1 }}>
        <Button 
          variant="outlined" 
          color="secondary" 
          onClick={onClose}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Popup;

