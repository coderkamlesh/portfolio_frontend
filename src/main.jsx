import { createRoot } from "react-dom/client";
import App from "@/App.jsx";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
// Import helper function instead of static object
import { getAdminTheme } from "@/constants/adminTheme"; 

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/constants/queryClient";
import { useThemeStore } from "@/store/themeStore";

// Create a wrapper component to handle Theme Logic cleanly
const RootApp = () => {
  const mode = useThemeStore((state) => state.mode);
  const theme = getAdminTheme(mode); // Generate theme based on current mode

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")).render(<RootApp />);