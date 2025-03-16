'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { Row, Col, Card, Form, InputGroup, Button } from 'react-bootstrap';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

export default function NFTPage() {
  return (
    <DashboardLayout>
      <div className="mb-4">
        <h1 className="fs-2 fw-bold mb-1">NFT Showcase</h1>
        <p className="text-muted">Explore and discover unique digital collectibles</p>
      </div>

      <div className="mb-4">
        <InputGroup className="mb-4" style={{ maxWidth: '500px' }}>
          <Form.Control
            placeholder="Search collections or NFTs..."
            className="bg-dark border-secondary text-light"
          />
          <Button variant="primary">
            <MagnifyingGlassIcon style={{ width: '20px', height: '20px' }} />
          </Button>
        </InputGroup>

        <div className="d-flex flex-wrap gap-2 mb-4">
          <Button variant="primary">All</Button>
          <Button variant="dark">Art</Button>
          <Button variant="dark">Collectibles</Button>
          <Button variant="dark">Photography</Button>
          <Button variant="dark">Music</Button>
          <Button variant="dark">Sports</Button>
          <Button variant="dark">Virtual Worlds</Button>
        </div>
      </div>

      <h2 className="fs-4 fw-bold mb-3">Featured Collections</h2>
      <Row className="g-4 mb-5">
        {[1, 2, 3, 4].map((item) => (
          <Col key={item} sm={6} lg={3}>
            <Card className="bg-dark border-secondary nft-card h-100">
              <div className="position-relative overflow-hidden" style={{ height: '200px' }}>
                <Card.Img 
                  variant="top" 
                  src={`https://via.placeholder.com/400x400?text=NFT+Collection+${item}`} 
                  className="nft-card-image"
                />
                <div 
                  className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center nft-card-overlay"
                  style={{ 
                    background: 'rgba(0,0,0,0.5)', 
                    opacity: 0,
                    transition: 'opacity 0.3s'
                  }}
                >
                  <Button variant="primary">View Collection</Button>
                </div>
              </div>
              <Card.Body>
                <Card.Title className="fs-5 fw-bold">Crypto Punks {item}</Card.Title>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="text-muted small">Floor Price</div>
                  <div className="fw-medium">2.5 ETH</div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="text-muted small">Items</div>
                  <div className="fw-medium">10,000</div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h2 className="fs-4 fw-bold mb-3">Top NFTs</h2>
      <Row className="g-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <Col key={item} sm={6} md={4} lg={3}>
            <Card className="bg-dark border-secondary nft-card h-100">
              <div className="position-relative overflow-hidden" style={{ height: '250px' }}>
                <Card.Img 
                  variant="top" 
                  src={`https://via.placeholder.com/400x400?text=NFT+${item}`} 
                  className="nft-card-image"
                />
                <div 
                  className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center nft-card-overlay"
                  style={{ 
                    background: 'rgba(0,0,0,0.5)', 
                    opacity: 0,
                    transition: 'opacity 0.3s'
                  }}
                >
                  <Button variant="primary">View NFT</Button>
                </div>
              </div>
              <Card.Body>
                <Card.Title className="fs-5 fw-bold">Crypto Art #{item}</Card.Title>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="text-muted small">Current Price</div>
                  <div className="fw-medium">1.2 ETH</div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="crypto-icon me-2" style={{ width: '24px', height: '24px' }}>
                      <span style={{ fontSize: '10px' }}>CP</span>
                    </div>
                    <span className="small">CryptoPunks</span>
                  </div>
                  <Button variant="outline-primary" size="sm">Buy</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </DashboardLayout>
  );
} 