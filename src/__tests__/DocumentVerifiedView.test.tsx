import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../styles/theme';
import { VerificationProvider } from '../context/VerificationContext';
import { DocumentVerifiedView } from '../components/DocumentVerifiedView';
import {
  primaryDocument,
  statement1Document,
  statement2Document,
  statement3Document,
} from '../data/mockDocuments';

const renderComponent = (doc = primaryDocument) => {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <VerificationProvider>
          <DocumentVerifiedView document={doc} />
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

  it('renders all official document details for original document', () => {
    renderComponent(primaryDocument);
    expect(screen.getByText('CUSTOMER NAME')).toBeInTheDocument();
    expect(screen.getByText('MD. SHAFIQUL HAQUE')).toBeInTheDocument();
    expect(screen.getByText('ACCOUNT NO')).toBeInTheDocument();
    expect(screen.getByText('1331440025228')).toBeInTheDocument();
    expect(screen.getByText('CLOSING BALANCE')).toBeInTheDocument();
    expect(screen.getByText('439.82')).toBeInTheDocument();
  });

  it('renders Statement 1 with new user name and same amounts', () => {
    renderComponent(statement1Document);
    expect(screen.getByText('MOHAMMAD TANVIR AHMED')).toBeInTheDocument();
    expect(screen.getByText('1331440025228')).toBeInTheDocument();
    expect(screen.getByText('439.82')).toBeInTheDocument();
  });

  it('renders Statement 2 with same user name and changed amounts', () => {
    renderComponent(statement2Document);
    expect(screen.getByText('MD. SHAFIQUL HAQUE')).toBeInTheDocument();
    expect(screen.getByText('58,950.00')).toBeInTheDocument();
  });

  it('renders Statement 3 with changed name and changed amounts', () => {
    renderComponent(statement3Document);
    expect(screen.getByText('SYEDA FARHANA RAHMAN')).toBeInTheDocument();
    expect(screen.getByText('1331890048125')).toBeInTheDocument();
    expect(screen.getByText('1,425,830.50')).toBeInTheDocument();
  });
});

