import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: MapPin,
    title: 'Address',
    content: '22 Fairlawn Ave\nAlbany, NY 12203',
    action: null,
  },
  {
    icon: Phone,
    title: 'Phone',
    content: '614-733-9624',
    action: 'tel:614-733-9624',
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'info@samaraworks.org',
    action: 'mailto:info@samaraworks.org',
  },
  {
    icon: Clock,
    title: 'Office Hours',
    content: 'Monday - Friday\n9:00 AM - 5:00 PM EST',
    action: null,
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success('Message sent successfully! We will get back to you soon.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-section',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
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
        <div className="contact-section text-center mb-16">
          <span className="samara-label mb-4 block">Get in Touch</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase text-[#1A1A1A] mb-6">
            Contact Us
          </h1>
          <p className="text-[#6E6A63] text-lg max-w-2xl mx-auto">
            Have questions or want to get involved? We would love to hear from you. 
            Reach out and our team will respond within 48 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="contact-section lg:col-span-1">
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="samara-tile p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#F4B233]/20 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-[#F4B233]" />
                    </div>
                    <div>
                      <h3 className="font-['Montserrat'] font-bold text-sm uppercase text-[#1A1A1A] mb-1">
                        {info.title}
                      </h3>
                      {info.action ? (
                        <a
                          href={info.action}
                          className="text-[#6E6A63] whitespace-pre-line hover:text-[#F4B233] transition-colors"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-[#6E6A63] whitespace-pre-line">
                          {info.content}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="samara-tile mt-4 h-64 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2930.8!2d-73.8!3d42.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDM5JzAwLjAiTiA3M8KwNDgnMDAuMCJX!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Samara Works Location"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-section lg:col-span-2">
            <div className="samara-tile p-8 lg:p-12">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-[#F4B233]/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-[#F4B233]" />
                  </div>
                  <h2 className="text-2xl font-bold uppercase text-[#1A1A1A] mb-4">
                    Message Sent!
                  </h2>
                  <p className="text-[#6E6A63] mb-8">
                    Thank you for reaching out. We have received your message and 
                    will get back to you within 48 hours.
                  </p>
                  <Button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        subject: '',
                        message: '',
                      });
                    }}
                    className="samara-btn-primary"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold uppercase text-[#1A1A1A] mb-6">
                    Send Us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-[#1A1A1A] font-medium">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your name"
                          className="rounded-xl border-[#1A1A1A]/10 focus:border-[#F4B233] focus:ring-[#F4B233]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-[#1A1A1A] font-medium">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your@email.com"
                          className="rounded-xl border-[#1A1A1A]/10 focus:border-[#F4B233] focus:ring-[#F4B233]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-[#1A1A1A] font-medium">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="(555) 123-4567"
                          className="rounded-xl border-[#1A1A1A]/10 focus:border-[#F4B233] focus:ring-[#F4B233]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-[#1A1A1A] font-medium">
                          Subject *
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          placeholder="How can we help?"
                          className="rounded-xl border-[#1A1A1A]/10 focus:border-[#F4B233] focus:ring-[#F4B233]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-[#1A1A1A] font-medium">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell us more about how we can help..."
                        rows={6}
                        className="rounded-xl border-[#1A1A1A]/10 focus:border-[#F4B233] focus:ring-[#F4B233] resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="samara-btn-primary w-full sm:w-auto"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-[#1A1A1A]/30 border-t-[#1A1A1A] rounded-full animate-spin mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="contact-section mt-12">
          <div className="samara-tile-dark p-8 lg:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="font-['Montserrat'] font-bold text-lg uppercase text-white mb-2">
                  Need Immediate Help?
                </h3>
                <p className="text-[#9A9590] text-sm mb-4">
                  For emergency assistance, call our hotline
                </p>
                <a
                  href="tel:614-733-9624"
                  className="text-[#F4B233] font-bold text-lg hover:underline"
                >
                  614-733-9624
                </a>
              </div>
              <div>
                <h3 className="font-['Montserrat'] font-bold text-lg uppercase text-white mb-2">
                  Request Support
                </h3>
                <p className="text-[#9A9590] text-sm mb-4">
                  Apply for our programs and services
                </p>
                <a
                  href="/forms/family-support"
                  className="text-[#F4B233] font-bold text-lg hover:underline"
                >
                  Start Application
                </a>
              </div>
              <div>
                <h3 className="font-['Montserrat'] font-bold text-lg uppercase text-white mb-2">
                  Partner With Us
                </h3>
                <p className="text-[#9A9590] text-sm mb-4">
                  Explore sponsorship opportunities
                </p>
                <a
                  href="/forms/sponsor-inquiry"
                  className="text-[#F4B233] font-bold text-lg hover:underline"
                >
                  Become a Sponsor
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
