import { createRoot } from "react-dom/client";
import App from "@/App.jsx";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "@/constants/theme";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/constants/queryClient";

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </QueryClientProvider>
);
