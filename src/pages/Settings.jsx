import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { User, Youtube, Shield, Bell } from 'lucide-react'
import { youtubeService } from '../services/youtube'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile')

  const { data: channels, isLoading: channelsLoading } = useQuery({
    queryKey: ['youtube-channels'],
    queryFn: youtubeService.getChannels
  })

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'youtube', label: 'YouTube', icon: Youtube },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const IconComponent = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <IconComponent className="w-5 h-5 mr-3" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="input"
                    placeholder="your@email.com"
                    disabled
                  />
                </div>
                <button className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'youtube' && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">YouTube Channels</h2>
              <div className="space-y-4">
                {channelsLoading ? (
                  <div className="animate-pulse space-y-3">
                    {[...Array(2)].map((_, i) => (
                      <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
                    ))}
                  </div>
                ) : channels && channels.length > 0 ? (
                  channels.map((channel) => (
                    <div key={channel.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {channel.thumbnail_url ? (
                          <img
                            src={channel.thumbnail_url}
                            alt={channel.title}
                            className="w-12 h-12 rounded-full"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                            <Youtube className="w-6 h-6 text-gray-600" />
                          </div>
                        )}
                        <div>
                          <h3 className="font-medium text-gray-900">{channel.title}</h3>
                          <p className="text-sm text-gray-600">
                            {channel.subscriber_count?.toLocaleString()} subscribers
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                          Connected
                        </span>
                        <button className="btn btn-secondary text-sm">
                          Disconnect
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Youtube className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 mb-4">No YouTube channels connected</p>
                    <button className="btn btn-primary">
                      Connect YouTube Channel
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Upload Notifications</h3>
                    <p className="text-sm text-gray-600">Get notified when videos are uploaded</p>
                  </div>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Schedule Reminders</h3>
                    <p className="text-sm text-gray-600">Get reminded before scheduled uploads</p>
                  </div>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Error Alerts</h3>
                    <p className="text-sm text-gray-600">Get notified when uploads fail</p>
                  </div>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
                <button className="btn btn-primary">
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Connected Accounts</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-900">Google Account</span>
                      </div>
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                        Connected
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Data Management</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Manage your data and privacy settings
                  </p>
                  <button className="btn btn-secondary">
                    Download Data
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings
