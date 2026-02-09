import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Bed, Bath, Square, Phone, Mail, Home, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Mock rental listings data - ready for future use
const rentalListings = [
  {
    id: 1,
    title: 'Cozy 2-Bedroom Family Home',
    address: '123 Maple Street, Albany, NY',
    beds: 2,
    baths: 1,
    sqft: 850,
    rent: 1200,
    image: '/images/housing_family_keys.jpg',
    features: ['Child-friendly', 'Near schools', 'Public transit'],
    available: 'Available Now',
  },
  {
    id: 2,
    title: 'Spacious 3-Bedroom Apartment',
    address: '456 Oak Avenue, Albany, NY',
    beds: 3,
    baths: 2,
    sqft: 1100,
    rent: 1450,
    image: '/images/hero_family_home.jpg',
    features: ['Pet friendly', 'Laundry in unit', 'Parking included'],
    available: 'Available March 1',
  },
  {
    id: 3,
    title: 'Affordable 1-Bedroom Unit',
    address: '789 Pine Road, Albany, NY',
    beds: 1,
    baths: 1,
    sqft: 600,
    rent: 850,
    image: '/images/mission_mother_child.jpg',
    features: ['Utilities included', 'Safe neighborhood', 'Playground nearby'],
    available: 'Available Now',
  },
];

export default function RentalListingsPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.listing-card',
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
    <div ref={pageRef} className="bg-[#FDF8F5] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Page Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#E8B4B8]/20 text-[#C85A5A] text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
            Coming Soon
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase text-[#5A4A42] mb-6">
            Affordable Rental Homes
          </h1>
          <p className="text-[#8B7B73] text-lg max-w-2xl mx-auto">
            Safe, family-friendly housing options at below-market rates. 
            All listings are vetted and approved by Samara Works.
          </p>
        </div>

        {/* Search Filters - Placeholder for future */}
        <div className="samara-tile p-6 mb-12 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-[#FDF8F5] rounded-xl">
              <label className="block text-sm text-[#8B7B73] mb-1">Bedrooms</label>
              <select className="w-full bg-transparent text-[#5A4A42] font-medium focus:outline-none">
                <option>Any</option>
                <option>1 Bedroom</option>
                <option>2 Bedrooms</option>
                <option>3+ Bedrooms</option>
              </select>
            </div>
            <div className="p-4 bg-[#FDF8F5] rounded-xl">
              <label className="block text-sm text-[#8B7B73] mb-1">Max Rent</label>
              <select className="w-full bg-transparent text-[#5A4A42] font-medium focus:outline-none">
                <option>Any</option>
                <option>Under $1,000</option>
                <option>Under $1,500</option>
                <option>Under $2,000</option>
              </select>
            </div>
            <div className="p-4 bg-[#FDF8F5] rounded-xl">
              <label className="block text-sm text-[#8B7B73] mb-1">Availability</label>
              <select className="w-full bg-transparent text-[#5A4A42] font-medium focus:outline-none">
                <option>Any</option>
                <option>Available Now</option>
                <option>Within 30 Days</option>
              </select>
            </div>
            <button className="samara-btn-primary">
              Search Homes
            </button>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {rentalListings.map((listing) => (
            <div key={listing.id} className="listing-card">
              <div className="samara-tile overflow-hidden bg-white">
                {/* Image */}
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#E8B4B8] text-[#5A4A42] text-xs font-semibold rounded-full">
                      {listing.available}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-[#5A4A42] mb-2">
                    {listing.title}
                  </h2>
                  <div className="flex items-center gap-1 text-[#8B7B73] text-sm mb-4">
                    <MapPin className="w-4 h-4" />
                    {listing.address}
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-[#8B7B73]">
                    <span className="flex items-center gap-1">
                      <Bed className="w-4 h-4" /> {listing.beds}
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath className="w-4 h-4" /> {listing.baths}
                    </span>
                    <span className="flex items-center gap-1">
                      <Square className="w-4 h-4" /> {listing.sqft} sqft
                    </span>
                  </div>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {listing.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-[#F5E6D3] text-[#8B6914] text-xs rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-[#F5E6D3]">
                    <div>
                      <span className="text-2xl font-bold text-[#5A4A42]">
                        ${listing.rent}
                      </span>
                      <span className="text-[#8B7B73] text-sm">/month</span>
                    </div>
                    <button className="px-4 py-2 bg-[#E8B4B8] text-[#5A4A42] font-semibold text-sm rounded-full hover:bg-[#D9A5A5] transition-colors">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="samara-tile p-8 lg:p-12 bg-white mb-12">
          <h2 className="text-2xl font-bold uppercase text-[#5A4A42] text-center mb-8">
            How to Apply
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#E8B4B8]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-[#C85A5A]" />
              </div>
              <h3 className="font-bold text-[#5A4A42] mb-2">1. Browse Listings</h3>
              <p className="text-[#8B7B73] text-sm">
                Find a home that fits your family's needs
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#E8B4B8]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-[#C85A5A]" />
              </div>
              <h3 className="font-bold text-[#5A4A42] mb-2">2. Submit Application</h3>
              <p className="text-[#8B7B73] text-sm">
                Complete our simple online application
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#E8B4B8]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-[#C85A5A]" />
              </div>
              <h3 className="font-bold text-[#5A4A42] mb-2">3. Move In</h3>
              <p className="text-[#8B7B73] text-sm">
                Get approved and start your new chapter
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="samara-tile-dark p-8 lg:p-12 text-center">
          <h2 className="text-2xl font-bold uppercase text-white mb-4">
            Need Help Finding a Home?
          </h2>
          <p className="text-[#C8B8A8] mb-6 max-w-xl mx-auto">
            Our housing specialists are here to help you find the perfect home for your family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:614-733-9624" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#E8B4B8] text-[#5A4A42] font-semibold rounded-full">
              <Phone className="w-4 h-4" />
              Call Us
            </a>
            <a href="mailto:housing@samaraworks.org" className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#E8B4B8] text-[#E8B4B8] font-semibold rounded-full">
              <Mail className="w-4 h-4" />
              Email Housing Team
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
