import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Package, 
  Handshake, 
  Star,
  ArrowRight,
  Building2,
  User
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const sponsorTypes = [
  {
    icon: Heart,
    title: 'Financial Sponsors',
    description: 'Organizations and individuals providing monetary support to fund our programs and operations.',
    examples: ['Corporate donations', 'Foundation grants', 'Individual major gifts'],
  },
  {
    icon: Package,
    title: 'In-Kind Sponsors',
    description: 'Partners who donate goods, services, or products to support our mission.',
    examples: ['Baby product donations', 'Professional services', 'Venue partnerships'],
  },
  {
    icon: Handshake,
    title: 'Community Partners',
    description: 'Organizations we collaborate with to expand our reach and impact.',
    examples: ['Housing authorities', 'Schools & childcare centers', 'Healthcare providers'],
  },
];

const featuredSponsors = [
  {
    name: 'Albany Community Foundation',
    type: 'financial',
    level: 'Platinum',
    logo: 'ACF',
  },
  {
    name: 'Hometown Bank',
    type: 'financial',
    level: 'Gold',
    logo: 'HB',
  },
  {
    name: 'BabyCare Products Inc.',
    type: 'in-kind',
    level: 'Platinum',
    logo: 'BC',
  },
  {
    name: 'Capital Region Housing Authority',
    type: 'partner',
    level: 'Partner',
    logo: 'CRHA',
  },
  {
    name: 'Smith Family Trust',
    type: 'financial',
    level: 'Silver',
    logo: 'SFT',
  },
  {
    name: 'Healthy Start Pediatrics',
    type: 'partner',
    level: 'Partner',
    logo: 'HSP',
  },
];

const sponsorBenefits = [
  {
    level: 'Platinum',
    amount: '$25,000+',
    benefits: [
      'Logo prominently displayed on website homepage',
      'Named recognition at all events',
      'Quarterly impact reports',
      'Invitation to annual donor dinner',
      'Social media recognition monthly',
      'Press release announcement',
    ],
  },
  {
    level: 'Gold',
    amount: '$10,000 - $24,999',
    benefits: [
      'Logo on sponsors page',
      'Recognition at major events',
      'Bi-annual impact reports',
      'Invitation to annual donor dinner',
      'Social media recognition quarterly',
    ],
  },
  {
    level: 'Silver',
    amount: '$5,000 - $9,999',
    benefits: [
      'Name listed on sponsors page',
      'Recognition at select events',
      'Annual impact report',
      'Social media recognition twice yearly',
    ],
  },
  {
    level: 'Bronze',
    amount: '$1,000 - $4,999',
    benefits: [
      'Name listed on sponsors page',
      'Annual newsletter recognition',
      'Social media recognition annually',
    ],
  },
];

export default function SponsorsPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.sponsor-section',
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

  return (
    <div ref={pageRef} className="bg-[#F5F1EC] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Page Header */}
        <div className="sponsor-section text-center mb-16">
          <span className="samara-label mb-4 block">Partners</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase text-[#1A1A1A] mb-6">
            Sponsors & Partners
          </h1>
          <p className="text-[#6E6A63] text-lg max-w-2xl mx-auto">
            We are grateful to the organizations and individuals who fuel our work 
            and make our mission possible.
          </p>
        </div>

        {/* Sponsor Types */}
        <div className="sponsor-section grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {sponsorTypes.map((type, index) => (
            <div key={index} className="samara-tile p-8">
              <type.icon className="w-10 h-10 text-[#F4B233] mb-4" />
              <h3 className="font-['Montserrat'] font-bold text-lg uppercase text-[#1A1A1A] mb-3">
                {type.title}
              </h3>
              <p className="text-[#6E6A63] text-sm mb-4">
                {type.description}
              </p>
              <ul className="space-y-1">
                {type.examples.map((example, eIndex) => (
                  <li key={eIndex} className="text-sm text-[#6E6A63] flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#F4B233]" />
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Featured Sponsors */}
        <div className="sponsor-section mb-20">
          <div className="text-center mb-12">
            <span className="samara-label mb-4 block">Thank You</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-[#1A1A1A]">
              Featured Sponsors
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredSponsors.map((sponsor, index) => (
              <div key={index} className="samara-tile p-6 text-center hover:-translate-y-1 transition-transform">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F4B233]/20 flex items-center justify-center">
                  <span className="text-[#F4B233] font-bold text-lg">{sponsor.logo}</span>
                </div>
                <h3 className="font-['Montserrat'] font-bold text-sm text-[#1A1A1A] mb-1">
                  {sponsor.name}
                </h3>
                <div className="flex items-center justify-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    sponsor.level === 'Platinum' ? 'bg-[#F4B233] text-[#1A1A1A]' :
                    sponsor.level === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                    sponsor.level === 'Silver' ? 'bg-gray-200 text-gray-700' :
                    'bg-[#1A1A1A]/10 text-[#6E6A63]'
                  }`}>
                    {sponsor.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsor Benefits */}
        <div className="sponsor-section mb-20">
          <div className="text-center mb-12">
            <span className="samara-label mb-4 block">Partnership Levels</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-[#1A1A1A]">
              Sponsor Benefits
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sponsorBenefits.map((tier, index) => (
              <div key={index} className={`samara-tile p-6 ${
                tier.level === 'Platinum' ? 'border-2 border-[#F4B233]' : ''
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <Star className={`w-5 h-5 ${
                    tier.level === 'Platinum' ? 'text-[#F4B233] fill-[#F4B233]' :
                    tier.level === 'Gold' ? 'text-yellow-500 fill-yellow-500' :
                    tier.level === 'Silver' ? 'text-gray-400 fill-gray-400' :
                    'text-amber-700 fill-amber-700'
                  }`} />
                  <h3 className="font-['Montserrat'] font-bold text-lg uppercase text-[#1A1A1A]">
                    {tier.level}
                  </h3>
                </div>
                <p className="text-[#F4B233] font-bold text-lg mb-4">{tier.amount}</p>
                <ul className="space-y-2">
                  {tier.benefits.map((benefit, bIndex) => (
                    <li key={bIndex} className="text-sm text-[#6E6A63] flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-[#F4B233] mt-1.5 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Become a Sponsor CTA */}
        <div className="sponsor-section grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="samara-tile-accent p-8 lg:p-12">
            <Building2 className="w-12 h-12 text-[#1A1A1A] mb-6" />
            <h2 className="text-2xl sm:text-3xl font-bold uppercase text-[#1A1A1A] mb-4">
              Become a Corporate Sponsor
            </h2>
            <p className="text-[#1A1A1A]/80 mb-6">
              Partner with us to make a lasting impact on families in your community. 
              Our team will work with you to create a sponsorship package that aligns 
              with your corporate values and goals.
            </p>
            <Link to="/forms/sponsor-inquiry" className="samara-btn-secondary inline-flex">
              <Handshake className="w-4 h-4 mr-2" />
              Inquire Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          <div className="samara-tile p-8 lg:p-12">
            <User className="w-12 h-12 text-[#F4B233] mb-6" />
            <h2 className="text-2xl sm:text-3xl font-bold uppercase text-[#1A1A1A] mb-4">
              Individual Giving
            </h2>
            <p className="text-[#6E6A63] mb-6">
              Every donation, no matter the size, helps us support families in need. 
              Join our community of individual donors making a difference every day.
            </p>
            <Link to="/donate" className="samara-btn-primary inline-flex">
              <Heart className="w-4 h-4 mr-2" />
              Donate Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
