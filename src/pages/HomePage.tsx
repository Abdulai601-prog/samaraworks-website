import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Heart, Home, Baby, School, AlertCircle, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Home,
    title: 'Affordable Housing Development',
    description: 'Safe, stable homes for families',
  },
  {
    icon: Baby,
    title: 'Baby Supplies & Essentials',
    description: 'Diapers, formula, cribs & more',
  },
  {
    icon: School,
    title: 'Childcare & Early Childhood',
    description: 'Quality care & parent coaching',
  },
  {
    icon: AlertCircle,
    title: 'Emergency Family Assistance',
    description: 'Rapid response when crisis hits',
  },
  {
    icon: Users,
    title: 'Community Revitalization',
    description: 'Building stronger neighborhoods',
  },
];

const stats = [
  { value: '12,000+', label: 'Families Supported' },
  { value: '90%', label: 'Housing Stability Rate' },
  { value: '4,500+', label: 'Volunteer Hours' },
  { value: '85%', label: 'Improved Stability' },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);
  const involvedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      gsap.fromTo(
        '.hero-photo',
        { opacity: 0, scale: 0.96, y: 24 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power2.out' }
      );
      gsap.fromTo(
        '.hero-headline',
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 0.8, delay: 0.15, ease: 'power2.out' }
      );
      gsap.fromTo(
        '.hero-subheadline',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo(
        '.hero-cta',
        { opacity: 0, y: 48 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.45, ease: 'power2.out' }
      );

      // Mission section scroll animation
      gsap.fromTo(
        '.mission-text',
        { opacity: 0, x: -80 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: missionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
      gsap.fromTo(
        '.mission-photo',
        { opacity: 0, x: 80 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: missionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Services animation
      gsap.fromTo(
        '.service-tile',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: servicesRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Stats counter animation
      gsap.fromTo(
        '.stat-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: impactRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Get involved animation
      gsap.fromTo(
        '.involved-content',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: involvedRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#FDF8F5]">
      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen pt-20 px-6 lg:px-12 pb-12">
        <div className="max-w-7xl mx-auto h-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[calc(100vh-8rem)] items-center">
            {/* Hero Photo Tile */}
            <div className="lg:col-span-7 hero-photo">
              <div className="samara-tile h-[50vh] lg:h-[60vh] relative overflow-hidden">
                <img
                  src="/images/hero_family_home.jpg"
                  alt="Family entering their home"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#5A4A42]/30 to-transparent" />
              </div>
            </div>

            {/* Hero Headline Tile */}
            <div className="lg:col-span-5 hero-headline">
              <div className="samara-tile h-auto lg:h-[60vh] p-8 lg:p-12 flex flex-col justify-center">
                <span className="samara-label mb-4">Samara Works, Inc.</span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase leading-tight text-[#5A4A42] mb-6">
                  Building Safe Homes, Stronger Families, and Brighter Futures
                </h1>
                <p className="text-[#8B7B73] text-lg">
                  Something Beautiful Is Coming — Launching March 18, 2026
                </p>
              </div>
            </div>

            {/* Subheadline Tile */}
            <div className="lg:col-span-6 hero-subheadline">
              <div className="samara-tile p-6 lg:p-8">
                <p className="text-[#5A4A42] text-lg lg:text-xl">
                  We provide housing stability, baby supplies, childcare support, 
                  and emergency assistance—so every family has a foundation to grow.
                </p>
              </div>
            </div>

            {/* CTA Tile */}
            <div className="lg:col-span-6 hero-cta">
              <div className="samara-tile-dark p-6 lg:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link to="/donate" className="samara-btn-primary w-full sm:w-auto">
                  <Heart className="w-4 h-4 mr-2" />
                  Donate
                </Link>
                <Link
                  to="/forms/family-support"
                  className="inline-flex items-center text-white font-semibold uppercase tracking-wider text-sm hover:text-[#E8B4B8] transition-colors"
                >
                  Request Support
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section ref={missionRef} className="py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Mission Text */}
            <div className="mission-text">
              <div className="samara-tile p-8 lg:p-12 h-full flex flex-col justify-center">
                <span className="samara-label mb-4">Our Mission</span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase leading-tight text-[#5A4A42] mb-6">
                  Samara Works is a nonprofit dedicated to helping mothers, children, 
                  and families thrive.
                </h2>
                <p className="text-[#8B7B73] text-lg leading-relaxed">
                  We provide housing stability, baby supplies, childcare support, 
                  and emergency assistance—so every family has a foundation to grow.
                </p>
              </div>
            </div>

            {/* Mission Photo */}
            <div className="mission-photo">
              <div className="samara-tile h-[50vh] lg:h-full relative overflow-hidden">
                <img
                  src="/images/mission_mother_child.jpg"
                  alt="Mother and child"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section ref={servicesRef} className="py-20 px-6 lg:px-12 bg-[#FAF0EB]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Headline */}
            <div className="lg:col-span-4">
              <div className="samara-tile p-8 lg:p-10 h-full">
                <span className="samara-label mb-4">What We Do</span>
                <h2 className="text-2xl sm:text-3xl font-bold uppercase leading-tight text-[#5A4A42] mb-4">
                  Our Programs & Services
                </h2>
                <p className="text-[#8B7B73]">
                  Housing • Baby Supplies • Childcare • Emergency Aid • Community Revitalization
                </p>
              </div>
            </div>

            {/* Service Tiles */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((service, index) => (
                <div key={index} className="service-tile">
                  <div className="samara-tile p-6 hover:-translate-y-1 transition-transform cursor-pointer">
                    <service.icon className="w-8 h-8 text-[#C85A5A] mb-4" />
                    <h3 className="font-['Montserrat'] font-bold text-lg uppercase text-[#5A4A42] mb-2">
                      {service.title}
                    </h3>
                    <p className="text-[#8B7B73] text-sm">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Program Highlights */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Housing Program */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7">
              <div className="samara-tile h-[40vh] lg:h-[50vh] overflow-hidden">
                <img
                  src="/images/housing_family_keys.jpg"
                  alt="Family receiving keys"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="samara-tile p-8 lg:p-10">
                <span className="samara-label mb-4">Program</span>
                <h3 className="text-xl sm:text-2xl font-bold uppercase text-[#5A4A42] mb-4">
                  Housing Stability Support
                </h3>
                <p className="text-[#8B7B73] mb-6">
                  We help families secure safe, affordable homes and stay housed through 
                  coaching, financial assistance, and landlord partnership.
                </p>
                <div className="samara-tile-dark p-4 inline-block">
                  <p className="text-white text-sm font-medium">
                    90% of families assisted remain stably housed after 12 months.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Baby Supplies Program */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="samara-tile p-8 lg:p-10">
                <span className="samara-label mb-4">Program</span>
                <h3 className="text-xl sm:text-2xl font-bold uppercase text-[#5A4A42] mb-4">
                  Baby Supplies & Essentials
                </h3>
                <p className="text-[#8B7B73] mb-6">
                  Diapers, wipes, formula, clothing, cribs, and car seats—delivered 
                  with dignity and care.
                </p>
                <div className="samara-tile p-4 inline-block border border-[#F5E6D3]">
                  <p className="text-[#5A4A42] text-sm font-medium">
                    Monthly distribution events • Pickup & delivery options
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="samara-tile h-[40vh] lg:h-[50vh] overflow-hidden">
                <img
                  src="/images/supplies_baby_room.jpg"
                  alt="Baby supplies"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Childcare Program */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7">
              <div className="samara-tile h-[40vh] lg:h-[50vh] overflow-hidden">
                <img
                  src="/images/childcare_play_group.jpg"
                  alt="Children playing"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="samara-tile p-8 lg:p-10">
                <span className="samara-label mb-4">Program</span>
                <h3 className="text-xl sm:text-2xl font-bold uppercase text-[#5A4A42] mb-4">
                  Childcare & Early Childhood Programs
                </h3>
                <p className="text-[#8B7B73] mb-6">
                  Quality care, developmental screenings, and parent coaching—because 
                  the first years shape everything.
                </p>
                <div className="samara-tile-accent p-4 inline-block">
                  <p className="text-[#5A4A42] text-sm font-medium">
                    Free pre-K readiness workshops • Parent coaching
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Assistance */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="samara-tile p-8 lg:p-10">
                <span className="samara-label mb-4">Program</span>
                <h3 className="text-xl sm:text-2xl font-bold uppercase text-[#5A4A42] mb-4">
                  Emergency Family Assistance
                </h3>
                <p className="text-[#8B7B73] mb-6">
                  When crisis hits, we respond—food, utilities, transportation, 
                  and a clear path to stability.
                </p>
                <div className="samara-tile-dark p-4 inline-block">
                  <p className="text-white text-sm font-medium">
                    24–48 hour response • No wrong door
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="samara-tile h-[40vh] lg:h-[50vh] overflow-hidden">
                <img
                  src="/images/emergency_volunteer_help.jpg"
                  alt="Emergency assistance"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section ref={impactRef} className="py-20 px-6 lg:px-12 bg-[#FAF0EB]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="samara-label mb-4 block">Our Impact</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-[#5A4A42]">
              Making a Difference Together
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="samara-tile p-6 lg:p-8 text-center">
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#C85A5A] mb-2">
                    {stat.value}
                  </p>
                  <p className="text-[#8B7B73] text-sm uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Impact Photos Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="samara-tile h-40 lg:h-48 overflow-hidden">
              <img
                src="/images/impact_volunteer_team.jpg"
                alt="Volunteer team"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="samara-tile h-40 lg:h-48 overflow-hidden">
              <img
                src="/images/impact_kids_playing.jpg"
                alt="Kids playing"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="samara-tile h-40 lg:h-48 overflow-hidden">
              <img
                src="/images/impact_community_event.jpg"
                alt="Community event"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="samara-tile h-40 lg:h-48 overflow-hidden">
              <img
                src="/images/impact_family_walk.jpg"
                alt="Family walking"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section ref={involvedRef} className="py-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="involved-content">
              <div className="samara-tile h-[40vh] lg:h-[60vh] overflow-hidden">
                <img
                  src="/images/volunteer_mentor.jpg"
                  alt="Volunteer mentor"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="involved-content">
              <div className="samara-tile p-8 lg:p-12 mb-6">
                <span className="samara-label mb-4 block">Get Involved</span>
                <h2 className="text-2xl sm:text-3xl font-bold uppercase text-[#5A4A42] mb-4">
                  Join Us in Making a Difference
                </h2>
                <p className="text-[#8B7B73] mb-6">
                  Join us as a volunteer, mentor, or donor. Your time and support 
                  keep families moving forward.
                </p>
              </div>
              <div className="samara-tile-accent p-8 lg:p-12">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/donate" className="samara-btn-secondary">
                    <Heart className="w-4 h-4 mr-2" />
                    Donate
                  </Link>
                  <Link to="/forms/volunteer" className="samara-btn-outline border-[#C85A5A]">
                    Become a Volunteer
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Launch Banner */}
      <section className="py-16 px-6 lg:px-12 bg-[#5A4A42]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-white mb-4">
            Something Beautiful Is Coming
          </h2>
          <p className="text-[#D4C4BC] text-lg mb-8">
            Launching March 18, 2026 — Join us in building a brighter future for families.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/forms/volunteer" className="samara-btn-primary">
              Get Early Access
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#E8B4B8] text-[#E8B4B8] font-semibold uppercase tracking-wider text-sm rounded-full hover:bg-[#E8B4B8] hover:text-[#5A4A42] transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
