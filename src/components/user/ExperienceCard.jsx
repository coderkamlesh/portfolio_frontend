import { Avatar, Box, Chip, Paper, Typography } from "@mui/material";

export default function ExperienceCard({ exp }) {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
      }}
    >
      <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
        <Avatar
          src={exp.logo}
          alt={exp.company}
          sx={{ width: 48, height: 48 }}
        />

        <Box>
          <Typography variant="h6" fontWeight={700}>
            {exp.position}
          </Typography>

          <Typography color="primary" fontWeight={600}>
            {exp.company}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
        <Chip label={exp.duration} size="small" />
        <Chip label={exp.location} size="small" />
      </Box>

      <Typography color="text.secondary" lineHeight={1.7}>
        {exp.description}
      </Typography>
    </Paper>
  );
}
