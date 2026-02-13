import { Box, Container, Stack, Typography } from "@mui/material";
import { motion } from "motion/react";

import { GradientText } from "@/styles/GradientText";
import { useExperiences } from "@/hooks/useExperiences";
import ExperienceCard from "./ExperienceCard";

export default function ExperienceSection() {
  const { data, isLoading } = useExperiences();

  if (isLoading) return null;

  return (
    <Box sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <GradientText
              variant="h2"
              sx={{ fontSize: { xs: "2.3rem", md: "3.2rem" }, mb: 2 }}
            >
              Work Experience
            </GradientText>
            <Typography color="text.secondary">
              My professional journey so far
            </Typography>
          </Box>
        </motion.div>

        {/* Timeline */}
        <Stack spacing={4}>
          {data
            .slice()
            .sort((a, b) => b.sort_order - a.sort_order)
            .map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: index * 0.15 }}
              >
                <ExperienceCard exp={exp} />
              </motion.div>
            ))}
        </Stack>
      </Container>
    </Box>
  );
}
