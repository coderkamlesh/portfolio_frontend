import { Box, Container, Grid, Typography } from "@mui/material";
import { motion } from "motion/react";

import { GradientText } from "@/styles/GradientText";
import { useProjects } from "@/hooks/useProjects";
import ProjectCard from "./ProjectCard";

export default function ProjectsSection() {
  const { data, isLoading } = useProjects();

  if (isLoading) return null;

  return (
    <Box sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <GradientText
              variant="h2"
              sx={{ fontSize: { xs: "2.3rem", md: "3.2rem" }, mb: 2 }}
            >
              Projects
            </GradientText>
            <Typography color="text.secondary">
              Some of the work I’ve built and maintained
            </Typography>
          </Box>
        </motion.div>

        {/* Projects Grid */}
        <Grid container spacing={3}>
          {data
            .slice()
            .sort((a, b) => b.sort_order - a.sort_order)
            .map((project, index) => (
              <Grid
                key={project.id}
                size={{ xs: 12, sm: 6, md: 4 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              </Grid>
            ))}
        </Grid>
      </Container>
    </Box>
  );
}
