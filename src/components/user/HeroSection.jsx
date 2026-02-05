import {
  Avatar,
  Box,
  Chip,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { motion } from "motion/react";

import { AnimatedBlob } from "@/styles/AnimatedBlob";
import { GlowButton } from "@/styles/GlowButton";
import { OutlineButton } from "@/styles/OutlineButton";
import { GradientText } from "@/styles/GradientText";

import { useHero } from "@/hooks/useHero";
import DownloadResumeButton from "@/components/public/DownloadResumeButton";

export default function HeroSection() {
  const { data, isLoading } = useHero();

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  if (isLoading || !data) return null;

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <Container maxWidth="xl">
        <Grid container spacing={6} alignItems="center">
          {/* LEFT */}
          <Grid size={{ xs: 12, md: 7 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Chip label={data.job_title} sx={{ mb: 3 }} />

              <Typography variant="h1" sx={{ mb: 1 }}>
                {data.full_name}
              </Typography>

              <GradientText variant="h2" sx={{ mb: 3 }}>
                Building Scalable Digital Products
              </GradientText>

              <Typography
                color="text.secondary"
                sx={{ maxWidth: 600, mb: 4 }}
              >
                {data.description}
              </Typography>

              {/* ✅ CTA section */}
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <GlowButton onClick={() => handleScroll("projects")}>
                  View My Work
                </GlowButton>

                {/* Resume CTA */}
                <DownloadResumeButton variant="outlined" />

                <OutlineButton onClick={() => handleScroll("contact")}>
                  Get in Touch
                </OutlineButton>
              </Box>
            </motion.div>
          </Grid>

          {/* RIGHT */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ position: "relative", width: 320, height: 320, mx: "auto" }}>
              <AnimatedBlob delay={0} />
              <AnimatedBlob delay={3} />
              <Avatar
                src={data.avatar_url}
                sx={{
                  width: 160,
                  height: 160,
                  position: "absolute",
                  inset: 0,
                  m: "auto",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
