import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import notification from './notification';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export async function handleApiRequest(requestFn, options = {}) {
  const {
    loadingMessage = 'Processing request...',
    successMessage,
    errorMessage = 'An error occurred. Please try again.',
    onSuccess,
    onError,
  } = options;

  try {
    const result = await notification.promise(
      requestFn(),
      {
        loading: loadingMessage,
        success: successMessage,
        error: (err) => err.message || errorMessage,
      }
    );
    
    if (onSuccess) {
      onSuccess(result);
    }
    
    return result;
  } catch (error) {
    if (onError) {
      onError(error);
    }
    throw error;
  }
}
