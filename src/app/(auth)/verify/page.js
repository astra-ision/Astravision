'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/auth';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [status, setStatus] = useState(token ? 'loading' : 'error'); // loading, success, error
  const [message, setMessage] = useState(token ? '' : 'No verification token provided. For testing purposes, you can proceed to login.');

  useEffect(() => {
    if (!token) {
      return;
    }

    const verifyEmail = async () => {
      try {
        await auth.verifyEmail(token);
        setStatus('success');
        setMessage('Your email has been successfully verified. You can now log in to your account.');
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } catch (error) {
        setStatus('error');
        setMessage(error.message || 'Failed to verify email. For testing purposes, you can proceed to login.');
      }
    };

    verifyEmail();
  }, [token, router]);

  const handleBypassVerification = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Email Verification</h2>
        </div>
        
        <div className="mt-8 space-y-6">
          {status === 'loading' && (
            <div className="flex flex-col items-center justify-center py-8">
              <LoadingSpinner />
              <p className="mt-4 text-gray-600">Verifying your email...</p>
            </div>
          )}
          
          {status === 'success' && (
            <div className="bg-green-50 border border-green-400 text-green-700 px-4 py-6 rounded text-center">
              <svg className="w-12 h-12 mx-auto text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <p className="font-medium">{message}</p>
              <p className="mt-2 text-sm">Redirecting to login page...</p>
            </div>
          )}
          
          {status === 'error' && (
            <div className="bg-yellow-50 border border-yellow-400 text-yellow-700 px-4 py-6 rounded text-center">
              <svg className="w-12 h-12 mx-auto text-yellow-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
              <p className="font-medium">{message}</p>
              <div className="mt-4">
                <button
                  onClick={handleBypassVerification}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm transition-colors"
                >
                  Proceed to login
                </button>
                <p className="mt-3 text-xs text-gray-500">
                  (For development purposes only)
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 