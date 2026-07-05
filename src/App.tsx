import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { PrivacyProvider } from './context/PrivacyContext';
import { Layout } from './components/Layout';
import { Welcome } from './pages/Welcome';
import { Consent } from './pages/Consent';
import { PrivacyCenter } from './pages/PrivacyCenter';
import { PrivacySummary } from './pages/PrivacySummary';
import { ChildVerification } from './pages/ChildVerification';
import { MyData } from './pages/MyData';
import { DeleteConfirm } from './pages/DeleteConfirm';
import { Success } from './pages/Success';
import { PMDashboard } from './pages/PMDashboard';

// Page animation wrapper for smooth transitions
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="w-full flex-1 flex flex-col justify-center"
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <Welcome />
            </PageWrapper>
          }
        />
        <Route
          path="/consent"
          element={
            <PageWrapper>
              <Consent />
            </PageWrapper>
          }
        />
        <Route
          path="/child-verification"
          element={
            <PageWrapper>
              <ChildVerification />
            </PageWrapper>
          }
        />
        <Route
          path="/privacy-center"
          element={
            <PageWrapper>
              <PrivacyCenter />
            </PageWrapper>
          }
        />
        <Route
          path="/privacy-summary"
          element={
            <PageWrapper>
              <PrivacySummary />
            </PageWrapper>
          }
        />
        <Route
          path="/my-data"
          element={
            <PageWrapper>
              <MyData />
            </PageWrapper>
          }
        />
        <Route
          path="/delete-confirm/:type"
          element={
            <PageWrapper>
              <DeleteConfirm />
            </PageWrapper>
          }
        />
        <Route
          path="/success"
          element={
            <PageWrapper>
              <Success />
            </PageWrapper>
          }
        />
        <Route
          path="/pm-dashboard"
          element={
            <PageWrapper>
              <PMDashboard />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <PrivacyProvider>
      <Router>
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </Router>
    </PrivacyProvider>
  );
}

export default App;
