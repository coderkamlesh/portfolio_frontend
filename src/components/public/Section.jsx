import { Box } from "@mui/material";

export default function Section({ id, children }) {
  return (
    <Box
      id={id}
      sx={{
        scrollMarginTop: "80px", // navbar offset
      }}
    >
      {children}
    </Box>
  );
}
