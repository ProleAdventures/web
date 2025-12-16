import React, { useState } from 'react';
import { Mail, MessageCircle, Send, User, ArrowRight } from 'lucide-react';
import { saveContactMessage } from '../lib/supabase';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await saveContactMessage(formData.name, formData.email, formData.message);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-black">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-elevated rounded-3xl p-12 shadow-glass shadow-investigation backdrop-blur-xl">
            <h1 className="font-display text-5xl md:text-6xl font-bold text-neutral-50 mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-neutral-100 leading-relaxed">
              Have a story to share? Want to collaborate? Or just want to say hello? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="glass-elevated rounded-3xl p-8 shadow-glass shadow-investigation">
              <h2 className="font-display text-3xl font-bold text-neutral-50 mb-6">
                Send a Message
              </h2>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-400/20 border border-green-400 rounded-lg">
                  <p className="text-green-400 text-sm">
                    Thanks for your message! We'll get back to you soon.
                  </p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-400/20 border border-red-400 rounded-lg">
                  <p className="text-red-400 text-sm">
                    Something went wrong. Please try again or reach out directly.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-100 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 glass-elevated shadow-glass shadow-investigation rounded-xl text-neutral-50 placeholder-neutral-400 border-none focus:outline-none focus:ring-2 focus:ring-green-400 backdrop-blur-xl"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-100 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 glass-elevated shadow-glass shadow-investigation rounded-xl text-neutral-50 placeholder-neutral-400 border-none focus:outline-none focus:ring-2 focus:ring-green-400 backdrop-blur-xl"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-100 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 glass-elevated shadow-glass shadow-investigation rounded-xl text-neutral-50 placeholder-neutral-400 border-none focus:outline-none focus:ring-2 focus:ring-green-400 backdrop-blur-xl resize-none"
                    placeholder="Tell us what's on your mind..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center px-8 py-4 glass-base shadow-glass shadow-investigation hover:glass-elevated text-neutral-50 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-xl"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-neutral-300 border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="glass-base rounded-2xl p-6 shadow-glass shadow-investigation">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center mr-4">
                    <Mail className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="font-semibold text-xl text-neutral-50">Email</h3>
                </div>
                <p className="text-neutral-100 mb-2">
                  The best way to reach us for collaboration or story sharing
                </p>
                <a
                  href="mailto:hello@proleadventures.com"
                  className="text-green-400 hover:text-green-300 transition-colors font-medium"
                >
                  hello@proleadventures.com
                </a>
              </div>

              <div className="glass-base rounded-2xl p-6 shadow-glass shadow-investigation">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center mr-4">
                    <MessageCircle className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="font-semibold text-xl text-neutral-50">YouTube Channel</h3>
                </div>
                <p className="text-neutral-100 mb-2">
                  Follow our adventures and join the community
                </p>
                <a
                  href="https://www.youtube.com/@ProleAdventures"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 transition-colors font-medium"
                >
                  @ProleAdventures
                </a>
              </div>

              <div className="glass-base rounded-2xl p-6 shadow-glass shadow-investigation">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center mr-4">
                    <User className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="font-semibold text-xl text-neutral-50">What We Do</h3>
                </div>
                <div className="text-neutral-100 space-y-2">
                  <p>• Urban exploration and documentation</p>
                  <p>• Authentic travel storytelling</p>
                  <p>• Real-world gear testing</p>
                  <p>• Behind-the-scenes content creation</p>
                  <p>• Community building and collaboration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-elevated rounded-3xl p-12 shadow-glass shadow-investigation">
            <h2 className="font-display text-3xl font-bold text-neutral-50 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg text-green-400 mb-2">
                  Can I contribute content or story ideas?
                </h3>
                <p className="text-neutral-100">
                  Absolutely! We're always interested in hearing unique perspectives and story ideas. 
                  Reach out through the form above with your thoughts.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg text-green-400 mb-2">
                  Do you accept collaboration requests?
                </h3>
                <p className="text-neutral-100">
                  We consider collaborations on a case-by-case basis. Please include details about 
                  your project, timeline, and how it aligns with our values of authenticity and exploration.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg text-green-400 mb-2">
                  Can I request specific gear reviews?
                </h3>
                <p className="text-neutral-100">
                  While we can't guarantee specific reviews, we welcome suggestions for gear to test. 
                  Our reviews are based on genuine use, not paid endorsements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};