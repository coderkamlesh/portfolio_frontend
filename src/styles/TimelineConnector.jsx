import styled from "@emotion/styled";
import { Box } from "@mui/material";



export const TimelineConnector = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '2px',
  height: '100%',
  background: 'linear-gradient(180deg, #f59e0b, #ec4899)',
  opacity: 0.3,
  [theme.breakpoints.down('md')]: {
    left: '20px',
  },
}));
