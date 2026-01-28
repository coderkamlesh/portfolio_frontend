import { AnimatedBlob } from "@/styles/AnimatedBlob";
import { GlowButton } from "@/styles/GlowButton";
import { GradientText } from "@/styles/GradientText";
import { OutlineButton } from "@/styles/OutlineButton";
import { Box, Chip, Container, Grid, Typography } from "@mui/material";
import { motion } from "motion/react"


export default function HeroSection() {
   return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        py: { xs: 6, md: 8 },
        background: 'linear-gradient(135deg, #0a0e14 0%, #151921 100%)',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 7 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Chip
                  label="Available for Projects"
                  sx={{
                    background: 'rgba(245, 158, 11, 0.1)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    color: '#f59e0b',
                    fontWeight: 500,
                    mb: 3,
                    '& .MuiChip-label': {
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                    },
                  }}
                  icon={
                    <Box
                      component="span"
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: '#f59e0b',
                        animation: 'pulse 2s ease-in-out infinite',
                        ml: 1,
                      }}
                    />
                  }
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '4.5rem' },
                    lineHeight: 1.1,
                    mb: 2,
                  }}
                >
                  Software Developer
                </Typography>
                <GradientText
                  variant="h2"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '4.5rem' },
                    lineHeight: 1.1,
                    mb: 3,
                  }}
                >
                  Crafting Digital Experiences
                </GradientText>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 300,
                    mb: 4,
                    maxWidth: '600px',
                    lineHeight: 1.8,
                  }}
                >
                  Full-stack developer specializing in Java, JavaScript, and Android development.
                  Building scalable applications with clean code and modern architectures.
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <GlowButton variant="contained" size="large">
                    View My Work
                  </GlowButton>
                  <OutlineButton variant="outlined" size="large">
                    Get in Touch
                  </OutlineButton>
                </Box>
              </motion.div>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: 500,
                  height: { xs: 300, md: 500 },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                }}
              >
                <AnimatedBlob
                  delay={0}
                  sx={{
                    width: { xs: 200, md: 300 },
                    height: { xs: 200, md: 300 },
                    background: 'linear-gradient(135deg, #f59e0b, #ec4899)',
                  }}
                />
                <AnimatedBlob
                  delay={2}
                  sx={{
                    width: { xs: 250, md: 350 },
                    height: { xs: 250, md: 350 },
                    background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                  }}
                />
                <AnimatedBlob
                  delay={4}
                  sx={{
                    width: { xs: 180, md: 280 },
                    height: { xs: 180, md: 280 },
                    background: 'linear-gradient(135deg, #8b5cf6, #f59e0b)',
                  }}
                />
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
