import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WatchPage: React.FC = () => {

  return (
    <div className="pt-16 min-h-screen">
      {/* Header */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link 
                to="/"
                className="inline-flex items-center text-neutral-100 hover:text-primary-300 transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
              <h1 className="font-display text-5xl md:text-5xl lg:text-6xl font-bold text-neutral-50 mb-4">
                Watch
              </h1>
              <p className="text-xl text-neutral-100">
                Completed adventures and exploration stories.
              </p>
            </div>
          </div>


        </div>
      </section>



      {/* Content Ready Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="glass-subtle rounded-2xl p-12 shadow-glass shadow-investigation backdrop-blur-xl">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-neutral-50 mb-4">
              Content Coming Soon
            </h2>
            <p className="text-neutral-300">
              Your adventure videos will appear here.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};