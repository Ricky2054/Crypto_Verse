'use client';

import { useState } from 'react';
import { Navbar, Container, Nav, Button, Dropdown } from 'react-bootstrap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  ChartBarIcon, 
  CurrencyDollarIcon, 
  NewspaperIcon, 
  PhotoIcon, 
  UserCircleIcon,
  BellIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';

export default function MainNavbar() {
  const pathname = usePathname();
  const [notifications] = useState(3); // Example notification count
  
  const isActive = (path: string) => {
    return pathname === path ? 'active' : '';
  };

  return (
    <Navbar expand="lg" className="bg-dark border-bottom border-secondary sticky-top">
      <Container fluid>
        <Navbar.Brand as={Link} href="/" className="d-flex align-items-center text-light">
          <span className="fs-4 fw-bold me-2">🚀</span>
          <span className="fs-4 fw-bold">CryptoVerse</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="main-navbar" className="border-secondary" />
        
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/" className={`d-flex align-items-center ${isActive('/')}`}>
              <HomeIcon className="nav-icon me-2" />
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} href="/market" className={`d-flex align-items-center ${isActive('/market')}`}>
              <ChartBarIcon className="nav-icon me-2" />
              Market
            </Nav.Link>
            <Nav.Link as={Link} href="/portfolio" className={`d-flex align-items-center ${isActive('/portfolio')}`}>
              <CurrencyDollarIcon className="nav-icon me-2" />
              Portfolio
            </Nav.Link>
            <Nav.Link as={Link} href="/news" className={`d-flex align-items-center ${isActive('/news')}`}>
              <NewspaperIcon className="nav-icon me-2" />
              News
            </Nav.Link>
            <Nav.Link as={Link} href="/nft" className={`d-flex align-items-center ${isActive('/nft')}`}>
              <PhotoIcon className="nav-icon me-2" />
              NFT
            </Nav.Link>
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} className="d-flex align-items-center">
                <ShoppingBagIcon className="nav-icon me-2" />
                Marketplace
              </Dropdown.Toggle>
              <Dropdown.Menu className="bg-dark border-secondary">
                <Dropdown.Item as={Link} href="/marketplace" className={`text-light ${isActive('/marketplace')}`}>
                  NFT Marketplace
                </Dropdown.Item>
                <Dropdown.Item as={Link} href="/news-marketplace" className={`text-light ${isActive('/news-marketplace')}`}>
                  News Marketplace
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
          
          <div className="d-flex align-items-center">
            <div className="position-relative me-3">
              <BellIcon className="nav-icon text-light" />
              {notifications > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {notifications}
                </span>
              )}
            </div>
            
            <Dropdown align="end">
              <Dropdown.Toggle variant="dark" id="user-dropdown" className="d-flex align-items-center">
                <UserCircleIcon className="nav-icon me-2" />
                <span className="d-none d-md-inline">Account</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="bg-dark border-secondary">
                <Dropdown.Item href="#" className="text-light">Profile</Dropdown.Item>
                <Dropdown.Item href="#" className="text-light">Settings</Dropdown.Item>
                <Dropdown.Divider className="border-secondary" />
                <Dropdown.Item href="#" className="text-light">Sign Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            
            <Button variant="primary" className="ms-3 d-none d-md-block">Trade Now</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
} 