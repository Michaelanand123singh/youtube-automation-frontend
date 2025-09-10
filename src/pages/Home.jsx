import { useAuth } from '../hooks/useAuth.jsx'
import { Link } from 'react-router-dom'
import { Upload, Calendar, BarChart3, Video } from 'lucide-react'

const Home = () => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            YouTube Video Scheduler
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Upload videos to Google Drive, schedule them for YouTube upload, and manage your content with ease.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="btn btn-primary text-lg px-8 py-3"
            >
              Get Started
            </Link>
            <button className="btn btn-secondary text-lg px-8 py-3">
              Learn More
            </button>
          </div>
        </div>
      </div>
    )
  }

  const features = [
    {
      icon: Upload,
      title: 'Upload Videos',
      description: 'Upload your videos to Google Drive with metadata management',
      link: '/videos'
    },
    {
      icon: Calendar,
      title: 'Schedule Uploads',
      description: 'Schedule when your videos should be uploaded to YouTube',
      link: '/schedule'
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'Track your video performance and scheduling statistics',
      link: '/dashboard'
    },
    {
      icon: Video,
      title: 'Manage Content',
      description: 'Organize and manage your video library efficiently',
      link: '/videos'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to YouTube Scheduler
        </h1>
        <p className="text-gray-600">
          Manage your YouTube content with automated scheduling and organization.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Link
            key={index}
            to={feature.link}
            className="card hover:shadow-md transition-shadow duration-200 group"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors duration-200">
                <feature.icon className="w-6 h-6 text-primary-600" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm">
              {feature.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home
