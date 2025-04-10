import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Import from shared components
import { Navbar, Footer } from './shared/components';
import HelpButton from './components/HelpButton'; // Will migrate later

// Import from Traffic Light System
import { CIODashboard } from './systems/traffic-light/components';

// Import from Portfolio Management System
import { FundDashboard, Pipeline } from './systems/portfolio/components';
import InvestmentGrid from './components/InvestmentGrid'; // Will migrate later
import DealAnalysis from './components/DealAnalysis'; // Will migrate later
import FinancialModeling from './components/FinancialModeling'; // Will migrate later

// Import from Underwriting System
import { AssetReport } from './systems/underwriting/components';

// Import remaining components (to be migrated or removed later)
import WelcomeScreen from './components/WelcomeScreen';
import ConfidentialityScreen from './components/ConfidentialityScreen';
import DataFeeds from './components/data-feeds/DataFeeds';
import PlatformGuide from './components/platform-guide/PlatformGuide';

const App: React.FC = () => {
  const location = useLocation();
  const isGuidedTour = location.pathname === '/guided-demo';

  return (
    <>
      <Routes>
        <Route path="/" element={<ConfidentialityScreen />} />
        <Route path="/welcome" element={<WelcomeScreen />} />
        <Route path="/asset-report" element={<AssetReport />} />
        <Route
          path="/*"
          element={
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
              <Navbar />
              <main className="py-12">
                <Routes>
                  <Route path="/platform-guide" element={<PlatformGuide />} />

                  {/* Traffic Light System Routes */}
                  <Route path="/cio" element={<CIODashboard />} />

                  {/* Portfolio Management System Routes */}
                  <Route path="/pipeline" element={<Pipeline />} />
                  <Route path="/model" element={<FinancialModeling />} />
                  <Route path="/report" element={<FundDashboard />} />
                  <Route path="/loans" element={<InvestmentGrid />} />
                  <Route path="/deal/:id" element={<DealAnalysis />} />

                  {/* Underwriting System Routes */}
                  <Route path="/underwrite" element={
                    <div className="p-8 text-center">
                      <h2 className="text-2xl font-bold mb-4">Underwriting System</h2>
                      <p className="text-gray-600 mb-8">
                        The Underwriting System is ready for implementation. This placeholder will be replaced with the actual Underwriting System components.
                      </p>
                    </div>
                  } />

                  {/* Other Routes */}
                  <Route path="/data-feeds" element={<DataFeeds />} />
                  <Route path="*" element={<Navigate to="/platform-guide" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />
      </Routes>
      <HelpButton />
    </>
  );
};

export default App;