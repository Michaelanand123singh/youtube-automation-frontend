import { Video, Calendar, Upload, Trash2, Clock } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

const RecentActivities = ({ activities, loading }) => {
  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="text-center py-6">
        <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-500">No recent activities</p>
      </div>
    )
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case 'video':
        return Video
      case 'upload':
        return Upload
      case 'delete':
        return Trash2
      case 'schedule':
        return Calendar
      default:
        return Video
    }
  }

  const getActivityColor = (type) => {
    switch (type) {
      case 'video':
        return 'text-blue-600 bg-blue-100'
      case 'upload':
        return 'text-green-600 bg-green-100'
      case 'delete':
        return 'text-red-600 bg-red-100'
      case 'schedule':
        return 'text-orange-600 bg-orange-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="space-y-3">
      {activities.map((activity, index) => {
        const IconComponent = getActivityIcon(activity.type)
        const colorClass = getActivityColor(activity.type)
        
        return (
          <div key={index} className="flex items-start space-x-3">
            <div className={`p-2 rounded-full ${colorClass}`}>
              <IconComponent className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {activity.title}
              </p>
              <p className="text-xs text-gray-500">
                {formatDistanceToNow(new Date(activity.updated_at), { addSuffix: true })}
              </p>
              {activity.status && (
                <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                  activity.status === 'published' ? 'bg-green-100 text-green-800' :
                  activity.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                  activity.status === 'failed' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {activity.status}
                </span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default RecentActivities
