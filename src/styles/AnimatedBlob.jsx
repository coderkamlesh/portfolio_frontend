import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const AnimatedBlob = styled(Box)(({ theme, delay = 0, color }) => ({
  position: 'absolute',
  width: '280px',
  height: '280px',
  background: color || `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
  filter: 'blur(60px)',
  opacity: 0.4,
  animation: `morph 8s ease-in-out infinite`,
  animationDelay: `${delay}s`,
  zIndex: 1,
}));