import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login, user } = useAuth();

  const redirectToPortal = () => {
    // Role-based routing (real security will come from route guards + Supabase RLS later)
    const role = user?.role;

    if (role === 'admin') return navigate('/portal/admin');
    if (role === 'staff') return navigate('/portal/staff');
    return navigate('/portal/family');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await login(email, password);

    if (success) {
      toast.success('Welcome back!');
      redirectToPortal();
    } else {
      toast.error(
        'Login is not enabled yet. Please contact info@samaraworks.org for access.'
      );
    }

    setIsLoading(false);
  };

  return (
    <div className="bg-[#F5F1EC] pt-32 pb-20 min-h-screen">
      <div className="max-w-md mx-auto px-6 lg:px-12">
        <div className="samara-tile p-8 lg:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold uppercase text-[#1A1A1A] mb-2">
              Welcome Back
            </h1>
            <p className="text-[#6E6A63]">
              Sign in to access your Samara Works portal
            </p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#1A1A1A]">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6E6A63]" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="pl-10 rounded-xl border-[#1A1A1A]/10 focus:border-[#F4B233] focus:ring-[#F4B233]"
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[#1A1A1A]">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6E6A63]" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="pl-10 pr-10 rounded-xl border-[#1A1A1A]/10 focus:border-[#F4B233] focus:ring-[#F4B233]"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6E6A63] hover:text-[#1A1A1A]"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-[#1A1A1A]/20" />
                    <span className="text-sm text-[#6E6A63]">Remember me</span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-[#F4B233] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="samara-btn-primary w-full"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#1A1A1A]/30 border-t-[#1A1A1A] rounded-full animate-spin mr-2" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>

                {/* Non-demo help text */}
                <p className="text-sm text-[#6E6A63] mt-3">
                  Need access? Email{' '}
                  <a className="underline" href="mailto:info@samaraworks.org">
                    info@samaraworks.org
                  </a>
                  .
                </p>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <div className="text-center py-8">
                <p className="text-[#6E6A63] mb-4">
                  New families can register by completing our Family Support Request form.
                  This will create your account and start your application process.
                </p>
                <Link to="/forms/family-support" className="samara-btn-primary inline-flex">
                  Start Registration
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Help Text */}
        <p className="text-center text-[#6E6A63] text-sm mt-6">
          Need help?{' '}
          <Link to="/contact" className="text-[#F4B233] hover:underline">
            Contact our support team
          </Link>
        </p>
      </div>
    </div>
  );
}

