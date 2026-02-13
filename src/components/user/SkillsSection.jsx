import { Box, Container, Grid, Typography } from "@mui/material";
import { motion } from "motion/react";

import { GradientText } from "@/styles/GradientText";
import { useSkills } from "@/hooks/useSkills";
import SkillItem from "./SkillItem";

export default function SkillsSection() {
  const { data, isLoading } = useSkills();

  if (isLoading) return null;

  // Group skills by category
  const grouped = data.reduce((acc, skill) => {
    acc[skill.category] = acc[skill.category] || [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <Box sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
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
              Technical Skills
            </GradientText>
            <Typography color="text.secondary">
              Technologies I work with regularly
            </Typography>
          </Box>
        </motion.div>

        {/* Skill Groups */}
        {Object.entries(grouped).map(([category, skills], index) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ delay: index * 0.15 }}
          >
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, mb: 3 }}
              >
                {category}
              </Typography>

              <Grid container spacing={2}>
                {skills.map((skill) => (
                  <Grid
                    key={skill.id}
                    size={{ xs: 12, sm: 6, md: 3 }}
                  >
                    <SkillItem
                      name={skill.name}
                      icon={skill.icon}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </motion.div>
        ))}
      </Container>
    </Box>
  );
}
