'use client';

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Container } from 'react-bootstrap';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />
      <main 
        className="flex-grow-1 content-container"
        style={{ 
          marginLeft: isMobile ? '0' : (isSidebarOpen ? '16rem' : '5rem'),
          transition: 'margin-left 0.3s ease-in-out'
        }}
      >
        <Container fluid>
          {children}
        </Container>
      </main>
    </div>
  );
} 