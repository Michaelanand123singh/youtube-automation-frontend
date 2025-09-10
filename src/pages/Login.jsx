import { useState } from 'react'
import { useAuth } from '../hooks/useAuth.jsx'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { Youtube, Upload, Calendar } from 'lucide-react'
import config from '../config'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleGoogleLogin = async () => {
    try {
      setLoading(true)
      
      // Check if Google Client ID is configured
      if (!config.googleClientId) {
        toast.error('Google OAuth is not configured. Please set VITE_GOOGLE_CLIENT_ID in your .env file.')
        setLoading(false)
        return
      }
      
      // Initialize Google OAuth
      if (typeof window.google === 'undefined') {
        toast.error('Google OAuth not loaded. Please refresh the page.')
        return
      }

      const client = window.google.accounts.oauth2.initCodeClient({
        client_id: config.googleClientId,
        scope: config.googleScopes.join(' '),
        ux_mode: 'popup',
        callback: async (response) => {
          try {
            await login(response.code)
            toast.success('Login successful!')
            navigate('/dashboard')
          } catch (error) {
            console.error('Login error:', error)
            toast.error('Login failed. Please try again.')
          } finally {
            setLoading(false)
          }
        }
      })

      client.requestCode()
    } catch (error) {
      console.error('Google login error:', error)
      toast.error('Failed to initialize Google login')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-primary-600 rounded-full flex items-center justify-center mb-4">
            <Youtube className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            YouTube Scheduler
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to manage your YouTube content
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Features
            </h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Upload className="h-5 w-5 text-primary-600 mr-3" />
                <span className="text-sm text-gray-600">
                  Upload videos to Google Drive
                </span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-primary-600 mr-3" />
                <span className="text-sm text-gray-600">
                  Schedule YouTube uploads
                </span>
              </div>
              <div className="flex items-center">
                <Youtube className="h-5 w-5 text-primary-600 mr-3" />
                <span className="text-sm text-gray-600">
                  Manage YouTube content
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
