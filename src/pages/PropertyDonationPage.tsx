import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Receipt, 
  TrendingUp, 
  Heart, 
  CheckCircle, 
  ArrowRight,
  DollarSign,
  FileText,
  Calculator
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: Receipt,
    title: 'Tax Deduction',
    description: 'Receive a tax deduction for the fair market value of your property donation.',
  },
  {
    icon: TrendingUp,
    title: 'Capital Gains Avoidance',
    description: 'Avoid capital gains taxes on appreciated property.',
  },
  {
    icon: Heart,
    title: 'Community Impact',
    description: 'Directly help families achieve housing stability.',
  },
  {
    icon: DollarSign,
    title: 'No Selling Costs',
    description: 'Avoid realtor fees, closing costs, and repair expenses.',
  },
];

const donationTypes = [
  {
    title: 'Single-Family Home',
    description: 'Donate a house to provide affordable housing for a family in need.',
    image: '/images/housing_family_keys.jpg',
  },
  {
    title: 'Multi-Family Property',
    description: 'Donate an apartment building to house multiple families.',
    image: '/images/hero_family_home.jpg',
  },
  {
    title: 'Commercial Property',
    description: 'Donate commercial space for our operations and programs.',
    image: '/images/impact_community_event.jpg',
  },
  {
    title: 'Vacant Land',
    description: 'Donate land for future affordable housing development.',
    image: '/images/impact_family_walk.jpg',
  },
];

export default function PropertyDonationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [propertyValue, setPropertyValue] = useState('');
  const [taxBracket, setTaxBracket] = useState('24');
  const pageRef = useRef<HTMLDivElement>(null);

  // Calculate estimated tax savings
  const estimatedSavings = propertyValue 
    ? Math.round(parseInt(propertyValue) * (parseInt(taxBracket) / 100))
    : 0;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.benefit-card, .donation-type',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: pageRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsCompleted(true);
    toast.success('Inquiry submitted! Our team will contact you within 48 hours.');
  };

  if (isCompleted) {
    return (
      <div className="bg-[#FDF8F5] pt-32 pb-20 min-h-screen">
        <div className="max-w-2xl mx-auto px-6 lg:px-12">
          <div className="samara-tile p-12 text-center bg-white">
            <div className="w-24 h-24 rounded-full bg-[#E8B4B8]/20 flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-[#C85A5A]" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold uppercase text-[#5A4A42] mb-4">
              Thank You for Your Interest!
            </h1>
            <p className="text-[#8B7B73] text-lg mb-8">
              We have received your property donation inquiry. Our team will contact 
              you within 48 hours to discuss next steps.
            </p>
            <div className="samara-tile p-6 mb-8 bg-[#F5E6D3]">
              <p className="text-[#8B6914] font-medium">
                Reference: PROP-{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
            </div>
            <Link to="/" className="samara-btn-primary inline-flex">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="bg-[#FDF8F5] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#E8B4B8]/20 text-[#C85A5A] text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
            Coming Soon
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase text-[#5A4A42] mb-6">
            Donate Property, <br className="hidden sm:block" />
            <span className="text-[#C85A5A]">Receive Tax Credits</span>
          </h1>
          <p className="text-[#8B7B73] text-lg max-w-2xl mx-auto">
            Transform your real estate into life-changing housing for families in need 
            while maximizing your tax benefits.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <div className="samara-tile p-6 text-center h-full bg-white">
                <div className="w-14 h-14 bg-[#E8B4B8]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-7 h-7 text-[#C85A5A]" />
                </div>
                <h3 className="font-bold text-[#5A4A42] mb-2">{benefit.title}</h3>
                <p className="text-[#8B7B73] text-sm">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tax Savings Calculator */}
        <div className="samara-tile p-8 lg:p-12 mb-20 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Calculator className="w-8 h-8 text-[#C85A5A]" />
                <h2 className="text-2xl font-bold uppercase text-[#5A4A42]">
                  Tax Savings Calculator
                </h2>
              </div>
              <p className="text-[#8B7B73] mb-8">
                Estimate your potential tax savings from donating property. 
                This is a simplified estimate—consult your tax advisor for exact figures.
              </p>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="propertyValue" className="text-[#5A4A42]">
                    Estimated Property Value
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B7B73]" />
                    <Input
                      id="propertyValue"
                      type="number"
                      value={propertyValue}
                      onChange={(e) => setPropertyValue(e.target.value)}
                      placeholder="250000"
                      className="pl-10 rounded-xl border-[#F5E6D3]"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="taxBracket" className="text-[#5A4A42]">
                    Your Tax Bracket
                  </Label>
                  <select
                    id="taxBracket"
                    value={taxBracket}
                    onChange={(e) => setTaxBracket(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#F5E6D3] bg-white text-[#5A4A42]"
                  >
                    <option value="10">10%</option>
                    <option value="12">12%</option>
                    <option value="22">22%</option>
                    <option value="24">24%</option>
                    <option value="32">32%</option>
                    <option value="35">35%</option>
                    <option value="37">37%</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="text-center p-8 bg-[#F5E6D3] rounded-3xl">
                <p className="text-[#8B6914] text-sm uppercase tracking-wider mb-2">
                  Estimated Tax Savings
                </p>
                <p className="text-5xl font-bold text-[#5A4A42] mb-4">
                  ${estimatedSavings.toLocaleString()}
                </p>
                <p className="text-[#8B6914] text-sm max-w-xs">
                  Plus avoid capital gains taxes and selling costs
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Donation Types */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold uppercase text-[#5A4A42] text-center mb-8">
            What Can You Donate?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {donationTypes.map((type, index) => (
              <div key={index} className="donation-type">
                <div className="samara-tile overflow-hidden bg-white">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={type.image}
                      alt={type.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-[#5A4A42] mb-2">{type.title}</h3>
                    <p className="text-[#8B7B73] text-sm">{type.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="samara-tile p-8 bg-white">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-8 h-8 text-[#C85A5A]" />
              <h2 className="text-2xl font-bold uppercase text-[#5A4A42]">
                Start Your Donation
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input id="firstName" required className="rounded-xl border-[#F5E6D3]" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input id="lastName" required className="rounded-xl border-[#F5E6D3]" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" type="email" required className="rounded-xl border-[#F5E6D3]" />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" type="tel" required className="rounded-xl border-[#F5E6D3]" />
              </div>
              <div>
                <Label htmlFor="propertyAddress">Property Address *</Label>
                <Input id="propertyAddress" required className="rounded-xl border-[#F5E6D3]" />
              </div>
              <div>
                <Label htmlFor="estimatedValue">Estimated Property Value</Label>
                <Input 
                  id="estimatedValue" 
                  type="number" 
                  placeholder="250000"
                  className="rounded-xl border-[#F5E6D3]" 
                />
              </div>
              <div>
                <Label htmlFor="message">Additional Information</Label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell us about your property and any questions you have..."
                  className="w-full px-4 py-3 rounded-xl border border-[#F5E6D3] resize-none"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full samara-btn-primary"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </div>

          {/* Info Box */}
          <div className="samara-tile-dark p-8">
            <Home className="w-10 h-10 text-[#E8B4B8] mb-6" />
            <h3 className="text-xl font-bold uppercase text-white mb-4">
              Why Donate Property?
            </h3>
            <ul className="space-y-4 text-[#C8B8A8]">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#E8B4B8] flex-shrink-0 mt-0.5" />
                <span>Receive immediate tax deduction for full fair market value</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#E8B4B8] flex-shrink-0 mt-0.5" />
                <span>Avoid capital gains tax on appreciated property</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#E8B4B8] flex-shrink-0 mt-0.5" />
                <span>No realtor commissions or closing costs</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#E8B4B8] flex-shrink-0 mt-0.5" />
                <span>Directly transform lives in your community</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#E8B4B8] flex-shrink-0 mt-0.5" />
                <span>Quick and simple transfer process</span>
              </li>
            </ul>
            <div className="mt-8 p-4 bg-white/10 rounded-xl">
              <p className="text-white text-sm">
                <strong>Questions?</strong> Contact our Property Donation team at{' '}
                <a href="mailto:property@samaraworks.org" className="text-[#E8B4B8]">
                  property@samaraworks.org
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
