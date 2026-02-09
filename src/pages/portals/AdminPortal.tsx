import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  UsersIcon, 
  Settings,
  BarChart3,
  LogOut,
  Home,
  Plus,
  TrendingUp,
  DollarSign,
  Heart
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Mock analytics data
const analyticsData = {
  totalFamilies: 156,
  familiesTrend: '+12%',
  monthlyDonations: 45230,
  donationsTrend: '+8%',
  volunteerHours: 4500,
  hoursTrend: '+15%',
  programCompletion: 87,
  completionTrend: '+5%',
};

const monthlyData = [
  { month: 'Jan', families: 120, donations: 38000 },
  { month: 'Feb', families: 132, donations: 42000 },
  { month: 'Mar', families: 145, donations: 39000 },
  { month: 'Apr', families: 138, donations: 45000 },
  { month: 'May', families: 150, donations: 48000 },
  { month: 'Jun', families: 156, donations: 45230 },
];

const recentActivities = [
  { id: 1, action: 'New family registered', user: 'Johnson Family', time: '2 hours ago' },
  { id: 2, action: 'Donation received', user: 'Anonymous', time: '3 hours ago', amount: 250 },
  { id: 3, action: 'Request approved', user: 'Staff Member', time: '4 hours ago' },
  { id: 4, action: 'Inventory updated', user: 'Staff Member', time: '5 hours ago' },
  { id: 5, action: 'New sponsor inquiry', user: 'ABC Corporation', time: '6 hours ago' },
];

const navItems = [
  { name: 'Dashboard', href: '/portal/admin', icon: LayoutDashboard },
  { name: 'Analytics', href: '/portal/admin/analytics', icon: BarChart3 },
  { name: 'All Requests', href: '/portal/admin/requests', icon: FileText },
  { name: 'Inventory', href: '/portal/admin/inventory', icon: Package },
  { name: 'Users & Families', href: '/portal/admin/users', icon: UsersIcon },
  { name: 'Settings', href: '/portal/admin/settings', icon: Settings },
];

function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="samara-tile p-6 lg:p-8">
        <h2 className="text-2xl font-bold uppercase text-[#1A1A1A] mb-2">
          Admin Dashboard
        </h2>
        <p className="text-[#6E6A63]">
          Welcome to the administration panel. Monitor performance, manage users, 
          and oversee all operations.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="samara-tile p-4">
          <div className="flex items-center justify-between mb-2">
            <UsersIcon className="w-5 h-5 text-[#F4B233]" />
            <span className="text-xs text-green-600 font-medium">{analyticsData.familiesTrend}</span>
          </div>
          <p className="text-2xl font-bold text-[#1A1A1A]">{analyticsData.totalFamilies}</p>
          <p className="text-[#6E6A63] text-xs uppercase tracking-wider">Total Families</p>
        </div>
        <div className="samara-tile p-4">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-5 h-5 text-[#F4B233]" />
            <span className="text-xs text-green-600 font-medium">{analyticsData.donationsTrend}</span>
          </div>
          <p className="text-2xl font-bold text-[#1A1A1A]">${analyticsData.monthlyDonations.toLocaleString()}</p>
          <p className="text-[#6E6A63] text-xs uppercase tracking-wider">Monthly Donations</p>
        </div>
        <div className="samara-tile p-4">
          <div className="flex items-center justify-between mb-2">
            <Heart className="w-5 h-5 text-[#F4B233]" />
            <span className="text-xs text-green-600 font-medium">{analyticsData.hoursTrend}</span>
          </div>
          <p className="text-2xl font-bold text-[#1A1A1A]">{analyticsData.volunteerHours.toLocaleString()}</p>
          <p className="text-[#6E6A63] text-xs uppercase tracking-wider">Volunteer Hours</p>
        </div>
        <div className="samara-tile p-4">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-[#F4B233]" />
            <span className="text-xs text-green-600 font-medium">{analyticsData.completionTrend}</span>
          </div>
          <p className="text-2xl font-bold text-[#1A1A1A]">{analyticsData.programCompletion}%</p>
          <p className="text-[#6E6A63] text-xs uppercase tracking-wider">Program Completion</p>
        </div>
      </div>

      {/* Charts & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <div className="samara-tile p-6">
          <h3 className="font-['Montserrat'] font-bold text-lg uppercase text-[#1A1A1A] mb-4">
            Monthly Trends
          </h3>
          <div className="h-48 flex items-end gap-2">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-1">
                  <div 
                    className="flex-1 bg-[#F4B233] rounded-t"
                    style={{ height: `${(data.families / 200) * 150}px` }}
                  />
                  <div 
                    className="flex-1 bg-[#1A1A1A]/20 rounded-t"
                    style={{ height: `${(data.donations / 60000) * 150}px` }}
                  />
                </div>
                <span className="text-xs text-[#6E6A63]">{data.month}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#F4B233] rounded" />
              <span className="text-xs text-[#6E6A63]">Families</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#1A1A1A]/20 rounded" />
              <span className="text-xs text-[#6E6A63]">Donations ($K)</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="samara-tile p-6">
          <h3 className="font-['Montserrat'] font-bold text-lg uppercase text-[#1A1A1A] mb-4">
            Recent Activity
          </h3>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 bg-[#F5F1EC] rounded-lg">
                <div className="w-2 h-2 rounded-full bg-[#F4B233] mt-1.5" />
                <div className="flex-1">
                  <p className="text-sm text-[#1A1A1A]">{activity.action}</p>
                  <p className="text-xs text-[#6E6A63]">
                    {activity.user} • {activity.time}
                    {activity.amount && ` • $${activity.amount}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/portal/admin/users" className="samara-tile p-6 hover:-translate-y-1 transition-transform">
          <Plus className="w-8 h-8 text-[#F4B233] mb-3" />
          <h3 className="font-['Montserrat'] font-bold text-lg uppercase text-[#1A1A1A]">
            Add User
          </h3>
          <p className="text-[#6E6A63] text-sm">Register new family or staff</p>
        </Link>
        <Link to="/portal/admin/inventory" className="samara-tile p-6 hover:-translate-y-1 transition-transform">
          <Package className="w-8 h-8 text-[#F4B233] mb-3" />
          <h3 className="font-['Montserrat'] font-bold text-lg uppercase text-[#1A1A1A]">
            Update Inventory
          </h3>
          <p className="text-[#6E6A63] text-sm">Manage stock levels</p>
        </Link>
        <Link to="/portal/admin/requests" className="samara-tile p-6 hover:-translate-y-1 transition-transform">
          <FileText className="w-8 h-8 text-[#F4B233] mb-3" />
          <h3 className="font-['Montserrat'] font-bold text-lg uppercase text-[#1A1A1A]">
            Review Requests
          </h3>
          <p className="text-[#6E6A63] text-sm">Approve pending requests</p>
        </Link>
      </div>
    </div>
  );
}

function Analytics() {
  return (
    <div className="space-y-6">
      <div className="samara-tile p-6">
        <h2 className="text-2xl font-bold uppercase text-[#1A1A1A] mb-4">
          Detailed Analytics
        </h2>
        <p className="text-[#6E6A63]">
          Comprehensive reporting and data visualization for organizational performance.
        </p>
      </div>

      {/* Program Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="samara-tile p-6">
          <h3 className="font-['Montserrat'] font-bold text-lg uppercase text-[#1A1A1A] mb-4">
            Program Performance
          </h3>
          <div className="space-y-4">
            {[
              { name: 'Housing Stability', served: 89, target: 100 },
              { name: 'Baby Supplies', served: 234, target: 250 },
              { name: 'Childcare Support', served: 67, target: 80 },
              { name: 'Emergency Assistance', served: 45, target: 50 },
            ].map((program) => (
              <div key={program.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[#1A1A1A]">{program.name}</span>
                  <span className="text-[#6E6A63]">{program.served}/{program.target}</span>
                </div>
                <div className="h-2 bg-[#F5F1EC] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#F4B233] rounded-full"
                    style={{ width: `${(program.served / program.target) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="samara-tile p-6">
          <h3 className="font-['Montserrat'] font-bold text-lg uppercase text-[#1A1A1A] mb-4">
            Demographics
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-[#6E6A63] mb-2">Household Size</p>
              <div className="flex gap-2">
                {[
                  { label: '1-2', value: 25 },
                  { label: '3-4', value: 45 },
                  { label: '5+', value: 30 },
                ].map((item) => (
                  <div key={item.label} className="flex-1">
                    <div 
                      className="bg-[#F4B233] rounded-lg mb-1"
                      style={{ height: `${item.value * 2}px` }}
                    />
                    <p className="text-xs text-center text-[#6E6A63]">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-[#6E6A63] mb-2">Children per Household</p>
              <div className="flex gap-2">
                {[
                  { label: '0', value: 15 },
                  { label: '1', value: 35 },
                  { label: '2', value: 30 },
                  { label: '3+', value: 20 },
                ].map((item) => (
                  <div key={item.label} className="flex-1">
                    <div 
                      className="bg-[#1A1A1A]/20 rounded-lg mb-1"
                      style={{ height: `${item.value * 2}px` }}
                    />
                    <p className="text-xs text-center text-[#6E6A63]">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AllRequests() {
  return (
    <div className="space-y-6">
      <div className="samara-tile p-6">
        <h2 className="text-2xl font-bold uppercase text-[#1A1A1A] mb-4">
          All Requests
        </h2>
        <p className="text-[#6E6A63]">
          View and manage all family requests across all programs.
        </p>
      </div>
      {/* Request management content would go here */}
    </div>
  );
}

function AdminInventory() {
  return (
    <div className="space-y-6">
      <div className="samara-tile p-6">
        <h2 className="text-2xl font-bold uppercase text-[#1A1A1A] mb-4">
          Inventory Management
        </h2>
        <p className="text-[#6E6A63]">
          Full inventory control with donation logging and stock alerts.
        </p>
      </div>
      {/* Inventory management content would go here */}
    </div>
  );
}

function Users() {
  return (
    <div className="space-y-6">
      <div className="samara-tile p-6">
        <h2 className="text-2xl font-bold uppercase text-[#1A1A1A] mb-4">
          User Management
        </h2>
        <p className="text-[#6E6A63]">
          Manage family accounts, staff access, and user permissions.
        </p>
      </div>
      {/* User management content would go here */}
    </div>
  );
}

function AdminSettings() {
  return (
    <div className="space-y-6">
      <div className="samara-tile p-6">
        <h2 className="text-2xl font-bold uppercase text-[#1A1A1A] mb-4">
          System Settings
        </h2>
        <p className="text-[#6E6A63]">
          Configure portal settings, notifications, and system preferences.
        </p>
      </div>
      {/* Settings content would go here */}
    </div>
  );
}

export default function AdminPortal() {
  const location = useLocation();
  const { logout } = useAuth();

  return (
    <div className="bg-[#F5F1EC] pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="samara-tile p-4 sticky top-28">
              <div className="mb-6 px-4">
                <p className="text-xs text-[#6E6A63] uppercase tracking-wider">Admin Portal</p>
                <p className="font-medium text-[#1A1A1A]">Admin User</p>
              </div>
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                        isActive
                          ? 'bg-[#F4B233] text-[#1A1A1A]'
                          : 'text-[#6E6A63] hover:bg-[#1A1A1A]/5'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
              <div className="mt-6 pt-6 border-t border-[#1A1A1A]/10">
                <Link
                  to="/"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#6E6A63] hover:bg-[#1A1A1A]/5 transition-colors"
                >
                  <Home className="w-5 h-5" />
                  <span className="font-medium">Back to Site</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-[#6E6A63] hover:bg-red-50 hover:text-red-600 transition-colors w-full"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/requests" element={<AllRequests />} />
              <Route path="/inventory" element={<AdminInventory />} />
              <Route path="/users" element={<Users />} />
              <Route path="/settings" element={<AdminSettings />} />
              <Route path="*" element={<Navigate to="/portal/admin" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}
