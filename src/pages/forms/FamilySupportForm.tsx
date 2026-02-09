import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, User, Users, Home, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const steps = [
  { id: 1, name: 'Personal Info', icon: User },
  { id: 2, name: 'Household', icon: Users },
  { id: 3, name: 'Address', icon: Home },
  { id: 4, name: 'Needs', icon: Package },
];

const programOptions = [
  { id: 'housing', label: 'Housing Stability Support' },
  { id: 'supplies', label: 'Baby Supplies & Essentials' },
  { id: 'childcare', label: 'Childcare & Early Childhood Programs' },
  { id: 'emergency', label: 'Emergency Family Assistance' },
];

export default function FamilySupportForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    householdSize: '',
    childrenCount: '',
    childrenAges: '',
    address: '',
    city: '',
    zipCode: '',
    programs: [] as string[],
    additionalInfo: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleProgramToggle = (programId: string) => {
    setFormData(prev => ({
      ...prev,
      programs: prev.programs.includes(programId)
        ? prev.programs.filter(p => p !== programId)
        : [...prev.programs, programId],
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsCompleted(true);
    toast.success('Application submitted successfully!');
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
              Application Submitted!
            </h1>
            <p className="text-[#6E6A63] text-lg mb-8">
              Thank you for applying. We have received your request and will contact 
              you within 48 hours to discuss next steps.
            </p>
            <div className="samara-tile-accent p-6 mb-8">
              <p className="text-[#1A1A1A] font-medium">
                Reference Number: SW-{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/" className="samara-btn-primary">
                Return Home
              </Link>
              <Link to="/contact" className="samara-btn-outline">
                Contact Us
              </Link>
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
          <span className="samara-label mb-4 block">Application</span>
          <h1 className="text-3xl sm:text-4xl font-bold uppercase text-[#1A1A1A] mb-4">
            Family Support Request
          </h1>
          <p className="text-[#6E6A63]">
            Complete this form to request support from Samara Works. All information 
            is kept confidential.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex flex-col items-center ${
                  currentStep >= step.id ? 'text-[#F4B233]' : 'text-[#6E6A63]'
                }`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    currentStep >= step.id 
                      ? 'bg-[#F4B233] text-[#1A1A1A]' 
                      : 'bg-[#E9E3DA] text-[#6E6A63]'
                  }`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium hidden sm:block">{step.name}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 sm:w-20 h-0.5 mx-2 ${
                    currentStep > step.id ? 'bg-[#F4B233]' : 'bg-[#E9E3DA]'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="samara-tile p-8">
          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold uppercase text-[#1A1A1A] mb-4">
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
            </div>
          )}

          {/* Step 2: Household */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold uppercase text-[#1A1A1A] mb-4">
                Household Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="householdSize">Total Household Size *</Label>
                  <Input
                    id="householdSize"
                    name="householdSize"
                    type="number"
                    min="1"
                    value={formData.householdSize}
                    onChange={handleInputChange}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="childrenCount">Number of Children</Label>
                  <Input
                    id="childrenCount"
                    name="childrenCount"
                    type="number"
                    min="0"
                    value={formData.childrenCount}
                    onChange={handleInputChange}
                    className="rounded-xl"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="childrenAges">Children&apos;s Ages (if applicable)</Label>
                <Input
                  id="childrenAges"
                  name="childrenAges"
                  placeholder="e.g., 2, 5, 8"
                  value={formData.childrenAges}
                  onChange={handleInputChange}
                  className="rounded-xl"
                />
              </div>
            </div>
          )}

          {/* Step 3: Address */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold uppercase text-[#1A1A1A] mb-4">
                Address Information
              </h2>
              <div>
                <Label htmlFor="address">Street Address *</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code *</Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    className="rounded-xl"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Needs */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold uppercase text-[#1A1A1A] mb-4">
                Support Needs
              </h2>
              <p className="text-[#6E6A63] mb-4">
                Select the programs you are interested in (select all that apply):
              </p>
              <div className="space-y-3">
                {programOptions.map((program) => (
                  <label
                    key={program.id}
                    className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.programs.includes(program.id)
                        ? 'border-[#F4B233] bg-[#F4B233]/10'
                        : 'border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.programs.includes(program.id)}
                      onChange={() => handleProgramToggle(program.id)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                      formData.programs.includes(program.id)
                        ? 'bg-[#F4B233] border-[#F4B233]'
                        : 'border-[#1A1A1A]/30'
                    }`}>
                      {formData.programs.includes(program.id) && (
                        <CheckCircle className="w-3 h-3 text-[#1A1A1A]" />
                      )}
                    </div>
                    <span className="text-[#1A1A1A]">{program.label}</span>
                  </label>
                ))}
              </div>
              <div>
                <Label htmlFor="additionalInfo">Additional Information</Label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  rows={4}
                  placeholder="Tell us more about your situation and how we can help..."
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#1A1A1A]/10 focus:border-[#F4B233] focus:ring-1 focus:ring-[#F4B233] resize-none"
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-[#1A1A1A]/10">
            <Button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1}
              variant="outline"
              className="rounded-xl"
            >
              Back
            </Button>
            {currentStep < steps.length ? (
              <Button
                type="button"
                onClick={handleNext}
                className="samara-btn-primary"
              >
                Continue
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting || formData.programs.length === 0}
                className="samara-btn-primary"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#1A1A1A]/30 border-t-[#1A1A1A] rounded-full animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
