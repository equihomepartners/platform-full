// Underwriting System API Client
// This file contains the API client for the Underwriting System

import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import {
  FormData,
  LoanDecision,
  LoanApplication
} from '../types';
import {
  SubmitLoanApplicationRequest,
  SubmitLoanApplicationResponse,
  GetLoanApplicationsResponse,
  GetLoanApplicationResponse,
  EvaluatePropertyRequest,
  EvaluatePropertyResponse,
  AssessRiskRequest,
  AssessRiskResponse,
  EvaluateLoanRequest,
  EvaluateLoanResponse,
  GetLoanDecisionsResponse,
  GetTrafficLightIntegrationResponse,
  GetPortfolioIntegrationResponse
} from './types';
import { analyzeLoanApplication } from '../services/mockAnalysis';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://eyycsgfueefgdtqujwam.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5eWNzZ2Z1ZWVmZ2R0cXVqd2FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMDUzNTUsImV4cCI6MjA1OTg4MTM1NX0.j795Be2iRyTmBwn-5g_bPPgVmppwnjTko_KWKAUyMhk';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Mock data for development
const mockApplications: LoanApplication[] = [];
const mockDecisions: { id: string; applicationId: string; decision: LoanDecision }[] = [];

// API Functions

// Submit a loan application
export async function submitLoanApplication(request: SubmitLoanApplicationRequest): Promise<SubmitLoanApplicationResponse> {
  try {
    // In production, this would be a call to the Supabase API
    // For now, we'll use mock data

    const id = uuidv4();
    const submittedAt = new Date().toISOString();

    const application: LoanApplication = {
      id,
      status: 'submitted',
      submittedAt,
      borrower: {
        name: request.formData.borrowerName,
        annualIncome: request.formData.annualIncome,
        employmentStatus: request.formData.employmentStatus
      },
      property: {
        address: request.formData.propertyAddress,
        type: request.formData.propertyType,
        currentValue: request.formData.currentValue,
        mortgageBalance: request.formData.mortgageBalance
      },
      loan: {
        amount: request.formData.loanAmount,
        purpose: request.formData.loanPurpose,
        term: request.formData.loanTerm
      }
    };

    // Add to mock data
    mockApplications.push(application);

    return { application };
  } catch (error) {
    console.error('Error submitting loan application:', error);
    throw error;
  }
}

// Get all loan applications
export async function getLoanApplications(
  status?: 'submitted' | 'in-review' | 'approved' | 'rejected',
  limit: number = 10,
  offset: number = 0
): Promise<GetLoanApplicationsResponse> {
  try {
    // In production, this would be a call to the Supabase API
    // For now, we'll use mock data

    let filteredApplications = mockApplications;

    if (status) {
      filteredApplications = filteredApplications.filter(app => app.status === status);
    }

    const paginatedApplications = filteredApplications.slice(offset, offset + limit);

    return {
      total: filteredApplications.length,
      limit,
      offset,
      applications: paginatedApplications
    };
  } catch (error) {
    console.error('Error getting loan applications:', error);
    throw error;
  }
}

// Get a specific loan application
export async function getLoanApplication(id: string): Promise<GetLoanApplicationResponse> {
  try {
    // In production, this would be a call to the Supabase API
    // For now, we'll use mock data

    const application = mockApplications.find(app => app.id === id);

    if (!application) {
      throw new Error(`Application with ID ${id} not found`);
    }

    return { application };
  } catch (error) {
    console.error('Error getting loan application:', error);
    throw error;
  }
}

// Evaluate a property
export async function evaluateProperty(request: EvaluatePropertyRequest): Promise<EvaluatePropertyResponse> {
  try {
    // In production, this would be a call to the Supabase API and PropTrack API
    // For now, we'll use mock data

    const id = uuidv4();
    const suburb = request.address.split(',')[1]?.trim() || '';

    // Determine traffic light zone
    let trafficLightZone: 'Green' | 'Orange' | 'Red' = 'Red';

    // Import dynamically to avoid circular dependencies
    const { getTrafficLightZone } = await import('../data/trafficLightZones');
    trafficLightZone = getTrafficLightZone(suburb);

    // Mock property valuation
    const estimatedValue = Math.floor(Math.random() * 2000000) + 1000000;
    const confidenceScore = Math.floor(Math.random() * 20) + 80;

    // Mock comparable properties
    const comparableProperties = Array.from({ length: 3 }, (_, i) => ({
      address: `${i + 1}23 ${suburb} St, ${suburb}, NSW`,
      salePrice: estimatedValue * (0.9 + Math.random() * 0.2),
      saleDate: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      bedrooms: request.bedrooms || 3,
      bathrooms: request.bathrooms || 2,
      landSize: request.landSize || 500,
      distanceKm: Math.random() * 2
    }));

    // Mock risk assessment
    const riskScore = trafficLightZone === 'Green' ? 85 : trafficLightZone === 'Orange' ? 70 : 50;
    const overallRisk = riskScore >= 80 ? 'low' : riskScore >= 60 ? 'medium' : 'high';

    return {
      id,
      address: request.address,
      type: request.type,
      bedrooms: request.bedrooms,
      bathrooms: request.bathrooms,
      landSize: request.landSize,
      yearBuilt: request.yearBuilt,
      valuation: {
        estimatedValue,
        confidenceScore,
        comparableProperties,
        lastUpdated: new Date().toISOString()
      },
      riskAssessment: {
        overallRisk,
        riskScore,
        riskFactors: [
          {
            factor: 'location',
            value: trafficLightZone,
            risk: trafficLightZone === 'Green' ? 'low' : trafficLightZone === 'Orange' ? 'medium' : 'high',
            impact: trafficLightZone === 'Green' ? 'positive' : trafficLightZone === 'Orange' ? 'neutral' : 'negative'
          },
          {
            factor: 'propertyType',
            value: request.type,
            risk: request.type === 'house' ? 'low' : request.type === 'townhouse' ? 'low' : 'medium',
            impact: request.type === 'house' ? 'positive' : request.type === 'townhouse' ? 'positive' : 'neutral'
          },
          {
            factor: 'propertyAge',
            value: request.yearBuilt ? new Date().getFullYear() - request.yearBuilt : 'unknown',
            risk: request.yearBuilt && new Date().getFullYear() - request.yearBuilt < 20 ? 'low' : 'medium',
            impact: request.yearBuilt && new Date().getFullYear() - request.yearBuilt < 20 ? 'positive' : 'neutral'
          }
        ],
        recommendations: [
          'Property is in a desirable location',
          'Consider getting a professional inspection',
          'Review strata reports if applicable'
        ]
      },
      trafficLightZone
    };
  } catch (error) {
    console.error('Error evaluating property:', error);
    throw error;
  }
}

// Assess risk for a loan application
export async function assessRisk(request: AssessRiskRequest): Promise<AssessRiskResponse> {
  try {
    // In production, this would be a call to the Supabase API
    // For now, we'll use mock data

    const application = mockApplications.find(app => app.id === request.applicationId);

    if (!application) {
      throw new Error(`Application with ID ${request.applicationId} not found`);
    }

    const suburb = application.property.address.split(',')[1]?.trim() || '';

    // Determine traffic light zone
    let trafficLightZone: 'Green' | 'Orange' | 'Red' = 'Red';

    // Import dynamically to avoid circular dependencies
    const { getTrafficLightZone } = await import('../data/trafficLightZones');
    trafficLightZone = getTrafficLightZone(suburb);

    // Calculate LTV
    const ltv = (application.loan.amount / application.property.currentValue) * 100;

    // Calculate combined LTV
    const combinedLtv = ((application.loan.amount + application.property.mortgageBalance) / application.property.currentValue) * 100;

    // Determine risk level
    const riskScore = trafficLightZone === 'Green' ? 85 : trafficLightZone === 'Orange' ? 70 : 50;
    const overallRisk = riskScore >= 80 ? 'low' : riskScore >= 60 ? 'medium' : 'high';

    return {
      id: uuidv4(),
      applicationId: request.applicationId,
      assessment: {
        overallRisk,
        riskScore,
        riskFactors: [
          {
            factor: 'location',
            value: trafficLightZone,
            risk: trafficLightZone === 'Green' ? 'low' : trafficLightZone === 'Orange' ? 'medium' : 'high',
            impact: trafficLightZone === 'Green' ? 'positive' : trafficLightZone === 'Orange' ? 'neutral' : 'negative'
          },
          {
            factor: 'ltv',
            value: ltv,
            risk: ltv <= 50 ? 'low' : ltv <= 70 ? 'medium' : 'high',
            impact: ltv <= 50 ? 'positive' : ltv <= 70 ? 'neutral' : 'negative'
          },
          {
            factor: 'combinedLtv',
            value: combinedLtv,
            risk: combinedLtv <= 60 ? 'low' : combinedLtv <= 80 ? 'medium' : 'high',
            impact: combinedLtv <= 60 ? 'positive' : combinedLtv <= 80 ? 'neutral' : 'negative'
          },
          {
            factor: 'borrowerIncome',
            value: application.borrower.annualIncome,
            risk: application.borrower.annualIncome >= 150000 ? 'low' : application.borrower.annualIncome >= 100000 ? 'medium' : 'high',
            impact: application.borrower.annualIncome >= 150000 ? 'positive' : application.borrower.annualIncome >= 100000 ? 'neutral' : 'negative'
          },
          {
            factor: 'employmentStatus',
            value: application.borrower.employmentStatus,
            risk: application.borrower.employmentStatus === 'employed' ? 'low' : application.borrower.employmentStatus === 'self-employed' ? 'medium' : 'high',
            impact: application.borrower.employmentStatus === 'employed' ? 'positive' : application.borrower.employmentStatus === 'self-employed' ? 'neutral' : 'negative'
          }
        ],
        recommendations: [
          'Property is in a desirable location',
          'LTV ratio is within acceptable range',
          'Borrower has strong income'
        ]
      }
    };
  } catch (error) {
    console.error('Error assessing risk:', error);
    throw error;
  }
}

// Evaluate a loan application for decision
export async function evaluateLoan(request: EvaluateLoanRequest): Promise<EvaluateLoanResponse> {
  try {
    // In production, this would be a call to the Supabase API
    // For now, we'll use mock data

    const application = mockApplications.find(app => app.id === request.applicationId);

    if (!application) {
      throw new Error(`Application with ID ${request.applicationId} not found`);
    }

    // Convert application to FormData for analysis
    const formData: FormData = {
      borrowerName: application.borrower.name,
      annualIncome: application.borrower.annualIncome,
      employmentStatus: application.borrower.employmentStatus,
      propertyAddress: application.property.address,
      propertyType: application.property.type,
      currentValue: application.property.currentValue,
      mortgageBalance: application.property.mortgageBalance,
      loanAmount: application.loan.amount,
      loanPurpose: application.loan.purpose,
      loanTerm: application.loan.term,
      forecastedGrowth: 5 // Default forecasted growth
    };

    // Analyze loan application
    const decision = await analyzeLoanApplication(formData);

    // Update application status
    application.status = decision.approved ? 'approved' : 'rejected';
    application.decision = decision;

    // Add to mock decisions
    const decisionId = uuidv4();
    mockDecisions.push({
      id: decisionId,
      applicationId: request.applicationId,
      decision
    });

    return {
      id: decisionId,
      applicationId: request.applicationId,
      decision
    };
  } catch (error) {
    console.error('Error evaluating loan:', error);
    throw error;
  }
}

// Get all loan decisions
export async function getLoanDecisions(
  limit: number = 10,
  offset: number = 0
): Promise<GetLoanDecisionsResponse> {
  try {
    // In production, this would be a call to the Supabase API
    // For now, we'll use mock data

    const paginatedDecisions = mockDecisions.slice(offset, offset + limit);

    return {
      total: mockDecisions.length,
      limit,
      offset,
      decisions: paginatedDecisions
    };
  } catch (error) {
    console.error('Error getting loan decisions:', error);
    throw error;
  }
}

// Get integration data for the Traffic Light System
export async function getTrafficLightIntegration(): Promise<GetTrafficLightIntegrationResponse> {
  try {
    // In production, this would be a call to the Traffic Light System API
    // For now, we'll use mock data

    // Import dynamically to avoid circular dependencies
    const {
      getGreenZoneSuburbs,
      getOrangeZoneSuburbs,
      getRedZoneSuburbs
    } = await import('../data/trafficLightZones');

    return {
      status: 'active',
      greenZoneSuburbs: getGreenZoneSuburbs(),
      orangeZoneSuburbs: getOrangeZoneSuburbs(),
      redZoneSuburbs: getRedZoneSuburbs(),
      lastUpdated: new Date().toISOString(),
      nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };
  } catch (error) {
    console.error('Error getting Traffic Light integration data:', error);
    throw error;
  }
}

// Get integration data for the Portfolio Management System
export async function getPortfolioIntegration(): Promise<GetPortfolioIntegrationResponse> {
  try {
    // In production, this would be a call to the Portfolio Management System API
    // For now, we'll use mock data

    const approvedApplications = mockApplications.filter(app => app.status === 'approved');
    const pendingApplications = mockApplications.filter(app => app.status === 'submitted' || app.status === 'in-review');

    // Calculate metrics
    const approvedLoansCount = approvedApplications.length;
    const approvedLoansTotalAmount = approvedApplications.reduce((sum, app) => sum + app.loan.amount, 0);
    const approvedLoansAverageLTV = approvedApplications.length > 0
      ? approvedApplications.reduce((sum, app) => sum + (app.loan.amount / app.property.currentValue) * 100, 0) / approvedApplications.length
      : 0;
    const approvedLoansAverageIRR = approvedApplications.length > 0
      ? approvedApplications.reduce((sum, app) => sum + (app.decision?.returns.irr || 0), 0) / approvedApplications.length
      : 0;

    const pendingApplicationsCount = pendingApplications.length;
    const pendingApplicationsTotalAmount = pendingApplications.reduce((sum, app) => sum + app.loan.amount, 0);
    const pendingApplicationsAverageLTV = pendingApplications.length > 0
      ? pendingApplications.reduce((sum, app) => sum + (app.loan.amount / app.property.currentValue) * 100, 0) / pendingApplications.length
      : 0;
    const pendingApplicationsProjectedIRR = 8.5; // Mock projected IRR

    // Calculate zone distribution
    const zoneDistribution = {
      green: 0,
      orange: 0,
      red: 0
    };

    for (const app of approvedApplications) {
      const suburb = app.property.address.split(',')[1]?.trim() || '';
      const { getTrafficLightZone } = await import('../data/trafficLightZones');
      const zone = getTrafficLightZone(suburb);

      if (zone === 'Green') zoneDistribution.green++;
      else if (zone === 'Orange') zoneDistribution.orange++;
      else zoneDistribution.red++;
    }

    // Convert to percentages
    const total = zoneDistribution.green + zoneDistribution.orange + zoneDistribution.red;
    if (total > 0) {
      zoneDistribution.green = Math.round((zoneDistribution.green / total) * 100);
      zoneDistribution.orange = Math.round((zoneDistribution.orange / total) * 100);
      zoneDistribution.red = Math.round((zoneDistribution.red / total) * 100);
    }

    // Get recent approvals
    const recentApprovals = approvedApplications
      .slice(0, 5)
      .map(app => {
        const suburb = app.property.address.split(',')[1]?.trim() || '';
        return {
          id: app.id,
          suburb,
          amount: app.loan.amount,
          ltv: (app.loan.amount / app.property.currentValue) * 100,
          irr: app.decision?.returns.irr || 0
        };
      });

    return {
      status: 'active',
      approvedLoans: {
        count: approvedLoansCount,
        totalAmount: approvedLoansTotalAmount,
        averageLTV: approvedLoansAverageLTV,
        averageIRR: approvedLoansAverageIRR
      },
      pendingApplications: {
        count: pendingApplicationsCount,
        totalAmount: pendingApplicationsTotalAmount,
        averageLTV: pendingApplicationsAverageLTV,
        projectedIRR: pendingApplicationsProjectedIRR
      },
      zoneDistribution,
      recentApprovals
    };
  } catch (error) {
    console.error('Error getting Portfolio integration data:', error);
    throw error;
  }
}
