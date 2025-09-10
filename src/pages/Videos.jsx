import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Plus, Search, Filter, Upload } from 'lucide-react'
import VideoList from '../components/video/VideoList'
import VideoUploader from '../components/video/VideoUploader'
import { videoService } from '../services/video'

const Videos = () => {
  const [showUploader, setShowUploader] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const { data: videos, isLoading, refetch } = useQuery({
    queryKey: ['videos', searchTerm, statusFilter],
    queryFn: () => videoService.getVideos({ search: searchTerm, status: statusFilter })
  })

  const handleUploadSuccess = () => {
    setShowUploader(false)
    refetch()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Videos</h1>
          <p className="text-gray-600">Manage your video library and uploads</p>
        </div>
        <button
          onClick={() => setShowUploader(true)}
          className="btn btn-primary flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Upload Video
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search videos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="input w-full sm:w-48"
        >
          <option value="all">All Status</option>
          <option value="uploading">Uploading</option>
          <option value="uploaded">Uploaded</option>
          <option value="scheduled">Scheduled</option>
          <option value="processing">Processing</option>
          <option value="published">Published</option>
          <option value="failed">Failed</option>
          <option value="deleted">Deleted</option>
        </select>
      </div>

      {/* Video List */}
      <VideoList 
        videos={videos} 
        loading={isLoading} 
        onRefresh={refetch}
      />

      {/* Upload Modal */}
      {showUploader && (
        <VideoUploader
          onClose={() => setShowUploader(false)}
          onSuccess={handleUploadSuccess}
        />
      )}
    </div>
  )
}

export default Videos
