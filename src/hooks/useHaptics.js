const vibrate = (pattern) => {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
};

export default function useHaptics() {
  return {
    light: () => vibrate(10),
    medium: () => vibrate(20),
    heavy: () => vibrate([30, 20, 30]),
  };
}
