import { Box, Container, Stack, Typography } from "@mui/material";
import { motion } from "motion/react";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: "1px solid",
        borderColor: "divider",
        py: 4,
        mt: 6,
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} Kamlesh Kumar
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Built with React, MUI & Motion
            </Typography>
          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}
