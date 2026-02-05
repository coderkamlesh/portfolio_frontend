import { createTheme } from "@mui/material";

const portfolioTheme = createTheme({
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


export default portfolioTheme;