'use client';

import Link from 'next/link';
import { ArrowRightIcon, ChartBarIcon, CurrencyDollarIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { Container, Row, Col, Card, Nav, Navbar, Button } from 'react-bootstrap';

export default function HomePage() {
  return (
    <div className="min-vh-100 bg-dark">
      {/* Navigation */}
      <Navbar expand="lg" className="py-3 px-3 px-md-5">
        <Container fluid>
          <Navbar.Brand href="/" className="d-flex align-items-center">
            <div className="rounded-circle bg-gradient-primary d-flex align-items-center justify-content-center me-2" style={{width: '40px', height: '40px'}}>
              <span className="text-white fw-bold fs-4">C</span>
            </div>
            <span className="fs-4 fw-bold">CryptoVerse</span>
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link href="/dashboard" className="text-light mx-2">Dashboard</Nav.Link>
              <Nav.Link href="/market" className="text-light mx-2">Market</Nav.Link>
              <Nav.Link href="/exchange" className="text-light mx-2">Exchange</Nav.Link>
              <Nav.Link href="/nft" className="text-light mx-2">NFT</Nav.Link>
            </Nav>
            
            <div className="d-flex gap-2">
              <Button variant="outline-light">Sign In</Button>
              <Button variant="primary">Get Started</Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      {/* Hero Section */}
      <section className="py-5 py-md-6">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="mb-5 mb-md-0">
              <h1 className="display-4 fw-bold mb-4 text-light">
                Your Gateway to the <span className="text-primary">Crypto Universe</span>
              </h1>
              <p className="text-muted fs-5 mb-4">
                Track, trade, and manage your crypto portfolio with real-time data and powerful analytics.
              </p>
              <div className="d-flex gap-3">
                <a href="/dashboard" className="btn btn-primary d-flex align-items-center">
                  <span>Explore Dashboard</span>
                  <ArrowRightIcon style={{width: '20px', height: '20px', marginLeft: '8px'}} />
                </a>
                <a href="/market" className="btn btn-outline-light">
                  View Market
                </a>
              </div>
            </Col>
            <Col md={6} className="d-flex justify-content-center">
              <div className="position-relative w-100" style={{maxWidth: '450px'}}>
                <div className="position-absolute top-0 end-0 bg-primary rounded-circle" 
                     style={{width: '300px', height: '300px', filter: 'blur(80px)', opacity: '0.2', zIndex: '-1'}}></div>
                <div className="position-absolute bottom-0 start-0 bg-info rounded-circle" 
                     style={{width: '300px', height: '300px', filter: 'blur(80px)', opacity: '0.2', zIndex: '-1'}}></div>
                <Card className="border-secondary bg-dark shadow">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <div>
                        <h3 className="fw-bold fs-4 text-light">Market Overview</h3>
                        <p className="text-muted small">Live updates</p>
                      </div>
                      <div className="small text-muted">24h</div>
                    </div>
                    
                    <div className="d-flex flex-column gap-3">
                      <div className="d-flex justify-content-between align-items-center p-3 bg-dark rounded border border-secondary">
                        <div className="d-flex align-items-center gap-3">
                          <div className="crypto-icon">
                            <span>B</span>
                          </div>
                          <div>
                            <div className="fw-medium text-light">Bitcoin</div>
                            <div className="text-muted small">BTC</div>
                          </div>
                        </div>
                        <div className="text-end">
                          <div className="fw-medium text-light">$61,245.32</div>
                          <div className="text-success small">+2.4%</div>
                        </div>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center p-3 bg-dark rounded border border-secondary">
                        <div className="d-flex align-items-center gap-3">
                          <div className="crypto-icon">
                            <span>E</span>
                          </div>
                          <div>
                            <div className="fw-medium text-light">Ethereum</div>
                            <div className="text-muted small">ETH</div>
                          </div>
                        </div>
                        <div className="text-end">
                          <div className="fw-medium text-light">$3,421.67</div>
                          <div className="text-success small">+1.8%</div>
                        </div>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center p-3 bg-dark rounded border border-secondary">
                        <div className="d-flex align-items-center gap-3">
                          <div className="crypto-icon">
                            <span>S</span>
                          </div>
                          <div>
                            <div className="fw-medium text-light">Solana</div>
                            <div className="text-muted small">SOL</div>
                          </div>
                        </div>
                        <div className="text-end">
                          <div className="fw-medium text-light">$142.89</div>
                          <div className="text-danger small">-3.2%</div>
                        </div>
                      </div>
                    </div>
                    
                    <a href="/market" className="btn btn-link w-100 mt-4 text-primary fw-medium">
                      View All Markets
                    </a>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Features Section */}
      <section className="py-5 py-md-6 bg-dark">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fs-1 fw-bold mb-3 text-light">Why Choose CryptoVerse</h2>
            <p className="text-muted mx-auto" style={{maxWidth: '700px'}}>
              Our platform provides everything you need to navigate the crypto world with confidence.
            </p>
          </div>
          
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 bg-dark border-secondary">
                <Card.Body className="p-4">
                  <div className="rounded bg-primary d-flex align-items-center justify-content-center mb-4" 
                       style={{width: '48px', height: '48px'}}>
                    <ChartBarIcon style={{width: '24px', height: '24px'}} className="text-white" />
                  </div>
                  <h3 className="fs-4 fw-bold mb-2 text-light">Real-time Analytics</h3>
                  <p className="text-muted">
                    Track market movements with advanced charts and indicators updated in real-time.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4}>
              <Card className="h-100 bg-dark border-secondary">
                <Card.Body className="p-4">
                  <div className="rounded bg-info d-flex align-items-center justify-content-center mb-4" 
                       style={{width: '48px', height: '48px'}}>
                    <CurrencyDollarIcon style={{width: '24px', height: '24px'}} className="text-white" />
                  </div>
                  <h3 className="fs-4 fw-bold mb-2 text-light">Portfolio Management</h3>
                  <p className="text-muted">
                    Easily manage your crypto assets and track performance across multiple exchanges.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4}>
              <Card className="h-100 bg-dark border-secondary">
                <Card.Body className="p-4">
                  <div className="rounded bg-primary d-flex align-items-center justify-content-center mb-4" 
                       style={{width: '48px', height: '48px'}}>
                    <GlobeAltIcon style={{width: '24px', height: '24px'}} className="text-white" />
                  </div>
                  <h3 className="fs-4 fw-bold mb-2 text-light">Global Market Access</h3>
                  <p className="text-muted">
                    Access cryptocurrency markets worldwide with our comprehensive exchange integration.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* CTA Section */}
      <section className="py-5 py-md-6 text-center">
        <Container>
          <div className="mx-auto" style={{maxWidth: '700px'}}>
            <h2 className="fs-1 fw-bold mb-3 text-light">Ready to Start Your Crypto Journey?</h2>
            <p className="text-muted mb-4">
              Join thousands of traders and investors who trust CryptoVerse for their crypto needs.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <a href="/signup" className="btn btn-primary btn-lg">Create Free Account</a>
              <a href="/about" className="btn btn-outline-light btn-lg">Learn More</a>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Footer */}
      <footer className="py-4 border-top border-secondary">
        <Container>
          <Row className="align-items-center">
            <Col md={4} className="mb-3 mb-md-0 text-center text-md-start">
              <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                <div className="rounded-circle bg-gradient-primary d-flex align-items-center justify-content-center me-2" 
                     style={{width: '32px', height: '32px'}}>
                  <span className="text-white fw-bold small">C</span>
                </div>
                <span className="fs-5 fw-bold text-light">CryptoVerse</span>
              </div>
            </Col>
            
            <Col md={4} className="mb-3 mb-md-0">
              <Nav className="justify-content-center">
                <Nav.Link href="/dashboard" className="text-muted px-2">Dashboard</Nav.Link>
                <Nav.Link href="/market" className="text-muted px-2">Market</Nav.Link>
                <Nav.Link href="/exchange" className="text-muted px-2">Exchange</Nav.Link>
                <Nav.Link href="/nft" className="text-muted px-2">NFT</Nav.Link>
              </Nav>
            </Col>
            
            <Col md={4} className="text-center text-md-end">
              <div className="text-muted small">
                © 2023 CryptoVerse. All rights reserved.
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}