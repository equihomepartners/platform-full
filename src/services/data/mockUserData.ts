/**
 * Mock User Data
 * 
 * This file contains mock data for user-related components.
 * Used as fallback when API calls fail or when in development mode.
 */

export const mockUserData = {
  // Current user
  currentUser: {
    id: 'user_1',
    email: 'john.smith@equihome.com',
    firstName: 'John',
    lastName: 'Smith',
    role: 'Administrator',
    status: 'Active',
    lastLogin: '2023-06-10T09:45:00',
    created: '2023-01-15T08:30:00',
    avatar: null,
    phone: '+61 2 1234 5678',
    department: 'Executive',
    position: 'Chief Investment Officer',
    permissions: [
      'admin:read',
      'admin:write',
      'portfolio:read',
      'portfolio:write',
      'underwriting:read',
      'underwriting:write',
      'traffic-light:read',
      'traffic-light:write'
    ]
  },

  // User preferences
  preferences: {
    theme: 'light', // 'light', 'dark', 'system'
    language: 'en-AU',
    timezone: 'Australia/Sydney',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    notifications: {
      email: true,
      inApp: true,
      sms: false,
      emailFrequency: 'immediate' // 'immediate', 'daily', 'weekly'
    },
    dashboard: {
      defaultView: 'overview',
      widgets: [
        'portfolio-summary',
        'recent-activity',
        'pending-tasks',
        'upcoming-events'
      ],
      widgetLayout: {
        'portfolio-summary': { x: 0, y: 0, w: 12, h: 2 },
        'recent-activity': { x: 0, y: 2, w: 6, h: 4 },
        'pending-tasks': { x: 6, y: 2, w: 6, h: 4 },
        'upcoming-events': { x: 0, y: 6, w: 12, h: 2 }
      }
    },
    portfolio: {
      defaultTab: 'dashboard',
      defaultTimeframe: '1y',
      favoriteSuburbs: ['Bondi', 'Mosman', 'Surry Hills'],
      chartColors: 'default' // 'default', 'colorblind', 'monochrome'
    },
    security: {
      mfaEnabled: true,
      mfaMethod: 'app', // 'app', 'sms', 'email'
      sessionTimeout: 30, // minutes
      rememberMe: true
    }
  },

  // User sessions
  sessions: [
    {
      id: 'session_1',
      device: 'Chrome on Windows',
      ipAddress: '192.168.1.1',
      location: 'Sydney, Australia',
      lastActive: '2023-06-10T09:45:00',
      current: true
    },
    {
      id: 'session_2',
      device: 'Safari on macOS',
      ipAddress: '192.168.1.2',
      location: 'Sydney, Australia',
      lastActive: '2023-06-09T14:20:00',
      current: false
    },
    {
      id: 'session_3',
      device: 'Chrome on Android',
      ipAddress: '192.168.1.3',
      location: 'Sydney, Australia',
      lastActive: '2023-06-08T11:45:00',
      current: false
    }
  ],

  // User notifications
  notifications: [
    {
      id: 'notification_1',
      type: 'system',
      title: 'Scheduled Maintenance',
      message: 'Scheduled maintenance on June 15, 2023 from 2:00 AM to 4:00 AM AEST',
      timestamp: '2023-06-10T08:00:00',
      read: false,
      actions: [
        { label: 'View Details', url: '/notifications/1' }
      ]
    },
    {
      id: 'notification_2',
      type: 'task',
      title: 'Task Assigned',
      message: 'You have been assigned to review the Q2 Performance Report',
      timestamp: '2023-06-09T15:30:00',
      read: false,
      actions: [
        { label: 'View Task', url: '/tasks/1' }
      ]
    },
    {
      id: 'notification_3',
      type: 'document',
      title: 'Document Updated',
      message: 'Sarah Johnson updated the Risk Assessment Summary',
      timestamp: '2023-06-08T14:20:00',
      read: true,
      actions: [
        { label: 'View Document', url: '/documents/2' }
      ]
    },
    {
      id: 'notification_4',
      type: 'security',
      title: 'New Login',
      message: 'New login detected from Sydney, Australia on Chrome',
      timestamp: '2023-06-07T16:32:00',
      read: true,
      actions: [
        { label: 'View Activity', url: '/security/login-history' }
      ]
    },
    {
      id: 'notification_5',
      type: 'compliance',
      title: 'Compliance Training Due',
      message: 'Please complete your compliance training by June 30',
      timestamp: '2023-06-05T09:00:00',
      read: true,
      actions: [
        { label: 'Start Training', url: '/training/compliance' }
      ]
    }
  ],

  // User activity
  activity: [
    {
      id: 'activity_1',
      type: 'login',
      description: 'Logged in from Sydney, Australia',
      timestamp: '2023-06-10T09:45:00',
      details: {
        ipAddress: '192.168.1.1',
        device: 'Chrome on Windows',
        location: 'Sydney, Australia'
      }
    },
    {
      id: 'activity_2',
      type: 'document',
      description: 'Viewed Q2 Portfolio Performance Report',
      timestamp: '2023-06-10T10:15:00',
      details: {
        documentId: 'doc1',
        documentName: 'Q2 2023 Portfolio Performance Report'
      }
    },
    {
      id: 'activity_3',
      type: 'portfolio',
      description: 'Updated fund parameters',
      timestamp: '2023-06-10T11:30:00',
      details: {
        parameterId: 'fp001',
        parameterName: 'Target IRR',
        oldValue: 9.5,
        newValue: 10
      }
    },
    {
      id: 'activity_4',
      type: 'simulation',
      description: 'Ran portfolio simulation',
      timestamp: '2023-06-10T14:20:00',
      details: {
        simulationId: 'sim_1',
        simulationName: 'Q3 2023 Projection',
        parameters: {
          targetReturn: 9.5,
          riskTolerance: 'Medium',
          investmentHorizon: '5 years'
        }
      }
    },
    {
      id: 'activity_5',
      type: 'report',
      description: 'Generated Risk Analysis Report',
      timestamp: '2023-06-09T16:45:00',
      details: {
        reportId: 'generated_report_2',
        reportName: 'Risk Analysis Report - June 2023',
        format: 'XLSX'
      }
    }
  ]
};

export default mockUserData;
