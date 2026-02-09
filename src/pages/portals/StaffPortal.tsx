import { useState } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  Users, 
  LogOut,
  ChevronRight,
  Home,
  Plus,
  CheckCircle,
  XCircle,
  Search
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Mock data
const mockRequests = [
  { id: 'REQ-001', family: 'Johnson Family', type: 'Baby Supplies', status: 'pending', date: '2026-02-05', priority: 'normal' },
  { id: 'REQ-002', family: 'Smith Family', type: 'Housing Assistance', status: 'approved', date: '2026-02-04', priority: 'high' },
  { id: 'REQ-003', family: 'Williams Family', type: 'Emergency Aid', status: 'delivered', date: '2026-02-03', priority: 'urgent' },
  { id: 'REQ-004', family: 'Brown Family', type: 'Baby Supplies', status: 'pending', date: '2026-02-05', priority: 'normal' },
  { id: 'REQ-005', family: 'Davis Family', type: 'Childcare Support', status: 'in-review', date: '2026-02-02', priority: 'normal' },
];

const mockInventory = [
  { id: 1, name: 'Diapers Size 1', category: 'Diapers', quantity: 50, lowStock: false },
  { id: 2, name: 'Diapers Size 2', category: 'Diapers', quantity: 45, lowStock: false },
  { id: 3, name: 'Diapers Size 3', category: 'Diapers', quantity: 60, lowStock: false },
  { id: 4, name: 'Baby Wipes (Pack)', category: 'Wipes', quantity: 12, lowStock: true },
  { id: 5, name: 'Infant Formula', category: 'Formula', quantity: 30, lowStock: false },
  { id: 6, name: 'Baby Lotion', category: 'Hygiene', quantity: 8, lowStock: true },
  { id: 7, name: 'Baby Shampoo', category: 'Hygiene', quantity: 20, lowStock: false },
  { id: 8, name: 'Onesies 0-3M', category: 'Clothing', quantity: 5, lowStock: true },
];

const navItems = [
  { name: 'Dashboard', href: '/portal/staff', icon: LayoutDashboard },
  { name: 'Requests', href: '/portal/staff/requests', icon: FileText },
  { name: 'Inventory', href: '/portal/staff/inventory', icon: Package },
  { name: 'Families', href: '/portal/staff/families', icon: Users },
];

function Dashboard() {
  const pendingCount = mockRequests.filter(r => r.status === 'pending').length;
  const urgentCount = mockRequests.filter(r => r.priority === 'urgent').length;
  const lowStockCount = mockInventory.filter(i => i.lowStock).length;

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="samara-tile p-6 lg:p-8">
        <h2 className="text-2xl font-bold uppercase text-[#1A1A1A] mb-2">
          Staff Dashboard
        </h2>
        <p className="text-[#6E6A63]">
          Welcome back, Michael. Here is what needs your attention today.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="samara-tile p-4 text-center">
          <p className="text-3xl font-bold text-amber-500">{pendingCount}</p>
          <p className="text-[#6E6A63] text-xs uppercase tracking-wider">Pending Requests</p>
        </div>
        <div className="samara-tile p-4 text-center">
          <p className="text-3xl font-bold text-red-500">{urgentCount}</p>
          <p className="text-[#6E6A63] text-xs uppercase tracking-wider">Urgent</p>
        </div>
        <div className="samara-tile p-4 text-center">
          <p className="text-3xl font-bold text-[#F4B233]">{lowStockCount}</p>
          <p className="text-[#6E6A63] text-xs uppercase tracking-wider">Low Stock Items</p>
        </div>
        <div className="samara-tile p-4 text-center">
          <p className="text-3xl font-bold text-green-500">156</p>
          <p className="text-[#6E6A63] text-xs uppercase tracking-wider">Families Served</p>
        </div>
      </div>

      {/* Recent Requests */}
      <div className="samara-tile p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-['Montserrat'] font-bold text-lg uppercase text-[#1A1A1A]">
            Recent Requests
          </h3>
          <Link 
            to="/portal/staff/requests" 
            className="text-[#F4B233] text-sm font-medium hover:underline flex items-center"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="space-y-3">
          {mockRequests.slice(0, 5).map((request) => (
            <div key={request.id} className="flex items-center justify-between p-4 bg-[#F5F1EC] rounded-xl">
              <div>
                <p className="font-medium text-[#1A1A1A]">{request.family}</p>
                <p className="text-sm text-[#6E6A63]">{request.type} • {request.date}</p>
              </div>
              <div className="flex items-center gap-2">
                {request.priority === 'urgent' && (
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                    Urgent
                  </span>
                )}
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  request.status === 'approved' ? 'bg-green-100 text-green-700' :
                  request.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                  request.status === 'delivered' ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockCount > 0 && (
        <div className="samara-tile-dark p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
              <Package className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h3 className="font-['Montserrat'] font-bold text-lg uppercase text-white">
                Low Stock Alert
              </h3>
              <p className="text-[#9A9590] text-sm">
                {lowStockCount} items are running low and need restocking
              </p>
            </div>
          </div>
          <div className="space-y-2">
            {mockInventory.filter(i => i.lowStock).map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-white text-sm">{item.name}</span>
                <span className="text-red-400 text-sm font-medium">{item.quantity} left</span>
              </div>
            ))}
          </div>
          <Link 
            to="/portal/staff/inventory"
            className="inline-flex items-center text-[#F4B233] text-sm font-medium mt-4 hover:underline"
          >
            Manage Inventory
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      )}
    </div>
  );
}

function Requests() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredRequests = mockRequests.filter(request => {
    const matchesFilter = filter === 'all' || request.status === filter;
    const matchesSearch = request.family.toLowerCase().includes(search.toLowerCase()) ||
                         request.type.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAction = (action: string, requestId: string) => {
    toast.success(`Request ${requestId} ${action}`);
  };

  return (
    <div className="space-y-6">
      <div className="samara-tile p-6">
        <h2 className="text-2xl font-bold uppercase text-[#1A1A1A] mb-4">
          Manage Requests
        </h2>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6E6A63]" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search requests..."
              className="pl-10 rounded-xl border-[#1A1A1A]/10"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'pending', 'approved', 'delivered'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === status
                    ? 'bg-[#F4B233] text-[#1A1A1A]'
                    : 'bg-[#F5F1EC] text-[#6E6A63] hover:bg-[#1A1A1A]/5'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <div key={request.id} className="samara-tile p-4 border border-[#1A1A1A]/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-[#1A1A1A]">{request.family}</p>
                    {request.priority === 'urgent' && (
                      <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                        Urgent
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#6E6A63]">{request.type} • {request.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    request.status === 'approved' ? 'bg-green-100 text-green-700' :
                    request.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                    request.status === 'delivered' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </span>
                  {request.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleAction('approved', request.id)}
                        className="p-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleAction('denied', request.id)}
                        className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Inventory() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="samara-tile p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold uppercase text-[#1A1A1A]">
            Inventory Management
          </h2>
          <Button
            onClick={() => setShowAddModal(true)}
            className="samara-btn-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>

        {/* Inventory Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockInventory.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-xl border-2 ${
                item.lowStock 
                  ? 'border-red-200 bg-red-50' 
                  : 'border-[#1A1A1A]/10'
              }`}
            >
              <p className="font-medium text-[#1A1A1A] text-sm">{item.name}</p>
              <p className="text-xs text-[#6E6A63] mb-2">{item.category}</p>
              <div className="flex items-center justify-between">
                <span className={`text-lg font-bold ${
                  item.lowStock ? 'text-red-600' : 'text-[#1A1A1A]'
                }`}>
                  {item.quantity}
                </span>
                {item.lowStock && (
                  <span className="text-xs text-red-600 font-medium">Low Stock</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="samara-tile p-6 w-full max-w-md">
            <h3 className="font-['Montserrat'] font-bold text-lg uppercase text-[#1A1A1A] mb-4">
              Add Inventory Item
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#6E6A63] mb-1">Item Name</label>
                <Input placeholder="Enter item name" className="rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#6E6A63] mb-1">Category</label>
                <Input placeholder="Enter category" className="rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#6E6A63] mb-1">Quantity</label>
                <Input type="number" placeholder="Enter quantity" className="rounded-xl" />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowAddModal(false)}
                  variant="outline"
                  className="flex-1 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    toast.success('Item added to inventory');
                    setShowAddModal(false);
                  }}
                  className="samara-btn-primary flex-1"
                >
                  Add Item
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Families() {
  const mockFamilies = [
    { id: 'HH-001', name: 'Johnson Family', members: 3, status: 'active', lastVisit: '2026-02-01' },
    { id: 'HH-002', name: 'Smith Family', members: 4, status: 'active', lastVisit: '2026-01-28' },
    { id: 'HH-003', name: 'Williams Family', members: 2, status: 'inactive', lastVisit: '2025-12-15' },
    { id: 'HH-004', name: 'Brown Family', members: 5, status: 'active', lastVisit: '2026-02-04' },
  ];

  return (
    <div className="space-y-6">
      <div className="samara-tile p-6">
        <h2 className="text-2xl font-bold uppercase text-[#1A1A1A] mb-4">
          Registered Families
        </h2>
        <div className="space-y-4">
          {mockFamilies.map((family) => (
            <div key={family.id} className="flex items-center justify-between p-4 bg-[#F5F1EC] rounded-xl">
              <div>
                <p className="font-medium text-[#1A1A1A]">{family.name}</p>
                <p className="text-sm text-[#6E6A63]">
                  {family.id} • {family.members} members • Last visit: {family.lastVisit}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                family.status === 'active' ? 'bg-green-100 text-green-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {family.status.charAt(0).toUpperCase() + family.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function StaffPortal() {
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
                <p className="text-xs text-[#6E6A63] uppercase tracking-wider">Staff Portal</p>
                <p className="font-medium text-[#1A1A1A]">Michael Chen</p>
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
              <Route path="/requests" element={<Requests />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/families" element={<Families />} />
              <Route path="*" element={<Navigate to="/portal/staff" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}
