import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Eye, Heart, Users, Home, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: Heart,
    title: 'Compassion',
    description: 'We meet every family with empathy, understanding, and genuine care for their wellbeing.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'We believe in the power of collective action and mutual support to create lasting change.',
  },
  {
    icon: Home,
    title: 'Stability',
    description: 'We work to provide the foundational security every family needs to thrive and grow.',
  },
  {
    icon: Sparkles,
    title: 'Dignity',
    description: 'We serve with respect, preserving the dignity of every individual we support.',
  },
];

const whoWeServe = [
  {
    title: 'Mothers',
    description: 'Single mothers, new mothers, and mothers facing economic hardship.',
  },
  {
    title: 'Children',
    description: 'Children from birth through age 12, with focus on early childhood development.',
  },
  {
    title: 'Families',
    description: 'Families experiencing housing instability, financial crisis, or emergency situations.',
  },
  {
    title: 'Community',
    description: 'Neighborhoods and communities seeking revitalization and stronger support networks.',
  },
];

export default function AboutPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-section',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: pageRef.current,
            start: 'top 70%',
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
        <div className="about-section text-center mb-16">
          <span className="samara-label mb-4 block">About Us</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase text-[#1A1A1A] mb-6">
            About Samara Works
          </h1>
          <p className="text-[#6E6A63] text-lg max-w-2xl mx-auto">
            Learn about our mission, vision, and the values that drive our work 
            to support families in need.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="about-section mb-20">
          <div className="samara-tile p-8 lg:p-16 text-center">
            <div className="max-w-3xl mx-auto">
              <Target className="w-12 h-12 text-[#F4B233] mx-auto mb-6" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-[#1A1A1A] mb-6">
                Our Mission
              </h2>
              <p className="text-xl lg:text-2xl text-[#1A1A1A] leading-relaxed">
                Samara Works is a nonprofit dedicated to helping mothers, children, 
                and families thrive by providing housing stability, baby supplies, 
                childcare support, and emergency assistance—so every family has a 
                foundation to grow.
              </p>
            </div>
          </div>
        </div>

        {/* Vision Statement */}
        <div className="about-section mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="samara-tile p-8 lg:p-12 flex flex-col justify-center">
              <Eye className="w-12 h-12 text-[#F4B233] mb-6" />
              <h2 className="text-2xl sm:text-3xl font-bold uppercase text-[#1A1A1A] mb-6">
                Our Vision
              </h2>
              <p className="text-[#6E6A63] text-lg leading-relaxed mb-6">
                We envision a world where every family has access to safe housing, 
                essential resources, and the support they need to build a bright future. 
                A world where no mother worries about feeding her child, where every 
                baby has a warm crib to sleep in, and where communities come together 
                to lift each other up.
              </p>
              <p className="text-[#6E6A63] text-lg leading-relaxed">
                By 2030, we aim to support 50,000 families across New York State, 
                creating a model for family-centered community support that can be 
                replicated nationwide.
              </p>
            </div>
            <div className="samara-tile h-[40vh] lg:h-auto overflow-hidden">
              <img
                src="/images/impact_family_walk.jpg"
                alt="Family walking together"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="about-section mb-20">
          <div className="text-center mb-12">
            <span className="samara-label mb-4 block">What We Believe</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-[#1A1A1A]">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="samara-tile p-8 hover:-translate-y-1 transition-transform">
                <value.icon className="w-10 h-10 text-[#F4B233] mb-4" />
                <h3 className="font-['Montserrat'] font-bold text-lg uppercase text-[#1A1A1A] mb-3">
                  {value.title}
                </h3>
                <p className="text-[#6E6A63] text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Who We Serve */}
        <div className="about-section mb-20">
          <div className="bg-[#E9E3DA] rounded-[28px] p-8 lg:p-12">
            <div className="text-center mb-12">
              <span className="samara-label mb-4 block">Our Community</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-[#1A1A1A]">
                Who We Serve
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {whoWeServe.map((group, index) => (
                <div key={index} className="samara-tile p-6">
                  <h3 className="font-['Montserrat'] font-bold text-lg uppercase text-[#1A1A1A] mb-2">
                    {group.title}
                  </h3>
                  <p className="text-[#6E6A63] text-sm">
                    {group.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Community Impact Focus */}
        <div className="about-section">
          <div className="samara-tile-dark p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-[#F4B233] text-xs font-semibold uppercase tracking-[0.14em] mb-4 block">
                  Community Impact
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold uppercase text-white mb-6">
                  Focused on Lasting Change
                </h2>
                <p className="text-[#9A9590] text-lg leading-relaxed mb-6">
                  Our work goes beyond immediate assistance. We focus on creating 
                  sustainable change by addressing the root causes of family instability 
                  and building strong community support networks.
                </p>
                <ul className="space-y-3">
                  {[
                    'Preventing homelessness before it starts',
                    'Breaking cycles of poverty through early intervention',
                    'Building resilient, connected communities',
                    'Empowering families to achieve self-sufficiency',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3 text-white">
                      <div className="w-2 h-2 rounded-full bg-[#F4B233]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="samara-tile h-64 lg:h-80 overflow-hidden">
                <img
                  src="/images/impact_community_event.jpg"
                  alt="Community event"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
