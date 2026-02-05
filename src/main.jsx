import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, useLocation } from "react-router-dom";

import App from "@/App.jsx";
import { queryClient } from "@/constants/queryClient";

import { getAdminTheme } from "@/constants/adminTheme";
import portfolioTheme from "@/constants/portfolioTheme";
import { useThemeStore } from "@/store/themeStore";

/**
 * Theme Resolver based on Route
 */
function ThemeResolver({ children }) {
  const location = useLocation();
  const mode = useThemeStore((state) => state.mode);

  const isAdminRoute = location.pathname.startsWith("/admin");
  const theme = isAdminRoute ? getAdminTheme(mode) : portfolioTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeResolver>
        <App />
      </ThemeResolver>
    </BrowserRouter>
  </QueryClientProvider>
);
