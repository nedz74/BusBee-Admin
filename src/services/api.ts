import AsyncStorage from '@react-native-async-storage/async-storage';
import config, { SecurityConfig } from '../config/environment';

// API Configuration from secure environment config
const API_BASE_URL = config.apiBaseUrl;

// Secure storage keys with prefix
const STORAGE_KEYS = {
  ACCESS_TOKEN: `${SecurityConfig.STORAGE_PREFIX}access_token`,
  REFRESH_TOKEN: `${SecurityConfig.STORAGE_PREFIX}refresh_token`,
  USER_DATA: `${SecurityConfig.STORAGE_PREFIX}user_data`,
  USER_TYPE: `${SecurityConfig.STORAGE_PREFIX}user_type`,
  TOKEN_EXPIRES_AT: `${SecurityConfig.STORAGE_PREFIX}token_expires_at`,
};

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface User {
  id: string;
  phoneNumber: string;
  name?: string;
  email?: string;
  userType: 'user' | 'bus_owner';
  isVerified: boolean;
  profile?: any;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: string;
  isNewUser: boolean;
}

// API Service Class
class ApiService {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  constructor() {
    this.loadTokens();
  }

  // Load tokens from storage
  private async loadTokens() {
    try {
      this.accessToken = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      this.refreshToken = await AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    } catch (error) {
      // Silently handle token loading errors
    }
  }

  // Save tokens to storage
  private async saveTokens(accessToken: string, refreshToken: string) {
    try {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      await AsyncStorage.multiSet([
        [STORAGE_KEYS.ACCESS_TOKEN, accessToken],
        [STORAGE_KEYS.REFRESH_TOKEN, refreshToken],
      ]);
    } catch (error) {
      // Silently handle token saving errors
    }
  }

  // Remove tokens from storage
  private async removeTokens() {
    try {
      this.accessToken = null;
      this.refreshToken = null;
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.ACCESS_TOKEN,
        STORAGE_KEYS.REFRESH_TOKEN,
        STORAGE_KEYS.USER_DATA,
        STORAGE_KEYS.TOKEN_EXPIRES_AT,
      ]);
    } catch (error) {
      // Silently handle token removal errors
    }
  }

  // Check if access token is expired
  private async isTokenExpired(): Promise<boolean> {
    try {
      const expiresAt = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN_EXPIRES_AT);
      if (!expiresAt) return true;
      
      const expirationTime = new Date(expiresAt).getTime();
      const currentTime = new Date().getTime();
      
      // Consider token expired if it expires within 5 minutes
      return currentTime >= (expirationTime - 5 * 60 * 1000);
    } catch (error) {
      return true;
    }
  }

  // Refresh access token
  private async refreshAccessToken(): Promise<boolean> {
    try {
      if (!this.refreshToken) {
        return false;
      }

      const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.refreshToken}`,
        },
      });

      const data = await response.json();

      if (response.ok && data.success) {
        await this.saveTokens(data.data.accessToken, data.data.refreshToken);
        return true;
      } else {
        await this.removeTokens();
        return false;
      }
    } catch (error) {
      await this.removeTokens();
      return false;
    }
  }

  // Calculate expiration time from duration string (e.g., '7d', '24h')
  private calculateExpirationTime(expiresIn: string): Date {
    const now = new Date();
    const match = expiresIn.match(/^(\d+)([dhms])$/);
    
    if (!match) {
      // Default to 7 days if format is invalid
      return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    }

    const [, amount, unit] = match;
    const value = parseInt(amount, 10);

    switch (unit) {
      case 'd': // days
        return new Date(now.getTime() + value * 24 * 60 * 60 * 1000);
      case 'h': // hours
        return new Date(now.getTime() + value * 60 * 60 * 1000);
      case 'm': // minutes
        return new Date(now.getTime() + value * 60 * 1000);
      case 's': // seconds
        return new Date(now.getTime() + value * 1000);
      default:
        return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    }
  }

  // Make API request with common headers and error handling
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
    skipAuth: boolean = false
  ): Promise<ApiResponse<T>> {
    try {
      // Check if token needs refresh (unless skipping auth)
      if (!skipAuth && this.accessToken && await this.isTokenExpired()) {
        const refreshed = await this.refreshAccessToken();
        if (!refreshed) {
          throw new Error('Session expired. Please login again.');
        }
      }

      const url = `${API_BASE_URL}${endpoint}`;
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...SecurityConfig.SECURITY_HEADERS, // Add security headers
      };

      // Add any additional headers from options
      if (options.headers) {
        Object.assign(headers, options.headers);
      }

      // Add authorization header if access token exists (unless skipping auth)
      if (!skipAuth && this.accessToken) {
        headers.Authorization = `Bearer ${this.accessToken}`;
      }

      // Create a timeout promise with configurable timeout
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), config.apiTimeout)
      );

      // Make the fetch request with timeout
      const fetchPromise = fetch(url, {
        ...options,
        headers,
      });

      const response = await Promise.race([fetchPromise, timeoutPromise]) as Response;

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      // Handle different types of network errors
      if (error instanceof TypeError) {
        if (error.message.includes('Network request failed')) {
          throw new Error('Cannot connect to server. Make sure the backend is running and accessible.');
        }
        if (error.message.includes('timeout')) {
          throw new Error('Request timed out. Server may be slow or unreachable.');
        }
      }
      
      throw error;
    }
  }

  // Authentication Methods

  // Send OTP to phone number
  async sendOTP(phoneNumber: string, userType: 'user' | 'bus_owner' = 'user'): Promise<ApiResponse> {
    return this.makeRequest('/api/auth/send-otp', {
      method: 'POST',
      body: JSON.stringify({
        phoneNumber,
        userType,
      }),
    }, true); // Skip auth for OTP sending
  }

  // Verify OTP and login/register
  async verifyOTP(
    phoneNumber: string, 
    otp: string, 
    userType: 'user' | 'bus_owner' = 'user',
    deviceInfo: any = {}
  ): Promise<ApiResponse<LoginResponse>> {
    const response = await this.makeRequest<LoginResponse>('/api/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify({
        phoneNumber,
        otp,
        userType,
        deviceInfo,
      }),
    }, true); // Skip auth for login

    // Save JWT tokens and user data on successful login
    if (response.success && response.data) {
      await this.saveTokens(response.data.accessToken, response.data.refreshToken);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.data.user));
      await AsyncStorage.setItem(STORAGE_KEYS.USER_TYPE, response.data.user.userType);
      
      // Calculate and save token expiration time
      const expiresIn = response.data.expiresIn || '7d';
      const expirationTime = this.calculateExpirationTime(expiresIn);
      await AsyncStorage.setItem(STORAGE_KEYS.TOKEN_EXPIRES_AT, expirationTime.toISOString());
    }

    return response;
  }

  // Resend OTP
  async resendOTP(phoneNumber: string): Promise<ApiResponse> {
    return this.makeRequest('/api/auth/resend-otp', {
      method: 'POST',
      body: JSON.stringify({
        phoneNumber,
      }),
    }, true); // Skip auth for resending OTP
  }

  // Get current user profile
  async getCurrentUser(): Promise<ApiResponse<{ user: User }>> {
    return this.makeRequest('/api/auth/me', {
      method: 'GET',
    });
  }

  // Logout user
  async logout(): Promise<ApiResponse> {
    const response = await this.makeRequest('/api/auth/logout', {
      method: 'POST',
    }); // Uses JWT auth automatically

    // Clear local storage
    await this.removeTokens();

    return response;
  }

  // Utility Methods

  // Check if user is logged in
  async isLoggedIn(): Promise<boolean> {
    try {
      const accessToken = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      const refreshToken = await AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
      
      // User is logged in if they have at least a refresh token
      return !!(accessToken || refreshToken);
    } catch (error) {
      return false;
    }
  }

  // Simple session validation without API calls to prevent loops
  async validateSession(): Promise<boolean> {
    try {
      // Just check if we have stored tokens and user data
      const accessToken = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      const refreshToken = await AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      
      // Session is valid if we have tokens and user data
      return !!(accessToken || refreshToken) && !!userData;
      
    } catch (error) {
      return false;
    }
  }

  // Get stored user data
  async getStoredUserData(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      return null;
    }
  }

  // Get stored user type
  async getStoredUserType(): Promise<'user' | 'bus_owner' | null> {
    try {
      const userType = await AsyncStorage.getItem(STORAGE_KEYS.USER_TYPE);
      return userType as 'user' | 'bus_owner' | null;
    } catch (error) {
      return null;
    }
  }

  // Clear all stored data
  async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.ACCESS_TOKEN,
        STORAGE_KEYS.REFRESH_TOKEN,
        STORAGE_KEYS.USER_DATA,
        STORAGE_KEYS.USER_TYPE,
        STORAGE_KEYS.TOKEN_EXPIRES_AT,
      ]);
      this.accessToken = null;
      this.refreshToken = null;
    } catch (error) {
      // Silently handle data clearing errors
    }
  }

  // Test API connection
  async testConnection(): Promise<boolean> {
    try {
      const response = await this.makeRequest('/');
      return response.success;
    } catch (error) {
      return false;
    }
  }


  // Manually refresh token (for internal use)
  async manualRefreshToken(): Promise<boolean> {
    return await this.refreshAccessToken();
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;
