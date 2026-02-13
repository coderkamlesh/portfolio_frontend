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
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
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
            <Box sx={{
              position: "relative",
              width: { xs: 280, md: 350 },
              height: { xs: 280, md: 350 },
              mx: "auto",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <AnimatedBlob delay={0} />
              <AnimatedBlob delay={3} sx={{ background: (theme) => `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})` }} />
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 100 }}
                style={{
                  zIndex: 2,
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Box
                  component="img"
                  src={data.avatar_url || "/kamlesh_profile_image.png"}
                  alt={data.full_name}
                  sx={{
                    width: { xs: 280, md: 400 },
                    height: { xs: 280, md: 400 },
                    objectFit: "cover",
                    objectPosition: "center 20%", // Focus slightly more on the top of the image
                    borderRadius: "24% 76% 70% 30% / 45% 30% 70% 55%", // Slightly smoother organic shape
                    border: "8px solid rgba(245, 158, 11, 0.05)",
                    outline: "2px solid",
                    outlineColor: "primary.main",
                    boxShadow: (theme) => `0 20px 60px ${theme.palette.primary.main}44`,
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                  }}
                />
              </motion.div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
