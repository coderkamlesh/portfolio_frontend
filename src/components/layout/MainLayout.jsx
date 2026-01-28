import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { adminTheme } from "@/constants/theme";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

const DRAWER_WIDTH = 280;

export default function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery(adminTheme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    // Nested ThemeProvider - Admin theme sirf admin routes ke liye
    <ThemeProvider theme={adminTheme}>
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "grey.50" }}>
        {/* Sidebar */}
        <Sidebar
          drawerWidth={DRAWER_WIDTH}
          mobileOpen={mobileOpen}
          onDrawerToggle={handleDrawerToggle}
          isMobile={isMobile}
        />

        {/* Main Content Area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Navbar */}
          <Navbar
            drawerWidth={DRAWER_WIDTH}
            onDrawerToggle={handleDrawerToggle}
            isMobile={isMobile}
          />

          {/* Page Content */}
          <Box
            sx={{
              flexGrow: 1,
              p: { xs: 2, sm: 3, md: 4 },
              mt: { xs: 7, sm: 8 },
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}