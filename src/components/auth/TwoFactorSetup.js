'use client';

import { useState } from 'react';
import notification from '@/lib/notification';

export function TwoFactorSetup() {
  const [step, setStep] = useState('select'); // 'select', 'app', 'sms', 'verify'
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');
  const [phone, setPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateAppAuth = async () => {
    setIsLoading(true);
    try {
      // This would be a real API call in production
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Example response - in production this would come from your backend
      setQrCode('https://api.qrserver.com/v1/create-qr-code/?data=otpauth://totp/Astravision:user@example.com&secret=JBSWY3DPEHPK3PXP&issuer=Astravision&size=200x200');
      setSecret('JBSWY3DPEHPK3PXP');
      setStep('app');
    } catch (error) {
      notification.error('Failed to generate authentication code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendSmsCode = async () => {
    if (!phone || phone.length < 10) {
      notification.warning('Please enter a valid phone number');
      return;
    }
    
    setIsLoading(true);
    try {
      // This would be a real API call in production
      await new Promise(resolve => setTimeout(resolve, 1000));
      notification.success('Verification code sent to your phone');
      setStep('verify');
    } catch (error) {
      notification.error('Failed to send verification code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      notification.warning('Please enter a valid 6-digit code');
      return;
    }
    
    setIsLoading(true);
    try {
      // This would be a real API call in production
      await new Promise(resolve => setTimeout(resolve, 1000));
      notification.success('Two-factor authentication enabled successfully');
      // Reset the form and go back to selection
      setStep('select');
      setVerificationCode('');
      setPhone('');
    } catch (error) {
      notification.error('Failed to verify code');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Two-Factor Authentication
      </h2>
      
      {step === 'select' && (
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
            Two-factor authentication adds an extra layer of security to your account. In addition to your password, you'll need to enter a code from another device.
          </p>
          
          <div className="space-y-4">
            <button
              onClick={handleGenerateAppAuth}
              className="w-full flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <div className="flex items-center">
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-md">
                  <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Authenticator App
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Use Google Authenticator, Microsoft Authenticator, or similar
                  </p>
                </div>
              </div>
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            
            <button
              onClick={() => setStep('sms')}
              className="w-full flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <div className="flex items-center">
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded-md">
                  <svg className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    SMS Verification
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Receive a code via text message
                  </p>
                </div>
              </div>
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      {step === 'app' && (
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Scan this QR code with your authenticator app, or enter the setup key manually.
          </p>
          
          <div className="flex justify-center mb-4">
            <img 
              src={qrCode} 
              alt="QR Code for authenticator app" 
              className="border border-gray-200 dark:border-gray-700 rounded-md"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Manual setup key
            </label>
            <div className="flex">
              <input
                type="text"
                value={secret}
                readOnly
                className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-l-md focus:outline-none"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(secret);
                  notification.success('Setup key copied to clipboard');
                }}
                className="px-3 py-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 rounded-r-md"
              >
                Copy
              </button>
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="verification-code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Verification Code
            </label>
            <input
              id="verification-code"
              type="text"
              maxLength={6}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter 6-digit code"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
          
          <div className="flex space-x-3">
            <button 
              onClick={() => {
                setStep('select');
                setVerificationCode('');
              }}
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Loading...' : 'Cancel'}
            </button>
            <button 
              onClick={handleVerifyCode}
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Loading...' : 'Verify'}
            </button>
          </div>
        </div>
      )}
      
      {step === 'sms' && (
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            We'll send a verification code to your phone number.
          </p>
          
          <div className="mb-6">
            <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone Number
            </label>
            <input
              id="phone-number"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              placeholder="+1 (555) 123-4567"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
          
          <div className="flex space-x-3">
            <button 
              onClick={() => {
                setStep('select');
                setPhone('');
              }}
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Loading...' : 'Cancel'}
            </button>
            <button 
              onClick={handleSendSmsCode}
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : 'Send Code'}
            </button>
          </div>
        </div>
      )}
      
      {step === 'verify' && (
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Enter the 6-digit verification code sent to your phone.
          </p>
          
          <div className="mb-6">
            <label htmlFor="sms-code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Verification Code
            </label>
            <input
              id="sms-code"
              type="text"
              maxLength={6}
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
              placeholder="Enter 6-digit code"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
          
          <div className="flex space-x-3">
            <button 
              onClick={() => {
                setStep('sms');
                setVerificationCode('');
              }}
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Loading...' : 'Back'}
            </button>
            <button 
              onClick={handleVerifyCode}
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Loading...' : 'Verify'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function formatTimeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}
