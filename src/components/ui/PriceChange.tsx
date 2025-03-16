import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import { Badge } from 'react-bootstrap';

interface PriceChangeProps {
  value: number;
  percentage?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function PriceChange({ 
  value, 
  percentage = false, 
  className = '',
  size = 'md'
}: PriceChangeProps) {
  const isPositive = value >= 0;
  const formattedValue = percentage 
    ? `${isPositive ? '+' : ''}${value.toFixed(2)}%`
    : `${isPositive ? '+' : ''}$${Math.abs(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  
  // Determine icon size based on the size prop
  const iconSize = size === 'sm' ? 12 : size === 'lg' ? 20 : 16;
  
  // Determine text size class based on the size prop
  const textSizeClass = size === 'sm' ? 'small' : size === 'lg' ? 'fs-6' : '';
  
  // Set background and text colors
  const bgColor = isPositive ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)';
  const textColor = isPositive ? 'var(--success)' : 'var(--error)';
  
  return (
    <Badge 
      className={`d-inline-flex align-items-center rounded-pill px-2 py-1 ${textSizeClass} ${className}`}
      style={{ 
        backgroundColor: bgColor, 
        color: textColor,
        fontWeight: 'normal'
      }}
    >
      {isPositive ? (
        <ArrowUpIcon style={{ width: iconSize, height: iconSize, marginRight: '4px' }} />
      ) : (
        <ArrowDownIcon style={{ width: iconSize, height: iconSize, marginRight: '4px' }} />
      )}
      <span>{formattedValue}</span>
    </Badge>
  );
} 