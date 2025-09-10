import api from './api'

export const dashboardService = {
  async getStats() {
    const response = await api.get('/dashboard/stats')
    return response.data
  },

  async getRecentActivities(limit = 10) {
    const response = await api.get(`/dashboard/recent?limit=${limit}`)
    return response.data
  },

  async getUpcomingSchedules(days = 7) {
    const response = await api.get(`/dashboard/upcoming?days=${days}`)
    return response.data
  },

  async getCalendarData(year, month) {
    const response = await api.get(`/dashboard/calendar?year=${year}&month=${month}`)
    return response.data
  }
}
