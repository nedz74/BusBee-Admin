// Environment Configuration
// This file handles environment-specific settings with better security practices

interface Environment {
  name: 'development' | 'staging' | 'production';
  apiBaseUrl: string;
  apiTimeout: number;
}

// Environment detection
const getEnvironment = (): Environment['name'] => {
  if (__DEV__) {
    return 'development';
  }
  
  // You can add more sophisticated environment detection here
  // For example, checking build configurations or app store builds
  return 'production';
};

// Environment-specific configurations
const environments: Record<Environment['name'], Environment> = {
  development: {
    name: 'development',
    apiBaseUrl: __DEV__ ? 'http://192.168.29.226:3001' : 'http://localhost:3001',
    apiTimeout: 10000, // 10 seconds for development
  },
  
  staging: {
    name: 'staging',
    apiBaseUrl: process.env.EXPO_PUBLIC_STAGING_API_URL || 'https://staging-api.busbee.com',
    apiTimeout: 8000, // 8 seconds for staging
  },
  
  production: {
    name: 'production',
    apiBaseUrl: process.env.EXPO_PUBLIC_PROD_API_URL || 'https://api.busbee.com',
    apiTimeout: 5000, // 5 seconds for production
  },
};

// Get current environment configuration
const currentEnvironment = getEnvironment();
const config = environments[currentEnvironment];

// Security utilities
export const SecurityConfig = {
  // JWT token storage keys (prefixed for security)
  STORAGE_PREFIX: 'busbee_secure_',
  
  // Session timeout (in milliseconds)
  SESSION_TIMEOUT: 30 * 24 * 60 * 60 * 1000, // 30 days
  
  // API rate limiting
  MAX_RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
  
  // Security headers
  SECURITY_HEADERS: {
    'X-App-Version': '1.0.0',
    'X-Platform': 'mobile',
  },
};


export default config;
