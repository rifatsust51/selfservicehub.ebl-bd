import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#F5C518', // EBL signature gold
      contrastText: '#111111',
      dark: '#e6b800',
    },
    secondary: {
      main: '#003876', // EBL corporate navy blue
      contrastText: '#ffffff',
      dark: '#002957',
    },
    background: {
      default: '#f0f0f0',
      paper: '#ffffff',
    },
    success: {
      main: '#1a8a4a',
      light: '#e6f9ef',
    },
    error: {
      main: '#c0392b',
      light: '#fdecea',
    },
    text: {
      primary: '#222222',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: "'Segoe UI', 'Roboto', Arial, sans-serif",
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
  },
});
