import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

import MobileNav from "./MobileNav";
import DownloadResumeButton from "@/components/public/DownloadResumeButton";

const navItems = [
  { label: "Home", id: "hero" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Active section observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    navItems.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <AppBar position="sticky" elevation={0}>
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: 72 }}>
            {/* Logo */}
            <Typography
              variant="h6"
              sx={{ fontWeight: 800, cursor: "pointer", flexGrow: 1 }}
              onClick={() => handleScroll("hero")}
            >
              Kamlesh.dev
            </Typography>

            {/* Desktop Nav */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
              {navItems.map((item) => {
                const isActive = active === item.id;

                return (
                  <motion.div key={item.id} whileHover={{ y: -2 }}>
                    <Button
                      onClick={() => handleScroll(item.id)}
                      sx={{
                        fontWeight: isActive ? 700 : 600,
                        color: isActive ? "primary.main" : "text.primary",
                      }}
                    >
                      {item.label}
                    </Button>
                  </motion.div>
                );
              })}

              {/* ✅ Resume button added here */}
              <DownloadResumeButton />
            </Box>

            {/* Mobile */}
            <IconButton
              sx={{ display: { xs: "flex", md: "none" } }}
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <MobileNav
        open={open}
        onClose={() => setOpen(false)}
        onNavigate={handleScroll}
        active={active}
      />
    </>
  );
}
