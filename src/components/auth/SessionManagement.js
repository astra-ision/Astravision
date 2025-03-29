'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import notification from '@/lib/notification';
import { formatDistanceToNow } from 'date-fns';

// Mock data for current sessions
const MOCK_SESSIONS = [
  {
    id: 'session-1',
    device: 'Chrome on Windows',
    location: 'New York, USA',
    ip: '192.168.1.1',
    lastActive: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    isCurrent: true
  },
  {
    id: 'session-2',
    device: 'Safari on iPhone',
    location: 'London, UK',
    ip: '192.168.1.2',
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  },
  {
    id: 'session-3',
    device: 'Firefox on macOS',
    location: 'Dubai, UAE',
    ip: '192.168.1.3',
    lastActive: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
  }
];

export function SessionManagement() {
  const [sessions, setSessions] = useState(MOCK_SESSIONS);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogoutSession = async (sessionId) => {
    setIsLoading(true);
    try {
      // This would be a real API call in production
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Remove the session
      setSessions(sessions.filter(session => session.id !== sessionId));
      notification.success('Device logged out successfully');
    } catch (error) {
      notification.error('Failed to log out device');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogoutAllSessions = async () => {
    setIsLoading(true);
    try {
      // This would be a real API call in production
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Keep only the current session
      setSessions(sessions.filter(session => session.isCurrent));
      notification.success('All other devices logged out successfully');
    } catch (error) {
      notification.error('Failed to log out all devices');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Active Sessions
          </h2>
          <Button
            variant="outline"
            onClick={handleLogoutAllSessions}
            isLoading={isLoading}
            disabled={sessions.length <= 1}
          >
            Log out all other devices
          </Button>
        </div>

        <div className="space-y-4">
          {sessions.map(session => (
            <div
              key={session.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
            >
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {session.device}
                    </h3>
                    {session.isCurrent && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {session.location} • IP: {session.ip}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Last active: {formatDistanceToNow(session.lastActive, { addSuffix: true })}
                  </p>
                </div>
                <div>
                  {!session.isCurrent && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleLogoutSession(session.id)}
                      isLoading={isLoading}
                    >
                      Log out
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {sessions.length === 0 && (
            <div className="text-center py-4 text-gray-500 dark:text-gray-400">
              No active sessions
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
