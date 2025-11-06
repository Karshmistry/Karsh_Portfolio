import { useState } from "react";
import { Mail, MapPin, Github, Linkedin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { track } from '@vercel/analytics';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // EmailJS configuration from environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;  
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        // Fallback: Open email client with pre-filled message
        const subject = encodeURIComponent('Portfolio Contact from ' + formData.name);
        const body = encodeURIComponent(
          `Hello Karsh,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\n---\nSent from your portfolio contact form`
        );
        window.open(`mailto:karshmistry55@gmail.com?subject=${subject}&body=${body}`);
        
        // Track email client fallback usage
        track('Contact Form Submitted', { 
          method: 'Email Client Fallback',
          reason: 'EmailJS not configured',
          name: formData.name,
          email: formData.email 
        });
        
        toast({
          title: "Email Client Opened",
          description: "Please send the email from your email client, or configure EmailJS for automatic sending.",
        });
        
        setFormData({ name: '', email: '', message: '' });
        return;
      }

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Karsh Mistry',
        to_email: 'karshmistry55@gmail.com'
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      // Track successful contact form submission
      track('Contact Form Submitted', { 
        method: 'EmailJS',
        name: formData.name,
        email: formData.email 
      });
      
      toast({
        title: "Success!",
        description: "Your message has been sent successfully. I'll get back to you soon!",
      });

      // Reset form
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS error:', error);
      
      // Fallback to email client on error
      const subject = encodeURIComponent('Portfolio Contact from ' + formData.name);
      const body = encodeURIComponent(
        `Hello Vatsal,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\n---\nSent from your portfolio contact form (EmailJS failed)`
      );
      
      toast({
        title: "Sending via Email Client",
        description: "EmailJS failed. Opening your email client as a backup.",
      });
      
      window.open(`mailto:karshmistry55@gmail.com?subject=${subject}&body=${body}`);
      setFormData({ name: '', email: '', message: '' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-background scroll-mt-20">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-muted-foreground text-xl md:text-2xl leading-relaxed">
            Let's discuss your next project
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 bg-card rounded-lg border border-border hover-lift">
                <Mail className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2 text-xl">Email</h3>
                  <a 
                    href="mailto:karshmistry55@gmail.com" 
                    className="text-muted-foreground hover:text-primary transition-colors text-lg"
                  >
                    karshmistry55@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-card rounded-lg border border-border hover-lift">
                <MapPin className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2 text-xl">Location</h3>
                  <p className="text-muted-foreground text-lg">India</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="flex-1"
                  onClick={() => {
                    track('Social Link Clicked', { 
                      platform: 'GitHub',
                      url: 'https://github.com/Karshmistry',
                      section: 'Contact'
                    });
                    window.open('https://github.com/Karshmistry', '_blank');
                  }}
                >
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="flex-1"
                  onClick={() => {
                    track('Social Link Clicked', { 
                      platform: 'LinkedIn',
                      url: 'https://www.linkedin.com/in/karsh-mistry-756a0a2ba/',
                      section: 'Contact'
                    });
                    window.open('https://www.linkedin.com/in/karsh-mistry-756a0a2ba/', '_blank');
                  }}
                >
                  <Linkedin className="w-5 h-5 mr-2" />
                  LinkedIn
                </Button>
              </div>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border">
              <h3 className="text-3xl font-semibold mb-8">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <input 
                  type="text" 
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 text-lg bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                  required
                />
                <input 
                  type="email" 
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 text-lg bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                  required
                />
                <textarea 
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 text-lg bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none transition-colors"
                  required
                />
                <Button 
                  type="submit" 
                  variant="hero" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
