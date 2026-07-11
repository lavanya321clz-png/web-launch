import { useState, useEffect } from 'react';

export function useScrollSpy(ids: string[], offset: number = 160): string {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      // Find which section is currently active
      let currentSection = ids[0] || '';
      
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSection = id;
            break;
          } else if (scrollPosition >= top) {
            currentSection = id; // Fallback to last passed section
          }
        }
      }

      // Special case: if scrolled near the bottom of the page, activate the last section
      const scrolledToBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
      if (scrolledToBottom && ids.length > 0) {
        currentSection = ids[ids.length - 1];
      }

      setActiveId(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to establish initial state
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [ids, offset]);

  return activeId;
}
export default useScrollSpy;
