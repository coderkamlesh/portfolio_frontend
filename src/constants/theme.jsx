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
  palette:{
    primary:{
      main:'#FF5733'
    },
    secondary:{
      main:'#00FF7F'
    },
    mode:'dark'
    // background:{
    //   default:"#00FF7F",
    //   paper:"#00FF7F"
    // }
  },
  typography:{
    fontFamily:'SN Pro'
  },
  components:{
    MuiButton:{
      defaultProps:{
        variant:'contained'
      }
      ,styleOverrides:{
        root:{
          borderRadius:'7px'
        }
      }
    },

  }
});

// Named exports for flexibility
export { theme as portfolioTheme, adminTheme };


export default theme;