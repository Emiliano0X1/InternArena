
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function Popup({ title, children, onClose }) {
  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="xs">
      {title ? <DialogTitle>{title}</DialogTitle> : null}
      <DialogContent dividers>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {children}
        </div>
      </DialogContent>
      <DialogActions>
        <Button color="error" variant="contained" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Popup;
