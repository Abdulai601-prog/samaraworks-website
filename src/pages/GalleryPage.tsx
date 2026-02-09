import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

type GalleryCategory = 'all' | 'families' | 'programs' | 'events' | 'community';

interface GalleryImage {
  src: string;
  title: string;
  category: GalleryCategory;
  description: string;
}

const galleryImages: GalleryImage[] = [
  {
    src: '/images/hero_family_home.jpg',
    title: 'Welcome Home',
    category: 'families',
    description: 'A family enters their new home through our housing program.',
  },
  {
    src: '/images/mission_mother_child.jpg',
    title: 'Mother and Child',
    category: 'families',
    description: 'The bond between mother and child is at the heart of our mission.',
  },
  {
    src: '/images/housing_family_keys.jpg',
    title: 'Keys to a New Beginning',
    category: 'programs',
    description: 'A family receives the keys to their new home.',
  },
  {
    src: '/images/supplies_baby_room.jpg',
    title: 'Baby Essentials',
    category: 'programs',
    description: 'Our baby supply program provides essential items for new families.',
  },
  {
    src: '/images/childcare_play_group.jpg',
    title: 'Learning Through Play',
    category: 'programs',
    description: 'Children in our early childhood program engage in educational play.',
  },
  {
    src: '/images/emergency_volunteer_help.jpg',
    title: 'Emergency Support',
    category: 'programs',
    description: 'Our volunteers provide rapid response assistance to families in crisis.',
  },
  {
    src: '/images/impact_volunteer_team.jpg',
    title: 'Our Volunteers',
    category: 'community',
    description: 'The dedicated volunteers who make our work possible.',
  },
  {
    src: '/images/impact_kids_playing.jpg',
    title: 'Joy in the Community',
    category: 'community',
    description: 'Children enjoying community playground facilities.',
  },
  {
    src: '/images/impact_community_event.jpg',
    title: 'Community Gathering',
    category: 'events',
    description: 'Neighbors come together at our annual community event.',
  },
  {
    src: '/images/impact_family_walk.jpg',
    title: 'Walking Together',
    category: 'families',
    description: 'A family enjoys a walk in their neighborhood.',
  },
  {
    src: '/images/volunteer_mentor.jpg',
    title: 'Mentorship Moment',
    category: 'programs',
    description: 'A volunteer mentor shares a reading moment with a child.',
  },
  {
    src: '/images/event_breakfast.jpg',
    title: 'Community Breakfast',
    category: 'events',
    description: 'Our annual community breakfast brings families together.',
  },
  {
    src: '/images/event_supply_drive.jpg',
    title: 'Back-to-School Drive',
    category: 'events',
    description: 'Volunteers organize supplies for our annual back-to-school event.',
  },
  {
    src: '/images/event_housing.jpg',
    title: 'Housing Partnership Launch',
    category: 'events',
    description: 'Celebrating a new partnership to expand affordable housing.',
  },
  {
    src: '/images/board_abdulai.jpg',
    title: 'Leadership',
    category: 'community',
    description: 'Our board president guides our organizational vision.',
  },
];

const categories: { value: GalleryCategory; label: string }[] = [
  { value: 'all', label: 'All Photos' },
  { value: 'families', label: 'Families' },
  { value: 'programs', label: 'Programs' },
  { value: 'events', label: 'Events' },
  { value: 'community', label: 'Community' },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const pageRef = useRef<HTMLDivElement>(null);

  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setSelectedIndex(index);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (selectedIndex - 1 + filteredImages.length) % filteredImages.length
      : (selectedIndex + 1) % filteredImages.length;
    setSelectedIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gallery-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          scrollTrigger: {
            trigger: pageRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, [filteredImages]);

  return (
    <div ref={pageRef} className="bg-[#F5F1EC] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <span className="samara-label mb-4 block">Media</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase text-[#1A1A1A] mb-6">
            Gallery
          </h1>
          <p className="text-[#6E6A63] text-lg max-w-2xl mx-auto">
            Moments from our programs, events, and the families we serve.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setActiveCategory(category.value)}
              className={`px-6 py-3 rounded-full font-medium text-sm uppercase tracking-wider transition-all ${
                activeCategory === category.value
                  ? 'bg-[#F4B233] text-[#1A1A1A]'
                  : 'bg-white text-[#6E6A63] hover:bg-[#1A1A1A]/5'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <div
              key={index}
              className="gallery-item samara-tile overflow-hidden cursor-pointer group"
              onClick={() => openLightbox(image, index)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  <h3 className="text-white font-bold text-sm uppercase">{image.title}</h3>
                  <p className="text-white/70 text-xs">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#6E6A63]">No images found in this category.</p>
          </div>
        )}
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-5xl w-[95vw] h-[90vh] p-0 bg-black/95 border-none">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          
          {selectedImage && (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Navigation */}
              <button
                onClick={() => navigateLightbox('prev')}
                className="absolute left-4 z-50 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={() => navigateLightbox('next')}
                className="absolute right-4 z-50 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Image */}
              <div className="max-w-full max-h-full p-8">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="max-w-full max-h-[70vh] object-contain mx-auto"
                />
                <div className="text-center mt-6">
                  <h3 className="text-white font-bold text-xl uppercase mb-2">
                    {selectedImage.title}
                  </h3>
                  <p className="text-white/70">{selectedImage.description}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
