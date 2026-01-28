import { createTheme } from "@mui/material";

// Portfolio Theme (Dark) - Default for public pages
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#f59e0b',
    },
    secondary: {
      main: '#ec4899',
    },
    background: {
      default: '#0a0e14',
      paper: '#1f242e',
    },
    text: {
      primary: '#e6e8eb',
      secondary: '#9ca3af',
    },
  },
  typography: {
    fontFamily: "'Work Sans', sans-serif",
    h1: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 900,
    },
    h2: {
      fontFamily: "'Playfair Display', serif",
      fontWeight: 900,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @keyframes morph {
          0%, 100% {
            border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
            transform: rotate(0deg) scale(1);
          }
          50% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
            transform: rotate(180deg) scale(1.1);
          }
        }
        
        @keyframes pulse {
          0%, 100% { 
            opacity: 1; 
            transform: scale(1);
          }
          50% { 
            opacity: 0.5; 
            transform: scale(1.1);
          }
        }
      `,
    },
  },
});

// Admin Theme (Light) - For admin panel
const adminTheme = createTheme({
  palette: {
    primary: {
      main: "#667eea",
      light: "#8a9ff7",
      dark: "#4c5dd4",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#764ba2",
      light: "#9570ba",
      dark: "#5a3a7d",
      contrastText: "#ffffff",
    },
    success: {
      main: "#43e97b",
      light: "#69ed95",
      dark: "#32b05a",
      lighter: "rgba(67, 233, 123, 0.1)",
    },
    error: {
      main: "#f55252",
      light: "#f77575",
      dark: "#d43d3d",
      lighter: "rgba(245, 82, 82, 0.1)",
    },
    warning: {
      main: "#ffa726",
      light: "#ffb851",
      dark: "#f57c00",
      lighter: "rgba(255, 167, 38, 0.1)",
    },
    info: {
      main: "#4facfe",
      light: "#72bdfe",
      dark: "#3b8acc",
      lighter: "rgba(79, 172, 254, 0.1)",
    },
    grey: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
    background: {
      default: "#f8f9fa",
      paper: "#ffffff",
    },
    text: {
      primary: "#2d3748",
      secondary: "#718096",
      disabled: "#a0aec0",
    },
    divider: "rgba(0, 0, 0, 0.08)",
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: "1.125rem",
      fontWeight: 600,
      lineHeight: 1.5,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    "none",
    "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.06)",
    "0 3px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)",
    "0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)",
    "0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04)",
    "0 25px 50px rgba(0,0,0,0.12)",
    ...Array(19).fill("none"),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 24px",
          fontSize: "0.95rem",
          fontWeight: 600,
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          },
        },
        contained: {
          "&:hover": {
            boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
        elevation1: {
          boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        },
        elevation2: {
          boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
        },
        elevation3: {
          boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
  },
});

// Named exports for flexibility
export { theme as portfolioTheme, adminTheme };

// Default export (portfolio theme) for backward compatibility
export default theme;