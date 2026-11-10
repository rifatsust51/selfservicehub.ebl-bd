import React from 'react';
import { Box, Typography } from '@mui/material';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        fontFamily: "'Segoe UI', Arial, sans-serif",
        backgroundColor: '#f0f0f0',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        color: '#222222',
      }}
    >
      {/* ── Top bar ── */}
      <Box
        component="header"
        sx={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #e0e0e0',
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: '24px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        }}
      >
        {/* Left logo: EBL main logo */}
        <Box
          component="a"
          href="/ebl-cert-portal-flat/verify.php"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Box
            component="img"
            src="/ebl-logo-left.png"
            alt="Eastern Bank PLC"
            sx={{
              height: { xs: '38px', sm: '48px' },
              width: 'auto',
              display: 'block',
            }}
          />
        </Box>

        {/* Right logo: EBL Self Service */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            component="img"
            src="/ebl-logo-right.png"
            alt="EBL Self Service"
            sx={{
              height: { xs: '44px', sm: '57px' },
              width: 'auto',
              display: 'block',
            }}
          />
        </Box>
      </Box>

      {/* ── Gold accent line ── */}
      <Box
        sx={{
          height: '4px',
          backgroundColor: '#F5C518',
          width: '100%',
        }}
      />

      {/* ── Page body ── */}
      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: { xs: '28px 16px 40px', sm: '48px 16px 60px' },
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: '560px' }}>{children}</Box>
      </Box>

      {/* ── Footer bar ── */}
      <Box
        component="footer"
        sx={{
          backgroundColor: '#F5C518',
          color: '#003876',
          textAlign: 'center',
          fontSize: '0.78rem',
          fontWeight: 600,
          padding: '14px',
          letterSpacing: '0.3px',
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontWeight: 600,
            fontSize: '0.78rem',
            letterSpacing: '0.3px',
          }}
        >
          &copy; 2026 Eastern Bank PLC. &mdash; All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};
