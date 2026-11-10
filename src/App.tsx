import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './styles/theme';
import { VerificationProvider } from './context/VerificationContext';
import { AppRoutes } from './routes/AppRoutes';

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <VerificationProvider>
          <AppRoutes />
        </VerificationProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
