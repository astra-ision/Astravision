// This is a simple auth implementation. In a real app, you'd want to use a proper auth service.
class Auth {
  constructor() {
    this.isAuthenticated = false;
    this.user = null;
    this.token = null;
    
    // Test credentials - for development only
    this.testCredentials = {
      email: 'test@astravision.com',
      password: 'password123'
    };
  }

  async register(userData) {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you'd make an API call here
      const response = {
        success: true,
        user: {
          id: 'user_' + Math.random().toString(36).substr(2, 9),
          name: userData.name,
          email: userData.email,
          role: 'user',
        },
        token: 'verification_' + Math.random().toString(36).substr(2, 9),
      };

      // For development - auto-verify users
      localStorage.setItem('userVerified_' + userData.email, 'true');
      
      return response;
    } catch (error) {
      throw new Error(error.message || 'Registration failed');
    }
  }

  async login(email, password) {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For development - check test credentials
      if (email === this.testCredentials.email && password === this.testCredentials.password) {
        const response = {
          success: true,
          user: {
            id: 'user_test123',
            name: 'Test User',
            email: this.testCredentials.email,
            role: 'admin', // Give admin access to test account
          },
          token: 'token_test123',
        };
        
        this.isAuthenticated = true;
        this.user = response.user;
        this.token = response.token;

        // Store auth data
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        
        return response;
      }
      
      // In a real app, you'd validate credentials with your backend
      // For development, we'll simulate successful login for any input
      const response = {
        success: true,
        user: {
          id: 'user_' + Math.random().toString(36).substr(2, 9),
          name: email.split('@')[0], // Extract name from email
          email: email,
          role: 'user',
        },
        token: 'token_' + Math.random().toString(36).substr(2, 9),
      };

      this.isAuthenticated = true;
      this.user = response.user;
      this.token = response.token;

      // Store auth data
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      return response;
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  }

  async logout() {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      this.isAuthenticated = false;
      this.user = null;
      this.token = null;

      // Clear auth data
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      
      return { success: true };
    } catch (error) {
      throw new Error(error.message || 'Logout failed');
    }
  }

  async verifyEmail(token) {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'verify-email', token }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to verify email');
      }
      
      return data;
    } catch (error) {
      console.error('Verify email error:', error);
      throw error;
    }
  }

  async forgotPassword(email) {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'reset-password', email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send password reset link');
      }
      
      return data;
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  }

  async resetPassword(token, newPassword) {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          action: 'confirm-reset-password', 
          token, 
          password: newPassword 
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to reset password');
      }
      
      return data;
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  }

  isLoggedIn() {
    // Check if user is logged in
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      this.isAuthenticated = true;
      this.user = JSON.parse(user);
      this.token = token;
      return true;
    }
    
    return false;
  }

  getUser() {
    return this.user;
  }

  getToken() {
    return this.token;
  }
}

// Export a single instance
export const auth = new Auth(); 