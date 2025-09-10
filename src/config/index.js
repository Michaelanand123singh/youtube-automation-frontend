// Frontend configuration from environment variables
export const config = {
  // Google OAuth
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
  
  // API Configuration
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  
  // Application Configuration
  appName: import.meta.env.VITE_APP_NAME || 'YouTube Scheduler',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
  
  // Google OAuth Scopes
  googleScopes: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/youtube.upload',
    'https://www.googleapis.com/auth/youtube'
  ],
  
  // File Upload Configuration
  maxFileSize: 100 * 1024 * 1024, // 100MB
  allowedVideoTypes: [
    'video/mp4',
    'video/avi', 
    'video/mov',
    'video/wmv',
    'video/flv',
    'video/webm'
  ],
  
  // Validation
  validateConfig() {
    const errors = []
    
    if (!this.googleClientId) {
      console.warn('VITE_GOOGLE_CLIENT_ID is not set. Google OAuth will not work.')
    }
    
    if (!this.apiBaseUrl) {
      errors.push('VITE_API_BASE_URL is required')
    }
    
    if (errors.length > 0) {
      console.error('Configuration errors:', errors)
      throw new Error(`Missing required environment variables: ${errors.join(', ')}`)
    }
  }
}

// Validate configuration on import
config.validateConfig()

export default config
