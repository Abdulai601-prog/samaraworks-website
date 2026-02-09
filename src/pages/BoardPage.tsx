import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const boardMembers = [
  {
    name: 'Abdulai Mohamed',
    role: 'President',
    image: '/images/board_abdulai.jpg',
    bio: 'Abdulai Mohamed brings over 20 years of experience in community development and nonprofit leadership. As President of Samara Works, he guides our strategic vision and oversees organizational growth. Previously, he served as Executive Director of the Albany Community Development Corporation, where he spearheaded initiatives that provided affordable housing to over 500 families.',
    expertise: ['Strategic Planning', 'Community Development', 'Nonprofit Governance'],
    linkedin: '#',
    email: 'abdulai@samaraworks.org',
  },
  {
    name: 'Owusu Anne',
    role: 'Board Member',
    image: '/images/board_anne.jpg',
    bio: 'Owusu Anne is a dedicated advocate for family welfare and children\'s rights. With a background in social work and public policy, she brings valuable insights to our program development and community outreach efforts. She currently serves as a Senior Policy Advisor at the New York State Department of Family Services.',
    expertise: ['Social Work', 'Public Policy', 'Family Services'],
    linkedin: '#',
    email: 'anne@samaraworks.org',
  },
  {
    name: 'Benjamin Eseku',
    role: 'Board Member',
    image: '/images/board_benjamin.jpg',
    bio: 'Benjamin Eseku is a financial professional with expertise in nonprofit finance and sustainable funding models. As CFO of a regional healthcare nonprofit, he manages budgets exceeding $50 million. His financial acumen ensures Samara Works maintains fiscal responsibility while maximizing our impact on the communities we serve.',
    expertise: ['Nonprofit Finance', 'Fundraising', 'Operations Management'],
    linkedin: '#',
    email: 'benjamin@samaraworks.org',
  },
];

export default function BoardPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.board-card',
        { opacity: 0, y: 40 },
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
          <span className="samara-label mb-4 block">Leadership</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase text-[#1A1A1A] mb-6">
            Board of Directors
          </h1>
          <p className="text-[#6E6A63] text-lg max-w-2xl mx-auto">
            Meet the dedicated leaders guiding Samara Works in our mission to 
            support families and build stronger communities.
          </p>
        </div>

        {/* Board Members Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {boardMembers.map((member, index) => (
            <div key={index} className="board-card">
              <div className="samara-tile overflow-hidden">
                {/* Image */}
                <div className="h-72 lg:h-80 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Content */}
                <div className="p-6 lg:p-8">
                  <span className="samara-label mb-2 block">{member.role}</span>
                  <h2 className="text-xl font-bold uppercase text-[#1A1A1A] mb-4">
                    {member.name}
                  </h2>
                  <p className="text-[#6E6A63] text-sm leading-relaxed mb-6">
                    {member.bio}
                  </p>
                  
                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {member.expertise.map((skill, sIndex) => (
                      <span
                        key={sIndex}
                        className="px-3 py-1 bg-[#F4B233]/20 text-[#1A1A1A] text-xs font-medium rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  {/* Social Links */}
                  <div className="flex gap-3">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-[#1A1A1A]/5 flex items-center justify-center hover:bg-[#F4B233] transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-[#1A1A1A]" />
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="w-10 h-10 rounded-full bg-[#1A1A1A]/5 flex items-center justify-center hover:bg-[#F4B233] transition-colors"
                    >
                      <Mail className="w-4 h-4 text-[#1A1A1A]" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Governance Section */}
        <div className="samara-tile p-8 lg:p-12 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <span className="samara-label mb-4 block">Governance</span>
              <h2 className="text-2xl sm:text-3xl font-bold uppercase text-[#1A1A1A] mb-6">
                Our Commitment to Transparency
              </h2>
              <p className="text-[#6E6A63] leading-relaxed mb-6">
                Samara Works is committed to the highest standards of governance 
                and transparency. Our Board of Directors meets quarterly to review 
                organizational performance, approve strategic initiatives, and ensure 
                we remain true to our mission.
              </p>
              <ul className="space-y-3">
                {[
                  'Annual financial audits by independent CPA firm',
                  'Quarterly board meetings with public summaries',
                  'Annual report published and distributed',
                  'Conflict of interest policies strictly enforced',
                  'Diverse board representing community stakeholders',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-[#1A1A1A]">
                    <div className="w-2 h-2 rounded-full bg-[#F4B233] mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="samara-tile bg-[#E9E3DA] p-6 lg:p-8">
              <h3 className="font-['Montserrat'] font-bold text-lg uppercase text-[#1A1A1A] mb-4">
                Board Committees
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] mb-1">Executive Committee</h4>
                  <p className="text-sm text-[#6E6A63]">
                    Oversees organizational strategy and major decisions
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] mb-1">Finance Committee</h4>
                  <p className="text-sm text-[#6E6A63]">
                    Manages budget, investments, and financial planning
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] mb-1">Programs Committee</h4>
                  <p className="text-sm text-[#6E6A63]">
                    Evaluates and guides program development
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#1A1A1A] mb-1">Development Committee</h4>
                  <p className="text-sm text-[#6E6A63]">
                    Leads fundraising and partnership initiatives
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Join the Board CTA */}
        <div className="samara-tile-dark p-8 lg:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold uppercase text-white mb-4">
            Interested in Joining Our Board?
          </h2>
          <p className="text-[#9A9590] mb-8 max-w-2xl mx-auto">
            We are always seeking passionate community leaders who share our vision 
            of supporting families and building stronger communities.
          </p>
          <a
            href="mailto:info@samaraworks.org?subject=Board%20Membership%20Inquiry"
            className="samara-btn-primary inline-flex"
          >
            <Mail className="w-4 h-4 mr-2" />
            Express Interest
          </a>
        </div>
      </div>
    </div>
  );
}
