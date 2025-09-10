import { Calendar, Upload, Trash2, Clock } from 'lucide-react'
import { format, isToday, isTomorrow } from 'date-fns'

const UpcomingSchedules = ({ schedules, loading }) => {
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

  if (!schedules || schedules.length === 0) {
    return (
      <div className="text-center py-6">
        <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-500">No upcoming schedules</p>
      </div>
    )
  }

  const getScheduleIcon = (type) => {
    switch (type) {
      case 'upload':
        return Upload
      case 'delete':
        return Trash2
      default:
        return Calendar
    }
  }

  const getScheduleColor = (type) => {
    switch (type) {
      case 'upload':
        return 'text-green-600 bg-green-100'
      case 'delete':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const formatScheduleTime = (date) => {
    const scheduleDate = new Date(date)
    
    if (isToday(scheduleDate)) {
      return `Today at ${format(scheduleDate, 'h:mm a')}`
    } else if (isTomorrow(scheduleDate)) {
      return `Tomorrow at ${format(scheduleDate, 'h:mm a')}`
    } else {
      return format(scheduleDate, 'MMM d, h:mm a')
    }
  }

  return (
    <div className="space-y-3">
      {schedules.map((schedule, index) => {
        const IconComponent = getScheduleIcon(schedule.type)
        const colorClass = getScheduleColor(schedule.type)
        
        return (
          <div key={index} className="flex items-start space-x-3">
            <div className={`p-2 rounded-full ${colorClass}`}>
              <IconComponent className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {schedule.title}
              </p>
              <p className="text-xs text-gray-500">
                {formatScheduleTime(schedule.scheduled_at)}
              </p>
              <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                schedule.type === 'upload' ? 'bg-green-100 text-green-800' :
                schedule.type === 'delete' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {schedule.type}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default UpcomingSchedules
