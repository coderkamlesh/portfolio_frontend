import styled from "@emotion/styled";
import { Card } from "@mui/material";


export const SkillCard = styled(Card)(() => ({
  background: '#1f242e',
  border: '1px solid #2a303c',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'visible',
  '&:hover': {
    borderColor: '#f59e0b',
    boxShadow: '0 10px 30px rgba(245, 158, 11, 0.1)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '2px',
    background: 'linear-gradient(90deg, #f59e0b, #ec4899)',
    transform: 'scaleX(0)',
    transition: 'transform 0.3s ease',
  },
  '&:hover::before': {
    transform: 'scaleX(1)',
  },
}));