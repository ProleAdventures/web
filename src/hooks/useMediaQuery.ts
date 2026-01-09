import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = (): void => {
      setMatches(media.matches);
    };

    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

export const useIsMobile = (): boolean => useMediaQuery('(max-width: 768px)');
export const useIsTablet = (): boolean => useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
export const useIsDesktop = (): boolean => useMediaQuery('(min-width: 1025px)');
