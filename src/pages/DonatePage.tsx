import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, CheckCircle, Shield, Receipt, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const donationAmounts = [
  { amount: 25, description: 'Provides diapers for one baby for a week' },
  { amount: 50, description: 'Feeds a family for three days' },
  { amount: 100, description: 'Provides emergency rental assistance' },
  { amount: 250, description: 'Supplies a crib and car seat' },
  { amount: 500, description: 'Covers one month of childcare' },
  { amount: 1000, description: 'Prevents a family from eviction' },
];

const impactStats = [
  { icon: Users, value: '12,000+', label: 'Families Supported' },
  { icon: CheckCircle, value: '90%', label: 'Housing Stability Rate' },
  { icon: Shield, value: '4-Star', label: 'Charity Rating' },
  { icon: Receipt, value: '100%', label: 'Tax Deductible' },
];

export default function DonatePage() {
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time');
  const [selectedAmount, setSelectedAmount] = useState<number | 'custom'>(50);
  const [customAmount, setCustomAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate donation processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsCompleted(true);
    toast.success('Thank you for your generous donation!');
  };

  const getDonationAmount = () => {
    if (selectedAmount === 'custom') {
      return parseFloat(customAmount) || 0;
    }
    return selectedAmount;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.donate-section',
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

  if (isCompleted) {
    return (
      <div className="bg-[#F5F1EC] pt-32 pb-20 min-h-screen">
        <div className="max-w-2xl mx-auto px-6 lg:px-12">
          <div className="samara-tile p-12 text-center">
            <div className="w-24 h-24 rounded-full bg-[#F4B233]/20 flex items-center justify-center mx-auto mb-8">
              <Heart className="w-12 h-12 text-[#F4B233] fill-[#F4B233]" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold uppercase text-[#1A1A1A] mb-4">
              Thank You!
            </h1>
            <p className="text-[#6E6A63] text-lg mb-8">
              Your generous donation of ${getDonationAmount()} will help us continue 
              supporting families in need. A receipt has been sent to your email.
            </p>
            <div className="samara-tile-accent p-6 mb-8">
              <p className="text-[#1A1A1A] font-medium">
                {donationType === 'monthly' 
                  ? 'You will be charged monthly. You can cancel anytime.'
                  : 'Your one-time donation makes an immediate impact.'}
              </p>
            </div>
            <Button
              onClick={() => {
                setIsCompleted(false);
                setSelectedAmount(50);
                setCustomAmount('');
              }}
              className="samara-btn-primary"
            >
              Make Another Donation
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="bg-[#F5F1EC] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Page Header */}
        <div className="donate-section text-center mb-16">
          <span className="samara-label mb-4 block">Support Our Mission</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase text-[#1A1A1A] mb-6">
            Make a Donation
          </h1>
          <p className="text-[#6E6A63] text-lg max-w-2xl mx-auto">
            Your generosity helps us provide housing stability, baby supplies, 
            childcare support, and emergency assistance to families in need.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Donation Form */}
          <div className="donate-section">
            <div className="samara-tile p-8 lg:p-10">
              <form onSubmit={handleDonate}>
                {/* Donation Type */}
                <div className="mb-8">
                  <Label className="text-[#1A1A1A] font-medium mb-4 block">
                    Donation Type
                  </Label>
                  <RadioGroup
                    value={donationType}
                    onValueChange={(value) => setDonationType(value as 'one-time' | 'monthly')}
                    className="flex gap-4"
                  >
                    <div className="flex-1">
                      <RadioGroupItem
                        value="one-time"
                        id="one-time"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="one-time"
                        className="flex items-center justify-center px-4 py-3 rounded-xl border-2 border-[#1A1A1A]/10 cursor-pointer peer-data-[state=checked]:border-[#F4B233] peer-data-[state=checked]:bg-[#F4B233]/10 transition-all"
                      >
                        One-Time
                      </Label>
                    </div>
                    <div className="flex-1">
                      <RadioGroupItem
                        value="monthly"
                        id="monthly"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="monthly"
                        className="flex items-center justify-center px-4 py-3 rounded-xl border-2 border-[#1A1A1A]/10 cursor-pointer peer-data-[state=checked]:border-[#F4B233] peer-data-[state=checked]:bg-[#F4B233]/10 transition-all"
                      >
                        Monthly
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Donation Amounts */}
                <div className="mb-8">
                  <Label className="text-[#1A1A1A] font-medium mb-4 block">
                    Select Amount
                  </Label>
                  <RadioGroup
                    value={selectedAmount.toString()}
                    onValueChange={(value) => setSelectedAmount(value === 'custom' ? 'custom' : parseInt(value))}
                    className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                  >
                    {donationAmounts.map((option) => (
                      <div key={option.amount}>
                        <RadioGroupItem
                          value={option.amount.toString()}
                          id={`amount-${option.amount}`}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`amount-${option.amount}`}
                          className="flex flex-col items-center p-4 rounded-xl border-2 border-[#1A1A1A]/10 cursor-pointer peer-data-[state=checked]:border-[#F4B233] peer-data-[state=checked]:bg-[#F4B233]/10 transition-all"
                        >
                          <span className="text-xl font-bold text-[#1A1A1A]">
                            ${option.amount}
                          </span>
                        </Label>
                      </div>
                    ))}
                    <div>
                      <RadioGroupItem
                        value="custom"
                        id="amount-custom"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="amount-custom"
                        className="flex flex-col items-center p-4 rounded-xl border-2 border-[#1A1A1A]/10 cursor-pointer peer-data-[state=checked]:border-[#F4B233] peer-data-[state=checked]:bg-[#F4B233]/10 transition-all"
                      >
                        <span className="text-lg font-bold text-[#1A1A1A]">
                          Custom
                        </span>
                      </Label>
                    </div>
                  </RadioGroup>

                  {selectedAmount === 'custom' && (
                    <div className="mt-4">
                      <Label htmlFor="custom-amount" className="sr-only">
                        Custom Amount
                      </Label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6E6A63]">
                          $
                        </span>
                        <Input
                          id="custom-amount"
                          type="number"
                          min="1"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          placeholder="Enter amount"
                          className="pl-8 rounded-xl border-[#1A1A1A]/10 focus:border-[#F4B233] focus:ring-[#F4B233]"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Impact Description */}
                {selectedAmount !== 'custom' && (
                  <div className="samara-tile-accent p-4 mb-8">
                    <p className="text-[#1A1A1A] text-sm">
                      <span className="font-bold">Your impact:</span>{' '}
                      {donationAmounts.find(a => a.amount === selectedAmount)?.description}
                    </p>
                  </div>
                )}

                {/* Personal Info */}
                <div className="space-y-4 mb-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-[#1A1A1A] font-medium">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        required
                        placeholder="John"
                        className="rounded-xl border-[#1A1A1A]/10 focus:border-[#F4B233] focus:ring-[#F4B233]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-[#1A1A1A] font-medium">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        required
                        placeholder="Doe"
                        className="rounded-xl border-[#1A1A1A]/10 focus:border-[#F4B233] focus:ring-[#F4B233]"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-[#1A1A1A] font-medium">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="john@example.com"
                      className="rounded-xl border-[#1A1A1A]/10 focus:border-[#F4B233] focus:ring-[#F4B233]"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting || getDonationAmount() <= 0}
                  className="samara-btn-primary w-full"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#1A1A1A]/30 border-t-[#1A1A1A] rounded-full animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Heart className="w-4 h-4 mr-2" />
                      Donate ${getDonationAmount()}
                      {donationType === 'monthly' && '/month'}
                    </>
                  )}
                </Button>

                <p className="text-center text-[#6E6A63] text-xs mt-4">
                  Secure payment processing. Your donation is tax-deductible.
                </p>
              </form>
            </div>
          </div>

          {/* Impact Info */}
          <div className="donate-section space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {impactStats.map((stat, index) => (
                <div key={index} className="samara-tile p-6 text-center">
                  <stat.icon className="w-8 h-8 text-[#F4B233] mx-auto mb-2" />
                  <p className="text-2xl font-bold text-[#1A1A1A]">{stat.value}</p>
                  <p className="text-[#6E6A63] text-xs uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="samara-tile p-8">
              <blockquote className="text-[#1A1A1A] text-lg italic mb-4">
                "Samara Works helped us stay housed when we needed it most. 
                Their support gave our family the stability we needed to rebuild."
              </blockquote>
              <cite className="text-[#6E6A63] text-sm not-italic">
                — Parent, Albany
              </cite>
            </div>

            {/* Other Ways to Give */}
            <div className="samara-tile-dark p-8">
              <h3 className="font-['Montserrat'] font-bold text-lg uppercase text-white mb-4">
                Other Ways to Give
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-[#9A9590]">
                  <CheckCircle className="w-5 h-5 text-[#F4B233] flex-shrink-0 mt-0.5" />
                  <span>Corporate matching gifts</span>
                </li>
                <li className="flex items-start gap-3 text-[#9A9590]">
                  <CheckCircle className="w-5 h-5 text-[#F4B233] flex-shrink-0 mt-0.5" />
                  <span>Planned giving and bequests</span>
                </li>
                <li className="flex items-start gap-3 text-[#9A9590]">
                  <CheckCircle className="w-5 h-5 text-[#F4B233] flex-shrink-0 mt-0.5" />
                  <span>Stock and securities transfers</span>
                </li>
                <li className="flex items-start gap-3 text-[#9A9590]">
                  <CheckCircle className="w-5 h-5 text-[#F4B233] flex-shrink-0 mt-0.5" />
                  <span>In-kind donations of baby supplies</span>
                </li>
              </ul>
              <p className="text-[#9A9590] text-sm mt-4">
                Contact us at{' '}
                <a href="mailto:development@samaraworks.org" className="text-[#F4B233]">
                  development@samaraworks.org
                </a>{' '}
                to learn more.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
