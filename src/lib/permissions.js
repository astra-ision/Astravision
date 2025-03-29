// Define permission constants
export const PERMISSIONS = {
  // User management
  VIEW_USERS: 'view_users',
  EDIT_USERS: 'edit_users',
  DELETE_USERS: 'delete_users',
  
  // Content management
  VIEW_CONTENT: 'view_content',
  EDIT_CONTENT: 'edit_content',
  DELETE_CONTENT: 'delete_content',
  
  // Settings
  VIEW_SETTINGS: 'view_settings',
  EDIT_SETTINGS: 'edit_settings',
  
  // Roles
  ADMIN: 'admin',
  MANAGER: 'manager',
  EDITOR: 'editor',
  VIEWER: 'viewer'
};

// Define role-based permissions
export const ROLE_PERMISSIONS = {
  [PERMISSIONS.ADMIN]: [
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.EDIT_USERS,
    PERMISSIONS.DELETE_USERS,
    PERMISSIONS.VIEW_CONTENT,
    PERMISSIONS.EDIT_CONTENT,
    PERMISSIONS.DELETE_CONTENT,
    PERMISSIONS.VIEW_SETTINGS,
    PERMISSIONS.EDIT_SETTINGS
  ],
  [PERMISSIONS.MANAGER]: [
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.EDIT_USERS,
    PERMISSIONS.VIEW_CONTENT,
    PERMISSIONS.EDIT_CONTENT,
    PERMISSIONS.DELETE_CONTENT,
    PERMISSIONS.VIEW_SETTINGS
  ],
  [PERMISSIONS.EDITOR]: [
    PERMISSIONS.VIEW_CONTENT,
    PERMISSIONS.EDIT_CONTENT,
    PERMISSIONS.VIEW_SETTINGS
  ],
  [PERMISSIONS.VIEWER]: [
    PERMISSIONS.VIEW_CONTENT,
    PERMISSIONS.VIEW_SETTINGS
  ]
};

// Check if a user has a specific permission
export function hasPermission(user, permission) {
  if (!user || !user.role) return false;
  
  // Admins have all permissions
  if (user.role === PERMISSIONS.ADMIN) return true;
  
  // Check role-based permissions
  const rolePermissions = ROLE_PERMISSIONS[user.role];
  return rolePermissions?.includes(permission) ?? false;
}
