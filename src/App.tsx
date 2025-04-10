import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import from shared components
import { Navbar, Footer } from './shared/components';
import SystemsHome from './shared/components/SystemsHome';
import HelpButton from './components/HelpButton'; // Will migrate later

// Import Traffic Light System components
import TrafficLightLayout from './systems/traffic-light/components/TrafficLightLayout';
import { TrafficLightZones } from './systems/traffic-light/components';
import Settings from './systems/traffic-light/components/settings/Settings';
import FrontrunSuburbs from './systems/traffic-light/components/FrontrunSuburbs';

// Import Portfolio Management System components
import PortfolioLayout from './systems/portfolio/components/PortfolioLayout';
import PortfolioDashboard from './systems/portfolio/components/PortfolioDashboard';
import { Pipeline } from './systems/portfolio/components';
import FinancialModeling from './components/FinancialModeling'; // Will migrate later
import { FundParameters } from './systems/traffic-light/components';

// Import Underwriting System components
import UnderwritingLayout from './systems/underwriting/components/UnderwritingLayout';
import UnderwritingDashboard from './systems/underwriting/components/UnderwritingDashboard';
import { AssetReport } from './systems/underwriting/components';

// Import remaining components (to be migrated or removed later)
import WelcomeScreen from './components/WelcomeScreen';
import ConfidentialityScreen from './components/ConfidentialityScreen';

const App: React.FC = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <Navbar />
        <main className="py-6">
          <Routes>
            {/* Authentication Routes */}
            <Route path="/login" element={<ConfidentialityScreen />} />
            <Route path="/welcome" element={<WelcomeScreen />} />

            {/* Home Route */}
            <Route path="/" element={<SystemsHome />} />

            {/* Traffic Light System Routes */}
            <Route path="/traffic-light" element={<TrafficLightLayout />}>
              <Route index element={<TrafficLightZones />} />
              <Route path="forecasting" element={<FrontrunSuburbs />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Portfolio Management System Routes */}
            <Route path="/portfolio" element={<PortfolioLayout />}>
              <Route index element={<PortfolioDashboard />} />
              <Route path="pipeline" element={<Pipeline />} />
              <Route path="deals" element={<div className="p-4">Deal Management</div>} />
              <Route path="analytics" element={<FinancialModeling />} />
              <Route path="fund-parameters" element={<FundParameters />} />
              <Route path="settings" element={<div className="p-4">Portfolio System Settings</div>} />
            </Route>

            {/* Underwriting System Routes */}
            <Route path="/underwriting" element={<UnderwritingLayout />}>
              <Route index element={<UnderwritingDashboard />} />
              <Route path="applications" element={<div className="p-4">Loan Applications</div>} />
              <Route path="modeling" element={<div className="p-4">Financial Modeling</div>} />
              <Route path="analytics" element={<AssetReport />} />
              <Route path="settings" element={<div className="p-4">Underwriting System Settings</div>} />
            </Route>

            {/* Redirect legacy routes */}
            <Route path="/cio" element={<Navigate to="/traffic-light" replace />} />
            <Route path="/pipeline" element={<Navigate to="/portfolio/pipeline" replace />} />
            <Route path="/model" element={<Navigate to="/portfolio/analytics" replace />} />
            <Route path="/report" element={<Navigate to="/portfolio" replace />} />
            <Route path="/underwrite" element={<Navigate to="/underwriting" replace />} />
            <Route path="/asset-report" element={<Navigate to="/underwriting/analytics" replace />} />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <HelpButton />
    </>
  );
};

export default App;