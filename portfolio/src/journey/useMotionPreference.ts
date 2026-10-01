import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'motion';

const readStored = (): string | null => {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

export function useMotionPreference(): [boolean, () => void] {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      const stored = readStored();
      setReduced(stored ? stored === 'reduced' : query.matches);
    };
    apply();
    query.addEventListener('change', apply);
    return () => query.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion = reduced ? 'reduced' : 'full';
  }, [reduced]);

  const toggle = useCallback(() => {
    setReduced((value) => {
      const next = !value;
      try {
        window.localStorage.setItem(STORAGE_KEY, next ? 'reduced' : 'full');
      } catch {
        return next;
      }
      return next;
    });
  }, []);

  return [reduced, toggle];
}
