import styled from "@emotion/styled";
import { Card } from "@mui/material";

export const ProjectCard = styled(Card)(() => ({
  background: '#1f242e',
  border: '1px solid #2a303c',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    borderColor: '#f59e0b',
    boxShadow: '0 20px 60px rgba(245, 158, 11, 0.15)',
  },
}));