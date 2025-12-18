import React from 'react';
import { Calendar, Clock, DollarSign, FileText, Plus, TrendingUp } from 'lucide-react';

export default function EmployeeDashboard() {
  const leaveStats = [
    { label: 'Annual Leave', used: 12, total: 25, color: 'bg-blue-500' },
    { label: 'Sick Leave', used: 3, total: 10, color: 'bg-red-500' },
    { label: 'Casual Leave', used: 5, total: 12, color: 'bg-green-500' },
  ];

  const recentApplications = [
    { id: 1, type: 'Annual Leave', dates: 'Dec 23-25, 2024', status: 'approved', days: 3 },
    { id: 2, type: 'Sick Leave', dates: 'Dec 15, 2024', status: 'pending', days: 1 },
    { id: 3, type: 'Casual Leave', dates: 'Nov 28, 2024', status: 'approved', days: 1 },
  ];

  const upcomingLeaves = [
    { type: 'Annual Leave', date: 'Dec 23-25, 2024', days: 3 },
    { type: 'Public Holiday', date: 'Jan 1, 2025', days: 1 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, Mike!</h1>
        <p className="text-blue-100">Here's an overview of your leave balance and recent activities.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Leave Days</p>
              <p className="text-3xl font-bold text-gray-900">20</p>
              <p className="text-sm text-green-600">+2 from last month</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Requests</p>
              <p className="text-3xl font-bold text-gray-900">1</p>
              <p className="text-sm text-yellow-600">Awaiting approval</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Month Salary</p>
              <p className="text-3xl font-bold text-gray-900">$4,200</p>
              <p className="text-sm text-gray-500">After deductions</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Payslips</p>
              <p className="text-3xl font-bold text-gray-900">12</p>
              <p className="text-sm text-blue-600">View all</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <FileText className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leave Balance */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Leave Balance</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Apply Leave</span>
              </button>
            </div>
          </div>
          <div className="p-6 space-y-6">
            {leaveStats.map((stat, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{stat.label}</span>
                  <span className="text-sm text-gray-500">{stat.used}/{stat.total} days</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${stat.color}`}
                    style={{ width: `${(stat.used / stat.total) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {stat.total - stat.used} days remaining
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Leaves */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming</h2>
          </div>
          <div className="p-6 space-y-4">
            {upcomingLeaves.map((leave, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{leave.type}</p>
                  <p className="text-xs text-gray-500">{leave.date}</p>
                </div>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  {leave.days} day{leave.days > 1 ? 's' : ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Leave Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Days
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentApplications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {app.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {app.dates}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {app.days}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      app.status === 'approved' 
                        ? 'bg-green-100 text-green-800'
                        : app.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}