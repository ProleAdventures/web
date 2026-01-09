import React from 'react';

export const PrivacyPolicyPage: React.FC = () => {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="pt-16 min-h-screen bg-black">
      {/* Hero Section */}
      <header className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-elevated rounded-3xl p-12 shadow-glass shadow-investigation backdrop-blur-xl">
            <h1 className="font-display text-5xl md:text-6xl font-bold text-neutral-50 mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-neutral-100">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <article className="glass-elevated rounded-3xl p-12 shadow-glass shadow-investigation">
            <div className="prose prose-invert max-w-none">
              <div className="space-y-8 text-neutral-100 leading-relaxed">
                <section aria-labelledby="info-collection">
                  <h2 id="info-collection" className="text-2xl font-semibold text-green-400 mb-4">Information We Collect</h2>
                  <p>
                    We collect information you provide directly to us, such as when you contact us through 
                    our contact form, subscribe to our newsletter, or engage with our content.
                  </p>
                  <ul className="list-disc list-inside mt-4 space-y-2">
                    <li>Name and email address (when you contact us)</li>
                    <li>Message content (when you send us a message)</li>
                    <li>YouTube channel engagement data</li>
                  </ul>
                </section>

                <section aria-labelledby="how-we-use">
                  <h2 id="how-we-use" className="text-2xl font-semibold text-green-400 mb-4">How We Use Your Information</h2>
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc list-inside mt-4 space-y-2">
                    <li>Respond to your messages and inquiries</li>
                    <li>Send you updates about our adventures (if you subscribe)</li>
                    <li>Improve our website and content</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </section>

                <section aria-labelledby="info-sharing">
                  <h2 id="info-sharing" className="text-2xl font-semibold text-green-400 mb-4">Information Sharing</h2>
                  <p>
                    We do not sell, trade, or otherwise transfer your personal information to third parties 
                    without your consent, except as described in this policy or as required by law.
                  </p>
                </section>

                <section aria-labelledby="data-security">
                  <h2 id="data-security" className="text-2xl font-semibold text-green-400 mb-4">Data Security</h2>
                  <p>
                    We implement appropriate security measures to protect your personal information against 
                    unauthorized access, alteration, disclosure, or destruction.
                  </p>
                </section>

                <section aria-labelledby="your-rights">
                  <h2 id="your-rights" className="text-2xl font-semibold text-green-400 mb-4">Your Rights</h2>
                  <p>You have the right to:</p>
                  <ul className="list-disc list-inside mt-4 space-y-2">
                    <li>Access and review your personal information</li>
                    <li>Request corrections to inaccurate information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Unsubscribe from communications at any time</li>
                  </ul>
                </section>

                <section aria-labelledby="third-party">
                  <h2 id="third-party" className="text-2xl font-semibold text-green-400 mb-4">Third-Party Services</h2>
                  <p>
                    Our website may contain links to third-party websites or integrate with services 
                    like YouTube. We are not responsible for the privacy practices of these external services.
                  </p>
                </section>

                <section aria-labelledby="contact-us">
                  <h2 id="contact-us" className="text-2xl font-semibold text-green-400 mb-4">Contact Us</h2>
                  <p>
                    If you have questions about this Privacy Policy, please contact us at{' '}
                    <a href="mailto:hello@proleadventures.com" className="text-green-400 hover:text-green-300">
                      hello@proleadventures.com
                    </a>
                  </p>
                </section>

                <section aria-labelledby="changes">
                  <h2 id="changes" className="text-2xl font-semibold text-green-400 mb-4">Changes to This Policy</h2>
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of any 
                    changes by posting the new policy on this page and updating the "Last updated" date.
                  </p>
                </section>
              </div>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
};
