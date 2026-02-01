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
  alpha,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import {
  Dashboard as DashboardIcon,
  Work as WorkIcon,
  Code as CodeIcon,
  Email as EmailIcon,
  Article as ArticleIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { useAuthStore } from "@/store/authStore";

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
  { text: "Skills", icon: <CodeIcon />, path: "/admin/skills" },
  { text: "Experiences", icon: <CodeIcon />, path: "/admin/experiences" },
  { text: "Projects", icon: <WorkIcon />, path: "/admin/projects" },
  // { text: "Contact Messages", icon: <EmailIcon />, path: "/admin/messages" },
  // { text: "Blog Posts", icon: <ArticleIcon />, path: "/admin/blog" },
  // { text: "Settings", icon: <SettingsIcon />, path: "/admin/settings" },
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
        // KOI COLOR NAHI DIYA - MUI Drawer khud handle karega
      }}
    >
      {/* Brand Section */}
      <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          sx={{
            width: 45,
            height: 45,
            bgcolor: "primary.main",
            fontWeight: "bold",
          }}
        >
          {user?.name?.charAt(0) || "A"}
        </Avatar>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Admin Panel
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Portfolio Manager
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* Navigation */}
      <Box sx={{ flexGrow: 1, overflowY: "auto", py: 2 }}>
        <List>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding sx={{ px: 2, mb: 0.5 }}>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  selected={isActive} // MUI ka selected prop use kiya
                  onClick={isMobile ? onDrawerToggle : undefined}
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    // Active state styling thoda custom rakha hai taki wo "purple" feel aaye
                    "&.Mui-selected": {
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.15),
                      color: "primary.main",
                      "&:hover": {
                        bgcolor: (theme) =>
                          alpha(theme.palette.primary.main, 0.25),
                      },
                      "& .MuiListItemIcon-root": {
                        color: "primary.main",
                      },
                      // Left border indicator
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 4,
                        height: "60%",
                        bgcolor: "primary.main",
                        borderRadius: "0 4px 4px 0",
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
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

      {/* Footer */}
      <Box sx={{ p: 2, borderTop: "1px solid", borderColor: "divider" }}>
        <Typography variant="caption" color="text.secondary">
          © {new Date().getFullYear()} Portfolio Admin
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={onDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            borderRight: "1px solid",
            borderColor: "divider",
            // Drawer Paper automatically picks background.paper & text.primary
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}