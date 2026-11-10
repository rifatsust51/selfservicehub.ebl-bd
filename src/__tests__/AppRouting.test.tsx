import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../styles/theme';
import { VerificationProvider } from '../context/VerificationContext';
import { AppRoutes } from '../routes/AppRoutes';

describe('App Routing and Layout', () => {
  it('renders top bar with both Eastern Bank logos and footer', () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={['/ebl-cert-portal-flat/verify.php?qr=TEST_QR']}>
          <VerificationProvider>
            <AppRoutes />
          </VerificationProvider>
        </MemoryRouter>
      </ThemeProvider>
    );

    // Left logo
    expect(screen.getByAltText('Eastern Bank PLC')).toBeInTheDocument();
    // Right logo
    expect(screen.getByAltText('EBL Self Service')).toBeInTheDocument();
    // Footer copyright
    expect(
      screen.getByText(/2026 Eastern Bank PLC\. — All rights reserved\./i)
    ).toBeInTheDocument();
    // Main verification form
    expect(screen.getByText('Human Verification')).toBeInTheDocument();
  });

  it('redirects root route to the authentic portal path', () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={['/']}>
          <VerificationProvider>
            <AppRoutes />
          </VerificationProvider>
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(screen.getByText('Human Verification')).toBeInTheDocument();
  });
});
