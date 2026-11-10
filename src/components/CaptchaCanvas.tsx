import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { renderCaptchaOnCanvas } from '../utils/captchaGenerator';

interface CaptchaCanvasProps {
  captchaText: string;
  onRefresh: () => void;
}

export const CaptchaCanvas: React.FC<CaptchaCanvasProps> = ({ captchaText, onRefresh }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      renderCaptchaOnCanvas(canvasRef.current, captchaText);
    }
  }, [captchaText]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        mb: '18px',
      }}
    >
      <Box
        component="canvas"
        ref={canvasRef}
        width={190}
        height={60}
        sx={{
          width: '190px',
          height: '60px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f8f8f8',
          display: 'block',
        }}
        aria-label="CAPTCHA verification code"
      />

      <Box
        component="button"
        type="button"
        onClick={onRefresh}
        title="Generate a new CAPTCHA"
        aria-label="Generate a new CAPTCHA"
        sx={{
          width: '46px',
          height: '46px',
          border: 'none',
          borderRadius: '8px',
          backgroundColor: '#003876',
          color: '#ffffff',
          fontSize: '1.35rem',
          lineHeight: 1,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background-color 0.15s ease',
          '&:hover': {
            backgroundColor: '#002957',
          },
        }}
      >
        &#8635;
      </Box>
    </Box>
  );
};
