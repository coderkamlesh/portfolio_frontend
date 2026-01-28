import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const GlowButton = styled(Button)(() => ({
  background: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)',
  color: 'white',
  padding: '12px 32px',
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: '0 10px 30px rgba(245, 158, 11, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 15px 40px rgba(245, 158, 11, 0.5)',
  },
}));