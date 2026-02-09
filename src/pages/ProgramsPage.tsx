import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { 
  Home, 
  Baby, 
  School, 
  AlertCircle, 
  Users, 
  CheckCircle,
  ArrowRight,
  FileText
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const programs = [
  {
    id: 'housing',
    icon: Home,
    title: 'Housing Stability Support',
    description: 'We help families secure safe, affordable homes and stay housed through coaching, financial assistance, and landlord partnership.',
    image: '/images/housing_family_keys.jpg',
    features: [
      'Emergency rental assistance',
      'Security deposit support',
      'Landlord mediation services',
      'Housing search assistance',
      'Financial coaching',
      'Utility bill assistance',
    ],
    eligibility: [
      'Families with children under 18',
      'Income at or below 80% of area median',
      'Facing eviction or homelessness',
      'Resident of Albany County',
    ],
    howToApply: 'Complete our Family Support Request form. Our team will contact you within 48 hours to discuss your situation and available options.',
    stat: '90% of families assisted remain stably housed after 12 months.',
  },
  {
    id: 'supplies',
    icon: Baby,
    title: 'Baby Supplies & Essentials',
    description: 'Diapers, wipes, formula, clothing, cribs, and car seats—delivered with dignity and care to families in need.',
    image: '/images/supplies_baby_room.jpg',
    features: [
      'Monthly diaper distribution',
      'Formula and baby food',
      'Clothing (newborn to 5T)',
      'Cribs and car seats',
      'Baby hygiene products',
      'Maternity supplies',
    ],
    eligibility: [
      'Expectant mothers',
      'Families with children under 5',
      'Income at or below 200% federal poverty level',
      'Resident of Albany County',
    ],
    howToApply: 'Register for our monthly distribution events through the Family Portal or call our office to schedule a pickup.',
    stat: '5,000+ babies served with essential supplies each year.',
  },
  {
    id: 'childcare',
    icon: School,
    title: 'Childcare & Early Childhood Programs',
    description: 'Quality care, developmental screenings, and parent coaching—because the first years shape everything.',
    image: '/images/childcare_play_group.jpg',
    features: [
      'Free pre-K readiness workshops',
      'Parent coaching and support',
      'Developmental screenings',
      'Referrals to quality childcare',
      'Early literacy programs',
      'Playgroup sessions',
    ],
    eligibility: [
      'Families with children ages 0-5',
      'Income-qualified families',
      'First-time parents',
      'Resident of Albany County',
    ],
    howToApply: 'Sign up through our Family Portal or attend one of our monthly orientation sessions.',
    stat: '85% of children in our programs are ready for kindergarten.',
  },
  {
    id: 'emergency',
    icon: AlertCircle,
    title: 'Emergency Family Assistance',
    description: 'When crisis hits, we respond—food, utilities, transportation, and a clear path to stability.',
    image: '/images/emergency_volunteer_help.jpg',
    features: [
      '24-48 hour response time',
      'Emergency food assistance',
      'Utility bill payment',
      'Transportation support',
      'Crisis counseling referrals',
      'Case management',
    ],
    eligibility: [
      'Families facing immediate crisis',
      'No income requirements for emergency aid',
      'Resident of Albany County',
      'Demonstrated need',
    ],
    howToApply: 'Call our emergency hotline at 614-733-9624 or complete the Emergency Assistance Intake form online.',
    stat: 'Average response time: 24 hours for emergency requests.',
  },
  {
    id: 'community',
    icon: Users,
    title: 'Community Revitalization',
    description: 'Building stronger neighborhoods through community engagement, volunteer programs, and partnership development.',
    image: '/images/impact_community_event.jpg',
    features: [
      'Neighborhood clean-up events',
      'Community garden projects',
      'Volunteer coordination',
      'Partner organization networking',
      'Resource fairs',
      'Community education workshops',
    ],
    eligibility: [
      'Open to all community members',
      'Neighborhood associations',
      'Community groups',
      'Local businesses',
    ],
    howToApply: 'Join our volunteer network or contact us to discuss partnership opportunities.',
    stat: '4,500+ volunteer hours contributed last year.',
  },
];

export default function ProgramsPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.program-section',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
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
        <div className="text-center mb-16">
          <span className="samara-label mb-4 block">Our Work</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase text-[#1A1A1A] mb-6">
            Programs & Services
          </h1>
          <p className="text-[#6E6A63] text-lg max-w-2xl mx-auto">
            Comprehensive support for families at every stage—from emergency assistance 
            to long-term stability programs.
          </p>
        </div>

        {/* Programs List */}
        <div className="space-y-20">
          {programs.map((program, index) => (
            <div key={program.id} id={program.id} className="program-section">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}>
                {/* Image */}
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="samara-tile h-[40vh] lg:h-[50vh] overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="samara-tile p-8 lg:p-10 mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-[#F4B233]/20 flex items-center justify-center">
                        <program.icon className="w-6 h-6 text-[#F4B233]" />
                      </div>
                      <span className="samara-label">Program {index + 1}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold uppercase text-[#1A1A1A] mb-4">
                      {program.title}
                    </h2>
                    <p className="text-[#6E6A63] text-lg mb-6">
                      {program.description}
                    </p>

                    {/* Features */}
                    <div className="mb-6">
                      <h3 className="font-['Montserrat'] font-bold text-sm uppercase tracking-wider text-[#1A1A1A] mb-3">
                        What We Provide
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {program.features.map((feature, fIndex) => (
                          <div key={fIndex} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-[#F4B233] flex-shrink-0" />
                            <span className="text-sm text-[#6E6A63]">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Stat */}
                    <div className="samara-tile-accent p-4 inline-block">
                      <p className="text-[#1A1A1A] text-sm font-medium">
                        {program.stat}
                      </p>
                    </div>
                  </div>

                  {/* Eligibility & How to Apply */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="samara-tile p-6">
                      <h3 className="font-['Montserrat'] font-bold text-sm uppercase tracking-wider text-[#1A1A1A] mb-3">
                        Eligibility
                      </h3>
                      <ul className="space-y-2">
                        {program.eligibility.map((item, eIndex) => (
                          <li key={eIndex} className="flex items-start gap-2 text-sm text-[#6E6A63]">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#F4B233] mt-1.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="samara-tile p-6">
                      <h3 className="font-['Montserrat'] font-bold text-sm uppercase tracking-wider text-[#1A1A1A] mb-3">
                        How to Request Help
                      </h3>
                      <p className="text-sm text-[#6E6A63] mb-4">
                        {program.howToApply}
                      </p>
                      <Link
                        to={program.id === 'emergency' ? '/forms/emergency-assistance' : '/forms/family-support'}
                        className="inline-flex items-center text-[#F4B233] font-semibold text-sm uppercase tracking-wider hover:underline"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Start Application
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20">
          <div className="samara-tile-dark p-8 lg:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold uppercase text-white mb-4">
              Not Sure Which Program is Right for You?
            </h2>
            <p className="text-[#9A9590] mb-8 max-w-2xl mx-auto">
              Contact us and our team will help guide you to the right resources 
              and support for your family's needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="samara-btn-primary">
                Contact Us
              </Link>
              <a 
                href="tel:614-733-9624" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold uppercase tracking-wider text-sm rounded-full hover:bg-white hover:text-[#1A1A1A] transition-colors"
              >
                Call 614-733-9624
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
