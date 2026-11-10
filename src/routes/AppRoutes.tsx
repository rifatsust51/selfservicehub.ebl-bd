import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { VerificationPage } from './VerificationPage';
import { DEFAULT_QR_TOKEN } from '../data/mockDocuments';

const RedirectWithParams: React.FC<{ to: string }> = ({ to }) => {
  const location = useLocation();
  const search = location.search || (typeof window !== 'undefined' ? window.location.search : '') || `?qr=${DEFAULT_QR_TOKEN}`;
  return <Navigate to={`${to}${search}`} replace />;
};

export const AppRoutes: React.FC = () => {
  return (
    <Layout>
      <Routes>
        {/* Exact route matching bank portal URL */}
        <Route path="/ebl-cert-portal-flat/verify.php" element={<VerificationPage />} />
        <Route path="//ebl-cert-portal-flat/verify.php" element={<VerificationPage />} />
        
        {/* Clean URL aliases */}
        <Route path="/ebl-cert-portal-flat/verify" element={<VerificationPage />} />
        <Route path="/verify.php" element={<VerificationPage />} />
        <Route path="/verify" element={<VerificationPage />} />

        {/* Root redirect to the authentic bank URL structure */}
        <Route
          path="/"
          element={<RedirectWithParams to="/ebl-cert-portal-flat/verify.php" />}
        />

        {/* Catch-all route */}
        <Route
          path="*"
          element={<RedirectWithParams to="/ebl-cert-portal-flat/verify.php" />}
        />
      </Routes>
    </Layout>
  );
};
