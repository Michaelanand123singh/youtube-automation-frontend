import { useQuery } from '@tanstack/react-query'
import { BarChart3, Video, Calendar, HardDrive } from 'lucide-react'
import StatsCard from '../components/dashboard/StatsCard'
import RecentActivities from '../components/dashboard/RecentActivities'
import UpcomingSchedules from '../components/dashboard/UpcomingSchedules'
import { dashboardService } from '../services/dashboard'

const Dashboard = () => {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: dashboardService.getStats
  })

  const { data: recentActivities, isLoading: activitiesLoading } = useQuery({
    queryKey: ['recent-activities'],
    queryFn: dashboardService.getRecentActivities
  })

  const { data: upcomingSchedules, isLoading: schedulesLoading } = useQuery({
    queryKey: ['upcoming-schedules'],
    queryFn: () => dashboardService.getUpcomingSchedules(7)
  })

  if (statsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const statCards = [
    {
      title: 'Total Videos',
      value: stats?.total_videos || 0,
      icon: Video,
      color: 'blue'
    },
    {
      title: 'Scheduled Uploads',
      value: stats?.scheduled_uploads || 0,
      icon: Calendar,
      color: 'green'
    },
    {
      title: 'Scheduled Deletions',
      value: stats?.scheduled_deletions || 0,
      icon: Calendar,
      color: 'orange'
    },
    {
      title: 'Storage Used',
      value: `${stats?.total_storage_mb || 0} MB`,
      icon: HardDrive,
      color: 'purple'
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Overview of your YouTube scheduling activity</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activities
          </h2>
          <RecentActivities 
            activities={recentActivities} 
            loading={activitiesLoading} 
          />
        </div>

        {/* Upcoming Schedules */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Upcoming Schedules
          </h2>
          <UpcomingSchedules 
            schedules={upcomingSchedules} 
            loading={schedulesLoading} 
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
