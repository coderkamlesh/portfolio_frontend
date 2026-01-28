import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Badge,
  Tooltip,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

export default function Navbar({ drawerWidth, onDrawerToggle, isMobile }) {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/admin");
    handleMenuClose();
  };

  const handleProfileClick = () => {
    navigate("/admin/profile");
    handleMenuClose();
  };

  const handleSettingsClick = () => {
    navigate("/admin/settings");
    handleMenuClose();
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
        bgcolor: "white",
        borderBottom: "1px solid",
        borderColor: "divider",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          minHeight: { xs: 56, sm: 64 },
        }}
      >
        {/* Left Section - Menu Icon + Page Title */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {isMobile && (
            <IconButton
              edge="start"
              onClick={onDrawerToggle}
              sx={{
                color: "text.primary",
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            sx={{
              color: "text.primary",
              fontWeight: 600,
              display: { xs: "none", sm: "block" },
            }}
          >
            Welcome back, {user?.name || "Admin"}!
          </Typography>
        </Box>

        {/* Right Section - Actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton sx={{ color: "text.secondary" }}>
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Settings */}
          <Tooltip title="Settings">
            <IconButton
              onClick={handleSettingsClick}
              sx={{ color: "text.secondary" }}
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>

          {/* User Menu */}
          <Tooltip title="Account">
            <IconButton onClick={handleMenuOpen} sx={{ ml: 1 }}>
              <Avatar
                sx={{
                  width: 38,
                  height: 38,
                  bgcolor: "primary.main",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                {user?.name?.charAt(0) || "A"}
              </Avatar>
            </IconButton>
          </Tooltip>

          {/* User Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            slotProps={{
              paper: {
                elevation: 3,
                sx: {
                  mt: 1.5,
                  minWidth: 200,
                  borderRadius: 2,
                  "& .MuiMenuItem-root": {
                    px: 2,
                    py: 1.5,
                    borderRadius: 1,
                    mx: 1,
                    my: 0.5,
                  },
                },
              },
            }}
          >
            {/* User Info */}
            <Box sx={{ px: 2, py: 1.5, mb: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {user?.name || "Admin User"}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", fontSize: "0.85rem" }}
              >
                {user?.email || "admin@portfolio.com"}
              </Typography>
            </Box>

            <Divider sx={{ my: 0.5 }} />

            {/* Menu Items */}
            <MenuItem onClick={handleProfileClick}>
              <PersonIcon sx={{ mr: 1.5, fontSize: 20 }} />
              Profile
            </MenuItem>
            <MenuItem onClick={handleSettingsClick}>
              <SettingsIcon sx={{ mr: 1.5, fontSize: 20 }} />
              Settings
            </MenuItem>

            <Divider sx={{ my: 0.5 }} />

            <MenuItem
              onClick={handleLogout}
              sx={{
                color: "error.main",
                "&:hover": {
                  bgcolor: "error.lighter",
                },
              }}
            >
              <LogoutIcon sx={{ mr: 1.5, fontSize: 20 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}