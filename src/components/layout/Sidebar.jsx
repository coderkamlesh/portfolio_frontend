import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Avatar,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Work as WorkIcon,
  Code as CodeIcon,
  Email as EmailIcon,
  Article as ArticleIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { useAuthStore } from "@/store/authStore";

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
  { text: "Profile", icon: <PersonIcon />, path: "/admin/profile" },
  { text: "Projects", icon: <WorkIcon />, path: "/admin/projects" },
  { text: "Skills", icon: <CodeIcon />, path: "/admin/skills" },
  { text: "Contact Messages", icon: <EmailIcon />, path: "/admin/messages" },
  { text: "Blog Posts", icon: <ArticleIcon />, path: "/admin/blog" },
  { text: "Settings", icon: <SettingsIcon />, path: "/admin/settings" },
];

export default function Sidebar({
  drawerWidth,
  mobileOpen,
  onDrawerToggle,
  isMobile,
}) {
  const location = useLocation();
  const { user } = useAuthStore();

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#1a1a2e",
        color: "white",
      }}
    >
      {/* Logo/Brand Section */}
      <Box
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,
          bgcolor: "rgba(0, 0, 0, 0.2)",
        }}
      >
        <Avatar
          sx={{
            width: 45,
            height: 45,
            bgcolor: "#e94560",
            fontWeight: "bold",
            fontSize: "1.2rem",
          }}
        >
          {user?.name?.charAt(0) || "A"}
        </Avatar>
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              letterSpacing: "0.5px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Admin Panel
          </Typography>
          <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
            Portfolio Manager
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

      {/* Navigation Menu */}
      <Box sx={{ flexGrow: 1, overflowY: "auto", py: 2 }}>
        <List>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding sx={{ px: 2, mb: 0.5 }}>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={isMobile ? onDrawerToggle : undefined}
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    bgcolor: isActive
                      ? "rgba(103, 126, 234, 0.15)"
                      : "transparent",
                    color: isActive ? "#667eea" : "rgba(255,255,255,0.8)",
                    "&:hover": {
                      bgcolor: isActive
                        ? "rgba(103, 126, 234, 0.2)"
                        : "rgba(255,255,255,0.05)",
                    },
                    transition: "all 0.3s ease",
                    position: "relative",
                    "&::before": isActive
                      ? {
                          content: '""',
                          position: "absolute",
                          left: 0,
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: 4,
                          height: "60%",
                          bgcolor: "#667eea",
                          borderRadius: "0 4px 4px 0",
                        }
                      : {},
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? "#667eea" : "rgba(255,255,255,0.7)",
                      minWidth: 40,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: "0.95rem",
                      fontWeight: isActive ? 600 : 400,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Footer Section */}
      <Box
        sx={{
          p: 2,
          bgcolor: "rgba(0, 0, 0, 0.2)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)" }}>
          © 2024 Portfolio Admin
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={onDrawerToggle}
          slotProps={{
            modal: {
              keepMounted: true, // Better mobile performance
            },
          }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              border: "none",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Desktop Drawer */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              border: "none",
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
}