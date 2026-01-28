import styled from "@emotion/styled";
import { Typography } from "@mui/material";

export const GradientText = styled(Typography)(() => ({
  background: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 50%, #8b5cf6 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  display: 'inline-block',
}));