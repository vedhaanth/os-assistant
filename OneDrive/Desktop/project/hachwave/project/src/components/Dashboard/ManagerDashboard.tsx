import React from 'react';
import { Users, Clock, CheckCircle, AlertCircle, TrendingUp, Calendar, DollarSign, FileText } from 'lucide-react';

export default function ManagerDashboard() {
  const teamStats = [
    { name: 'John Smith', status: 'present', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2' },
    { name: 'Alice Johnson', status: 'on-leave', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2' },
    { name: 'Mike Davis', status: 'present', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2' },
    { name: 'Sarah Wilson', status: 'remote', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2' },
  ];

  const pendingApprovals = [
    { id: 1, employee: 'Mike Davis', type: 'Annual Leave', dates: 'Jan 15-17, 2025', days: 3, urgent: false },
    { id: 2, employee: 'Sarah Wilson', type: 'Sick Leave', dates: 'Jan 8, 2025', days: 1, urgent: true },
    { id: 3, employee: 'John Smith', type: 'Casual Leave', dates: 'Jan 20, 2025', days: 1, urgent: false },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Manager Dashboard</h1>
        <p className="text-green-100">Manage your team's leaves and oversee department operations.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Team Members</p>
              <p className="text-3xl font-bold text-gray-900">15</p>
              <p className="text-sm text-green-600">+2 this month</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Approvals</p>
              <p className="text-3xl font-bold text-gray-900">3</p>
              <p className="text-sm text-red-600">1 urgent</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">On Leave Today</p>
              <p className="text-3xl font-bold text-gray-900">2</p>
              <p className="text-sm text-gray-500">13% of team</p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <Calendar className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Department Budget</p>
              <p className="text-3xl font-bold text-gray-900">$85K</p>
              <p className="text-sm text-green-600">Within limit</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Approvals */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Pending Approvals</h2>
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                {pendingApprovals.length} pending
              </span>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {pendingApprovals.map((approval) => (
              <div key={approval.id} className={`p-4 rounded-lg border-l-4 ${
                approval.urgent ? 'border-red-400 bg-red-50' : 'border-blue-400 bg-blue-50'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-gray-900">{approval.employee}</h3>
                      {approval.urgent && (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{approval.type} • {approval.dates}</p>
                    <p className="text-xs text-gray-500">{approval.days} day{approval.days > 1 ? 's' : ''}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700 transition-colors">
                      Decline
                    </button>
                    <button className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-700 transition-colors">
                      Approve
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Team Status</h2>
          </div>
          <div className="p-6 space-y-4">
            {teamStats.map((member, index) => (
              <div key={index} className="flex items-center space-x-3">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{member.name}</p>
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${
                      member.status === 'present' ? 'bg-green-400' : 
                      member.status === 'on-leave' ? 'bg-red-400' : 'bg-yellow-400'
                    }`}></div>
                    <p className="text-xs text-gray-500 capitalize">
                      {member.status.replace('-', ' ')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FileText className="w-8 h-8 text-blue-600" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Generate Reports</p>
              <p className="text-sm text-gray-500">Team leave & attendance</p>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <div className="text-left">
              <p className="font-medium text-gray-900">View Analytics</p>
              <p className="text-sm text-gray-500">Department insights</p>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Users className="w-8 h-8 text-purple-600" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Manage Team</p>
              <p className="text-sm text-gray-500">Employee settings</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}