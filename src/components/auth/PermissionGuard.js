'use client';

import { useAuth } from '@/providers/AuthProvider';
import { hasPermission } from '@/lib/permissions';

export function PermissionGuard({ permission, fallback = null, children }) {
  const { user } = useAuth();
  
  if (!hasPermission(user, permission)) {
    return fallback;
  }
  
  return children;
}
