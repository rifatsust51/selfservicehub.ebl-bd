import React from 'react';
import { Box, Typography } from '@mui/material';
import { DocumentDetails } from '../types/verification';

interface DocumentVerifiedViewProps {
  document: DocumentDetails;
}

export const DocumentVerifiedView: React.FC<DocumentVerifiedViewProps> = ({ document }) => {
  const details = [
    { label: 'CUSTOMER NAME', value: document.customerName },
    { label: 'ACCOUNT NO', value: document.accountNo },
    { label: 'DOCUMENT TYPE', value: document.documentType },
    { label: 'ISSUE DATE', value: document.issueDate },
    { label: 'CLOSING BALANCE', value: document.closingBalance },
  ];

  return (
    <Box
      sx={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
        padding: { xs: '36px 20px 32px', sm: '40px 40px 36px' },
        width: '100%',
        maxWidth: '560px',
        margin: '0 auto',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* ── Status result ── */}
      <Box sx={{ textAlign: 'center', pt: '8px', pb: '24px' }}>
        <Box
          sx={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#e6f9ef',
            color: '#1a8a4a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 18px',
          }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </Box>

        <Typography
          component="div"
          sx={{
            fontSize: '1.35rem',
            fontWeight: 700,
            color: '#1a8a4a',
            mb: '6px',
          }}
        >
          Document Verified
        </Typography>

        <Typography
          component="div"
          sx={{
            fontSize: '0.84rem',
            color: '#888888',
          }}
        >
          Verified Authentic by Eastern Bank PLC.
        </Typography>
      </Box>

      {/* ── Divider ── */}
      <Box
        component="hr"
        sx={{
          border: 'none',
          borderTop: '1px solid #eeeeee',
          margin: { xs: '0 -20px', sm: '0 -40px' },
        }}
      />

      {/* ── Detail rows ── */}
      <Box sx={{ pt: '4px' }}>
        {details.map((item, index) => (
          <Box
            key={item.label}
            sx={{
              display: 'flex',
              alignItems: 'center',
              py: '13px',
              borderBottom: index === details.length - 1 ? 'none' : '1px solid #f2f2f2',
            }}
          >
            <Typography
              component="div"
              sx={{
                flex: { xs: '0 0 44%', sm: '0 0 44%' },
                fontSize: '0.78rem',
                color: '#999999',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontWeight: 600,
              }}
            >
              {item.label}
            </Typography>
            <Typography
              component="div"
              sx={{
                flex: 1,
                fontSize: '0.9rem',
                color: '#222222',
                fontWeight: 500,
              }}
            >
              {item.value}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
