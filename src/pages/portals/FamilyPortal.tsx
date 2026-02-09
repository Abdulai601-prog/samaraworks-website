import { useState } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  User, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  ShoppingCart,
  LogOut,
  ChevronRight,
  Home
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

// Mock data
const mockRequests = [
  { id: 'REQ-001', type: 'Baby Supplies', status: 'approved', date: '2026-01-15', items: ['Diapers Size 3', 'Baby Wipes', 'Formula'] },
  { id: 'REQ-002', type: 'Housing Assistance', status: 'pending', date: '2026-02-01', items: ['Rental Assistance'] },
  { id: 'REQ-003', type: 'Emergency Aid', status: 'delivered', date: '2026-01-10', items: ['Food Package', 'Utility Bill'] },
];

const mockAvailableItems = [
  { id: 1, name: 'Diapers Size 1', category: 'Diapers', quantity: 50 },
  { id: 2, name: 'Diapers Size 2', category: 'Diapers', quantity: 45 },
  { id: 3, name: 'Diapers Size 3', category: 'Diapers', quantity: 60 },
  { id: 4, name: 'Baby Wipes (Pack)', category: 'Wipes', quantity: 100 },
  { id: 5, name: 'Infant Formula', category: 'Formula', quantity: 30 },
  { id: 6, name: 'Baby Lotion', category: 'Hygiene', quantity: 25 },
  { id: 7, name: 'Baby Shampoo', category: 'Hygiene', quantity: 20 },
  { id: 8, name: 'Onesies 0-3M', category: 'Clothing', quantity: 15 },
];

const navItems = [
  { name: 'Dashboard', href: '/portal/family', icon: LayoutDashboard },
  { name: 'Request Items', href: '/portal/family/requests', icon: Package },
  { name: 'My Requests', href: '/portal/family/history', icon: FileText },
  { name: 'My Profile', href: '/portal/family/profile', icon: User },
];

function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="samara-tile p-6 lg:p-8">
        <h2 className="text-2xl font-bold uppercase text-[#1A1A1A] mb-2">
          Welcome, Sarah
        </h2>
        <p className="text-[#6E6A63]">
          This is your family portal. Here you can request items, track your requests, 
          and manage your household profile.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="samara-tile p-4 text-center">
          <p className="text-3xl font-bold text-[#F4B233]">3</p>
          <p className="text-[#6E6A63] text-xs uppercase tracking-wider">Total Requests</p>
        </div>
        <div className="samara-tile p-4 text-center">
          <p className="text-3xl font-bold text-green-500">2</p>
          <p className="text-[#6E6A63] text-xs uppercase tracking-wider">Completed</p>
        </div>
        <div className="samara-tile p-4 text-center">
          <p className="text-3xl font-bold text-amber-500">1</p>
          <p className="text-[#6E6A63] text-xs uppercase tracking-wider">Pending</p>
        </div>
        <div className="samara-tile p-4 text-center">
          <p className="text-3xl font-bold text-[#1A1A1A]">Jan 2026</p>
          <p className="text-[#6E6A63] text-xs uppercase tracking-wider">Member Since</p>
        </div>
      </div>

      {/* Recent Requests */}
      <div className="samara-tile p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-['Montserrat'] font-bold text-lg uppercase text-[#1A1A1A]">
            Recent Requests
          </h3>
          <Link 
            to="/portal/family/history" 
            className="text-[#F4B233] text-sm font-medium hover:underline flex items-center"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="space-y-3">
          {mockRequests.slice(0, 3).map((request) => (
            <div key={request.id} className="flex items-center justify-between p-4 bg-[#F5F1EC] rounded-xl">
              <div>
                <p className="font-medium text-[#1A1A1A]">{request.type}</p>
                <p className="text-sm text-[#6E6A63]">{request.id} • {request.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                request.status === 'approved' ? 'bg-green-100 text-green-700' :
                request.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                request.status === 'delivered' ? 'bg-blue-100 text-blue-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link to="/portal/family/requests" className="samara-tile-accent p-6 hover:-translate-y-1 transition-transform">
          <ShoppingCart className="w-8 h-8 text-[#1A1A1A] mb-3" />
          <h3 className="font-['Montserrat'] font-bold text-lg uppercase text-[#1A1A1A] mb-1">
            Request Items
          </h3>
          <p className="text-[#1A1A1A]/70 text-sm">
            Browse available items and submit a request
          </p>
        </Link>
        <Link to="/forms/emergency-assistance" className="samara-tile-dark p-6 hover:-translate-y-1 transition-transform">
          <AlertCircle className="w-8 h-8 text-[#F4B233] mb-3" />
          <h3 className="font-['Montserrat'] font-bold text-lg uppercase text-white mb-1">
            Emergency Help
          </h3>
          <p className="text-[#9A9590] text-sm">
            Request emergency assistance (24-48hr response)
          </p>
        </Link>
      </div>
    </div>
  );
}

function RequestItems() {
  const [cart, setCart] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...Array.from(new Set(mockAvailableItems.map(item => item.category)))];
  
  const filteredItems = selectedCategory === 'all' 
    ? mockAvailableItems 
    : mockAvailableItems.filter(item => item.category === selectedCategory);

  const toggleCart = (itemId: number) => {
    setCart(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSubmit = () => {
    if (cart.length === 0) {
      toast.error('Please select at least one item');
      return;
    }
    toast.success(`Request submitted for ${cart.length} items!`);
    setCart([]);
  };

  return (
    <div className="space-y-6">
      <div className="samara-tile p-6">
        <h2 className="text-2xl font-bold uppercase text-[#1A1A1A] mb-4">
          Request Items
        </h2>
        <p className="text-[#6E6A63] mb-4">
          Browse our available inventory and select items you need. 
          Our team will review your request and contact you for pickup or delivery.
        </p>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-[#F4B233] text-[#1A1A1A]'
                  : 'bg-[#F5F1EC] text-[#6E6A63] hover:bg-[#1A1A1A]/5'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleCart(item.id)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                cart.includes(item.id)
                  ? 'border-[#F4B233] bg-[#F4B233]/10'
                  : 'border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30'
              }`}
            >
              <p className="font-medium text-[#1A1A1A] text-sm">{item.name}</p>
              <p className="text-xs text-[#6E6A63]">{item.quantity} available</p>
              {cart.includes(item.id) && (
                <CheckCircle className="w-5 h-5 text-[#F4B233] mt-2" />
              )}
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="mt-6 p-4 bg-[#F4B233]/10 rounded-xl">
            <p className="font-medium text-[#1A1A1A] mb-2">
              Selected: {cart.length} items
            </p>
            <button
              onClick={handleSubmit}
              className="samara-btn-primary"
            >
              Submit Request
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function RequestHistory() {
  return (
    <div className="space-y-6">
      <div className="samara-tile p-6">
        <h2 className="text-2xl font-bold uppercase text-[#1A1A1A] mb-4">
          My Request History
        </h2>
        <div className="space-y-4">
          {mockRequests.map((request) => (
            <div key={request.id} className="samara-tile p-4 border border-[#1A1A1A]/10">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-medium text-[#1A1A1A]">{request.type}</p>
                  <p className="text-sm text-[#6E6A63]">{request.id}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  request.status === 'approved' ? 'bg-green-100 text-green-700' :
                  request.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                  request.status === 'delivered' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
              </div>
              <div className="text-sm text-[#6E6A63]">
                <p className="mb-1">Requested: {request.date}</p>
                <p>Items: {request.items.join(', ')}</p>
              </div>
              <div className="mt-4 flex gap-2">
                {request.status === 'pending' && (
                  <span className="flex items-center text-amber-600 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    Under Review
                  </span>
                )}
                {request.status === 'approved' && (
                  <span className="flex items-center text-green-600 text-sm">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Ready for Pickup
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Profile() {
  return (
    <div className="space-y-6">
      <div className="samara-tile p-6">
        <h2 className="text-2xl font-bold uppercase text-[#1A1A1A] mb-4">
          My Profile
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#6E6A63] mb-1">Full Name</label>
            <p className="text-[#1A1A1A] font-medium">Sarah Johnson</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#6E6A63] mb-1">Email</label>
            <p className="text-[#1A1A1A] font-medium">sarah.j@example.com</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#6E6A63] mb-1">Phone</label>
            <p className="text-[#1A1A1A] font-medium">(555) 123-4567</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#6E6A63] mb-1">Household ID</label>
            <p className="text-[#1A1A1A] font-medium">HH-001</p>
          </div>
        </div>
      </div>

      <div className="samara-tile p-6">
        <h3 className="font-['Montserrat'] font-bold text-lg uppercase text-[#1A1A1A] mb-4">
          Household Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#6E6A63] mb-1">Address</label>
            <p className="text-[#1A1A1A]">123 Main Street<br />Albany, NY 12203</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#6E6A63] mb-1">Household Size</label>
            <p className="text-[#1A1A1A] font-medium">3 (2 adults, 1 child)</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#6E6A63] mb-1">Children Ages</label>
            <p className="text-[#1A1A1A] font-medium">18 months</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#6E6A63] mb-1">Programs Enrolled</label>
            <p className="text-[#1A1A1A]">Baby Supplies, Housing Support</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FamilyPortal() {
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
                <p className="text-xs text-[#6E6A63] uppercase tracking-wider">Family Portal</p>
                <p className="font-medium text-[#1A1A1A]">Sarah Johnson</p>
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
              <Route path="/requests" element={<RequestItems />} />
              <Route path="/history" element={<RequestHistory />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/portal/family" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}
