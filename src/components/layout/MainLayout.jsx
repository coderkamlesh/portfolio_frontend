import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

const DRAWER_WIDTH = 280;

export default function MainLayout() {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box 
      sx={{ 
        display: "flex", 
        minHeight: "100vh", 
        bgcolor: "background.default",
        color: "text.primary"
      }}
    >
      {/* FIX: Wrap Sidebar in a Box to reserve space in the flex container.
        This ensures the Main Content is pushed to the right, not under the sidebar.
      */}
      <Box
        component="nav"
        sx={{
          width: { md: DRAWER_WIDTH },
          flexShrink: { md: 0 },
          display: { xs: 'none', md: 'block' } // Only reserve space on desktop
        }}
      >
        <Sidebar
          drawerWidth={DRAWER_WIDTH}
          mobileOpen={mobileOpen}
          onDrawerToggle={handleDrawerToggle}
          isMobile={isMobile}
        />
      </Box>

      {/* For Mobile: Sidebar drawer is temporary and floats on top, 
        so we render it outside the flow-reserving Box usually, 
        but since your Sidebar component handles switching internally,
        we just need to make sure the Sidebar component is rendered for mobile too.
        
        However, since I hid the wrapper Box on mobile above (display: none),
        we need to render the Sidebar separately for mobile or adjust the logic.
        
        BETTER APPROACH: Let Sidebar handle itself, but render it inside the wrapper for desktop
        and ensure the wrapper doesn't collapse layout on mobile.
      */}
      
      {/* ACTUAL FIX REFINED: 
         Your Sidebar component handles both Mobile (Temporary) and Desktop (Permanent) logic.
         We just need to ensure the `Box` wrapper exists on Desktop to hold space.
      */}
      {isMobile && (
         <Sidebar
            drawerWidth={DRAWER_WIDTH}
            mobileOpen={mobileOpen}
            onDrawerToggle={handleDrawerToggle}
            isMobile={isMobile}
         />
      )}

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          // width: { md: `calc(100% - ${DRAWER_WIDTH}px)` }, // Not strictly needed if flex works, but good for safety
          width: "100%", // Allow it to fill remaining space
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
            mt: { xs: 7, sm: 8 }, // Adjust for Navbar height
            overflowX: "hidden" // Prevent horizontal scroll
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}