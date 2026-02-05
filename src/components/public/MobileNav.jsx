import { Box, Drawer, IconButton, List, ListItemButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "motion/react";

const navItems = [
    { label: "Home", id: "hero" },
    { label: "Skills", id: "skills" },
    { label: "Experience", id: "experience" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
];

export default function MobileNav({ open, onClose, onNavigate, active }) {

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{ width: 280, p: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
                    <Typography variant="h6" fontWeight={700}>
                        Menu
                    </Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <List>
                    {navItems.map((item, i) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <ListItemButton
                                onClick={() => {
                                    onNavigate(item.id);
                                    onClose();
                                }}
                                sx={{
                                    fontWeight: active === item.id ? 700 : 500,
                                    color: active === item.id ? "primary.main" : "text.primary",
                                }}
                            >
                                {item.label}
                            </ListItemButton>

                        </motion.div>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
}
