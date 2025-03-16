'use client';

import { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Badge, Tabs, Tab } from 'react-bootstrap';
import { MagnifyingGlassIcon, FireIcon, BookmarkIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import { useNewsData } from '@/utils/useNewsData';
import { timeAgo } from '@/utils/formatters';
import ClientOnly from '@/components/ClientOnly';

export default function NewsMarketplace() {
  const { newsItems } = useNewsData();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('trending');
  
  // Filter news based on search query
  const filteredNews = newsItems.filter(news => 
    news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    news.source.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Get trending news (first 3 items)
  const trendingNews = newsItems.slice(0, 3);
  
  // Get latest news (remaining items)
  const latestNews = newsItems.slice(3);

  // Function to handle image loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/images/placeholders/crypto-news.svg';
  };

  // Fallback image URL
  const fallbackImageUrl = '/images/placeholders/crypto-news.svg';

  return (
    <ClientOnly>
      <Container fluid className="py-4">
        <Row className="mb-4">
          <Col>
            <h1 className="mb-4">Crypto News Marketplace</h1>
            <p className="text-muted">Stay updated with the latest news and insights from the crypto world</p>
          </Col>
        </Row>
        
        {/* Search */}
        <Row className="mb-4">
          <Col md={8}>
            <InputGroup className="mb-3">
              <InputGroup.Text className="bg-secondary border-secondary text-light">
                <MagnifyingGlassIcon className="icon-sm" />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search news, topics, or sources..."
                className="bg-secondary border-secondary text-light"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="primary">Search</Button>
            </InputGroup>
          </Col>
          <Col md={4} className="d-flex justify-content-end align-items-center">
            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k || 'trending')}
              className="border-0"
            >
              <Tab 
                eventKey="trending" 
                title={
                  <div className="d-flex align-items-center">
                    <FireIcon className="icon-sm me-2" />
                    Trending
                  </div>
                }
              />
              <Tab 
                eventKey="latest" 
                title={
                  <div className="d-flex align-items-center">
                    <ArrowTrendingUpIcon className="icon-sm me-2" />
                    Latest
                  </div>
                }
              />
            </Tabs>
          </Col>
        </Row>
        
        {/* Featured News */}
        <Row className="mb-5">
          <Col>
            <h3 className="mb-4">Featured Stories</h3>
          </Col>
        </Row>
        
        <Row className="mb-5">
          {trendingNews.map((news, index) => (
            <Col key={news.id} md={index === 0 ? 6 : 3} className="mb-4">
              <Card className="bg-secondary border-0 shadow-sm h-100 news-card">
                <div className="position-relative" style={{ height: index === 0 ? '400px' : '220px' }}>
                  <img 
                    src={news.imageUrl || fallbackImageUrl}
                    alt={news.title}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    onError={handleImageError}
                  />
                  <div className="position-absolute top-0 end-0 m-2" style={{ zIndex: 1 }}>
                    <Button variant="dark" size="sm" className="rounded-circle p-2">
                      <BookmarkIcon className="icon-sm" />
                    </Button>
                  </div>
                  <div 
                    className="position-absolute bottom-0 start-0 end-0 p-3"
                    style={{ 
                      background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))',
                      zIndex: 1
                    }}
                  >
                    {index === 0 && (
                      <div>
                        <Badge bg="primary" className="mb-2">Featured</Badge>
                        <h4 className="text-white mb-2">{news.title}</h4>
                        <div className="d-flex text-white small">
                          <span>{news.source}</span>
                          <span className="mx-2">•</span>
                          <span>{timeAgo(news.date)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {index !== 0 && (
                  <Card.Body>
                    <Card.Title className="fs-5">{news.title}</Card.Title>
                    <div className="d-flex text-muted small mb-3">
                      <span>{news.source}</span>
                      <span className="mx-2">•</span>
                      <span>{timeAgo(news.date)}</span>
                    </div>
                    <Button variant="outline-primary" size="sm">Read More</Button>
                  </Card.Body>
                )}
              </Card>
            </Col>
          ))}
        </Row>
        
        {/* All News */}
        <Row>
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3>All News</h3>
              <Button variant="outline-secondary">
                <ArrowTrendingUpIcon className="icon-sm me-2" />
                Sort by: Latest
              </Button>
            </div>
            
            <Row>
              {(activeTab === 'trending' ? filteredNews : latestNews).map((news) => (
                <Col key={news.id} md={6} lg={4} className="mb-4">
                  <Card className="bg-secondary border-0 shadow-sm h-100 news-card">
                    <Row className="g-0">
                      <Col xs={4}>
                        <div style={{ height: '140px' }}>
                          <img 
                            src={news.imageUrl || fallbackImageUrl}
                            alt={news.title}
                            style={{ 
                              objectFit: 'cover', 
                              width: '100%', 
                              height: '100%', 
                              borderTopLeftRadius: '0.375rem', 
                              borderBottomLeftRadius: '0.375rem' 
                            }}
                            onError={handleImageError}
                          />
                        </div>
                      </Col>
                      <Col xs={8}>
                        <Card.Body>
                          <Card.Title className="fs-6">{news.title}</Card.Title>
                          <div className="d-flex text-muted small mb-2">
                            <span>{news.source}</span>
                            <span className="mx-2">•</span>
                            <span>{timeAgo(news.date)}</span>
                          </div>
                          <Button variant="link" className="p-0 text-primary">Read More</Button>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
            
            <div className="d-flex justify-content-center mt-4">
              <Button variant="outline-primary" size="lg">Load More</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </ClientOnly>
  );
} 