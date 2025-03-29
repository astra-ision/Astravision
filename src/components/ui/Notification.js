'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';

// Individual notification component
function NotificationItem({
  id,
  type = 'info',
  title,
  message,
  duration = 5000,
  position = 'top-right',
  onDismiss
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissing, setIsDismissing] = useState(false);
  
  useEffect(() => {
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    const hideTimer = setTimeout(() => {
      handleDismiss();
    }, duration);
    
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [duration]);
  
  const handleDismiss = () => {
    setIsDismissing(true);
    setTimeout(() => {
      onDismiss(id);
    }, 300);
  };
  
  // Define icon and styles based on notification type
  const typeConfig = {
    success: {
      bgColor: 'bg-green-50',
      borderColor: 'border-green-400',
      textColor: 'text-green-800',
      icon: (
        <svg className="h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    error: {
      bgColor: 'bg-red-50',
      borderColor: 'border-red-400',
      textColor: 'text-red-800',
      icon: (
        <svg className="h-6 w-6 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    warning: {
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-400',
      textColor: 'text-yellow-800',
      icon: (
        <svg className="h-6 w-6 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    },
    info: {
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-400',
      textColor: 'text-blue-800',
      icon: (
        <svg className="h-6 w-6 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  };
  
  const config = typeConfig[type] || typeConfig.info;
  
  return (
    <div
      className={`max-w-sm w-full ${config.bgColor} border-l-4 ${config.borderColor} shadow-md rounded-lg overflow-hidden transition-all transform ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
      } ${isDismissing ? 'translate-x-20 opacity-0' : ''}`}
    >
      <div className="px-4 py-3 flex items-start">
        <div className="flex-shrink-0">
          {config.icon}
        </div>
        <div className="ml-3 w-0 flex-1 pt-0.5">
          {title && (
            <p className={`text-sm font-medium ${config.textColor}`}>{title}</p>
          )}
          {message && (
            <p className="mt-1 text-sm text-gray-600">{message}</p>
          )}
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            className="bg-transparent rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleDismiss}
          >
            <span className="sr-only">Close</span>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// Notification container component
function NotificationContainer({ position, notifications, onDismiss }) {
  const positionClasses = {
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0',
    'bottom-right': 'bottom-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'top-center': 'top-0 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-0 left-1/2 transform -translate-x-1/2'
  };
  
  return (
    <div className={`fixed z-50 p-4 space-y-4 pointer-events-none ${positionClasses[position]}`}>
      {notifications.map(notification => (
        <div key={notification.id} className="pointer-events-auto">
          <NotificationItem
            {...notification}
            position={position}
            onDismiss={onDismiss}
          />
        </div>
      ))}
    </div>
  );
}

// Create a notification manager
const notificationManager = {
  notifications: {},
  listeners: new Set(),
  
  add(notification) {
    const id = notification.id || Date.now().toString();
    this.notifications[id] = { ...notification, id };
    this.notify();
    return id;
  },
  
  remove(id) {
    delete this.notifications[id];
    this.notify();
  },
  
  getAll() {
    return Object.values(this.notifications);
  },
  
  subscribe(listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  },
  
  notify() {
    this.listeners.forEach(listener => {
      listener(this.getAll());
    });
  }
};

// Notification provider component
export function NotificationProvider({ position = 'top-right' }) {
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    const unsubscribe = notificationManager.subscribe(newNotifications => {
      setNotifications(newNotifications);
    });
    
    return unsubscribe;
  }, []);
  
  const handleDismiss = (id) => {
    notificationManager.remove(id);
  };
  
  // Only render if we're in the browser
  if (typeof window === 'undefined') return null;
  
  return createPortal(
    <NotificationContainer
      position={position}
      notifications={notifications}
      onDismiss={handleDismiss}
    />,
    document.body
  );
}

// Fallback in case toast isn't available
const fallbackNotify = (message) => {
  console.log(message);
  if (typeof window !== 'undefined') {
    alert(message);
  }
};

const notification = {
  success: (message) => {
    try {
      toast.success(message, {
        duration: 5000,
      });
    } catch (error) {
      fallbackNotify(`✓ ${message}`);
    }
  },
  
  error: (message) => {
    try {
      toast.error(message, {
        duration: 5000,
      });
    } catch (error) {
      fallbackNotify(`✗ ${message}`);
    }
  },
  
  info: (message) => {
    try {
      toast(message, {
        icon: 'ℹ️',
        duration: 5000,
      });
    } catch (error) {
      fallbackNotify(`ℹ️ ${message}`);
    }
  },
  
  warning: (message) => {
    try {
      toast(message, {
        icon: '⚠️',
        duration: 5000,
      });
    } catch (error) {
      fallbackNotify(`⚠️ ${message}`);
    }
  },
  
  promise: (promise, messages) => {
    try {
      return toast.promise(
        promise,
        {
          loading: messages.loading || 'Loading...',
          success: messages.success || 'Success!',
          error: messages.error || 'Error!',
        }
      );
    } catch (error) {
      fallbackNotify(messages.loading || 'Loading...');
      return promise;
    }
  },
  
  dismiss: (toastId) => {
    try {
      toast.dismiss(toastId);
    } catch (error) {
      console.log('Failed to dismiss toast');
    }
  }
};

export default notification;

const DUMMY_NOTIFICATIONS = [
  {
    id: '1',
    title: 'New Client Registered',
    message: 'ABC Corporation has just registered',
    type: 'info',
    read: false,
    timestamp: new Date(Date.now() - 25 * 60 * 1000)
  },
  {
    id: '2',
    title: 'Payment Received',
    message: 'Payment of $1,500 received from XYZ Ltd',
    type: 'success',
    read: false,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: '3',
    title: 'Server Alert',
    message: 'High CPU usage detected on production server',
    type: 'warning',
    read: true,
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  },
  {
    id: '4',
    title: 'Task Failed',
    message: 'Data import task failed. See logs for details',
    type: 'error',
    read: true,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  }
];

export function NotificationCenter() {
  const [notifications, setNotifications] = useState(DUMMY_NOTIFICATIONS);
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  // Simulate fetching notifications
  useEffect(() => {
    // In a real implementation, you would fetch from API
    // For now, we'll use the dummy data
  }, []);

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleRemoveNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const getIconForType = (type) => {
    switch (type) {
      case 'info':
        return (
          <div className="flex-shrink-0 rounded-full bg-blue-100 p-1 text-blue-600 dark:bg-blue-900 dark:text-blue-100">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'success':
        return (
          <div className="flex-shrink-0 rounded-full bg-green-100 p-1 text-green-600 dark:bg-green-900 dark:text-green-100">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'warning':
        return (
          <div className="flex-shrink-0 rounded-full bg-yellow-100 p-1 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-100">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        );
      case 'error':
        return (
          <div className="flex-shrink-0 rounded-full bg-red-100 p-1 text-red-600 dark:bg-red-900 dark:text-red-100">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="flex-shrink-0 rounded-full bg-gray-100 p-1 text-gray-600 dark:bg-gray-900 dark:text-gray-100">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="relative">
      <button 
        className="relative p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
          />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-xs text-white">
            {unreadCount}
          </span>
        )}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50 border border-gray-200 dark:border-gray-700">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="font-medium text-gray-900 dark:text-gray-100">Notifications</h3>
            <div className="flex space-x-2">
              <button 
                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                onClick={handleMarkAllAsRead}
                disabled={unreadCount === 0}
              >
                Mark all as read
              </button>
              <button 
                className="text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                onClick={handleClearAll}
                disabled={notifications.length === 0}
              >
                Clear all
              </button>
            </div>
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No notifications
              </div>
            ) : (
              <ul>
                {notifications.map((notification) => (
                  <li 
                    key={notification.id} 
                    className={`border-b border-gray-100 dark:border-gray-700 last:border-0 ${
                      !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                  >
                    <div className="flex p-3">
                      {getIconForType(notification.type)}
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {notification.title}
                          </p>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                          {notification.message}
                        </p>
                        <div className="mt-2 flex space-x-3">
                          {!notification.read && (
                            <button 
                              className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              Mark as read
                            </button>
                          )}
                          <button 
                            className="text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                            onClick={() => handleRemoveNotification(notification.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div className="p-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <a 
              href="/dashboard/notifications" 
              className="block text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              View all notifications
            </a>
          </div>
        </div>
      )}
    </div>
  );
} 