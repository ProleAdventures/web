import React from 'react';
import { SkipForward } from 'lucide-react';

export const SkipLink: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-green-500 focus:text-black focus:font-bold focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
    >
      <SkipForward className="inline-block w-4 h-4 mr-2" />
      Skip to main content
    </a>
  );
};
