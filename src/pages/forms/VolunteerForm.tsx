import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Clock, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const volunteerInterests = [
  { id: 'distribution', label: 'Supply Distribution', description: 'Help distribute baby supplies and essentials' },
  { id: 'mentoring', label: 'Family Mentoring', description: 'Provide guidance and support to families' },
  { id: 'childcare', label: 'Childcare Support', description: 'Assist with childcare during programs' },
  { id: 'events', label: 'Event Coordination', description: 'Help organize community events' },
  { id: 'admin', label: 'Administrative Support', description: 'Office work and data entry' },
  { id: 'fundraising', label: 'Fundraising', description: 'Help with donation drives and campaigns' },
];

const availabilityOptions = [
  { id: 'weekdays', label: 'Weekdays' },
  { id: 'weekends', label: 'Weekends' },
  { id: 'evenings', label: 'Evenings' },
  { id: 'flexible', label: 'Flexible' },
];

export default function VolunteerForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    experience: '',
    whyVolunteer: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleInterestToggle = (id: string) => {
    setSelectedInterests(prev => 
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  const handleAvailabilityToggle = (id: string) => {
    setSelectedAvailability(prev => 
      prev.includes(id)
        ? prev.filter(a => a !== id)
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
    toast.success('Volunteer application submitted!');
  };

  if (isCompleted) {
    return (
      <div className="bg-[#F5F1EC] pt-32 pb-20 min-h-screen">
        <div className="max-w-2xl mx-auto px-6 lg:px-12">
          <div className="samara-tile p-12 text-center">
            <div className="w-24 h-24 rounded-full bg-[#F4B233]/20 flex items-center justify-center mx-auto mb-8">
              <Heart className="w-12 h-12 text-[#F4B233] fill-[#F4B233]" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold uppercase text-[#1A1A1A] mb-4">
              Welcome to the Team!
            </h1>
            <p className="text-[#6E6A63] text-lg mb-8">
              Thank you for your interest in volunteering with Samara Works. 
              We will contact you within 5 business days to discuss next steps 
              and schedule your orientation.
            </p>
            <div className="samara-tile-accent p-6 mb-8">
              <p className="text-[#1A1A1A] font-medium">
                In the meantime, follow us on social media to stay updated on our work.
              </p>
            </div>
            <Link to="/" className="samara-btn-primary">
              Return Home
            </Link>
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
          <span className="samara-label mb-4 block">Get Involved</span>
          <h1 className="text-3xl sm:text-4xl font-bold uppercase text-[#1A1A1A] mb-4">
            Volunteer Signup
          </h1>
          <p className="text-[#6E6A63]">
            Join our community of volunteers making a difference in the lives of families. 
            Your time and skills can help create lasting change.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="samara-tile p-4 text-center">
            <Clock className="w-6 h-6 text-[#F4B233] mx-auto mb-2" />
            <p className="text-2xl font-bold text-[#1A1A1A]">4,500+</p>
            <p className="text-[#6E6A63] text-xs">Hours Last Year</p>
          </div>
          <div className="samara-tile p-4 text-center">
            <Users className="w-6 h-6 text-[#F4B233] mx-auto mb-2" />
            <p className="text-2xl font-bold text-[#1A1A1A]">200+</p>
            <p className="text-[#6E6A63] text-xs">Active Volunteers</p>
          </div>
          <div className="samara-tile p-4 text-center">
            <Calendar className="w-6 h-6 text-[#F4B233] mx-auto mb-2" />
            <p className="text-2xl font-bold text-[#1A1A1A]">50+</p>
            <p className="text-[#6E6A63] text-xs">Events Per Year</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="samara-tile p-8">
          {/* Personal Info */}
          <div className="space-y-4 mb-8">
            <h2 className="text-lg font-bold uppercase text-[#1A1A1A]">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="rounded-xl"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
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
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="rounded-xl"
              />
            </div>
          </div>

          {/* Interests */}
          <div className="mb-8">
            <Label className="text-[#1A1A1A] font-medium mb-4 block">
              Areas of Interest *
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {volunteerInterests.map((interest) => (
                <button
                  key={interest.id}
                  type="button"
                  onClick={() => handleInterestToggle(interest.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedInterests.includes(interest.id)
                      ? 'border-[#F4B233] bg-[#F4B233]/10'
                      : 'border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30'
                  }`}
                >
                  <p className="font-medium text-[#1A1A1A]">{interest.label}</p>
                  <p className="text-sm text-[#6E6A63]">{interest.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="mb-8">
            <Label className="text-[#1A1A1A] font-medium mb-4 block">
              Availability *
            </Label>
            <div className="flex flex-wrap gap-2">
              {availabilityOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleAvailabilityToggle(option.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    selectedAvailability.includes(option.id)
                      ? 'bg-[#F4B233] text-[#1A1A1A]'
                      : 'bg-[#F5F1EC] text-[#6E6A63] hover:bg-[#1A1A1A]/5'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-4 mb-8">
            <div>
              <Label htmlFor="experience">Relevant Experience</Label>
              <textarea
                id="experience"
                name="experience"
                rows={3}
                placeholder="Tell us about any relevant experience you have..."
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-[#1A1A1A]/10 focus:border-[#F4B233] focus:ring-1 focus:ring-[#F4B233] resize-none"
              />
            </div>
            <div>
              <Label htmlFor="whyVolunteer">Why do you want to volunteer? *</Label>
              <textarea
                id="whyVolunteer"
                name="whyVolunteer"
                rows={4}
                placeholder="Share your motivation for volunteering with us..."
                value={formData.whyVolunteer}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-[#1A1A1A]/10 focus:border-[#F4B233] focus:ring-1 focus:ring-[#F4B233] resize-none"
              />
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting || selectedInterests.length === 0 || selectedAvailability.length === 0}
            className="samara-btn-primary w-full"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-[#1A1A1A]/30 border-t-[#1A1A1A] rounded-full animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              <>
                <Heart className="w-4 h-4 mr-2" />
                Submit Application
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
