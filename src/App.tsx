import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ApiProvider } from './services/api/ApiContext';

// Import from shared components
import { Navbar, Footer } from './shared/components';
import InstitutionalHome from './shared/components/InstitutionalHome';
import HelpButton from './components/HelpButton'; // Will migrate later

// Import Admin components
import {
  AdminLayout,
  UserManagement,
  SystemSettings,
  SecurityCompliance,
  Documentation,
  AuditLogs,
  ApiAccess
} from './systems/admin';

// Import Traffic Light System components
import TrafficLightLayout from './systems/traffic-light/components/TrafficLightLayout';
import { TrafficLightZones } from './systems/traffic-light/components';
import Settings from './systems/traffic-light/components/settings/Settings';
import FrontrunSuburbs from './systems/traffic-light/components/FrontrunSuburbs';

// Import Portfolio Management System components
import PortfolioLayout from './systems/portfolio/components/PortfolioLayout';
import PortfolioDashboardPro from './systems/portfolio/components/PortfolioDashboardPro';
import PortfolioManagement from './systems/portfolio/components/PortfolioManagement';
import Simulation from './systems/portfolio/components/Simulation';
import Analytics from './systems/portfolio/components/Analytics';
import PortfolioSettings from './systems/portfolio/components/Settings';
import FundParameters from './systems/portfolio/components/FundParameters';
import DocumentManagement from './systems/portfolio/components/DocumentManagement';
import StressTest from './systems/portfolio/components/StressTest';
// Removed unused import: StandaloneCalculator
import StandaloneSimulation from './systems/portfolio/components/simulation/StandaloneSimulation';

// Import Underwriting System components
import UnderwritingLayout from './systems/underwriting/components/UnderwritingLayout';
import { UnderwritingSystem } from './systems/underwriting';

// Import remaining components (to be migrated or removed later)
import WelcomeScreen from './components/WelcomeScreen';
import ConfidentialityScreen from './components/ConfidentialityScreen';

const App: React.FC = () => {
  return (
    <ApiProvider>
      <div className="min-h-screen bg-neutral-50">
        <Navbar />
        <main>
          <Routes>
            {/* Authentication Routes */}
            <Route path="/login" element={<ConfidentialityScreen />} />
            <Route path="/welcome" element={<WelcomeScreen />} />

            {/* Home Route */}
            <Route path="/" element={<InstitutionalHome />} />

            {/* Traffic Light System Routes */}
            <Route path="/traffic-light" element={<TrafficLightLayout />}>
              <Route index element={<TrafficLightZones />} />
              <Route path="forecasting" element={<FrontrunSuburbs />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Portfolio Management System Routes */}
            <Route path="/portfolio" element={<PortfolioLayout />}>
              <Route index element={<PortfolioDashboardPro />} />
              <Route path="management" element={<PortfolioManagement />} />
              <Route path="fund-parameters" element={<FundParameters />} />
              <Route path="simulation" element={<Simulation />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="stress-test" element={<StressTest />} />
              <Route path="settings" element={<PortfolioSettings />} />
            </Route>

            {/* Standalone Simulation Routes */}
            <Route path="/portfolio/simulation/fullscreen" element={<StandaloneSimulation />} />

            {/* Underwriting System Routes */}
            <Route path="/underwriting" element={<UnderwritingLayout />}>
              <Route index element={<UnderwritingSystem />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/users" replace />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="settings" element={<SystemSettings />} />
              <Route path="security" element={<SecurityCompliance />} />
              <Route path="docs" element={<Documentation />} />
              <Route path="audit" element={<AuditLogs />} />
              <Route path="api" element={<ApiAccess />} />
            </Route>

            {/* Redirect legacy routes */}
            <Route path="/cio" element={<Navigate to="/traffic-light" replace />} />
            <Route path="/pipeline" element={<Navigate to="/underwriting/pipeline" replace />} />
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
    </ApiProvider>
  );
};

export default App;