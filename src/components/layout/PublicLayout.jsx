import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";

export default function PublicLayout() {
  return (
    <>
      <Navbar />
      <Box component="main">
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}
