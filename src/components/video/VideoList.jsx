import { Video, Clock, Upload, Trash2, MoreVertical } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import config from '../../config'

const VideoList = ({ videos, loading, onRefresh }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card animate-pulse">
            <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="text-center py-12">
        <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No videos found</h3>
        <p className="text-gray-600">Upload your first video to get started</p>
      </div>
    )
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'uploading':
        return 'bg-yellow-100 text-yellow-800'
      case 'uploaded':
        return 'bg-blue-100 text-blue-800'
      case 'scheduled':
        return 'bg-purple-100 text-purple-800'
      case 'processing':
        return 'bg-orange-100 text-orange-800'
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'deleted':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'uploading':
        return Upload
      case 'scheduled':
        return Clock
      case 'deleted':
        return Trash2
      default:
        return Video
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => {
        const StatusIcon = getStatusIcon(video.status)
        
        return (
          <div key={video.id} className="card group hover:shadow-md transition-shadow duration-200">
            {/* Video Thumbnail */}
            <div className="relative h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
              {video.thumbnail_url ? (
                <img
                  src={video.thumbnail_url}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Video className="w-12 h-12 text-gray-400" />
                </div>
              )}
              
              {/* Status Badge */}
              <div className="absolute top-2 right-2">
                <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(video.status)}`}>
                  <StatusIcon className="w-3 h-3 mr-1" />
                  {video.status}
                </span>
              </div>

              {/* Action Menu */}
              <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button className="p-1 bg-white rounded-full shadow-sm hover:bg-gray-50">
                  <MoreVertical className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Video Info */}
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900 line-clamp-2">
                {video.title}
              </h3>
              
              {video.description && (
                <p className="text-sm text-gray-600 line-clamp-2">
                  {video.description}
                </p>
              )}

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>
                  {formatDistanceToNow(new Date(video.created_at), { addSuffix: true })}
                </span>
                <span>
                  {Math.round(video.file_size / (1024 * 1024))} MB
                </span>
              </div>

              {/* Tags */}
              {video.tags && video.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {video.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {video.tags.length > 3 && (
                    <span className="px-2 py-1 text-xs text-gray-500">
                      +{video.tags.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {/* Schedule Info */}
              {video.schedule?.upload_scheduled_at && (
                <div className="flex items-center text-sm text-purple-600">
                  <Clock className="w-4 h-4 mr-1" />
                  Upload: {new Date(video.schedule.upload_scheduled_at).toLocaleDateString()}
                </div>
              )}

              {video.schedule?.delete_scheduled_at && (
                <div className="flex items-center text-sm text-red-600">
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete: {new Date(video.schedule.delete_scheduled_at).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default VideoList
