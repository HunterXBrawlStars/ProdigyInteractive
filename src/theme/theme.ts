import { createTheme } from '@mui/material';

export const appTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1ce0ff'
    },
    secondary: {
      main: '#8f5bff'
    },
    background: {
      default: '#060713',
      paper: '#0d1120'
    }
  },
  typography: {
    fontFamily: 'Space Grotesk, sans-serif',
    h1: {
      fontFamily: 'Sora, sans-serif',
      letterSpacing: '0.03em'
    },
    h2: {
      fontFamily: 'Sora, sans-serif',
      letterSpacing: '0.02em'
    }
  },
  shape: {
    borderRadius: 18
  }
});
