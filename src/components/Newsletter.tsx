import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface NewsletterProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

export const Newsletter: React.FC<NewsletterProps> = ({ 
  className = '', 
  title = 'UpdaTionS',
  subtitle = 'Read my Mail.'
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error' | 'duplicate'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    
    try {
      // Use the subscribers table as requested
      const { error } = await supabase
        .from('subscribers')
        .insert([{ email }]);
      
      if (error) {
        // Check for duplicate email error specifically
        if (error.code === '23505' || error.message.includes('duplicate') || error.message.includes('already exists')) {
          setSubmitStatus('duplicate');
          setErrorMessage('This email is already subscribed to our newsletter.');
        } else {
          setSubmitStatus('error');
          setErrorMessage(error.message || 'Something went wrong. Please try again.');
        }
      } else {
        setSubmitStatus('success');
        setEmail(''); // Clear the form on success
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      <div className="glass-elevated rounded-3xl p-12 shadow-glass shadow-investigation">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-neutral-50 mb-6">
            {title}
          </h2>
          <p className="text-xl text-neutral-100">
            {subtitle}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 glass-elevated shadow-glass shadow-investigation rounded-xl text-neutral-50 placeholder-neutral-400 border-none focus:outline-none focus:ring-2 focus:ring-green-400 backdrop-blur-xl disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isSubmitting || !email.trim()}
              className="px-6 py-3 glass-base shadow-glass shadow-investigation hover:glass-elevated text-neutral-50 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none backdrop-blur-xl whitespace-nowrap"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-neutral-300 border-t-transparent rounded-full animate-spin mr-2"></div>
                  Subscribing...
                </div>
              ) : (
                'Subscribe'
              )}
            </button>
          </div>
          
          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
              <p className="text-green-400 text-sm text-center">
                ✅ Thanks for subscribing! Check your email for confirmation.
              </p>
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm text-center">
                ❌ {errorMessage}
              </p>
            </div>
          )}
          
          {submitStatus === 'duplicate' && (
            <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
              <p className="text-yellow-400 text-sm text-center">
                ⚠️ {errorMessage}
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};