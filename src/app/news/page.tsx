'use client';

import { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useNewsData } from '@/utils/useNewsData';
import { timeAgo } from '@/utils/formatters';
import ClientOnly from '@/components/ClientOnly';

export default function News() {
  const { newsItems } = useNewsData();
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Categories for filtering
  const categories = ['all', 'bitcoin', 'ethereum', 'defi', 'nft', 'regulation'];
  
  // Filter news based on selected category
  const filteredNews = selectedCategory === 'all' 
    ? newsItems 
    : newsItems.filter(news => news.title.toLowerCase().includes(selectedCategory));
  
  // Featured news (first item)
  const featuredNews = newsItems[0];
  
  // Latest news (remaining items)
  const latestNews = newsItems.slice(1);

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
            <h1 className="mb-3">Crypto News</h1>
            <p className="text-muted">Stay updated with the latest cryptocurrency news and insights</p>
          </Col>
        </Row>
        
        {/* Categories */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex flex-wrap gap-2">
              {categories.map(category => (
                <Button 
                  key={category}
                  variant={selectedCategory === category ? 'primary' : 'outline-secondary'}
                  onClick={() => setSelectedCategory(category)}
                  className="text-capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>
          </Col>
        </Row>
        
        {/* Featured News */}
        {featuredNews && (
          <Row className="mb-5">
            <Col>
              <Card className="bg-secondary border-0 shadow-sm overflow-hidden">
                <Row className="g-0">
                  <Col md={7}>
                    <div className="position-relative" style={{ height: '100%', minHeight: '300px' }}>
                      <img 
                        src={featuredNews.imageUrl || fallbackImageUrl}
                        alt={featuredNews.title}
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                        onError={handleImageError}
                      />
                      <div 
                        className="position-absolute bottom-0 start-0 w-100 p-3"
                        style={{ 
                          background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))',
                          zIndex: 1
                        }}
                      >
                        <Badge bg="primary" className="mb-2">Featured</Badge>
                        <h3 className="text-white mb-2">{featuredNews.title}</h3>
                        <div className="d-flex text-white small">
                          <span>{featuredNews.source}</span>
                          <span className="mx-2">•</span>
                          <span>{timeAgo(featuredNews.date)}</span>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md={5}>
                    <Card.Body className="d-flex flex-column h-100">
                      <h4>{featuredNews.title}</h4>
                      <p className="text-muted mb-4">
                        The cryptocurrency market continues to evolve rapidly, with new developments 
                        shaping the future of digital assets. This article explores the latest trends 
                        and their potential impact on investors and the broader financial ecosystem.
                      </p>
                      <div className="mt-auto">
                        <div className="d-flex text-muted small mb-3">
                          <span>{featuredNews.source}</span>
                          <span className="mx-2">•</span>
                          <span>{timeAgo(featuredNews.date)}</span>
                        </div>
                        <Button variant="primary">Read Full Article</Button>
                      </div>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        )}
        
        {/* Latest News */}
        <Row className="mb-4">
          <Col>
            <h3 className="mb-4">Latest News</h3>
          </Col>
        </Row>
        
        <Row>
          {filteredNews.slice(1).map((news) => (
            <Col key={news.id} md={6} lg={4} className="mb-4">
              <Card className="news-card bg-secondary border-0 shadow-sm h-100">
                <div className="position-relative" style={{ height: '200px' }}>
                  <img 
                    src={news.imageUrl || fallbackImageUrl}
                    alt={news.title}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    onError={handleImageError}
                  />
                  <div className="position-absolute top-0 end-0 m-2" style={{ zIndex: 1 }}>
                    <Badge bg="dark" className="px-2 py-1 opacity-75">
                      {news.source}
                    </Badge>
                  </div>
                </div>
                <Card.Body>
                  <Card.Title className="mb-3">{news.title}</Card.Title>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">{timeAgo(news.date)}</small>
                    <Button variant="outline-primary" size="sm">Read More</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        
        {/* Load More Button */}
        <Row className="mt-4">
          <Col className="text-center">
            <Button variant="outline-primary" size="lg">Load More News</Button>
          </Col>
        </Row>
      </Container>
    </ClientOnly>
  );
} 