import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const AnimatedBlob = styled(Box)(({ delay = 0 }) => ({
  position: 'absolute',
  borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
  filter: 'blur(40px)',
  opacity: 0.6,
  animation: `morph 8s ease-in-out infinite`,
  animationDelay: `${delay}s`,
}));