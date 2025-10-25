import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import StaticPageHeader from "@/components/shared/StaticPageHeader";
import StaticPageFooter from "@/components/shared/StaticPageFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  role: z.string().min(1, "Please select a role"),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject must be less than 200 characters"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters")
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Form submitted:", data);
    toast.success("Message sent successfully! We'll respond within 24 hours.");
    reset();
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <StaticPageHeader />

      {/* Hero Section */}
      <section 
        className="w-full py-24 px-10"
        style={{
          background: 'linear-gradient(135deg, #0f2b38 0%, #194a61 50%, #0f2b38 100%)'
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            We're here to help. Reach out anytime.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full py-20 px-10 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div 
            className="rounded-2xl p-10"
            style={{
              background: '#f9fafb',
              border: '1px solid #e5e7eb'
            }}
          >
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#194a61' }}>
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                  Full Name
                </label>
                <Input
                  {...register("name")}
                  placeholder="John Doe"
                  className="w-full"
                />
                {errors.name && (
                  <p className="text-sm mt-1" style={{ color: '#ef4444' }}>
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                  Email Address
                </label>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="john@example.com"
                  className="w-full"
                />
                {errors.email && (
                  <p className="text-sm mt-1" style={{ color: '#ef4444' }}>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                  I am a...
                </label>
                <Select onValueChange={(value) => setValue("role", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ideator">Ideator</SelectItem>
                    <SelectItem value="executor">Executor</SelectItem>
                    <SelectItem value="investor">Investor</SelectItem>
                    <SelectItem value="buyer">Buyer</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && (
                  <p className="text-sm mt-1" style={{ color: '#ef4444' }}>
                    {errors.role.message}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                  Subject
                </label>
                <Input
                  {...register("subject")}
                  placeholder="How can we help?"
                  className="w-full"
                />
                {errors.subject && (
                  <p className="text-sm mt-1" style={{ color: '#ef4444' }}>
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                  Message
                </label>
                <Textarea
                  {...register("message")}
                  placeholder="Tell us more about your inquiry..."
                  className="w-full min-h-[150px]"
                />
                {errors.message && (
                  <p className="text-sm mt-1" style={{ color: '#ef4444' }}>
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 text-base font-bold text-white transition-opacity hover:opacity-90"
                style={{
                  background: 'linear-gradient(135deg, #679f83, #23698a)'
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Email */}
            <div>
              <div className="text-4xl mb-3">✉️</div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#194a61' }}>
                Email Us
              </h3>
              <a 
                href="mailto:support@kickinn.io"
                className="text-base hover:underline"
                style={{ color: '#679f83' }}
              >
                support@kickinn.io
              </a>
              <p className="text-sm mt-1" style={{ color: '#6b7280' }}>
                We'll respond within 24 hours
              </p>
            </div>

            {/* Help Center */}
            <div>
              <div className="text-4xl mb-3">📚</div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#194a61' }}>
                Help Center
              </h3>
              <a 
                href="/help"
                className="text-base hover:underline"
                style={{ color: '#679f83' }}
              >
                Browse FAQs
              </a>
              <p className="text-sm mt-1" style={{ color: '#6b7280' }}>
                Find answers to common questions
              </p>
            </div>

            {/* Response Time */}
            <div 
              className="rounded-xl p-5 mt-8"
              style={{
                background: 'rgba(74, 222, 128, 0.1)',
                border: '1px solid rgba(74, 222, 128, 0.3)'
              }}
            >
              <p className="text-sm font-medium flex items-center gap-2" style={{ color: '#065f46' }}>
                <span className="text-xl">⚡</span>
                Average response time: 4 hours
              </p>
            </div>
          </div>
        </div>
      </section>

      <StaticPageFooter />
    </div>
  );
};

export default Contact;
