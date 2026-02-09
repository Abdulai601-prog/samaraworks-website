import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Building2, Handshake, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const sponsorshipTypes = [
  { id: 'financial', label: 'Financial Sponsorship', description: 'Monetary contributions to support our programs' },
  { id: 'in-kind', label: 'In-Kind Donations', description: 'Products, services, or goods for families' },
  { id: 'event', label: 'Event Sponsorship', description: 'Sponsor specific events or programs' },
  { id: 'partner', label: 'Community Partnership', description: 'Ongoing partnership and collaboration' },
];

const sponsorshipLevels = [
  { id: 'platinum', label: 'Platinum', amount: '$25,000+' },
  { id: 'gold', label: 'Gold', amount: '$10,000 - $24,999' },
  { id: 'silver', label: 'Silver', amount: '$5,000 - $9,999' },
  { id: 'bronze', label: 'Bronze', amount: '$1,000 - $4,999' },
  { id: 'custom', label: 'Custom', amount: 'Let us discuss' },
];

export default function SponsorInquiryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState('');
  const [formData, setFormData] = useState({
    organization: '',
    contactName: '',
    contactTitle: '',
    email: '',
    phone: '',
    website: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTypeToggle = (id: string) => {
    setSelectedTypes(prev => 
      prev.includes(id)
        ? prev.filter(t => t !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsCompleted(true);
    toast.success('Inquiry submitted! Our development team will contact you soon.');
  };

  if (isCompleted) {
    return (
      <div className="bg-[#F5F1EC] pt-32 pb-20 min-h-screen">
        <div className="max-w-2xl mx-auto px-6 lg:px-12">
          <div className="samara-tile p-12 text-center">
            <div className="w-24 h-24 rounded-full bg-[#F4B233]/20 flex items-center justify-center mx-auto mb-8">
              <Handshake className="w-12 h-12 text-[#F4B233]" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold uppercase text-[#1A1A1A] mb-4">
              Thank You for Your Interest!
            </h1>
            <p className="text-[#6E6A63] text-lg mb-8">
              We have received your sponsorship inquiry. Our development team will 
              contact you within 3 business days to discuss partnership opportunities.
            </p>
            <div className="samara-tile-accent p-6 mb-8">
              <p className="text-[#1A1A1A] font-medium">
                In the meantime, download our sponsorship packet to learn more about 
                partnership opportunities.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/" className="samara-btn-primary">
                Return Home
              </Link>
              <a 
                href="#" 
                className="samara-btn-outline"
                onClick={(e) => {
                  e.preventDefault();
                  toast.info('Sponsorship packet coming soon!');
                }}
              >
                Download Packet
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F1EC] pt-32 pb-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center text-[#6E6A63] hover:text-[#1A1A1A] mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-8">
          <span className="samara-label mb-4 block">Partnerships</span>
          <h1 className="text-3xl sm:text-4xl font-bold uppercase text-[#1A1A1A] mb-4">
            Sponsor Inquiry
          </h1>
          <p className="text-[#6E6A63]">
            Partner with Samara Works to make a lasting impact on families in our community. 
            We offer various sponsorship opportunities to align with your corporate values.
          </p>
        </div>

        {/* Benefits Preview */}
        <div className="samara-tile-dark p-6 mb-8">
          <h2 className="text-lg font-bold uppercase text-white mb-4">
            Why Partner With Us?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'Direct impact on local families',
              'Brand visibility in the community',
              'Employee engagement opportunities',
              'Tax-deductible contributions',
              'Detailed impact reporting',
              'Networking with other partners',
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-[#9A9590]">
                <Star className="w-4 h-4 text-[#F4B233] flex-shrink-0" />
                {benefit}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="samara-tile p-8">
          {/* Organization Info */}
          <div className="space-y-4 mb-8">
            <h2 className="text-lg font-bold uppercase text-[#1A1A1A]">
              Organization Information
            </h2>
            <div>
              <Label htmlFor="organization">Organization Name *</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6E6A63]" />
                <Input
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  required
                  className="pl-10 rounded-xl"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                type="url"
                placeholder="https://"
                value={formData.website}
                onChange={handleInputChange}
                className="rounded-xl"
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 mb-8">
            <h2 className="text-lg font-bold uppercase text-[#1A1A1A]">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactName">Contact Name *</Label>
                <Input
                  id="contactName"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  required
                  className="rounded-xl"
                />
              </div>
              <div>
                <Label htmlFor="contactTitle">Title/Position</Label>
                <Input
                  id="contactTitle"
                  name="contactTitle"
                  value={formData.contactTitle}
                  onChange={handleInputChange}
                  className="rounded-xl"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="rounded-xl"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="rounded-xl"
              />
            </div>
          </div>

          {/* Sponsorship Type */}
          <div className="mb-8">
            <Label className="text-[#1A1A1A] font-medium mb-4 block">
              Sponsorship Interest *
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sponsorshipTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => handleTypeToggle(type.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedTypes.includes(type.id)
                      ? 'border-[#F4B233] bg-[#F4B233]/10'
                      : 'border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30'
                  }`}
                >
                  <p className="font-medium text-[#1A1A1A]">{type.label}</p>
                  <p className="text-sm text-[#6E6A63]">{type.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Sponsorship Level */}
          <div className="mb-8">
            <Label className="text-[#1A1A1A] font-medium mb-4 block">
              Interested Sponsorship Level
            </Label>
            <div className="flex flex-wrap gap-2">
              {sponsorshipLevels.map((level) => (
                <button
                  key={level.id}
                  type="button"
                  onClick={() => setSelectedLevel(level.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    selectedLevel === level.id
                      ? 'bg-[#F4B233] text-[#1A1A1A]'
                      : 'bg-[#F5F1EC] text-[#6E6A63] hover:bg-[#1A1A1A]/5'
                  }`}
                >
                  {level.label} <span className="text-xs opacity-70">({level.amount})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div className="mb-8">
            <Label htmlFor="message" className="text-[#1A1A1A] font-medium mb-4 block">
              Additional Information
            </Label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Tell us about your organization and how you would like to partner with us..."
              value={formData.message}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-[#1A1A1A]/10 focus:border-[#F4B233] focus:ring-1 focus:ring-[#F4B233] resize-none"
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting || selectedTypes.length === 0}
            className="samara-btn-primary w-full"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-[#1A1A1A]/30 border-t-[#1A1A1A] rounded-full animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              <>
                <Handshake className="w-4 h-4 mr-2" />
                Submit Inquiry
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
