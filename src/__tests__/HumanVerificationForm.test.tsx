import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../styles/theme';
import { VerificationProvider } from '../context/VerificationContext';
import { HumanVerificationForm } from '../components/HumanVerificationForm';

const renderComponent = () => {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={['/ebl-cert-portal-flat/verify.php?qr=B5B80F8F']}>
        <VerificationProvider>
          <HumanVerificationForm />
        </VerificationProvider>
      </MemoryRouter>
    </ThemeProvider>
  );
};

describe('HumanVerificationForm Component', () => {
  it('renders Human Verification title and instruction', () => {
    renderComponent();
    expect(screen.getByText('Human Verification')).toBeInTheDocument();
    expect(
      screen.getByText('Enter the characters shown below before verifying document information.')
    ).toBeInTheDocument();
  });

  it('renders the CAPTCHA input and submit button', () => {
    renderComponent();
    const input = screen.getByPlaceholderText('ENTER CAPTCHA');
    const button = screen.getByRole('button', { name: /verify document/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled(); // Disabled when input is empty
  });

  it('enables the submit button once user types in the input', () => {
    renderComponent();
    const input = screen.getByPlaceholderText('ENTER CAPTCHA');
    const button = screen.getByRole('button', { name: /verify document/i });

    fireEvent.change(input, { target: { value: 'ABC12' } });
    expect(button).not.toBeDisabled();
  });

  it('shows error message if invalid CAPTCHA is submitted', () => {
    renderComponent();
    const input = screen.getByPlaceholderText('ENTER CAPTCHA');
    const button = screen.getByRole('button', { name: /verify document/i });

    fireEvent.change(input, { target: { value: 'WRONG' } });
    fireEvent.click(button);

    expect(
      screen.getByText(/Invalid CAPTCHA verification code/i)
    ).toBeInTheDocument();
  });
});
