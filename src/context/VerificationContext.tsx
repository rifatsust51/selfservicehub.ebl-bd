import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DocumentDetails, VerificationState } from '../types/verification';
import { documentDatabase, DEFAULT_QR_TOKEN, primaryDocument } from '../data/mockDocuments';

interface VerificationContextType {
  qrToken: string;
  state: VerificationState;
  document: DocumentDetails | null;
  errorMessage: string | null;
  verifyCaptcha: (userAnswer: string, expectedAnswer: string) => boolean;
  resetVerification: () => void;
}

const VerificationContext = createContext<VerificationContextType | undefined>(undefined);

// Helper to reliably extract the token from React Router or directly from window.location
export const extractQrToken = (searchParams?: URLSearchParams): string => {
  if (searchParams) {
    const t = searchParams.get('qr');
    if (t) return t.trim().toUpperCase();
  }

  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get('qr');
    if (urlToken) return urlToken.trim().toUpperCase();

    // Check hash for #qr=... or #/...?qr=...
    if (window.location.hash) {
      const hashQuery = window.location.hash.split('?')[1];
      if (hashQuery) {
        const hashParams = new URLSearchParams(hashQuery);
        const hashToken = hashParams.get('qr');
        if (hashToken) return hashToken.trim().toUpperCase();
      }
    }
  }

  return DEFAULT_QR_TOKEN;
};

export const VerificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchParams] = useSearchParams();
  const [qrToken, setQrToken] = useState<string>(() => extractQrToken(searchParams));
  const [state, setState] = useState<VerificationState>('idle');
  const [document, setDocument] = useState<DocumentDetails | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const token = extractQrToken(searchParams);
    setQrToken(token);
  }, [searchParams]);

  const verifyCaptcha = (userAnswer: string, expectedAnswer: string): boolean => {
    const cleanUser = userAnswer.trim().toUpperCase();
    const cleanExpected = expectedAnswer.trim().toUpperCase();

    if (!cleanUser) {
      setErrorMessage('Please enter the CAPTCHA characters.');
      return false;
    }

    if (cleanUser !== cleanExpected) {
      setErrorMessage('Invalid CAPTCHA verification code. Please try again.');
      return false;
    }

    setErrorMessage(null);
    setState('verifying');

    // Retrieve active token directly from URL or state
    const currentToken = extractQrToken(searchParams) || qrToken;
    const doc = documentDatabase[currentToken] || primaryDocument;

    setDocument(doc);
    setState('verified');
    return true;
  };

  const resetVerification = () => {
    setState('idle');
    setErrorMessage(null);
  };

  return (
    <VerificationContext.Provider
      value={{
        qrToken,
        state,
        document,
        errorMessage,
        verifyCaptcha,
        resetVerification,
      }}
    >
      {children}
    </VerificationContext.Provider>
  );
};

export const useVerification = (): VerificationContextType => {
  const ctx = useContext(VerificationContext);
  if (!ctx) {
    throw new Error('useVerification must be used within a VerificationProvider');
  }
  return ctx;
};
