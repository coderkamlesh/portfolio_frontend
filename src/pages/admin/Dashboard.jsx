import {
  Box,
  Card,
  CardContent,
  Typography,
  Paper,
  LinearProgress,
  Chip,
  alpha,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid"; // Updated to Grid2
import {
  TrendingUp,
  Work,
  Code,
  Email,
  Visibility,
  Article,
} from "@mui/icons-material";

// Data objects me color keys use karenge bajaye hex codes ke
const statsCards = [
  {
    title: "Total Projects",
    value: "12",
    change: "+3",
    icon: <Work />,
    colorKey: "primary", // Theme palette key
  },
  {
    title: "Skills",
    value: "24",
    change: "+5",
    icon: <Code />,
    colorKey: "secondary",
  },
  {
    title: "Messages",
    value: "48",
    change: "+12",
    icon: <Email />,
    colorKey: "info",
  },
  {
    title: "Page Views",
    value: "2.4K",
    change: "+18%",
    icon: <Visibility />,
    colorKey: "success",
  },
];

const recentActivity = [
  {
    title: "New project added",
    description: "E-commerce Dashboard",
    time: "2 hours ago",
    status: "success",
  },
  {
    title: "Message received",
    description: "From john@example.com",
    time: "4 hours ago",
    status: "info",
  },
  {
    title: "Skill updated",
    description: "React 18 proficiency",
    time: "1 day ago",
    status: "warning",
  },
  {
    title: "Blog post published",
    description: "Getting started with Next.js",
    time: "2 days ago",
    status: "success",
  },
];

const skills = [
  { name: "React", level: 90 },
  { name: "JavaScript", level: 95 },
  { name: "TypeScript", level: 85 },
  { name: "Node.js", level: 80 },
  { name: "MongoDB", level: 75 },
];

export default function Dashboard() {
  const theme = useTheme();

  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: "text.primary",
            mb: 1,
          }}
        >
          Dashboard Overview
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Monitor your portfolio performance and manage content
        </Typography>
      </Box>

      {/* Stats Cards Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsCards.map((stat, index) => {
          // Dynamic colors create karne ke liye
          const mainColor = theme.palette[stat.colorKey].main;
          const bgColor = alpha(mainColor, 0.1);

          return (
            <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={index}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "divider",
                  height: "100%",
                  bgcolor: "background.paper", // Theme background
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    // Subtle shadow for dark mode compatibility
                    boxShadow: (theme) => 
                      theme.palette.mode === 'dark' 
                        ? "0 8px 24px rgba(0,0,0,0.5)" 
                        : "0 8px 24px rgba(0,0,0,0.12)",
                    borderColor: mainColor, // Border highlight on hover
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 2,
                    }}
                  >
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", mb: 1 }}
                      >
                        {stat.title}
                      </Typography>
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: 700, color: "text.primary" }}
                      >
                        {stat.value}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        bgcolor: bgColor, // Dynamic alpha background
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: mainColor,
                      }}
                    >
                      {stat.icon}
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Chip
                      label={stat.change}
                      size="small"
                      icon={<TrendingUp sx={{ fontSize: 16 }} />}
                      sx={{
                        bgcolor: alpha(theme.palette.success.main, 0.1),
                        color: "success.main",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                        "& .MuiChip-icon": { color: "success.main" },
                      }}
                    />
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      vs last month
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Two Column Layout */}
      <Grid container spacing={3}>
        {/* Recent Activity */}
        <Grid size={{ xs: 12, lg: 7 }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              p: 3,
              bgcolor: "background.paper",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, color: "text.primary" }}>
                Recent Activity
              </Typography>
              <Article sx={{ color: "text.secondary" }} />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {recentActivity.map((activity, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    // Use action.hover for subtle background distinction
                    bgcolor: "action.hover", 
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: "action.selected",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      // Use theme palette colors directly
                      bgcolor: `${activity.status}.main`,
                      mt: 1,
                      flexShrink: 0,
                    }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, mb: 0.5, color: "text.primary" }}
                    >
                      {activity.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary", display: "block", mb: 0.5 }}
                    >
                      {activity.description}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.disabled" }}>
                      {activity.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Skills Progress */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              p: 3,
              bgcolor: "background.paper",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, color: "text.primary" }}>
                Top Skills
              </Typography>
              <Code sx={{ color: "text.secondary" }} />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {skills.map((skill, index) => (
                <Box key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 500, color: "text.primary" }}>
                      {skill.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, color: "primary.main" }}
                    >
                      {skill.level}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={skill.level}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      // Track color matches theme
                      bgcolor: "action.hover", 
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 4,
                        // Gradient using theme colors
                        background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      },
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}