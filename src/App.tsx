import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import InvestmentGrid from './components/InvestmentGrid';
import DealAnalysis from './components/DealAnalysis';
import FundDashboard from './components/FundDashboard';
import CIODashboard from './components/cio/CIODashboard';
import UnderwriteDemo from './components/UnderwriteDemo';
import WelcomeScreen from './components/WelcomeScreen';
import ConfidentialityScreen from './components/ConfidentialityScreen';
import HelpButton from './components/HelpButton';
import AssetReportButton from './components/AssetReportButton';
import AssetReport from './components/AssetReport';
import Pipeline from './components/Pipeline';
import TabInfo from './components/TabInfo';
import FinancialModeling from './components/FinancialModeling';
import PropTrackDemo from './components/PropTrackDemo';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ConfidentialityScreen />} />
        <Route path="/welcome" element={<WelcomeScreen />} />
        <Route path="/asset-report" element={<AssetReport />} />
        <Route path="/proptrack" element={<PropTrackDemo />} />
        <Route
          path="/*"
          element={
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
              <Navbar />
              <TabInfo />
              <main className="py-12">
                <Routes>
                  <Route path="/deals" element={<InvestmentGrid />} />
                  <Route path="/deal/:id" element={<DealAnalysis />} />
                  <Route path="/fund-dashboard" element={<FundDashboard />} />
                  <Route path="/cio-dashboard" element={<CIODashboard />} />
                  <Route path="/underwrite" element={<UnderwriteDemo />} />
                  <Route path="/pipeline" element={<Pipeline />} />
                  <Route path="/financial-modeling" element={<FinancialModeling />} />
                  <Route path="*" element={<Navigate to="/deals" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
      <HelpButton />
      <AssetReportButton />
    </>
  );
};

export default App;