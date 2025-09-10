import { 
  BarChart3, 
  Video, 
  Calendar, 
  HardDrive,
  Upload,
  Trash2,
  Users
} from 'lucide-react'

const iconMap = {
  BarChart3,
  Video,
  Calendar,
  HardDrive,
  Upload,
  Trash2,
  Users
}

const colorClasses = {
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  orange: 'bg-orange-100 text-orange-600',
  purple: 'bg-purple-100 text-purple-600',
  red: 'bg-red-100 text-red-600',
  indigo: 'bg-indigo-100 text-indigo-600'
}

const StatsCard = ({ title, value, icon, color = 'blue' }) => {
  const IconComponent = iconMap[icon.name] || icon

  return (
    <div className="card">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <IconComponent className="w-6 h-6" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  )
}

export default StatsCard
