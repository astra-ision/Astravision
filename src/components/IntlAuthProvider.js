'use client';

import { NextIntlClientProvider } from 'next-intl';
import { AuthProvider } from '@/providers/AuthProvider';

// Messages for auth translations - keeping it simple
const messages = {
  auth: {
    loginSuccess: 'Login successful',
    loginFailed: 'Login failed',
    logoutSuccess: 'Logged out successfully',
    logoutFailed: 'Logout failed',
    registrationSuccess: 'Registration successful',
    registrationFailed: 'Registration failed',
    passwordResetSent: 'Password reset link sent',
    passwordResetFailed: 'Failed to send password reset link',
    passwordResetSuccess: 'Password reset successfully',
    verificationSuccess: 'Email verified successfully',
    verificationFailed: 'Failed to verify email',
    authRequired: 'Authentication required'
  }
};

export function IntlAuthProvider({ children }) {
  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      <AuthProvider>{children}</AuthProvider>
    </NextIntlClientProvider>
  );
}
