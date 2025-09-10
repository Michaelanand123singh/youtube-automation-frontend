import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Calendar, Clock, Upload, Trash2 } from 'lucide-react'
import ScheduleCalendar from '../components/dashboard/ScheduleCalendar'
import { dashboardService } from '../services/dashboard'

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [view, setView] = useState('calendar') // 'calendar' or 'list'

  const { data: calendarData, isLoading: calendarLoading } = useQuery({
    queryKey: ['calendar-data', selectedDate.getFullYear(), selectedDate.getMonth() + 1],
    queryFn: () => dashboardService.getCalendarData(selectedDate.getFullYear(), selectedDate.getMonth() + 1)
  })

  const { data: upcomingSchedules, isLoading: schedulesLoading } = useQuery({
    queryKey: ['upcoming-schedules'],
    queryFn: () => dashboardService.getUpcomingSchedules(30)
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
          <p className="text-gray-600">Manage your video upload and deletion schedules</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setView('calendar')}
            className={`btn ${view === 'calendar' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Calendar
          </button>
          <button
            onClick={() => setView('list')}
            className={`btn ${view === 'list' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Clock className="w-4 h-4 mr-2" />
            List
          </button>
        </div>
      </div>

      {view === 'calendar' ? (
        <div className="card">
          <ScheduleCalendar
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            calendarData={calendarData}
            loading={calendarLoading}
          />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Upload className="w-5 h-5 mr-2 text-green-600" />
                Upcoming Uploads
              </h3>
              <div className="space-y-3">
                {schedulesLoading ? (
                  <div className="animate-pulse space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-4 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                ) : upcomingSchedules?.filter(s => s.type === 'upload').length > 0 ? (
                  upcomingSchedules
                    .filter(s => s.type === 'upload')
                    .map((schedule, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{schedule.title}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(schedule.scheduled_at).toLocaleString()}
                          </p>
                        </div>
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                          Upload
                        </span>
                      </div>
                    ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No upcoming uploads</p>
                )}
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Trash2 className="w-5 h-5 mr-2 text-red-600" />
                Upcoming Deletions
              </h3>
              <div className="space-y-3">
                {schedulesLoading ? (
                  <div className="animate-pulse space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-4 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                ) : upcomingSchedules?.filter(s => s.type === 'delete').length > 0 ? (
                  upcomingSchedules
                    .filter(s => s.type === 'delete')
                    .map((schedule, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{schedule.title}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(schedule.scheduled_at).toLocaleString()}
                          </p>
                        </div>
                        <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                          Delete
                        </span>
                      </div>
                    ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No upcoming deletions</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Schedule
