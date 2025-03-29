import toast from 'react-hot-toast';

const notification = {
  success: (message) => {
    toast.success(message, {
      duration: 5000,
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  },
  
  error: (message) => {
    toast.error(message, {
      duration: 5000,
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  },
  
  info: (message) => {
    toast(message, {
      icon: 'ℹ️',
      duration: 5000,
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  },
  
  warning: (message) => {
    toast(message, {
      icon: '⚠️',
      duration: 5000,
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  },
  
  promise: (promise, messages) => {
    return toast.promise(
      promise,
      {
        loading: messages.loading || 'Loading...',
        success: messages.success || 'Success!',
        error: messages.error || 'Error!',
      },
      {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }
    );
  },
  
  custom: (message, options) => {
    return toast(message, options);
  },
  
  dismiss: (toastId) => {
    toast.dismiss(toastId);
  }
};

export default notification; 