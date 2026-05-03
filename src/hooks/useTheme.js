import { useState } from 'react';
import { toggleTheme } from '../utils/theme';

export default function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'light');

  const handleToggle = () => {
    const next = toggleTheme(theme);
    setTheme(next);
  };

  return { theme, toggleTheme: handleToggle };
}
