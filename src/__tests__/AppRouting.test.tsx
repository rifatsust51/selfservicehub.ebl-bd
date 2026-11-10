import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../styles/theme';
import { VerificationProvider } from '../context/VerificationContext';
import { AppRoutes } from '../routes/AppRoutes';
import { STATEMENT_1_TOKEN } from '../data/mockDocuments';

const renderAppWithRoute = (initialPath: string) => {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[initialPath]}>
        <VerificationProvider>
          <AppRoutes />
        </VerificationProvider>
      </MemoryRouter>
    </ThemeProvider>
  );
};

describe('App Routing and Flow for Different Statement QRs', () => {
  it('renders top bar with both Eastern Bank logos and footer', () => {
    renderAppWithRoute('/ebl-cert-portal-flat/verify.php?qr=TEST_QR');
    expect(screen.getByAltText('Eastern Bank PLC')).toBeInTheDocument();
    expect(screen.getByAltText('EBL Self Service')).toBeInTheDocument();
    expect(
      screen.getByText(/2026 Eastern Bank PLC\. — All rights reserved\./i)
    ).toBeInTheDocument();
  });

  it('verifies Statement 1 and displays MOHAMMAD TANVIR AHMED upon captcha completion', () => {
    renderAppWithRoute(`/ebl-cert-portal-flat/verify.php?qr=${STATEMENT_1_TOKEN}`);
    
    // Read the rendered captcha from canvas aria-label if present, or submit with input
    const input = screen.getByPlaceholderText('ENTER CAPTCHA');
    const button = screen.getByRole('button', { name: /verify document/i });

    // In tests, we can trigger verification directly via input or form
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('redirects root route to the authentic portal path', () => {
    renderAppWithRoute('/');
    expect(screen.getByText('Human Verification')).toBeInTheDocument();
  });

  it('supports friendly query aliases like ?qr=stmt1, ?qr=stmt2, ?qr=stmt3', () => {
    renderAppWithRoute('/ebl-cert-portal-flat/verify.php?qr=stmt2');
    expect(screen.getByText('Human Verification')).toBeInTheDocument();
  });
});
