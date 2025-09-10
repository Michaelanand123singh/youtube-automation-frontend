import { useState } from 'react'
import Calendar from 'react-calendar'
import { ChevronLeft, ChevronRight, Upload, Trash2 } from 'lucide-react'
import { format, isSameDay } from 'date-fns'

const ScheduleCalendar = ({ selectedDate, onDateChange, calendarData, loading }) => {
  const [view, setView] = useState('month')

  const tileContent = ({ date, view }) => {
    if (view !== 'month' || !calendarData) return null

    const dayData = calendarData[format(date, 'yyyy-MM-dd')]
    if (!dayData) return null

    const uploads = dayData.uploads || []
    const deletions = dayData.deletions || []

    return (
      <div className="mt-1 space-y-1">
        {uploads.slice(0, 2).map((upload, index) => (
          <div
            key={`upload-${index}`}
            className="flex items-center text-xs bg-green-100 text-green-800 rounded px-1 py-0.5"
          >
            <Upload className="w-3 h-3 mr-1" />
            <span className="truncate">{upload.title}</span>
          </div>
        ))}
        {deletions.slice(0, 2).map((deletion, index) => (
          <div
            key={`deletion-${index}`}
            className="flex items-center text-xs bg-red-100 text-red-800 rounded px-1 py-0.5"
          >
            <Trash2 className="w-3 h-3 mr-1" />
            <span className="truncate">{deletion.title}</span>
          </div>
        ))}
        {(uploads.length + deletions.length) > 4 && (
          <div className="text-xs text-gray-500 text-center">
            +{(uploads.length + deletions.length) - 4} more
          </div>
        )}
      </div>
    )
  }

  const tileClassName = ({ date, view }) => {
    if (view !== 'month' || !calendarData) return null

    const dayData = calendarData[format(date, 'yyyy-MM-dd')]
    if (!dayData) return null

    const hasUploads = dayData.uploads && dayData.uploads.length > 0
    const hasDeletions = dayData.deletions && dayData.deletions.length > 0

    if (hasUploads && hasDeletions) {
      return 'bg-gradient-to-br from-green-50 to-red-50 border-green-200'
    } else if (hasUploads) {
      return 'bg-green-50 border-green-200'
    } else if (hasDeletions) {
      return 'bg-red-50 border-red-200'
    }

    return null
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          {format(selectedDate, 'MMMM yyyy')}
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setView(view === 'month' ? 'year' : 'month')}
            className="btn btn-secondary text-sm"
          >
            {view === 'month' ? 'Year View' : 'Month View'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <Calendar
          onChange={onDateChange}
          value={selectedDate}
          view={view}
          tileContent={tileContent}
          tileClassName={tileClassName}
          className="w-full"
          navigationLabel={({ date }) => format(date, 'MMMM yyyy')}
          prevLabel={<ChevronLeft className="w-5 h-5" />}
          nextLabel={<ChevronRight className="w-5 h-5" />}
        />
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-100 border border-green-200 rounded mr-2"></div>
          <span className="text-gray-600">Uploads</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-100 border border-red-200 rounded mr-2"></div>
          <span className="text-gray-600">Deletions</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gradient-to-br from-green-50 to-red-50 border border-green-200 rounded mr-2"></div>
          <span className="text-gray-600">Both</span>
        </div>
      </div>
    </div>
  )
}

export default ScheduleCalendar
