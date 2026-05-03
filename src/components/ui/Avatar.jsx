export default function Avatar({ 
  name = '', 
  src, 
  size = 'md',
  className = '' 
}) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // Generate a consistent color based on name
  const getHashColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = [
      '#25D366', '#128C7E', '#FF6B35', '#F5C518', 
      '#3B82F6', '#8B5CF6', '#EC4899', '#10B981'
    ];
    return colors[Math.abs(hash) % colors.length];
  };

  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-20 h-20 text-xl",
    xl: "w-32 h-32 text-3xl",
  };

  return (
    <div 
      className={`relative flex-shrink-0 rounded-full overflow-hidden flex items-center justify-center font-display font-bold text-white border-4 border-[var(--surface-bg)] shadow-md ${sizes[size]} ${className}`}
      style={{ backgroundColor: getHashColor(name) }}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
