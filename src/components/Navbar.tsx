import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Heart, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navLinks = [
  { name: 'About', href: '/about' },
  { name: 'Programs', href: '/programs' },
  { name: 'Board', href: '/board' },
  { name: 'Sponsors', href: '/sponsors' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, hasRole } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getPortalLink = () => {
    if (hasRole('admin')) return '/portal/admin';
    if (hasRole('staff')) return '/portal/staff';
    if (hasRole('family')) return '/portal/family';
    return '/login';
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FDF8F5]/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-['Montserrat'] font-bold text-xl tracking-tight text-[#5A4A42]">
              Samara Works
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-medium uppercase tracking-wider transition-colors ${
                  location.pathname === link.href
                    ? 'text-[#C85A5A]'
                    : 'text-[#5A4A42] hover:text-[#C85A5A]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Donate Button - Warm Terracotta */}
            <Link
              to="/donate"
              className="hidden sm:inline-flex items-center gap-2 px-6 py-3 bg-[#C85A5A] text-white font-semibold text-sm uppercase tracking-wider rounded-full hover:-translate-y-0.5 hover:bg-[#B54A4A] hover:shadow-lg transition-all"
            >
              <Heart className="w-4 h-4" />
              Donate
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 p-2 rounded-full hover:bg-[#E8B4B8]/20 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-[#E8B4B8] flex items-center justify-center">
                    <User className="w-4 h-4 text-[#5A4A42]" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white border-[#F5E6D3]">
                  <div className="px-3 py-2">
                    <p className="font-medium text-sm text-[#5A4A42]">{user?.name}</p>
                    <p className="text-xs text-[#8B7B73]">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator className="bg-[#F5E6D3]" />
                  <DropdownMenuItem onClick={() => navigate(getPortalLink())} className="text-[#5A4A42] hover:bg-[#F5E6D3]">
                    <User className="w-4 h-4 mr-2" />
                    My Portal
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-[#5A4A42] hover:bg-[#F5E6D3]">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                to="/login"
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium uppercase tracking-wider text-[#5A4A42] hover:text-[#C85A5A] transition-colors"
              >
                <User className="w-4 h-4" />
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-[#E8B4B8]/20 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#5A4A42]" />
              ) : (
                <Menu className="w-6 h-6 text-[#5A4A42]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#FDF8F5]/98 backdrop-blur-md border-t border-[#F5E6D3]">
          <nav className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-lg font-medium uppercase tracking-wider ${
                  location.pathname === link.href
                    ? 'text-[#C85A5A]'
                    : 'text-[#5A4A42]'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/donate"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#C85A5A] text-white font-semibold text-sm uppercase tracking-wider rounded-full mt-4"
            >
              <Heart className="w-4 h-4" />
              Donate
            </Link>
            {!isAuthenticated && (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#C85A5A] text-[#C85A5A] font-semibold text-sm uppercase tracking-wider rounded-full"
              >
                <User className="w-4 h-4" />
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
