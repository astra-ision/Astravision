'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

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

// Utility functions for creating notifications
const notification = {
  show(options) {
    return notificationManager.add({
      type: 'info',
      duration: 5000,
      ...options
    });
  },
  
  success(options) {
    return this.show({ type: 'success', ...options });
  },
  
  error(options) {
    return this.show({ type: 'error', ...options });
  },
  
  warning(options) {
    return this.show({ type: 'warning', ...options });
  },
  
  info(options) {
    return this.show({ type: 'info', ...options });
  },
  
  dismiss(id) {
    notificationManager.remove(id);
  },
  
  dismissAll() {
    const ids = notificationManager.getAll().map(n => n.id);
    ids.forEach(id => notificationManager.remove(id));
  }
};

export default notification; 