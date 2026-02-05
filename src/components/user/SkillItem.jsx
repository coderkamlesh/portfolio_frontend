import { Box, Typography } from "@mui/material";
import { motion } from "motion/react";

export default function SkillItem({ name, icon }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Box
        sx={{
          p: 2,
          borderRadius: 3,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          backgroundColor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        {icon && (
          <Box
            component="img"
            src={icon}
            alt={name}
            sx={{ width: 28, height: 28 }}
          />
        )}
        <Typography fontWeight={600}>{name}</Typography>
      </Box>
    </motion.div>
  );
}
