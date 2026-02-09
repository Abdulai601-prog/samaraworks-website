import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, AlertCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const emergencyTypes = [
  { id: 'eviction', label: 'Facing Eviction', urgent: true },
  { id: 'utilities', label: 'Utility Shut-off Notice', urgent: true },
  { id: 'food', label: 'No Food / Empty Pantry', urgent: true },
  { id: 'medical', label: 'Medical Emergency', urgent: true },
  { id: 'transportation', label: 'Transportation Crisis', urgent: false },
  { id: 'other', label: 'Other Emergency', urgent: false },
];

export default function EmergencyAssistanceForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    details: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTypeToggle = (typeId: string) => {
    setSelectedTypes(prev => 
      prev.includes(typeId)
        ? prev.filter(t => t !== typeId)
        : [...prev, typeId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsCompleted(true);
    toast.success('Emergency request submitted! Our team will contact you within 24 hours.');
  };

  if (isCompleted) {
    return (
      <div className="bg-[#F5F1EC] pt-32 pb-20 min-h-screen">
        <div className="max-w-2xl mx-auto px-6 lg:px-12">
          <div className="samara-tile p-12 text-center">
            <div className="w-24 h-24 rounded-full bg-[#F4B233]/20 flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-[#F4B233]" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold uppercase text-[#1A1A1A] mb-4">
              Request Received
            </h1>
            <p className="text-[#6E6A63] text-lg mb-8">
              We have received your emergency assistance request. A member of our team 
              will contact you within 24 hours.
            </p>
            <div className="samara-tile-dark p-6 mb-8">
              <p className="text-white font-medium mb-2">
                If this is a life-threatening emergency, please call 911.
              </p>
              <p className="text-[#9A9590]">
                For urgent non-emergency support, call us at{' '}
                <a href="tel:614-733-9624" className="text-[#F4B233]">614-733-9624</a>
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

        {/* Emergency Banner */}
        <div className="samara-tile-dark p-6 mb-8">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-8 h-8 text-[#F4B233] flex-shrink-0" />
            <div>
              <h2 className="text-xl font-bold uppercase text-white mb-2">
                Emergency Assistance
              </h2>
              <p className="text-[#9A9590]">
                If you are experiencing a life-threatening emergency, please call 911 immediately. 
                This form is for non-life-threatening crisis situations only.
              </p>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <span className="samara-label mb-4 block">24-48 Hour Response</span>
          <h1 className="text-3xl sm:text-4xl font-bold uppercase text-[#1A1A1A] mb-4">
            Emergency Assistance Intake
          </h1>
          <p className="text-[#6E6A63]">
            Complete this form to request emergency assistance. We prioritize urgent 
            requests and aim to respond within 24-48 hours.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="samara-tile p-8">
          {/* Emergency Type */}
          <div className="mb-8">
            <Label className="text-[#1A1A1A] font-medium mb-4 block">
              What type of emergency are you facing? *
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {emergencyTypes.map((type) => (
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
                  <div className="flex items-center justify-between">
                    <span className="text-[#1A1A1A] font-medium">{type.label}</span>
                    {type.urgent && (
                      <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                        Urgent
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 mb-8">
            <h2 className="text-lg font-bold uppercase text-[#1A1A1A]">
              Contact Information
            </h2>
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
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
              <p className="text-xs text-[#6E6A63] mt-1">
                We will call this number to follow up on your request.
              </p>
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="rounded-xl"
              />
            </div>
            <div>
              <Label htmlFor="address">Current Address *</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="rounded-xl"
              />
            </div>
          </div>

          {/* Details */}
          <div className="mb-8">
            <Label htmlFor="details" className="text-[#1A1A1A] font-medium mb-4 block">
              Please describe your situation *
            </Label>
            <textarea
              id="details"
              name="details"
              rows={5}
              placeholder="Please provide as much detail as possible about your emergency situation..."
              value={formData.details}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-[#1A1A1A]/10 focus:border-[#F4B233] focus:ring-1 focus:ring-[#F4B233] resize-none"
            />
          </div>

          {/* Hotline Info */}
          <div className="samara-tile-accent p-4 mb-8">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#1A1A1A]" />
              <p className="text-[#1A1A1A] text-sm">
                <strong>Need immediate help?</strong> Call our emergency hotline at{' '}
                <a href="tel:614-733-9624" className="underline">614-733-9624</a>
              </p>
            </div>
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
              'Submit Emergency Request'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
