import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowRight, Wand2, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function LoginPage() {
  // Login fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Register fields
  const [fullName, setFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const {
    loginWithPassword,
    sendMagicLink,
    signUpWithPassword,
    user,
    isAuthenticated,
    loading,
  } = useAuth();

  const redirectToPortal = () => {
    const role = user?.role;
    if (role === 'admin') return navigate('/portal/admin');
    if (role === 'staff') return navigate('/portal/staff');
    return navigate('/portal/family');
  };

  // ✅ Auto-redirect when auth state becomes "logged in"
  useEffect(() => {
    if (!loading && isAuthenticated && user?.role) {
      redirectToPortal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, isAuthenticated, user?.role]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const ok = await loginWithPassword(email, password);

    setIsLoading(false);

    if (ok) {
      toast.success('Welcome back!');
      // Redirect happens automatically via useEffect once the profile loads
      return;
    }

    toast.error('Invalid email or password. If you used magic link, check your email.');
  };

  const handleMagicLink = async () => {
    if (!email) {
      toast.error('Enter your email first.');
      return;
    }

    setIsLoading(true);
    const ok = await sendMagicLink(email);
    setIsLoading(false);

    if (ok) {
      toast.success('Magic link sent! Check your email to finish signing in.');
      return;
    }

    toast.error('Could not send magic link. Please try again.');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      toast.error('Please enter your name.');
      return;
    }

    setIsLoading(true);
    const ok = await signUpWithPassword(regEmail, regPassword, fullName.trim());
    setIsLoading(false);

    if (ok) {
      toast.success(
        'Account created! If email confirmation is enabled, check your inbox and confirm, then sign in.'
      );

      // Pre-fill login email for convenience
      setEmail(regEmail);
      setPassword('');

      // Optional: keep them on the register tab; they can submit the form next
      return;
    }

    toast.error('Could not create account. Try a different email or a stronger password.');
  };

  const handleRegisterMagicLink = async () => {
    if (!regEmail) {
      toast.error('Enter your email first.');
      return;
    }

    setIsLoading(true);
    const ok = await sendMagicLink(regEmail);
    setIsLoading(false);

    if (ok) {
      toast.success('Magic link sent! Check your email to finish signing in.');
      return;
    }

    toast.error('Could not send magic link. Please try again.');
  };

  return (
    <div className="bg-[#F5F1EC] pt-32 pb-20 min-h-screen">
      <div className="max-w-md mx-auto px-6 lg:px-12">
        <div className="samara-tile p-8 lg:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold uppercase text-[#1A1A1A] mb-2">
              Welcome
            </h1>
            <p className="text-[#6E6A63]">Access your Samara Works portal</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            {/* ===================== LOGIN ===================== */}
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
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-[#1A1A1A]/20" />
                    <span className="text-sm text-[#6E6A63]">Remember me</span>
                  </label>
                  <Link to="/forgot-password" className="text-sm text-[#F4B233] hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <Button type="submit" disabled={isLoading} className="samara-btn-primary w-full">
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

                {/* ✅ Magic Link */}
                <Button
                  type="button"
                  variant="outline"
                  disabled={isLoading || !email}
                  className="w-full rounded-xl"
                  onClick={handleMagicLink}
                >
                  <Wand2 className="w-4 h-4 mr-2" />
                  Email me a magic link
                </Button>

                <p className="text-sm text-[#6E6A63] mt-3">
                  Need help? Email{' '}
                  <a className="underline" href="mailto:info@samaraworks.org">
                    info@samaraworks.org
                  </a>
                  .
                </p>
              </form>
            </TabsContent>

            {/* ===================== REGISTER ===================== */}
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-[#1A1A1A]">
                    Full Name
                  </Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6E6A63]" />
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your name"
                      required
                      className="pl-10 rounded-xl border-[#1A1A1A]/10 focus:border-[#F4B233] focus:ring-[#F4B233]"
                      autoComplete="name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="regEmail" className="text-[#1A1A1A]">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6E6A63]" />
                    <Input
                      id="regEmail"
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="pl-10 rounded-xl border-[#1A1A1A]/10 focus:border-[#F4B233] focus:ring-[#F4B233]"
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="regPassword" className="text-[#1A1A1A]">
                    Create Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6E6A63]" />
                    <Input
                      id="regPassword"
                      type={showRegPassword ? 'text' : 'password'}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="pl-10 pr-10 rounded-xl border-[#1A1A1A]/10 focus:border-[#F4B233] focus:ring-[#F4B233]"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6E6A63] hover:text-[#1A1A1A]"
                      aria-label={showRegPassword ? 'Hide password' : 'Show password'}
                    >
                      {showRegPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" disabled={isLoading} className="samara-btn-primary w-full">
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#1A1A1A]/30 border-t-[#1A1A1A] rounded-full animate-spin mr-2" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  disabled={isLoading || !regEmail}
                  className="w-full rounded-xl"
                  onClick={handleRegisterMagicLink}
                >
                  <Wand2 className="w-4 h-4 mr-2" />
                  Email me a magic link instead
                </Button>

                <div className="pt-4 border-t border-[#1A1A1A]/10">
                  <p className="text-sm text-[#6E6A63] mb-3">
                    After creating your account, you can submit a Family Support Request (optional).
                  </p>
                  <Link to="/forms/family-support" className="samara-btn-primary inline-flex">
                    Submit Family Support Request
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>

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
