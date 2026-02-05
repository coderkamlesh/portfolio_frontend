import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { motion } from "motion/react";

import { GradientText } from "@/styles/GradientText";
import { useHero } from "@/hooks/useHero";

export default function ContactSection() {
  const { data, isLoading } = useHero();

  if (isLoading) return null;

  return (
    <Box sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <GradientText
              variant="h2"
              sx={{ fontSize: { xs: "2.2rem", md: "3rem" }, mb: 2 }}
            >
              Get In Touch
            </GradientText>

            <Typography color="text.secondary">
              Feel free to reach out for opportunities or collaboration
            </Typography>
          </Box>

          <Stack spacing={2} alignItems="center">
            <Button
              size="large"
              variant="contained"
              component="a"
              href={`mailto:${data.email}`}
            >
              {data.email}
            </Button>

            <Stack direction="row" spacing={2}>
              {data.github_link && (
                <Button
                  variant="outlined"
                  component="a"
                  href={data.github_link}
                  target="_blank"
                >
                  GitHub
                </Button>
              )}

              {data.linkedin_link && (
                <Button
                  variant="outlined"
                  component="a"
                  href={data.linkedin_link}
                  target="_blank"
                >
                  LinkedIn
                </Button>
              )}

              {data.resume_link && (
                <Button
                  variant="outlined"
                  component="a"
                  href={data.resume_link}
                  target="_blank"
                >
                  Resume
                </Button>
              )}
            </Stack>
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}
