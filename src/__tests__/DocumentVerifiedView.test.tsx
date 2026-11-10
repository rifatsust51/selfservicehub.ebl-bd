import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../styles/theme';
import { VerificationProvider } from '../context/VerificationContext';
import { DocumentVerifiedView } from '../components/DocumentVerifiedView';
import { primaryDocument } from '../data/mockDocuments';

const renderComponent = () => {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <VerificationProvider>
          <DocumentVerifiedView document={primaryDocument} />
        </VerificationProvider>
      </MemoryRouter>
    </ThemeProvider>
  );
};

describe('DocumentVerifiedView Component', () => {
  it('renders "Document Verified" heading and authenticity message', () => {
    renderComponent();
    expect(screen.getByText('Document Verified')).toBeInTheDocument();
    expect(
      screen.getByText('Verified Authentic by Eastern Bank PLC.')
    ).toBeInTheDocument();
  });

  it('renders all official document details exactly matching bank portal', () => {
    renderComponent();
    expect(screen.getByText('CUSTOMER NAME')).toBeInTheDocument();
    expect(screen.getByText('MD. SHAFIQUL HAQUE')).toBeInTheDocument();

    expect(screen.getByText('ACCOUNT NO')).toBeInTheDocument();
    expect(screen.getByText('1331440025228')).toBeInTheDocument();

    expect(screen.getByText('DOCUMENT TYPE')).toBeInTheDocument();
    expect(screen.getByText('CASA Statement')).toBeInTheDocument();

    expect(screen.getByText('ISSUE DATE')).toBeInTheDocument();
    expect(screen.getByText('29-OCT-2026 02:39 PM')).toBeInTheDocument();

    expect(screen.getByText('CLOSING BALANCE')).toBeInTheDocument();
    expect(screen.getByText('439.82')).toBeInTheDocument();
  });
});
