import React, { useState, useEffect } from 'react';
import { useApi } from '../../services/api/ApiContext';
import useTasks from '../hooks/useTasks';
import useCalendar from '../hooks/useCalendar';
import useReports from '../hooks/useReports';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  AlertTriangle,
  Clock,
  Calendar,
  Shield,
  Settings,
  Users,
  FileText,
  BarChart2,
  TrendingUp,
  Activity,
  Lock,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

// Custom icons for institutional-grade UI
const TrafficLightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="2" width="8" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="17" r="2" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const PortfolioIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 21H4.6C4.26863 21 4 20.7314 4 20.4V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M9 8V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M14 13V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M19 10V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const UnderwritingIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 3V7C14 7.55228 14.4477 8 15 8H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path fillRule="evenodd" clipRule="evenodd" d="M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H14L19 8V19C19 20.1046 18.1046 21 17 21Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 17L11 15L13 17L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Quick links for admin section
const quickLinks = [
  { id: 1, title: 'User Management', icon: <Users size={18} />, link: '/admin/users' },
  { id: 2, title: 'System Settings', icon: <Settings size={18} />, link: '/admin/settings' },
  { id: 3, title: 'Security & Compliance', icon: <Shield size={18} />, link: '/admin/security' },
  { id: 4, title: 'Documentation', icon: <FileText size={18} />, link: '/admin/docs' },
  { id: 5, title: 'Audit Logs', icon: <Activity size={18} />, link: '/admin/audit' },
  { id: 6, title: 'API Access', icon: <Lock size={18} />, link: '/admin/api' }
];

const InstitutionalHome: React.FC = () => {
  const { api, user, loading: apiLoading } = useApi();
  const { tasks, loading: tasksLoading } = useTasks();
  const { events, loading: calendarLoading } = useCalendar();
  const { reportHistory, loading: reportsLoading } = useReports();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [systemAlerts, setSystemAlerts] = useState<any[]>([]);
  const [portfolioMetrics, setPortfolioMetrics] = useState<{
    totalValue: string;
    totalProperties: number;
    averageLTV: string;
    fundIRR: number;
  }>({
    totalValue: '$0',
    totalProperties: 0,
    averageLTV: '0%',
    fundIRR: 0
  });
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Fetch data in parallel
        const [activitiesData, alertsData, metricsData] = await Promise.all([
          api.dashboard.getRecentActivities(),
          api.dashboard.getSystemAlerts(),
          api.portfolio.getSummary()
        ]);

        // Handle the new response format with status, data, and meta fields
        setRecentActivities(activitiesData?.status === 'success' ? activitiesData.data : (activitiesData || []));
        setSystemAlerts(alertsData?.status === 'success' ? alertsData.data : (alertsData || []));

        // For portfolio metrics, handle the new response format
        const metricsDataContent = metricsData?.status === 'success' ? metricsData.data : metricsData;

        // Add null checks to handle potential null or undefined values
        if (metricsDataContent) {
          setPortfolioMetrics({
            totalValue: metricsDataContent.totalValue ? `$${metricsDataContent.totalValue.toLocaleString()}` : '$0',
            totalProperties: metricsDataContent.totalProperties || 0,
            averageLTV: `${metricsDataContent.averageLtv || metricsDataContent.averageLTV || 0}%`,
            fundIRR: metricsDataContent.fundIRR || metricsDataContent.performanceScore || 0
          });
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [api]);

  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Banner */}
        <div className="bg-white rounded-md shadow-sm p-6 mb-6 border border-neutral-200">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-neutral-900">Welcome, John Smith</h1>
              <p className="text-sm text-neutral-500 mt-1">
                Last login: June 10, 2023 at 9:45 AM AEST from Sydney, Australia
              </p>
            </div>
            <div className="flex space-x-3">
              <Link to="/admin/settings" className="inline-flex items-center px-3 py-2 border border-neutral-300 shadow-sm text-sm font-medium rounded-md text-neutral-700 bg-white hover:bg-neutral-50 focus:outline-none transition-colors duration-150">
                <Settings size={16} className="mr-2" />
                Preferences
              </Link>
              <Link to="/admin/security" className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none transition-colors duration-150">
                <Shield size={16} className="mr-2" />
                Security Center
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - System Navigation */}
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-white rounded-md shadow-sm border border-neutral-200 overflow-hidden">
              <div className="p-4 border-b border-neutral-200 bg-neutral-50">
                <h2 className="text-sm font-medium text-neutral-700 uppercase tracking-wider">Platform Systems</h2>
              </div>
              <div className="p-2">
                <Link
                  to="/traffic-light"
                  className="flex items-center p-3 rounded-md hover:bg-neutral-50 transition-colors duration-150"
                >
                  <div className="p-2 rounded-md bg-secondary-50 text-secondary-500 mr-3">
                    <TrafficLightIcon />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-neutral-900">Traffic Light System</h3>
                    <p className="text-xs text-neutral-500 mt-0.5">Market analysis and zoning</p>
                  </div>
                  <ChevronRight size={16} className="text-neutral-400" />
                </Link>

                <Link
                  to="/portfolio"
                  className="flex items-center p-3 rounded-md hover:bg-neutral-50 transition-colors duration-150"
                >
                  <div className="p-2 rounded-md bg-primary-50 text-primary-500 mr-3">
                    <PortfolioIcon />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-neutral-900">Portfolio Management</h3>
                    <p className="text-xs text-neutral-500 mt-0.5">Loan portfolio optimization</p>
                  </div>
                  <ChevronRight size={16} className="text-neutral-400" />
                </Link>

                <Link
                  to="/underwriting"
                  className="flex items-center p-3 rounded-md hover:bg-neutral-50 transition-colors duration-150"
                >
                  <div className="p-2 rounded-md bg-accent-50 text-accent-500 mr-3">
                    <UnderwritingIcon />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-neutral-900">Underwriting System</h3>
                    <p className="text-xs text-neutral-500 mt-0.5">Loan evaluation and approval</p>
                  </div>
                  <ChevronRight size={16} className="text-neutral-400" />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-md shadow-sm border border-neutral-200 overflow-hidden mt-6">
              <div className="p-4 border-b border-neutral-200 bg-neutral-50">
                <h2 className="text-sm font-medium text-neutral-700 uppercase tracking-wider">Administration</h2>
              </div>
              <div className="p-2">
                <div className="grid grid-cols-2 gap-2">
                  {quickLinks.map(link => (
                    <Link
                      key={link.id}
                      to={link.link}
                      className="flex flex-col items-center p-3 rounded-md hover:bg-neutral-50 transition-colors duration-150"
                    >
                      <div className="p-2 rounded-full bg-neutral-100 text-neutral-700 mb-2">
                        {link.icon}
                      </div>
                      <span className="text-xs font-medium text-neutral-700 text-center">{link.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* System Alerts */}
            <div className="bg-white rounded-md shadow-sm border border-neutral-200 overflow-hidden mt-6">
              <div className="p-4 border-b border-neutral-200 bg-neutral-50">
                <h2 className="text-sm font-medium text-neutral-700 uppercase tracking-wider">System Alerts</h2>
              </div>
              <div className="p-4">
                {systemAlerts && systemAlerts.length > 0 ? systemAlerts.map(alert => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-md mb-2 ${
                      alert.type === 'warning'
                        ? 'bg-warning bg-opacity-10 border border-warning border-opacity-20'
                        : 'bg-primary-50 border border-primary-100'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className={`p-1 rounded-full ${
                        alert.type === 'warning' ? 'text-warning' : 'text-primary-500'
                      } mr-2 flex-shrink-0 mt-0.5`}>
                        {alert.type === 'warning' ? <AlertTriangle size={14} /> : <Clock size={14} />}
                      </div>
                      <p className="text-xs text-neutral-700">{alert.message}</p>
                    </div>
                  </div>
                )) : (
                  <div className="text-center text-neutral-500 text-xs">
                    No system alerts
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Dashboard Content */}
          <div className="col-span-12 lg:col-span-9">
            {/* Tabs */}
            <div className="bg-white rounded-t-md shadow-sm border border-neutral-200 border-b-0">
              <div className="flex border-b border-neutral-200">
                <button
                  className={`px-4 py-3 text-sm font-medium ${
                    activeTab === 'dashboard'
                      ? 'text-primary-700 border-b-2 border-primary-500 bg-primary-50 bg-opacity-50'
                      : 'text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                  }`}
                  onClick={() => setActiveTab('dashboard')}
                >
                  Dashboard
                </button>
                <button
                  className={`px-4 py-3 text-sm font-medium ${
                    activeTab === 'tasks'
                      ? 'text-primary-700 border-b-2 border-primary-500 bg-primary-50 bg-opacity-50'
                      : 'text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                  }`}
                  onClick={() => setActiveTab('tasks')}
                >
                  Tasks
                </button>
                <button
                  className={`px-4 py-3 text-sm font-medium ${
                    activeTab === 'reports'
                      ? 'text-primary-700 border-b-2 border-primary-500 bg-primary-50 bg-opacity-50'
                      : 'text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                  }`}
                  onClick={() => setActiveTab('reports')}
                >
                  Reports
                </button>
                <button
                  className={`px-4 py-3 text-sm font-medium ${
                    activeTab === 'calendar'
                      ? 'text-primary-700 border-b-2 border-primary-500 bg-primary-50 bg-opacity-50'
                      : 'text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                  }`}
                  onClick={() => setActiveTab('calendar')}
                >
                  Calendar
                </button>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="bg-white rounded-b-md shadow-sm border border-neutral-200 p-6">
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  {/* Portfolio Summary */}
                  <div>
                    <h2 className="text-lg font-medium text-neutral-900 mb-4">Portfolio Summary</h2>

                    {loading ? (
                      <div className="text-center py-6">
                        <p className="text-neutral-500">Loading portfolio data...</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-neutral-50 rounded-md p-4 border border-neutral-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-neutral-500">Total Portfolio Value</p>
                            <p className="text-xl font-semibold mt-1 text-neutral-900">{portfolioMetrics?.totalValue || '$0'}</p>
                          </div>
                          <div className="p-2 rounded-md bg-primary-50">
                            <BarChart2 size={20} className="text-primary-500" />
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-success flex items-center">
                          <TrendingUp size={12} className="mr-1" /> +3.2% from last month
                        </div>
                      </div>

                      <div className="bg-neutral-50 rounded-md p-4 border border-neutral-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-neutral-500">Total Properties</p>
                            <p className="text-xl font-semibold mt-1 text-neutral-900">{portfolioMetrics?.totalProperties || 0}</p>
                          </div>
                          <div className="p-2 rounded-md bg-secondary-50">
                            <PortfolioIcon />
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-success flex items-center">
                          <TrendingUp size={12} className="mr-1" /> +2 from last month
                        </div>
                      </div>

                      <div className="bg-neutral-50 rounded-md p-4 border border-neutral-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-neutral-500">Average LTV</p>
                            <p className="text-xl font-semibold mt-1 text-neutral-900">{portfolioMetrics?.averageLTV || '0%'}</p>
                          </div>
                          <div className="p-2 rounded-md bg-accent-50">
                            <Shield size={20} className="text-accent-500" />
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-success flex items-center">
                          <TrendingUp size={12} className="mr-1" /> -1.2% from last month
                        </div>
                      </div>

                      <div className="bg-neutral-50 rounded-md p-4 border border-neutral-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-neutral-500">Fund IRR</p>
                            <p className="text-xl font-semibold mt-1 text-neutral-900">{portfolioMetrics?.fundIRR || '0.0'}%</p>
                          </div>
                          <div className="p-2 rounded-md bg-success bg-opacity-10">
                            <Activity size={20} className="text-success" />
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-success flex items-center">
                          <TrendingUp size={12} className="mr-1" /> +0.5% from last month
                        </div>
                      </div>
                    </div>
                    )}
                  </div>

                  {/* Recent Activity & Tasks */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Activity */}
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-medium text-neutral-900">Recent Activity</h2>
                        <Link to="/activity" className="text-sm text-primary-600 hover:text-primary-700">
                          View All
                        </Link>
                      </div>
                      <div className="bg-neutral-50 rounded-md border border-neutral-200 divide-y divide-neutral-200">
                        {recentActivities && recentActivities.length > 0 ? recentActivities.slice(0, 5).map((activity) => (
                          <div key={activity.id} className="p-4">
                            <div className="flex">
                              <div className="flex-shrink-0 mr-3">
                                {activity.type === 'login' && (
                                  <div className="p-2 rounded-full bg-primary-50 text-primary-500">
                                    <Users size={16} />
                                  </div>
                                )}
                                {activity.type === 'document' && (
                                  <div className="p-2 rounded-full bg-secondary-50 text-secondary-500">
                                    <FileText size={16} />
                                  </div>
                                )}
                                {activity.type === 'alert' && (
                                  <div className="p-2 rounded-full bg-warning bg-opacity-10 text-warning">
                                    <AlertTriangle size={16} />
                                  </div>
                                )}
                                {activity.type === 'update' && (
                                  <div className="p-2 rounded-full bg-accent-50 text-accent-500">
                                    <Settings size={16} />
                                  </div>
                                )}
                                {activity.type === 'approval' && (
                                  <div className="p-2 rounded-full bg-success bg-opacity-10 text-success">
                                    <CheckCircle size={16} />
                                  </div>
                                )}
                              </div>
                              <div>
                                <p className="text-sm text-neutral-900">{activity.description}</p>
                                <div className="flex items-center mt-1">
                                  <span className="text-xs text-neutral-500">{activity.user}</span>
                                  <span className="mx-1 text-neutral-300">•</span>
                                  <span className="text-xs text-neutral-500">{activity.time}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )) : (
                          <div className="p-4 text-center text-neutral-500">
                            No recent activities
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Pending Tasks */}
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-medium text-neutral-900">Pending Tasks</h2>
                        <Link to="/tasks" className="text-sm text-primary-600 hover:text-primary-700">
                          View All
                        </Link>
                      </div>
                      <div className="bg-neutral-50 rounded-md border border-neutral-200 divide-y divide-neutral-200">
                        {tasks && tasks.length > 0 ? tasks.slice(0, 3).map((task) => (
                          <div key={task.id} className="p-4">
                            <div className="flex items-start">
                              <input
                                type="checkbox"
                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded mt-1"
                              />
                              <div className="ml-3 flex-1">
                                <p className="text-sm font-medium text-neutral-900">{task.title}</p>
                                <div className="flex items-center mt-1">
                                  <span className="text-xs text-neutral-500">Due: {task.dueDate}</span>
                                  <span className="mx-1 text-neutral-300">•</span>
                                  <span className={`text-xs ${
                                    task.priority === 'High'
                                      ? 'text-accent-500'
                                      : task.priority === 'Medium'
                                        ? 'text-warning'
                                        : 'text-neutral-500'
                                  }`}>
                                    {task.priority} Priority
                                  </span>
                                </div>
                              </div>
                              <div className="ml-2">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800">
                                  {task.assignee}
                                </span>
                              </div>
                            </div>
                          </div>
                        )) : (
                          <div className="p-4 text-center text-neutral-500">
                            No pending tasks
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Upcoming Events & Documentation */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Upcoming Events */}
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-medium text-neutral-900">Upcoming Events</h2>
                        <Link to="/calendar" className="text-sm text-primary-600 hover:text-primary-700">
                          View Calendar
                        </Link>
                      </div>
                      <div className="bg-neutral-50 rounded-md border border-neutral-200 p-4">
                        <div className="flex items-center mb-4">
                          <div className="p-2 rounded-md bg-primary-50 text-primary-500 mr-3">
                            <Calendar size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-neutral-900">Portfolio Review Meeting</p>
                            <p className="text-xs text-neutral-500">Tomorrow, 10:00 AM - 11:30 AM</p>
                          </div>
                        </div>
                        <div className="flex items-center mb-4">
                          <div className="p-2 rounded-md bg-secondary-50 text-secondary-500 mr-3">
                            <Calendar size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-neutral-900">Quarterly Performance Report</p>
                            <p className="text-xs text-neutral-500">June 15, 2023, 2:00 PM - 3:30 PM</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="p-2 rounded-md bg-accent-50 text-accent-500 mr-3">
                            <Calendar size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-neutral-900">Risk Assessment Update</p>
                            <p className="text-xs text-neutral-500">June 20, 2023, 11:00 AM - 12:00 PM</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Documentation & Resources */}
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-medium text-neutral-900">Documentation & Resources</h2>
                        <Link to="/docs" className="text-sm text-primary-600 hover:text-primary-700">
                          View All
                        </Link>
                      </div>
                      <div className="bg-neutral-50 rounded-md border border-neutral-200 p-4">
                        <div className="flex items-center mb-4">
                          <div className="p-2 rounded-md bg-primary-50 text-primary-500 mr-3">
                            <FileText size={20} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-neutral-900">User Manual</p>
                            <p className="text-xs text-neutral-500">Complete guide to using the Equihome platform</p>
                          </div>
                          <ExternalLink size={16} className="text-neutral-400" />
                        </div>
                        <div className="flex items-center mb-4">
                          <div className="p-2 rounded-md bg-secondary-50 text-secondary-500 mr-3">
                            <FileText size={20} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-neutral-900">API Documentation</p>
                            <p className="text-xs text-neutral-500">Technical guide for developers</p>
                          </div>
                          <ExternalLink size={16} className="text-neutral-400" />
                        </div>
                        <div className="flex items-center">
                          <div className="p-2 rounded-md bg-accent-50 text-accent-500 mr-3">
                            <FileText size={20} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-neutral-900">Compliance Guidelines</p>
                            <p className="text-xs text-neutral-500">Regulatory and security compliance information</p>
                          </div>
                          <ExternalLink size={16} className="text-neutral-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'tasks' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-neutral-900 mb-4">My Tasks</h2>

                  {tasksLoading ? (
                    <div className="text-center py-6">
                      <p className="text-neutral-500">Loading tasks...</p>
                    </div>
                  ) : tasks.length === 0 ? (
                    <div className="text-center py-6">
                      <p className="text-neutral-500">No tasks found</p>
                    </div>
                  ) : (
                    <div className="bg-neutral-50 rounded-md border border-neutral-200 divide-y divide-neutral-200">
                      {tasks.map((task) => (
                        <div key={task.id} className="p-4">
                          <div className="flex items-start">
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded mt-1"
                            />
                            <div className="ml-3 flex-1">
                              <p className="text-sm font-medium text-neutral-900">{task.title}</p>
                              <div className="flex items-center mt-1">
                                <span className="text-xs text-neutral-500">Due: {task.dueDate}</span>
                                <span className="mx-1 text-neutral-300">•</span>
                                <span className={`text-xs ${task.priority === 'High' ? 'text-accent-500' : task.priority === 'Medium' ? 'text-warning' : 'text-neutral-500'}`}>
                                  {task.priority} Priority
                                </span>
                              </div>
                            </div>
                            <div className="ml-2">
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800">
                                {task.assignee}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'reports' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-neutral-900 mb-4">Recent Reports</h2>

                  {reportsLoading ? (
                    <div className="text-center py-6">
                      <p className="text-neutral-500">Loading reports...</p>
                    </div>
                  ) : reportHistory.length === 0 ? (
                    <div className="text-center py-6">
                      <p className="text-neutral-500">No reports found</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-neutral-200">
                        <thead>
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Report Name</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Format</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Created</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Created By</th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-neutral-200">
                          {reportHistory.slice(0, 5).map((report) => (
                            <tr key={report.id} className="hover:bg-neutral-50">
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-neutral-900">{report.name}</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-600">{report.format}</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-600">
                                {new Date(report.created).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-600">{report.createdBy}</td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                                <button className="text-primary-600 hover:text-primary-700 mr-3">View</button>
                                <button className="text-primary-600 hover:text-primary-700">Download</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'calendar' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-neutral-900 mb-4">Upcoming Events</h2>

                  {calendarLoading ? (
                    <div className="text-center py-6">
                      <p className="text-neutral-500">Loading events...</p>
                    </div>
                  ) : events.length === 0 ? (
                    <div className="text-center py-6">
                      <p className="text-neutral-500">No events found</p>
                    </div>
                  ) : (
                    <div className="bg-neutral-50 rounded-md border border-neutral-200 divide-y divide-neutral-200">
                      {events.slice(0, 5).map((event) => (
                        <div key={event.id} className="p-4">
                          <div className="flex items-center">
                            <div className="p-2 rounded-md bg-primary-50 text-primary-500 mr-3">
                              <Calendar size={20} />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-neutral-900">{event.title}</p>
                              <p className="text-xs text-neutral-500">
                                {new Date(event.start).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })},
                                {new Date(event.start).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })} -
                                {new Date(event.end).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })}
                              </p>
                              {event.location && <p className="text-xs text-neutral-500 mt-1">{event.location}</p>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionalHome;
