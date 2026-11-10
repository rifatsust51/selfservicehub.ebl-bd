import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Alert,
  Fade,
} from '@mui/material';
import { CaptchaCanvas } from './CaptchaCanvas';
import { generateCaptchaText } from '../utils/captchaGenerator';
import { useVerification } from '../context/VerificationContext';

export const HumanVerificationForm: React.FC = () => {
  const { verifyCaptcha, errorMessage } = useVerification();
  const [captchaText, setCaptchaText] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const refreshCaptcha = () => {
    const newText = generateCaptchaText(5);
    setCaptchaText(newText);
    setInputValue('');
  };

  useEffect(() => {
    refreshCaptcha();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const success = verifyCaptcha(inputValue, captchaText);
    if (!success) {
      // Refresh CAPTCHA upon failed verification attempt like real banks
      refreshCaptcha();
    }
    setSubmitting(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
        padding: { xs: '32px 20px 28px', sm: '40px 40px 36px' },
        width: '100%',
        maxWidth: '560px',
        margin: '0 auto',
        textAlign: 'center',
        boxSizing: 'border-box',
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: '#111111',
          mb: '8px',
          lineHeight: 1.3,
        }}
      >
        Human Verification
      </Typography>

      <Typography
        variant="body2"
        sx={{
          fontSize: '0.88rem',
          color: '#666666',
          mb: '28px',
          lineHeight: 1.5,
        }}
      >
        Enter the characters shown below before verifying document information.
      </Typography>

      {errorMessage && (
        <Fade in={Boolean(errorMessage)}>
          <Alert
            severity="error"
            sx={{
              backgroundColor: '#fdecea',
              color: '#c0392b',
              borderRadius: '8px',
              fontSize: '0.85rem',
              mb: '20px',
              textAlign: 'left',
              '& .MuiAlert-icon': {
                color: '#c0392b',
              },
            }}
          >
            {errorMessage}
          </Alert>
        </Fade>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <CaptchaCanvas captchaText={captchaText} onRefresh={refreshCaptcha} />

        <Box sx={{ mb: '16px' }}>
          <Box
            component="input"
            type="text"
            name="captcha_answer"
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value.toUpperCase())
            }
            maxLength={5}
            required
            autoComplete="off"
            placeholder="ENTER CAPTCHA"
            aria-label="Enter CAPTCHA"
            sx={{
              width: '100%',
              border: '1.5px solid #ddd',
              borderRadius: '8px',
              padding: '14px 16px',
              fontSize: '1rem',
              fontWeight: 600,
              textAlign: 'center',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              outline: 'none',
              backgroundColor: '#fafafa',
              boxSizing: 'border-box',
              transition: 'border-color 0.2s, background-color 0.2s',
              '&:focus': {
                borderColor: '#003876',
                backgroundColor: '#ffffff',
                boxShadow: '0 0 0 3px rgba(0, 56, 118, 0.12)',
              },
            }}
          />
        </Box>

        <Button
          type="submit"
          fullWidth
          disabled={submitting || inputValue.length === 0}
          sx={{
            padding: '14px',
            backgroundColor: '#F5C518',
            color: '#111111',
            fontSize: '0.95rem',
            fontWeight: 700,
            borderRadius: '8px',
            transition: 'background-color 0.15s ease',
            '&:hover': {
              backgroundColor: '#e6b800',
            },
            '&.Mui-disabled': {
              backgroundColor: '#fae48c',
              color: '#777777',
            },
          }}
        >
          Verify Document
        </Button>
      </Box>
    </Box>
  );
};
