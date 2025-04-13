import React, { useState, useEffect } from 'react';
import { Bell, X, Settings, CheckCircle, AlertTriangle, Info, Calendar, FileText } from 'lucide-react';
import { useApi } from '../../services/api/ApiContext';

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ isOpen, onClose }) => {
  const { api } = useApi();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('all');

  useEffect(() => {
    if (isOpen) {
      const fetchNotifications = async () => {
        setLoading(true);
        try {
          // In a real implementation, this would call an API endpoint
          // For now, we'll use the mock data from the user data
          const userData = await api.auth.getCurrentUser();
          setNotifications(userData.notifications || []);
        } catch (error) {
          console.error('Error fetching notifications:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchNotifications();
    }
  }, [isOpen, api.auth]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'system':
        return <Info size={16} className="text-primary-500" />;
      case 'task':
        return <CheckCircle size={16} className="text-success" />;
      case 'document':
        return <FileText size={16} className="text-primary-500" />;
      case 'security':
        return <AlertTriangle size={16} className="text-warning" />;
      case 'compliance':
        return <AlertTriangle size={16} className="text-accent-500" />;
      case 'calendar':
        return <Calendar size={16} className="text-primary-500" />;
      default:
        return <Info size={16} className="text-primary-500" />;
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    return notification.type === activeTab;
  });

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-neutral-900 bg-opacity-50" onClick={onClose}></div>
      <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-xl flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200">
          <div className="flex items-center">
            <Bell size={20} className="text-primary-500 mr-2" />
            <h2 className="text-lg font-medium text-neutral-900">Notifications</h2>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-500 hover:bg-neutral-100 focus:outline-none transition-colors duration-150"
              onClick={() => {}}
            >
              <Settings size={18} />
            </button>
            <button 
              className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-500 hover:bg-neutral-100 focus:outline-none transition-colors duration-150"
              onClick={onClose}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="border-b border-neutral-200 overflow-x-auto">
          <div className="flex px-4">
            <button
              className={`py-2 px-3 text-sm font-medium border-b-2 ${
                activeTab === 'all'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
              onClick={() => setActiveTab('all')}
            >
              All
            </button>
            <button
              className={`py-2 px-3 text-sm font-medium border-b-2 ${
                activeTab === 'system'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
              onClick={() => setActiveTab('system')}
            >
              System
            </button>
            <button
              className={`py-2 px-3 text-sm font-medium border-b-2 ${
                activeTab === 'task'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
              onClick={() => setActiveTab('task')}
            >
              Tasks
            </button>
            <button
              className={`py-2 px-3 text-sm font-medium border-b-2 ${
                activeTab === 'security'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
              }`}
              onClick={() => setActiveTab('security')}
            >
              Security
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center px-4 py-2 border-b border-neutral-200 bg-neutral-50">
          <span className="text-sm text-neutral-500">
            {filteredNotifications.filter(n => !n.read).length} unread notifications
          </span>
          <button 
            className="text-sm text-primary-600 hover:text-primary-700"
            onClick={markAllAsRead}
          >
            Mark all as read
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-neutral-500">Loading notifications...</p>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-neutral-500">No notifications found</p>
            </div>
          ) : (
            <div className="divide-y divide-neutral-200">
              {filteredNotifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`p-4 hover:bg-neutral-50 ${notification.read ? '' : 'bg-primary-50'}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex">
                    <div className="flex-shrink-0 mr-3">
                      <div className="h-8 w-8 rounded-full bg-neutral-100 flex items-center justify-center">
                        {getNotificationIcon(notification.type)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-900">{notification.title}</p>
                      <p className="text-sm text-neutral-500 mt-0.5">{notification.message}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-neutral-400">
                          {new Date(notification.timestamp).toLocaleString()}
                        </span>
                        {notification.actions && notification.actions.length > 0 && (
                          <div className="ml-auto">
                            {notification.actions.map((action: any) => (
                              <a
                                key={action.label}
                                href={action.url}
                                className="text-xs text-primary-600 hover:text-primary-700 ml-2"
                              >
                                {action.label}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPanel;
