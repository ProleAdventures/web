import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="pt-16 min-h-screen bg-black">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-elevated rounded-3xl p-12 shadow-glass shadow-investigation backdrop-blur-xl">
            <h1 className="font-display text-5xl md:text-6xl font-bold text-neutral-50 mb-6">
              Terms of Use
            </h1>
            <p className="text-xl text-neutral-100">
              Last updated: November 6, 2024
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-elevated rounded-3xl p-12 shadow-glass shadow-investigation">
            <div className="prose prose-invert max-w-none">
              <div className="space-y-8 text-neutral-100 leading-relaxed">
                <div>
                  <h2 className="text-2xl font-semibold text-green-400 mb-4">Acceptance of Terms</h2>
                  <p>
                    By accessing and using this website, you accept and agree to be bound by the terms 
                    and provision of this agreement. If you do not agree to abide by the above, please 
                    do not use this service.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-green-400 mb-4">Use License</h2>
                  <p>
                    Permission is granted to temporarily download one copy of the materials on Prole Adventures' 
                    website for personal, non-commercial transitory viewing only. This is the grant of a license, 
                    not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="list-disc list-inside mt-4 space-y-2">
                    <li>Modify or copy the materials</li>
                    <li>Use the materials for any commercial purpose or for any public display</li>
                    <li>Attempt to reverse engineer any software contained on the website</li>
                    <li>Remove any copyright or other proprietary notations from the materials</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-green-400 mb-4">Content and Disclaimers</h2>
                  <p>
                    The materials on Prole Adventures' website are provided on an 'as is' basis. Prole Adventures 
                    makes no warranties, expressed or implied, and hereby disclaims and negates all other 
                    warranties including without limitation, implied warranties or conditions of merchantability, 
                    fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-green-400 mb-4">User-Generated Content</h2>
                  <p>
                    By submitting content to us (through contact forms, emails, or other means), you grant us 
                    the right to use, modify, and display that content in connection with our website and 
                    related activities. You retain ownership of your content but grant us necessary rights for publication.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-green-400 mb-4">Prohibited Uses</h2>
                  <p>You may not use our website:</p>
                  <ul className="list-disc list-inside mt-4 space-y-2">
                    <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                    <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                    <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                    <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                    <li>To submit false or misleading information</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-green-400 mb-4">Photography and Media</h2>
                  <p>
                    All photographs and media content on this website are the property of Prole Adventures or 
                    are used with permission. Unauthorized use, reproduction, or distribution is strictly prohibited. 
                    If you believe your copyrighted material has been used in a way that constitutes copyright 
                    infringement, please contact us immediately.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-green-400 mb-4">Affiliate Links</h2>
                  <p>
                    This website may contain affiliate links. If you purchase products through these links, 
                    we may receive a commission at no additional cost to you. We only recommend products 
                    we genuinely believe in and have tested ourselves.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-green-400 mb-4">Limitation of Liability</h2>
                  <p>
                    In no event shall Prole Adventures or its suppliers be liable for any damages (including, 
                    without limitation, damages for loss of data or profit, or due to business interruption) 
                    arising out of the use or inability to use the materials on the website.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-green-400 mb-4">Accuracy of Materials</h2>
                  <p>
                    The materials appearing on the website could include technical, typographical, or photographic 
                    errors. Prole Adventures does not warrant that any of the materials on its website are accurate, 
                    complete, or current. Prole Adventures may make changes to the materials at any time without notice.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-green-400 mb-4">Termination</h2>
                  <p>
                    We may terminate or suspend your access immediately, without prior notice or liability, 
                    for any reason whatsoever, including without limitation if you breach the Terms.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-green-400 mb-4">Governing Law</h2>
                  <p>
                    These terms and conditions are governed by and construed in accordance with the laws and 
                    you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-green-400 mb-4">Changes to Terms</h2>
                  <p>
                    Prole Adventures reserves the right to revise these terms of use for its website at any 
                    time without notice. By using this website, you are agreeing to be bound by the then 
                    current version of these terms of use.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold text-green-400 mb-4">Contact Information</h2>
                  <p>
                    If you have any questions about these Terms of Use, please contact us at{' '}
                    <a href="mailto:hello@proleadventures.com" className="text-green-400 hover:text-green-300">
                      hello@proleadventures.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};