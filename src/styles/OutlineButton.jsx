import styled from "@emotion/styled";
import { Button } from "@mui/material";



export const OutlineButton = styled(Button)(() => ({
  color: '#e6e8eb',
  padding: '12px 32px',
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  border: '2px solid #2a303c',
  transition: 'all 0.3s ease',
  '&:hover': {
    borderColor: '#f59e0b',
    background: 'rgba(245, 158, 11, 0.1)',
  },
}));