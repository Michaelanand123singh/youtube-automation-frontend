import api from './api'

export const videoService = {
  async getVideos(params = {}) {
    const response = await api.get('/videos', { params })
    return response.data
  },

  async getVideo(id) {
    const response = await api.get(`/videos/${id}`)
    return response.data
  },

  async updateVideo(id, data) {
    const response = await api.put(`/videos/${id}`, data)
    return response.data
  },

  async deleteVideo(id) {
    const response = await api.delete(`/videos/${id}`)
    return response.data
  },

  async uploadVideo(formData) {
    const response = await api.post('/videos/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  async scheduleUpload(videoId, scheduledAt, youtubeChannelId) {
    const response = await api.post(`/videos/${videoId}/schedule-upload`, {
      scheduled_at: scheduledAt,
      youtube_channel_id: youtubeChannelId
    })
    return response.data
  },

  async scheduleDelete(videoId, scheduledAt) {
    const response = await api.post(`/videos/${videoId}/schedule-delete`, {
      scheduled_at: scheduledAt
    })
    return response.data
  },

  async getScheduledVideos() {
    const response = await api.get('/videos/scheduled')
    return response.data
  }
}
