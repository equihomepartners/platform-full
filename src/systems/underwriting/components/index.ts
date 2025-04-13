// Underwriting System Components
// This file exports all components for the Underwriting System

// Export legacy components (to be migrated to modules)
export { default as UnderwritingForm } from './UnderwritingForm';
export { default as UnderwriteResults } from './UnderwriteResults';
export { default as RiskAnalysis } from './RiskAnalysis';
export { default as AssetReport } from './AssetReport';
export { default as UnderwritingDashboard } from './UnderwritingDashboard';
export { default as UnderwritingLayout } from './UnderwritingLayout';
export { default as Pipeline } from './pipeline/Pipeline';

// Export module components
export { PipelineDashboard, DealList, DealRanking, TaskManager, PipelineAnalytics } from '../modules/pipeline/components';
export { UnderwritingDashboard as UnderwritingDashboardNew, ApplicationForm, ApplicationDetail, PropertyEvaluation, RiskAssessment as RiskAssessmentNew, DecisionEngine, TermSheetGenerator, DocumentManager } from '../modules/underwriting/components';
export { MarketingDashboard, TargetPropertyList, CampaignManager, CampaignCreator, CampaignAnalytics, LeadManager, LeadDetail, MailchimpIntegration } from '../modules/marketing/components';
export { AnalyticsDashboard, MetricsDashboard, ReportBuilder, ReportViewer, DashboardBuilder, DashboardViewer, ExportManager } from '../modules/analytics/components';
