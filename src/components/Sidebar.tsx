'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  ChartBarIcon, 
  CurrencyDollarIcon, 
  NewspaperIcon, 
  ArrowsRightLeftIcon, 
  PhotoIcon,
  UserCircleIcon,
  ChatBubbleLeftRightIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Button } from 'react-bootstrap';

const navItems = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
  { name: 'Portfolio', href: '/portfolio', icon: ChartBarIcon },
  { name: 'Market', href: '/market', icon: CurrencyDollarIcon },
  { name: 'News', href: '/news', icon: NewspaperIcon },
  { name: 'Exchange', href: '/exchange', icon: ArrowsRightLeftIcon },
  { name: 'NFT Showcase', href: '/nft', icon: PhotoIcon },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [cryptoPrices, setCryptoPrices] = useState({
    BTC: '61,245.32',
    ETH: '3,421.67',
    SOL: '142.89'
  });

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && (
        <button 
          className="position-fixed top-0 start-0 m-3 bg-dark border-0 rounded-circle d-flex align-items-center justify-content-center z-3"
          style={{ width: '40px', height: '40px', zIndex: 1050 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 
            <XMarkIcon style={{ width: '24px', height: '24px', color: 'white' }} /> : 
            <Bars3Icon style={{ width: '24px', height: '24px', color: 'white' }} />
          }
        </button>
      )}

      {/* Backdrop for mobile */}
      {isMobile && isOpen && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark"
          style={{ opacity: 0.7, zIndex: 1040 }}
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <aside className={`sidebar ${!isOpen ? 'sidebar-closed' : ''}`}>
        <div className="d-flex flex-column h-100">
          {/* Logo */}
          <div className="p-4 d-flex align-items-center">
            <div className="bg-gradient-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
              <span className="text-white fw-bold">CV</span>
            </div>
            <span className="ms-3 fs-4 fw-bold text-gradient">CryptoVerse</span>
          </div>

          {/* Crypto Ticker */}
          <div className="px-4 py-2 small">
            <div className="d-flex align-items-center justify-content-between mb-1">
              <span>BTC</span>
              <span className="fw-medium text-light">${cryptoPrices.BTC}</span>
            </div>
            <div className="d-flex align-items-center justify-content-between mb-1">
              <span>ETH</span>
              <span className="fw-medium text-light">${cryptoPrices.ETH}</span>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <span>SOL</span>
              <span className="fw-medium text-light">${cryptoPrices.SOL}</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-column px-3 py-4 flex-grow-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.name}
                  href={item.href}
                  className={`sidebar-item text-decoration-none ${isActive ? 'active' : ''}`}
                  onClick={() => isMobile && setIsOpen(false)}
                >
                  <item.icon style={{ width: '20px', height: '20px' }} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom section */}
          <div className="p-4 mt-auto">
            <div className="d-flex flex-column gap-3">
              <button className="sidebar-item w-100 border-0 bg-transparent">
                <UserCircleIcon style={{ width: '20px', height: '20px' }} />
                <span>Login / Sign Up</span>
              </button>
              <Button className="bg-gradient-primary border-0 d-flex align-items-center justify-content-center gap-2 py-2">
                <ChatBubbleLeftRightIcon style={{ width: '20px', height: '20px' }} />
                <span>Live Support</span>
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
} 