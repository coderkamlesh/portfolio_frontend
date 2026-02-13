import {
  Box,
  Button,
  CardContent,
  Chip,
  Typography,
  IconButton,
} from "@mui/material";
import {
  Code as CodeIcon,
  Launch as LaunchIcon,
  GitHub as GitHubIcon
} from "@mui/icons-material";
import { motion } from "motion/react";

export default function ProjectCard({ project }) {
  const hasRepo = project.repo_link && project.repo_link !== "NA";
  const hasLive = project.live_link && project.live_link !== "NA";

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      style={{ height: "100%" }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 4,
          backgroundColor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.3s ease",
          "&:hover": {
            borderColor: "primary.main",
            boxShadow: (theme) => `0 20px 40px ${theme.palette.primary.main}11`,
            "& .project-icon": {
              color: "primary.main",
              transform: "scale(1.1) rotate(-5deg)",
            }
          },
          // Subtle top accent
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "4px",
            background: (theme) => `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            opacity: 0,
            transition: "opacity 0.3s ease",
          },
          "&:hover::before": {
            opacity: 1,
          }
        }}
      >
        <CardContent sx={{ p: 4, flexGrow: 1, display: "flex", flexDirection: "column" }}>
          {/* Header Icon & Title */}
          <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 3 }}>
            <Box
              className="project-icon"
              sx={{
                p: 1.5,
                borderRadius: 2,
                bgcolor: "rgba(245, 158, 11, 0.05)",
                color: "text.secondary",
                transition: "all 0.3s ease",
                display: "flex"
              }}
            >
              <CodeIcon sx={{ fontSize: 28 }} />
            </Box>

            <Box sx={{ display: "flex", gap: 1 }}>
              {hasRepo && (
                <IconButton
                  size="small"
                  component="a"
                  href={project.repo_link}
                  target="_blank"
                  sx={{ color: "text.secondary", "&:hover": { color: "primary.main" } }}
                >
                  <GitHubIcon fontSize="small" />
                </IconButton>
              )}
              {hasLive && (
                <IconButton
                  size="small"
                  component="a"
                  href={project.live_link}
                  target="_blank"
                  sx={{ color: "text.secondary", "&:hover": { color: "primary.main" } }}
                >
                  <LaunchIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          </Box>

          <Typography variant="h5" fontWeight={800} mb={1.5}>
            {project.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 3,
              lineHeight: 1.8,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {project.description}
          </Typography>

          {/* Tech Stack */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: "auto", pt: 2 }}>
            {project.tech_stack
              .split(",")
              .map((tech) => (
                <Chip
                  key={tech}
                  label={tech.trim()}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    borderColor: "divider",
                    "&:hover": { borderColor: "primary.main", bgcolor: "rgba(245, 158, 11, 0.05)" }
                  }}
                />
              ))}
          </Box>
        </CardContent>
      </Box>
    </motion.div>
  );
}
