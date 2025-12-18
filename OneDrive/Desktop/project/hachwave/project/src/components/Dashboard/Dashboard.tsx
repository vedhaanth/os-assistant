import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import EmployeeDashboard from './EmployeeDashboard';
import ManagerDashboard from './ManagerDashboard';
import AdminDashboard from './AdminDashboard';
import LeaveManagement from '../Leave/LeaveManagement';
import PayrollManagement from '../Payroll/PayrollManagement';
import UserProfile from '../Profile/UserProfile';
import { useAuth } from '../../hooks/useAuth';

export type ActiveView = 'dashboard' | 'leaves' | 'payroll' | 'employees' | 'reports' | 'profile' | 'settings';

export default function Dashboard() {
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { user } = useAuth();

  const renderMainContent = () => {
    switch (activeView) {
      case 'dashboard':
        if (user?.role === 'admin') return <AdminDashboard />;
        if (user?.role === 'manager') return <ManagerDashboard />;
        return <EmployeeDashboard />;
      
      case 'leaves':
        return <LeaveManagement />;
      
      case 'payroll':
        return <PayrollManagement />;
      
      case 'profile':
        return <UserProfile />;
      
      default:
        return <div className="p-6"><div className="text-center text-gray-500">Feature coming soon...</div></div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <Header />
        <main className="flex-1 overflow-y-auto">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
}