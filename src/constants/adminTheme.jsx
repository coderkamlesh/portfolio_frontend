import { createTheme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

export const getAdminTheme = (mode) => {
  return createTheme({
    // Global Shape (Border Radius for Cards, Buttons, Inputs)
    shape: {
      borderRadius: 10,
    },

    palette: {
      mode,
      ...(mode === "dark"
        ? {
            // DARK MODE
            primary: { 
              main: "hsl(220 78% 76%)", 
              dark: "hsl(220 78% 60%)", 
              contrastText: "#1a1a2e" 
            },
            secondary: { main: "hsl(40 53% 60%)" },
            
            background: {
              default: "hsl(228 79% 2%)", // Dark Deep Blue Base
              paper: "hsl(222 55% 5%)",   // Slightly lighter for cards
            },
            
            text: {
              primary: "hsl(220 100% 98%)",
              secondary: "hsl(220 35% 73%)",
            },
            
            divider: "hsl(220 37% 20%)",
            
            error: { main: "hsl(9 26% 64%)" },
            warning: { main: "hsl(52 19% 57%)" },
            success: { main: "hsl(146 17% 59%)" },
            info: { main: "hsl(217 28% 65%)" },

            action: {
              hover: "hsl(220 35% 10%)",
              selected: "hsl(220 20% 42%)",
            },
          }
        : {
            // LIGHT MODE
            primary: { 
              main: "hsl(221 49% 33%)",
              dark: "hsl(221 49% 23%)",
              contrastText: "#ffffff"
            },
            secondary: { main: "hsl(44 100% 14%)" },
            
            background: {
              default: "hsl(220 100% 98%)", // Almost white for base
              paper: "hsl(0, 0%, 100%)",    // Pure white for cards
            },
            
            text: {
              primary: "hsl(226 85% 7%)",
              secondary: "hsl(220 26% 31%)",
            },
            
            divider: "hsl(220 27% 85%)", // Thoda light divider for borders
            
            error: { main: "hsl(9 21% 41%)" },
            warning: { main: "hsl(52 23% 34%)" },
            success: { main: "hsl(147 19% 36%)" },
            info: { main: "hsl(217 22% 41%)" },

            action: {
              hover: "hsl(220 59% 91%)",
              selected: "hsl(220 100% 100%)",
            },
          }),
    },
    
    typography: {
      fontFamily: "'Inter', 'Roboto', sans-serif",
      h1: { fontFamily: "'Inter', sans-serif", fontWeight: 700 },
      h2: { fontFamily: "'Inter', sans-serif", fontWeight: 600 },
      h3: { fontFamily: "'Inter', sans-serif", fontWeight: 600 },
      h4: { fontFamily: "'Inter', sans-serif", fontWeight: 600 },
      h5: { fontFamily: "'Inter', sans-serif", fontWeight: 500 },
      h6: { fontFamily: "'Inter', sans-serif", fontWeight: 500 },
      button: { textTransform: "none", fontWeight: 600 },
    },
    
    components: {
      // 1. Dotted Background Implementation
      MuiCssBaseline: {
        styleOverrides: (theme) => ({
          body: {
            // Base Background Color
            backgroundColor: theme.palette.background.default,
            
            // Dotted Pattern Logic
            backgroundImage: mode === 'dark'
              ? `radial-gradient(hsla(220, 20%, 50%, 0.15) 1px, transparent 1px)` // Subtle grey dots for dark
              : `radial-gradient(hsla(220, 20%, 40%, 0.08) 1px, transparent 1px)`, // Subtle grey dots for light
            
            backgroundSize: "24px 24px", // Distance between dots
            backgroundPosition: "center center",
            
            // Scrollbar Logic (Previous)
            scrollbarColor: mode === "dark" 
              ? "hsl(220 20% 42%) hsl(228 79% 2%)" 
              : "hsl(220 19% 53%) hsl(220 100% 97%)",
            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
              backgroundColor: "transparent", // Transparent track for dotted bg visibility
            },
            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              borderRadius: 8,
              backgroundColor: mode === "dark" ? "hsl(220 26% 31%)" : "hsl(220 19% 53%)",
              minHeight: 24,
              border: "3px solid transparent",
              backgroundClip: "content-box",
            },
            "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
              backgroundColor: mode === "dark" ? "hsl(220 20% 42%)" : "hsl(220 26% 31%)",
            },
          },
        }),
      },

      // 2. AppBar Radius Fix
      MuiAppBar: {
        styleOverrides: {
          root: {
            borderRadius: 0, // Top corners sharp
            // Agar bottom rounded chahiye toh uncomment karo:
            // borderBottomLeftRadius: 0,
            // borderBottomRightRadius: 0,
            
            // Standard Backdrop blur for modern feel
            backgroundColor: mode === 'dark' 
               ? alpha("hsl(222, 55%, 5%)", 0.8) // Semi-transparent Paper color
               : alpha("hsl(0, 0%, 100%)", 0.8),
            backdropFilter: "blur(8px)",
            borderBottom: "1px solid",
            borderColor: mode === 'dark' ? "hsl(220, 37%, 20%)" : "hsl(220, 27%, 90%)",
            boxShadow: "none", // Remove default shadow for cleaner look
          },
        },
      },

      // 3. Paper Styling (Gemini Style - Clean & Bordered)
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            borderRadius: 10,
            // Add a subtle border to separate paper from dotted background
            border: "1px solid",
            borderColor: mode === 'dark' 
              ? "hsl(220, 37%, 20%)" // Dark mode subtle border
              : "hsl(220, 27%, 90%)", // Light mode subtle border
            boxShadow: mode === 'dark' 
              ? "none" 
              : "0px 2px 4px rgba(0,0,0,0.02)", // Very light shadow in light mode
          },
        },
      },

      // 4. Button Fixes
      MuiButton: {
        styleOverrides: {
          root: { 
            borderRadius: 10,
            boxShadow: "none", // Modern flat buttons
            "&:hover": { boxShadow: "none" }
          },
          containedPrimary: {
            "&:hover": {
              backgroundColor: mode === "dark" ? "hsl(220 78% 65%)" : "hsl(221 49% 25%)",
            }
          }
        }
      },
      
      
    },
  });
};