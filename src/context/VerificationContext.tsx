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

export const VerificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchParams] = useSearchParams();
  const initialToken = searchParams.get('qr') || DEFAULT_QR_TOKEN;

  const [qrToken, setQrToken] = useState<string>(initialToken);
  const [state, setState] = useState<VerificationState>('idle');
  const [document, setDocument] = useState<DocumentDetails | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const urlToken = searchParams.get('qr');
    if (urlToken) {
      setQrToken(urlToken);
    }
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

    const doc = documentDatabase[qrToken] || primaryDocument;
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
