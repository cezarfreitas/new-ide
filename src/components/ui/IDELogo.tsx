interface IDELogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function IDELogo({ size = 'md', className = '' }: IDELogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className={`${sizeClasses[size]} bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center ${className}`}>
      <span className={`text-black font-bold ${textSizes[size]}`}>IDE</span>
    </div>
  );
}

