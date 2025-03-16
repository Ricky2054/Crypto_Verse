import { ReactNode } from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'gradient' | 'outlined';
  hover?: boolean;
}

export default function Card({ 
  children, 
  className = '',
  variant = 'default',
  hover = true
}: CardProps) {
  // Base styles
  const cardStyle: React.CSSProperties = {
    backgroundColor: 'var(--card-background)',
    borderColor: 'var(--gray-800)',
    borderRadius: '0.75rem',
    transition: 'all 0.3s'
  };
  
  // Add variant-specific styles
  if (variant === 'gradient') {
    cardStyle.backgroundImage = 'linear-gradient(to bottom right, #1A1D24, #0F1116)';
    cardStyle.borderWidth = 0;
  } else if (variant === 'outlined') {
    cardStyle.backgroundColor = 'transparent';
    cardStyle.borderWidth = '2px';
  }
  
  // Add hover effect if enabled
  const hoverClass = hover ? 'card-hover' : '';
  
  return (
    <BootstrapCard 
      style={cardStyle} 
      className={`p-4 ${hoverClass} ${className}`}
    >
      <BootstrapCard.Body className="p-0">
        {children}
      </BootstrapCard.Body>
    </BootstrapCard>
  );
} 