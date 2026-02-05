import {
  Box,
  Button,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { motion } from "motion/react";

export default function ProjectCard({ project }) {
  const hasRepo = project.repo_link && project.repo_link !== "NA";
  const hasLive = project.live_link && project.live_link !== "NA";

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        sx={{
          height: "100%",
          borderRadius: 3,
          overflow: "hidden",
          backgroundColor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        {/* Image / Placeholder */}
        <Box
          sx={{
            height: 200,
            background: project.image_url
              ? `url(${project.image_url})`
              : "linear-gradient(135deg, #0a0e14, #151921)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={700} mb={1}>
            {project.title}
          </Typography>

          <Typography
            color="text.secondary"
            mb={2}
            lineHeight={1.6}
          >
            {project.description}
          </Typography>

          {/* Tech Stack */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
            {project.tech_stack
              .split(",")
              .map((tech) => (
                <Chip
                  key={tech}
                  label={tech.trim()}
                  size="small"
                />
              ))}
          </Box>

          {/* Actions */}
          <Box sx={{ display: "flex", gap: 2 }}>
            {hasRepo && (
              <Button
                size="small"
                component="a"
                href={project.repo_link}
                target="_blank"
              >
                Repo
              </Button>
            )}

            {hasLive && (
              <Button
                size="small"
                component="a"
                href={project.live_link}
                target="_blank"
              >
                Live
              </Button>
            )}
          </Box>
        </CardContent>
      </Box>
    </motion.div>
  );
}
