import React, { useState, useEffect } from 'react';
import { Cookie, X, Check } from 'lucide-react';

interface CookieConsentProps {
  onAccept?: () => void;
  onDecline?: () => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ onAccept, onDecline }) => {
  const [show, setShow] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const acceptAll = (): void => {
    localStorage.setItem('cookie-consent', 'all');
    setShow(false);
    onAccept?.();
  };

  const acceptPreferences = (): void => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    setShow(false);
    if (preferences.analytics || preferences.marketing) {
      onAccept?.();
    } else {
      onDecline?.();
    }
  };

  const decline = (): void => {
    localStorage.setItem('cookie-consent', 'declined');
    setShow(false);
    onDecline?.();
  };

  if (!show) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-black/95 backdrop-blur-xl border-t border-white/10"
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-description"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Cookie className="w-5 h-5 text-green-400" />
              <h3 id="cookie-title" className="text-neutral-50 font-semibold">
                We value your privacy
              </h3>
            </div>
            <p id="cookie-description" className="text-neutral-300 text-sm">
              We use cookies to enhance your experience. You can customize your preferences below.
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full md:w-auto">
            <div className="flex flex-wrap gap-3 text-sm">
              <label className="flex items-center gap-2 text-neutral-300">
                <input
                  type="checkbox"
                  checked={preferences.necessary}
                  disabled
                  className="rounded border-neutral-600 bg-neutral-800 text-green-500 focus:ring-green-500"
                  aria-label="Necessary cookies (required)"
                />
                Necessary
              </label>
              <label className="flex items-center gap-2 text-neutral-300">
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="rounded border-neutral-600 bg-neutral-800 text-green-500 focus:ring-green-500"
                  aria-label="Analytics cookies"
                />
                Analytics
              </label>
              <label className="flex items-center gap-2 text-neutral-300">
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                  className="rounded border-neutral-600 bg-neutral-800 text-green-500 focus:ring-green-500"
                  aria-label="Marketing cookies"
                />
                Marketing
              </label>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={acceptPreferences}
                className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                aria-label="Save cookie preferences"
              >
                <Check className="w-4 h-4" />
                Save Preferences
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg text-sm font-medium transition-colors"
                aria-label="Accept all cookies"
              >
                Accept All
              </button>
              <button
                onClick={decline}
                className="px-4 py-2 bg-transparent border border-neutral-600 hover:bg-neutral-800 text-neutral-300 rounded-lg text-sm font-medium transition-colors"
                aria-label="Decline all cookies"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
