import React from 'react';
import { Users, Shield, Heart, Zap, Star, HelpCircle, MessageSquare, Youtube, Mail } from 'lucide-react';
import { Newsletter } from '../components/Newsletter';

export const CommunityPage: React.FC = () => {
  const coreValues = [
    {
      icon: Shield,
      title: 'Authenticity',
      description: 'We believe in honest storytelling and real experiences over staged content and filtered realities. Every adventure shared should reflect genuine encounters and authentic discoveries.',
      examples: [
        'Unedited photography that shows both beauty and challenges',
        'Honest gear reviews based on actual field testing',
        'Transparent documentation of failed attempts and lessons learned',
        'Respectful representation of local cultures and communities'
      ]
    },
    {
      icon: Heart,
      title: 'Respect',
      description: 'For the places we visit, the people we meet, and the environments we explore. We travel with humility and leave places better than we found them.',
      examples: [
        'Following Leave No Trace principles in all adventures',
        'Learning about local customs before visiting new places',
        'Supporting local businesses and communities',
        'Minimizing environmental impact and carbon footprint'
      ]
    },
    {
      icon: Star,
      title: 'Fun',
      description: 'Adventure should bring joy, wonder, and discovery. While we take safety seriously, we never forget that exploration is fundamentally about play and curiosity.',
      examples: [
        'Embracing spontaneous discoveries and unexpected detours',
        'Sharing humor and lighthearted moments from the road',
        'Celebrating small victories and incremental progress',
        'Maintaining wonder and childlike curiosity in new places'
      ]
    },
    {
      icon: Zap,
      title: 'Invention',
      description: 'Finding creative solutions and unconventional paths. The best adventures often come from thinking differently about familiar places.',
      examples: [
        'Using technology in innovative ways for navigation and documentation',
        'Creating custom gear solutions for unique challenges',
        'Finding alternative routes to avoid crowds and commercialization',
        'Combining different skills and interests for new experiences'
      ]
    },
    {
      icon: Users,
      title: 'Helpfulness',
      description: 'Sharing knowledge and experiences to help others embark on their own authentic adventures. We believe in lifting others up.',
      examples: [
        'Detailed gear testing and honest recommendations',
        'Safety protocols and emergency preparedness guidance',
        'Cultural sensitivity tips and local knowledge sharing',
        'Supporting fellow adventurers through advice and encouragement'
      ]
    }
  ];

  const faqItems = [
    {
      question: "Why do you maintain an anonymous identity?",
      answer: "Anonymity allows me to access more authentic experiences and protects both my safety and the privacy of people I encounter during adventures. Many meaningful interactions happen when I'm not focused on being recognized or documented. This approach also prevents commercialization from changing the nature of the experiences shared."
    },
    {
      question: "How can I suggest locations or adventures for you to explore?",
      answer: "I welcome suggestions through the contact form below. While I can't respond to every suggestion personally, I read all submissions carefully and incorporate community input into my planning. Focus on places with interesting cultural, historical, or natural significance rather than just tourist attractions."
    },
    {
      question: "What gear questions do you answer?",
      answer: "I provide honest reviews and testing feedback on gear used in real-world conditions. Ask about equipment reliability, durability in different environments, weight-to-performance ratios, and true field performance rather than just specifications. I focus on gear that enables authentic adventure experiences."
    },
    {
      question: "How can I collaborate on content or adventures?",
      answer: "I'm selective about collaborations to maintain authenticity. For potential partnerships, I'm interested in organizations that align with our core values: respecting local cultures, minimizing environmental impact, and prioritizing genuine discovery over commercialization. Reach out through the contact form with specific collaboration ideas."
    },
    {
      question: "How do you ensure safety during undercover adventures?",
      answer: "Safety is paramount in all operations. I maintain constant communication with trusted contacts, carry emergency communication devices, research thoroughly before new locations, and have established protocols for various scenarios. When in doubt about safety, I abort missions rather than take unnecessary risks."
    },
    {
      question: "Do you offer gear recommendations for specific budgets?",
      answer: "Yes, I believe quality adventure gear shouldn't be limited to high-end products. I test items across different price ranges and provide alternatives that offer the best value for specific use cases. The focus is always on reliability and performance over brand prestige."
    }
  ];

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-neutral-50 mb-6">
              Command Center
            </h1>
            <p className="text-xl text-neutral-50 max-w-3xl mx-auto">
              The community behind the adventures. Transparent about identity, 
              values, and the mission that drives authentic exploration.
            </p>
          </div>
        </div>
      </section>

      {/* About Identity */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-elevated shadow-glass shadow-investigation rounded-3xl p-12">
            <h2 className="font-display text-3xl font-bold text-neutral-50 mb-6">
              The Mission Behind the Veil
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-neutral-50 leading-relaxed mb-6">
                In a digital age saturated with staged content and commercialized travel, 
                I choose to document authentic adventures from the shadows. This anonymity 
                isn't about secrecy—it's about freedom.
              </p>
              <p className="text-lg text-neutral-50 leading-relaxed mb-6">
                When people don't know who I am, they show me who they are. Conversations 
                become genuine, experiences become unfiltered, and discoveries feel truly 
                earned. The camera disappears, and the adventure becomes about the place, 
                the people, and the moment—not about the person behind the lens.
              </p>
              <p className="text-lg text-neutral-50 leading-relaxed">
                This mission drives me to explore not just geographic boundaries, but the 
                limits of authentic human connection, responsible tourism, and the profound 
                joy of discovering something real in an increasingly curated world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Deep Dive */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-neutral-50 mb-6">
              Core Values in Action
            </h2>
            <p className="text-xl text-neutral-50 max-w-3xl mx-auto">
              These aren't just words on a page—they're principles that guide every decision, 
              every route chosen, and every story shared.
            </p>
          </div>
          
          <div className="space-y-12">
            {coreValues.map((value, index) => (
              <div key={index} className="glass-base shadow-glass shadow-investigation rounded-2xl p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1">
                    <value.icon className="w-12 h-12 text-primary-300 mb-4" />
                    <h3 className="font-display text-2xl font-bold text-neutral-50 mb-4">
                      {value.title}
                    </h3>
                    <p className="text-neutral-50 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                  <div className="lg:col-span-2">
                    <h4 className="font-semibold text-lg text-neutral-50 mb-4">
                      Examples in Practice:
                    </h4>
                    <ul className="space-y-3">
                      {value.examples.map((example, exIndex) => (
                        <li key={exIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-primary-300 rounded-full mr-4 mt-2 flex-shrink-0"></div>
                          <span className="text-neutral-50">{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Options */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-neutral-50 mb-6">
              Join the Journey
            </h2>
            <p className="text-xl text-neutral-50 max-w-3xl mx-auto">
              Connect with the community of authentic explorers and adventure seekers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-base shadow-glass shadow-investigation rounded-2xl p-8 text-center hover:glass-elevated transition-all duration-300">
              <Youtube className="w-12 h-12 text-primary-300 mx-auto mb-4" />
              <h3 className="font-semibold text-xl text-neutral-50 mb-4">Video Stories</h3>
              <p className="text-neutral-50 mb-6">
                Behind-the-scenes footage and video stories from the field
              </p>
              <button className="glass-elevated shadow-glass shadow-investigation hover:glass-base text-neutral-50 hover:text-neutral-50 px-6 py-3 rounded-xl font-medium transition-all duration-300 backdrop-blur-xl">
                Watch on YouTube
              </button>
            </div>
            
            <div className="glass-base shadow-glass shadow-investigation rounded-2xl p-8 text-center hover:glass-elevated transition-all duration-300">
              <Mail className="w-12 h-12 text-primary-300 mx-auto mb-4" />
              <h3 className="font-semibold text-xl text-neutral-50 mb-4">Newsletter</h3>
              <p className="text-neutral-50 mb-6">
                Monthly dispatches with new stories, gear reviews, and adventure tips
              </p>
              <Newsletter className="mt-4" title="Join the Newsletter" subtitle="Get monthly adventure updates" />
            </div>
            
            <div className="glass-base shadow-glass shadow-investigation rounded-2xl p-8 text-center hover:glass-elevated transition-all duration-300">
              <MessageSquare className="w-12 h-12 text-primary-300 mx-auto mb-4" />
              <h3 className="font-semibold text-xl text-neutral-50 mb-4">Community Forum</h3>
              <p className="text-neutral-50 mb-6">
                Connect with fellow adventurers, share experiences, and get advice
              </p>
              <button className="glass-elevated shadow-glass shadow-investigation hover:glass-base text-neutral-50 hover:text-neutral-50 px-6 py-3 rounded-xl font-medium transition-all duration-300 backdrop-blur-xl">
                Join Community
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-neutral-50 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-neutral-50">
              Common questions about the mission, identity, and community
            </p>
          </div>
          
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <div key={index} className="glass-base shadow-glass shadow-investigation rounded-2xl overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start">
                    <HelpCircle className="w-6 h-6 text-primary-300 mr-4 mt-1 flex-shrink-0" />
                    <h3 className="font-semibold text-lg text-neutral-50 mb-3">
                      {item.question}
                    </h3>
                  </div>
                  <p className="text-neutral-50 leading-relaxed ml-10">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-elevated shadow-glass shadow-investigation rounded-3xl p-12">
            <div className="text-center mb-8">
              <h2 className="font-display text-3xl font-bold text-neutral-50 mb-4">
                Secure Communication
              </h2>
              <p className="text-lg text-neutral-50">
                Send suggestions, questions, or collaboration inquiries through this 
                privacy-preserving contact form.
              </p>
            </div>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-neutral-200 font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 glass-elevated shadow-glass shadow-investigation rounded-xl text-neutral-50 placeholder-neutral-400 border-none focus:outline-none focus:ring-2 focus:ring-primary-300 backdrop-blur-xl"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-neutral-200 font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 glass-elevated shadow-glass shadow-investigation rounded-xl text-neutral-50 placeholder-neutral-400 border-none focus:outline-none focus:ring-2 focus:ring-primary-300 backdrop-blur-xl"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-neutral-200 font-medium mb-2">
                  Inquiry Type
                </label>
                <select title="Select form category" className="w-full px-4 py-3 glass-elevated shadow-glass shadow-investigation rounded-xl text-neutral-50 border-none focus:outline-none focus:ring-2 focus:ring-primary-300 backdrop-blur-xl">
                  <option>Location Suggestion</option>
                  <option>Gear Question</option>
                  <option>Collaboration Inquiry</option>
                  <option>General Question</option>
                  <option>Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-neutral-200 font-medium mb-2">
                  Message
                </label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 glass-elevated shadow-glass shadow-investigation rounded-xl text-neutral-50 placeholder-neutral-400 border-none focus:outline-none focus:ring-2 focus:ring-primary-300 resize-none backdrop-blur-xl"
                  placeholder="Share your thoughts, suggestions, or questions..."
                ></textarea>
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  className="px-8 py-4 glass-base shadow-glass shadow-investigation hover:glass-elevated text-neutral-50 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 backdrop-blur-xl"
                >
                  Send Message
                </button>
                <p className="text-neutral-300 text-sm mt-4">
                  Your privacy is respected. Messages are handled securely and 
                  responses may take 3-5 business days.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-base shadow-glass shadow-investigation rounded-2xl p-8 text-center">
            <h3 className="font-display text-2xl font-bold text-neutral-50 mb-4">
              Community Guidelines
            </h3>
            <p className="text-neutral-50 leading-relaxed">
              This community thrives on mutual respect, authentic sharing, and 
              responsible adventure practices. By participating, you agree to 
              maintain these standards and help preserve the spirit of genuine exploration.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};