import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import InvestmentGrid from './components/InvestmentGrid';
import DealAnalysis from './components/DealAnalysis';
import FundDashboard from './components/FundDashboard';
import { CIODashboard } from './components/cio';
import UnderwriteDemo from './components/UnderwriteDemo';
import WelcomeScreen from './components/WelcomeScreen';
import ConfidentialityScreen from './components/ConfidentialityScreen';
import HelpButton from './components/HelpButton';
import AssetReportButton from './components/AssetReportButton';
import AssetReport from './components/AssetReport';
import Pipeline from './components/Pipeline';
import FinancialModeling from './components/FinancialModeling';
import PropTrackDemo from './components/PropTrackDemo';
import GuidedDemo from './components/GuidedDemo';

const App: React.FC = () => {
  const location = useLocation();
  const isGuidedTour = location.pathname === '/guided-demo';

  return (
    <>
      <Routes>
        <Route path="/" element={<ConfidentialityScreen />} />
        <Route path="/welcome" element={<WelcomeScreen />} />
        <Route path="/asset-report" element={<AssetReport />} />
        <Route path="/proptrack" element={<PropTrackDemo />} />
        <Route path="/guided-demo" element={<GuidedDemo />} />
        <Route
          path="/*"
          element={
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
              <Navbar />
              <main className="py-12">
                <Routes>
                  <Route path="/cio" element={<CIODashboard />} />
                  <Route path="/underwrite" element={<UnderwriteDemo />} />
                  <Route path="/pipeline" element={<Pipeline />} />
                  <Route path="/model" element={<FinancialModeling />} />
                  <Route path="/report" element={<FundDashboard />} />
                  <Route path="/loans" element={<InvestmentGrid />} />
                  <Route path="/deal/:id" element={<DealAnalysis />} />
                  <Route path="*" element={<Navigate to="/cio" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
      <HelpButton />
      {!isGuidedTour && <AssetReportButton />}
    </>
  );
};

export default App;