import api from './api'

export const youtubeService = {
  async getChannels() {
    const response = await api.get('/youtube/channels')
    return response.data
  },

  async authenticateChannel(authData) {
    const response = await api.post('/youtube/authenticate', authData)
    return response.data
  },

  async updateChannel(channelId, data) {
    const response = await api.put(`/youtube/channels/${channelId}`, data)
    return response.data
  },

  async deleteChannel(channelId) {
    const response = await api.delete(`/youtube/channels/${channelId}`)
    return response.data
  },

  async getChannelInfo(channelId) {
    const response = await api.get(`/youtube/channels/${channelId}/info`)
    return response.data
  }
}
