/**
 * Mock System Data
 *
 * This file contains mock data for system-wide components.
 * Used as fallback when API calls fail or when in development mode.
 */

export const mockSystemData = {
  // Recent activities for the dashboard
  recentActivities: [
    { id: 1, type: 'login', user: 'John Smith', time: '10 minutes ago', description: 'Logged in from Sydney, Australia' },
    { id: 2, type: 'document', user: 'Sarah Johnson', time: '1 hour ago', description: 'Updated Q2 Portfolio Performance Report' },
    { id: 3, type: 'alert', user: 'System', time: '2 hours ago', description: 'Scheduled maintenance completed successfully' },
    { id: 4, type: 'update', user: 'Michael Brown', time: '3 hours ago', description: 'Modified risk parameters for Parramatta zone' },
    { id: 5, type: 'approval', user: 'Emily Wilson', time: '5 hours ago', description: 'Approved loan application #LN-2023-0458' }
  ],

  // Pending tasks
  pendingTasks: [
    { id: 1, title: 'Review Q2 Performance Report', dueDate: 'Today', priority: 'High', assignee: 'You' },
    { id: 2, title: 'Approve Risk Model Updates', dueDate: 'Tomorrow', priority: 'Medium', assignee: 'You' },
    { id: 3, title: 'Complete Compliance Training', dueDate: 'Jun 15, 2023', priority: 'Medium', assignee: 'You' },
    { id: 4, title: 'Review Loan Application #LN-2023-0461', dueDate: 'Jun 16, 2023', priority: 'Low', assignee: 'You' }
  ],

  // System alerts
  systemAlerts: [
    { id: 1, type: 'warning', message: 'Scheduled maintenance on June 15, 2023 from 2:00 AM to 4:00 AM AEST' },
    { id: 2, type: 'info', message: 'New regulatory compliance module available. Please complete training by June 30.' }
  ],

  // Upcoming events
  upcomingEvents: [
    {
      id: 1,
      title: 'Portfolio Review Meeting',
      start: '2023-06-12T10:00:00',
      end: '2023-06-12T11:30:00',
      location: 'Conference Room A',
      attendees: ['John Smith', 'Sarah Johnson', 'Michael Brown']
    },
    {
      id: 2,
      title: 'Quarterly Performance Report',
      start: '2023-06-15T14:00:00',
      end: '2023-06-15T15:30:00',
      location: 'Virtual Meeting',
      attendees: ['John Smith', 'Emily Wilson', 'David Lee']
    },
    {
      id: 3,
      title: 'Risk Assessment Update',
      start: '2023-06-20T11:00:00',
      end: '2023-06-20T12:00:00',
      location: 'Conference Room B',
      attendees: ['John Smith', 'Michael Brown']
    }
  ],

  // Documentation and resources
  documentation: [
    {
      id: 1,
      title: 'User Manual',
      description: 'Complete guide to using the Equihome platform',
      url: '/docs/user-manual.pdf',
      lastUpdated: '2023-05-15'
    },
    {
      id: 2,
      title: 'API Documentation',
      description: 'Technical guide for developers',
      url: '/docs/api-docs.pdf',
      lastUpdated: '2023-06-01'
    },
    {
      id: 3,
      title: 'Compliance Guidelines',
      description: 'Regulatory and security compliance information',
      url: '/docs/compliance.pdf',
      lastUpdated: '2023-05-20'
    }
  ],

  // Users
  users: [
    {
      id: 'user_1',
      email: 'john.smith@equihome.com',
      firstName: 'John',
      lastName: 'Smith',
      role: 'Administrator',
      status: 'Active',
      lastLogin: '2023-06-10T09:45:00',
      created: '2023-01-15T08:30:00'
    },
    {
      id: 'user_2',
      email: 'sarah.johnson@equihome.com',
      firstName: 'Sarah',
      lastName: 'Johnson',
      role: 'Portfolio Manager',
      status: 'Active',
      lastLogin: '2023-06-09T14:20:00',
      created: '2023-01-20T10:15:00'
    },
    {
      id: 'user_3',
      email: 'michael.brown@equihome.com',
      firstName: 'Michael',
      lastName: 'Brown',
      role: 'Risk Analyst',
      status: 'Active',
      lastLogin: '2023-06-10T08:30:00',
      created: '2023-02-05T09:00:00'
    },
    {
      id: 'user_4',
      email: 'emily.wilson@equihome.com',
      firstName: 'Emily',
      lastName: 'Wilson',
      role: 'Underwriter',
      status: 'Active',
      lastLogin: '2023-06-08T11:45:00',
      created: '2023-02-10T13:20:00'
    },
    {
      id: 'user_5',
      email: 'david.lee@equihome.com',
      firstName: 'David',
      lastName: 'Lee',
      role: 'Analyst',
      status: 'Inactive',
      lastLogin: '2023-05-25T16:10:00',
      created: '2023-03-01T09:30:00'
    }
  ],

  // Audit logs
  auditLogs: [
    {
      id: 'log_1',
      user: 'John Smith',
      action: 'Login',
      resource: 'System',
      timestamp: '2023-06-10T09:45:00',
      ipAddress: '192.168.1.1',
      details: 'Successful login from Sydney, Australia'
    },
    {
      id: 'log_2',
      user: 'Sarah Johnson',
      action: 'Update',
      resource: 'Document',
      timestamp: '2023-06-10T10:15:00',
      ipAddress: '192.168.1.2',
      details: 'Updated Q2 Portfolio Performance Report'
    },
    {
      id: 'log_3',
      user: 'System',
      action: 'Maintenance',
      resource: 'System',
      timestamp: '2023-06-10T02:00:00',
      ipAddress: '192.168.1.3',
      details: 'Scheduled maintenance completed successfully'
    },
    {
      id: 'log_4',
      user: 'Michael Brown',
      action: 'Update',
      resource: 'Risk Parameters',
      timestamp: '2023-06-10T11:30:00',
      ipAddress: '192.168.1.4',
      details: 'Modified risk parameters for Parramatta zone'
    },
    {
      id: 'log_5',
      user: 'Emily Wilson',
      action: 'Approval',
      resource: 'Loan Application',
      timestamp: '2023-06-10T14:20:00',
      ipAddress: '192.168.1.5',
      details: 'Approved loan application #LN-2023-0458'
    }
  ],

  // System settings
  systemSettings: {
    general: {
      systemName: 'Equihome Platform',
      environment: 'Development',
      version: 'Alpha 2.1.2',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Australia/Sydney',
      dateFormat: 'DD/MM/YYYY',
      timeFormat: '24h'
    },
    api: {
      baseUrl: 'https://api.equihome.com/v1',
      timeout: 10000,
      retryAttempts: 3,
      retryDelay: 1000,
      useMockData: true
    },
    notifications: {
      email: true,
      inApp: true,
      sms: false,
      emailFrequency: 'immediate'
    },
    security: {
      sessionTimeout: 30, // minutes
      passwordExpiry: 90, // days
      mfaRequired: true,
      ipRestrictions: false,
      allowedIps: []
    }
  },

  // API keys
  apiKeys: [
    {
      id: 'key_1',
      name: 'Production API Key',
      key: 'sk_prod_1234567890',
      permissions: ['read:portfolio', 'write:portfolio', 'read:underwriting'],
      created: '2023-05-01T10:00:00',
      lastUsed: '2023-06-10T09:30:00'
    },
    {
      id: 'key_2',
      name: 'Read-Only API Key',
      key: 'sk_read_0987654321',
      permissions: ['read:portfolio', 'read:underwriting'],
      created: '2023-05-15T14:30:00',
      lastUsed: '2023-06-09T16:45:00'
    }
  ],

  // Security settings
  securitySettings: {
    authentication: {
      mfaEnabled: true,
      mfaMethod: 'app', // 'app', 'sms', 'email'
      sessionTimeout: 30, // minutes
      rememberMeEnabled: true,
      rememberMeDuration: 7, // days
      biometricEnabled: true
    },
    passwords: {
      minLength: 12,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      expiryDays: 90,
      preventReuse: 5, // prevent reuse of last 5 passwords
      passwordHistoryDays: 365 // days to keep password history
    },
    access: {
      ipRestrictions: false,
      allowedIps: [],
      loginAttempts: 5, // max failed login attempts before lockout
      lockoutDuration: 30, // minutes
      geoRestrictions: true,
      allowedCountries: ['AU', 'NZ']
    },
    compliance: {
      dataRetention: 7, // years
      auditLogRetention: 2, // years
      appCompliant: true, // Australian Privacy Principles
      amlCtfCompliant: true, // Anti-Money Laundering and Counter-Terrorism Financing
      pciDssCompliant: true, // Payment Card Industry Data Security Standard
      cps234Compliant: true, // APRA CPS 234 Information Security
      cdrCompliant: true // Consumer Data Right
    },
    australianRegulatory: {
      aclCompliance: true, // Australian Credit License
      afslCompliance: true, // Australian Financial Services License
      austracReporting: true, // AUSTRAC reporting
      bearFarCompliance: true, // Banking Executive Accountability Regime / Financial Accountability Regime
      ndbScheme: true // Notifiable Data Breaches Scheme
    },
    encryption: {
      dataAtRest: true,
      dataInTransit: true,
      endToEndEncryption: true,
      keyRotationDays: 90
    },
    monitoring: {
      realTimeAlerts: true,
      anomalyDetection: true,
      userBehaviorAnalytics: true,
      dataLossPrevention: true
    }
  },

  // Login history
  loginHistory: [
    {
      id: 'login_1',
      timestamp: '2023-06-10T09:45:00',
      ipAddress: '192.168.1.1',
      location: 'Sydney, Australia',
      device: 'Chrome on Windows',
      status: 'Success'
    },
    {
      id: 'login_2',
      timestamp: '2023-06-09T14:20:00',
      ipAddress: '192.168.1.2',
      location: 'Sydney, Australia',
      device: 'Safari on macOS',
      status: 'Success'
    },
    {
      id: 'login_3',
      timestamp: '2023-06-08T11:45:00',
      ipAddress: '192.168.1.3',
      location: 'Sydney, Australia',
      device: 'Firefox on Windows',
      status: 'Success'
    },
    {
      id: 'login_4',
      timestamp: '2023-06-07T16:30:00',
      ipAddress: '192.168.1.4',
      location: 'Melbourne, Australia',
      device: 'Chrome on macOS',
      status: 'Failed'
    },
    {
      id: 'login_5',
      timestamp: '2023-06-07T16:32:00',
      ipAddress: '192.168.1.4',
      location: 'Melbourne, Australia',
      device: 'Chrome on macOS',
      status: 'Success'
    }
  ],

  // Compliance reports
  complianceReports: [
    {
      id: 'report_1',
      title: 'AUSTRAC AML/CTF Compliance Report',
      type: 'Regulatory',
      frequency: 'Annual',
      lastSubmitted: '2023-03-15',
      nextDue: '2024-03-15',
      status: 'Compliant',
      url: '/compliance/austrac-aml-ctf-2023.pdf',
      authority: 'AUSTRAC',
      description: 'Annual compliance report for Anti-Money Laundering and Counter-Terrorism Financing obligations.'
    },
    {
      id: 'report_2',
      title: 'ASIC ACL Compliance Audit',
      type: 'Regulatory',
      frequency: 'Annual',
      lastSubmitted: '2023-06-30',
      nextDue: '2024-06-30',
      status: 'Compliant',
      url: '/compliance/asic-acl-audit-2023.pdf',
      authority: 'ASIC',
      description: 'Annual audit report for Australian Credit License compliance.'
    },
    {
      id: 'report_3',
      title: 'APRA CPS 234 Information Security Assessment',
      type: 'Security',
      frequency: 'Annual',
      lastSubmitted: '2023-01-10',
      nextDue: '2024-01-10',
      status: 'Compliant',
      url: '/compliance/apra-cps-234-2023.pdf',
      authority: 'APRA',
      description: 'Information security capability assessment as required by CPS 234.'
    },
    {
      id: 'report_4',
      title: 'Privacy Impact Assessment',
      type: 'Privacy',
      frequency: 'Bi-Annual',
      lastSubmitted: '2023-05-20',
      nextDue: '2023-11-20',
      status: 'Due Soon',
      url: '/compliance/privacy-impact-assessment-2023.pdf',
      authority: 'OAIC',
      description: 'Assessment of privacy impacts as required by the Australian Privacy Principles.'
    },
    {
      id: 'report_5',
      title: 'AFSL Compliance Audit',
      type: 'Regulatory',
      frequency: 'Annual',
      lastSubmitted: '2023-04-15',
      nextDue: '2024-04-15',
      status: 'Compliant',
      url: '/compliance/afsl-audit-2023.pdf',
      authority: 'ASIC',
      description: 'Annual audit report for Australian Financial Services License compliance.'
    },
    {
      id: 'report_6',
      title: 'Consumer Data Right Compliance Assessment',
      type: 'Data',
      frequency: 'Annual',
      lastSubmitted: '2023-07-10',
      nextDue: '2024-07-10',
      status: 'Compliant',
      url: '/compliance/cdr-assessment-2023.pdf',
      authority: 'ACCC',
      description: 'Assessment of compliance with Consumer Data Right requirements for Open Banking.'
    },
    {
      id: 'report_7',
      title: 'Notifiable Data Breach Register',
      type: 'Security',
      frequency: 'Quarterly',
      lastSubmitted: '2023-06-30',
      nextDue: '2023-09-30',
      status: 'Due Soon',
      url: '/compliance/ndb-register-q2-2023.pdf',
      authority: 'OAIC',
      description: 'Register of notifiable data breaches as required by the Privacy Act 1988.'
    },
    {
      id: 'report_8',
      title: 'BEAR/FAR Accountability Assessment',
      type: 'Governance',
      frequency: 'Annual',
      lastSubmitted: '2023-05-15',
      nextDue: '2024-05-15',
      status: 'Compliant',
      url: '/compliance/bear-far-2023.pdf',
      authority: 'APRA',
      description: 'Assessment of executive accountability under the Banking Executive Accountability Regime / Financial Accountability Regime.'
    },
    {
      id: 'report_5',
      title: 'Data Privacy Audit',
      type: 'Security',
      frequency: 'Annual',
      lastSubmitted: '2023-05-20',
      nextDue: '2024-05-20',
      status: 'Compliant',
      url: '/compliance/data-privacy-audit-2023.pdf'
    }
  ],

  // Calendar events
  calendarEvents: [
    {
      id: 'event_1',
      title: 'Portfolio Review Meeting',
      start: '2023-06-12T10:00:00',
      end: '2023-06-12T11:30:00',
      location: 'Conference Room A',
      description: 'Quarterly review of portfolio performance and strategy',
      attendees: ['John Smith', 'Sarah Johnson', 'Michael Brown'],
      category: 'Meeting'
    },
    {
      id: 'event_2',
      title: 'Quarterly Performance Report',
      start: '2023-06-15T14:00:00',
      end: '2023-06-15T15:30:00',
      location: 'Virtual Meeting',
      description: 'Presentation of Q2 performance report to stakeholders',
      attendees: ['John Smith', 'Emily Wilson', 'David Lee'],
      category: 'Presentation'
    },
    {
      id: 'event_3',
      title: 'Risk Assessment Update',
      start: '2023-06-20T11:00:00',
      end: '2023-06-20T12:00:00',
      location: 'Conference Room B',
      description: 'Update on risk assessment methodology and findings',
      attendees: ['John Smith', 'Michael Brown'],
      category: 'Meeting'
    },
    {
      id: 'event_4',
      title: 'Compliance Training',
      start: '2023-06-25T09:00:00',
      end: '2023-06-25T12:00:00',
      location: 'Training Room',
      description: 'Mandatory compliance training for all staff',
      attendees: ['All Staff'],
      category: 'Training'
    },
    {
      id: 'event_5',
      title: 'Board Meeting',
      start: '2023-06-30T13:00:00',
      end: '2023-06-30T16:00:00',
      location: 'Boardroom',
      description: 'Monthly board meeting to discuss strategy and performance',
      attendees: ['Board Members', 'John Smith'],
      category: 'Meeting'
    }
  ],

  // Available reports
  availableReports: [
    {
      id: 'report_type_1',
      name: 'Portfolio Performance Report',
      description: 'Comprehensive analysis of portfolio performance',
      formats: ['PDF', 'XLSX'],
      parameters: [
        { name: 'startDate', type: 'date', required: true },
        { name: 'endDate', type: 'date', required: true },
        { name: 'includeCharts', type: 'boolean', required: false, default: true }
      ]
    },
    {
      id: 'report_type_2',
      name: 'Risk Analysis Report',
      description: 'Detailed analysis of portfolio risk factors',
      formats: ['PDF', 'XLSX'],
      parameters: [
        { name: 'asOfDate', type: 'date', required: true },
        { name: 'riskFactors', type: 'array', required: false, default: ['default', 'market', 'liquidity'] }
      ]
    },
    {
      id: 'report_type_3',
      name: 'Loan Performance Report',
      description: 'Analysis of individual loan performance',
      formats: ['PDF', 'XLSX'],
      parameters: [
        { name: 'startDate', type: 'date', required: true },
        { name: 'endDate', type: 'date', required: true },
        { name: 'loanIds', type: 'array', required: false }
      ]
    },
    {
      id: 'report_type_4',
      name: 'Compliance Report',
      description: 'Regulatory compliance status report',
      formats: ['PDF'],
      parameters: [
        { name: 'asOfDate', type: 'date', required: true },
        { name: 'regulations', type: 'array', required: false, default: ['SFDR', 'AML', 'KYC'] }
      ]
    },
    {
      id: 'report_type_5',
      name: 'Suburb Analysis Report',
      description: 'Detailed analysis of suburb performance and risk',
      formats: ['PDF', 'XLSX'],
      parameters: [
        { name: 'suburb', type: 'string', required: true },
        { name: 'timeframe', type: 'string', required: false, default: '1y' }
      ]
    }
  ],

  // Report history
  reportHistory: [
    {
      id: 'generated_report_1',
      reportId: 'report_type_1',
      name: 'Portfolio Performance Report - Q2 2023',
      format: 'PDF',
      parameters: {
        startDate: '2023-04-01',
        endDate: '2023-06-30',
        includeCharts: true
      },
      url: '/reports/portfolio-performance-q2-2023.pdf',
      created: '2023-07-05T10:30:00',
      createdBy: 'John Smith',
      size: '2.4 MB'
    },
    {
      id: 'generated_report_2',
      reportId: 'report_type_2',
      name: 'Risk Analysis Report - June 2023',
      format: 'XLSX',
      parameters: {
        asOfDate: '2023-06-30',
        riskFactors: ['default', 'market', 'liquidity', 'interest']
      },
      url: '/reports/risk-analysis-june-2023.xlsx',
      created: '2023-07-03T14:15:00',
      createdBy: 'Michael Brown',
      size: '1.8 MB'
    },
    {
      id: 'generated_report_3',
      reportId: 'report_type_3',
      name: 'Loan Performance Report - Q2 2023',
      format: 'PDF',
      parameters: {
        startDate: '2023-04-01',
        endDate: '2023-06-30'
      },
      url: '/reports/loan-performance-q2-2023.pdf',
      created: '2023-07-02T09:45:00',
      createdBy: 'Sarah Johnson',
      size: '3.2 MB'
    },
    {
      id: 'generated_report_4',
      reportId: 'report_type_4',
      name: 'Compliance Report - June 2023',
      format: 'PDF',
      parameters: {
        asOfDate: '2023-06-30',
        regulations: ['SFDR', 'AML', 'KYC', 'GDPR']
      },
      url: '/reports/compliance-june-2023.pdf',
      created: '2023-07-01T16:20:00',
      createdBy: 'John Smith',
      size: '1.5 MB'
    },
    {
      id: 'generated_report_5',
      reportId: 'report_type_5',
      name: 'Suburb Analysis Report - Bondi',
      format: 'PDF',
      parameters: {
        suburb: 'Bondi',
        timeframe: '1y'
      },
      url: '/reports/suburb-analysis-bondi-2023.pdf',
      created: '2023-06-28T11:10:00',
      createdBy: 'Emily Wilson',
      size: '2.8 MB'
    }
  ],

  // Documents
  documents: [
    {
      id: 'doc1',
      name: 'Q2 2023 Portfolio Performance Report',
      type: 'PDF',
      category: 'Performance',
      size: '2.4 MB',
      created: '2023-06-15',
      lastModified: '2023-06-15',
      author: 'John Smith',
      status: 'Final',
      url: '/documents/q2-2023-portfolio-performance.pdf'
    },
    {
      id: 'doc2',
      name: 'Risk Assessment Summary',
      type: 'XLSX',
      category: 'Risk',
      size: '1.8 MB',
      created: '2023-06-02',
      lastModified: '2023-06-05',
      author: 'Sarah Johnson',
      status: 'Final',
      url: '/documents/risk-assessment-summary.xlsx'
    },
    {
      id: 'doc3',
      name: 'Suburb Allocation Analysis',
      type: 'PDF',
      category: 'Allocation',
      size: '3.2 MB',
      created: '2023-05-28',
      lastModified: '2023-05-30',
      author: 'Michael Brown',
      status: 'Final',
      url: '/documents/suburb-allocation-analysis.pdf'
    },
    {
      id: 'doc4',
      name: 'Cash Flow Projections',
      type: 'XLSX',
      category: 'Financial',
      size: '1.5 MB',
      created: '2023-05-15',
      lastModified: '2023-05-20',
      author: 'Emily Wilson',
      status: 'Final',
      url: '/documents/cash-flow-projections.xlsx'
    },
    {
      id: 'doc5',
      name: 'Portfolio Optimization Strategy',
      type: 'DOCX',
      category: 'Strategy',
      size: '4.1 MB',
      created: '2023-05-10',
      lastModified: '2023-05-12',
      author: 'David Lee',
      status: 'Draft',
      url: '/documents/portfolio-optimization-strategy.docx'
    },
    {
      id: 'doc6',
      name: 'Investor Presentation',
      type: 'PPTX',
      category: 'Investor Relations',
      size: '8.7 MB',
      created: '2023-04-28',
      lastModified: '2023-05-05',
      author: 'John Smith',
      status: 'Final',
      url: '/documents/investor-presentation.pptx'
    },
    {
      id: 'doc7',
      name: 'Regulatory Compliance Report',
      type: 'PDF',
      category: 'Compliance',
      size: '2.9 MB',
      created: '2023-04-15',
      lastModified: '2023-04-18',
      author: 'Sarah Johnson',
      status: 'Final',
      url: '/documents/regulatory-compliance-report.pdf'
    },
    {
      id: 'doc8',
      name: 'Market Analysis Q2 2023',
      type: 'PDF',
      category: 'Market',
      size: '5.3 MB',
      created: '2023-04-10',
      lastModified: '2023-04-12',
      author: 'Michael Brown',
      status: 'Final',
      url: '/documents/market-analysis-q2-2023.pdf'
    }
  ]
};

export default mockSystemData;
