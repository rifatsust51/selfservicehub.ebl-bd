import React from 'react';
import { HumanVerificationForm } from '../components/HumanVerificationForm';
import { DocumentVerifiedView } from '../components/DocumentVerifiedView';
import { useVerification } from '../context/VerificationContext';

export const VerificationPage: React.FC = () => {
  const { state, document } = useVerification();

  if (state === 'verified' && document) {
    return <DocumentVerifiedView document={document} />;
  }

  return <HumanVerificationForm />;
};
