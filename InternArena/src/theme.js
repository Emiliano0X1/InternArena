import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#282424",
      paper: "#383434",
    },
    primary: {
      main: "#f97316",
      light: "#fb923c",
      dark: "#ea580c",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#a3a3a3",
    },
    text: {
      primary: "#f5f5f5",
      secondary: "#a3a3a3",
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: [
      "Outfit",
      "system-ui",
      "-apple-system",
      "sans-serif",
    ].join(","),
    h3: {
      fontWeight: 800,
      letterSpacing: "-0.02em",
    },
    h4: {
      fontWeight: 700,
      letterSpacing: "-0.01em",
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          padding: "10px 20px",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-1px)",
          },
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
          boxShadow: "0 4px 12px rgba(249, 115, 22, 0.15)",
          "&:hover": {
            boxShadow: "0 6px 16px rgba(249, 115, 22, 0.25)",
            background: "linear-gradient(135deg, #fb923c 0%, #f97316 100%)",
          },
        },
        outlinedPrimary: {
          borderColor: "rgba(249, 115, 22, 0.5)",
          "&:hover": {
            borderColor: "#f97316",
            backgroundColor: "rgba(249, 115, 22, 0.05)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundImage: "none",
          backgroundColor: "#383434",
          border: "1px solid rgba(255, 255, 255, 0.05)",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
          backgroundColor: "#2e2a2a",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 24px 48px rgba(0, 0, 0, 0.4)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            backgroundColor: "rgba(0, 0, 0, 0.15)",
            "& fieldset": {
              borderColor: "rgba(255, 255, 255, 0.1)",
            },
            "&:hover fieldset": {
              borderColor: "rgba(255, 255, 255, 0.2)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#f97316",
            },
          },
        },
      },
    },
  },
});

