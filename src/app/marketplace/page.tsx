'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Badge, Tabs, Tab } from 'react-bootstrap';
import { MagnifyingGlassIcon, FireIcon, ArrowTrendingUpIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { useNFTData } from '@/utils/useNFTData';
import { useNewsData } from '@/utils/useNewsData';
import { formatCurrency, formatNumber, timeAgo } from '@/utils/formatters';
import PriceChart from '@/components/PriceChart';
import ClientOnly from '@/components/ClientOnly';

// Generate price chart data
const generateChartData = (days: number, volatility = 0.05) => {
  const data = [];
  const now = new Date();
  let price = 2.5 + Math.random() * 2; // Starting price between 2.5 and 4.5 ETH
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Add some randomness to the price
    const change = (Math.random() - 0.5) * 2 * volatility;
    price = Math.max(0.1, price * (1 + change));
    
    data.push({
      date: date.toISOString(),
      price
    });
  }
  
  return data;
};

export default function Marketplace() {
  const { nftCollections } = useNFTData();
  const { newsItems } = useNewsData();
  const [timeframe, setTimeframe] = useState('1W');
  const [chartData, setChartData] = useState(() => generateChartData(7));
  const [activeTab, setActiveTab] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Update chart data when timeframe changes
  useEffect(() => {
    let days = 1;
    switch (timeframe) {
      case '1D': days = 1; break;
      case '1W': days = 7; break;
      case '1M': days = 30; break;
      case '1Y': days = 365; break;
    }
    setChartData(generateChartData(days, timeframe === '1D' ? 0.02 : 0.05));
  }, [timeframe]);
  
  // Filter NFTs based on search query
  const filteredNFTs = nftCollections.filter(nft => 
    nft.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Get trending NFTs (top 4 by volume)
  const trendingNFTs = [...nftCollections]
    .sort((a, b) => b.volume24h - a.volume24h)
    .slice(0, 4);
  
  // Get hot NFTs (top 4 by recent price increase)
  const hotNFTs = [...nftCollections]
    .sort((a, b) => (b.floorPrice / b.previousFloorPrice) - (a.floorPrice / a.previousFloorPrice))
    .slice(0, 4);
  
  // Get related news
  const relatedNews = newsItems.slice(0, 3);

  // Function to handle image loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://via.placeholder.com/800x800?text=NFT+Image';
  };

  return (
    <ClientOnly>
      <Container fluid className="py-4">
        <Row className="mb-4">
          <Col>
            <h1 className="mb-4">NFT Marketplace</h1>
            <p className="text-muted">Discover, collect, and sell extraordinary NFTs</p>
          </Col>
        </Row>
        
        {/* Search and Filters */}
        <Row className="mb-4">
          <Col md={8}>
            <InputGroup className="mb-3">
              <InputGroup.Text className="bg-secondary border-secondary text-light">
                <MagnifyingGlassIcon className="icon-sm" />
              </InputGroup.Text>
              <Form.Control
                placeholder="Search collections, NFTs, or artists..."
                className="bg-secondary border-secondary text-light"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="primary">Search</Button>
            </InputGroup>
          </Col>
          <Col md={4} className="d-flex justify-content-end align-items-center">
            <Button variant="outline-secondary" className="me-2">
              <AdjustmentsHorizontalIcon className="icon-sm me-2" />
              Filters
            </Button>
            <Form.Select className="w-auto bg-secondary border-secondary text-light">
              <option>Recently Added</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Most Popular</option>
            </Form.Select>
          </Col>
        </Row>
        
        {/* Market Overview */}
        <Row className="mb-4">
          <Col lg={8}>
            <Card className="bg-secondary border-0 shadow-sm h-100">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Market Overview</h5>
                  <Badge bg="dark" className="px-3 py-2">Floor Price: {formatCurrency(chartData[chartData.length - 1].price, 'ETH')}</Badge>
                </div>
                <PriceChart 
                  data={chartData}
                  timeframe={timeframe}
                  onTimeframeChange={setTimeframe}
                  height={300}
                  color="#8b5cf6"
                />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}>
            <Card className="bg-secondary border-0 shadow-sm h-100">
              <Card.Body>
                <h5 className="mb-3">Latest News</h5>
                {relatedNews.map((news) => (
                  <div key={news.id} className="mb-3 pb-3 border-bottom border-dark">
                    <div className="d-flex">
                      <div className="me-3" style={{ width: '80px', height: '60px' }}>
                        <img 
                          src={news.imageUrl} 
                          alt={news.title} 
                          onError={handleImageError}
                          className="w-100 h-100 object-fit-cover rounded"
                        />
                      </div>
                      <div>
                        <h6 className="mb-1 text-truncate" style={{ maxWidth: '250px' }}>{news.title}</h6>
                        <div className="d-flex text-muted small">
                          <span>{news.source}</span>
                          <span className="mx-2">•</span>
                          <span>{timeAgo(news.date)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="link" className="p-0 text-primary">View All News</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        {/* Featured Collections */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3>Featured Collections</h3>
              <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k || 'trending')}
                className="border-0"
              >
                <Tab 
                  eventKey="trending" 
                  title={
                    <div className="d-flex align-items-center">
                      <ArrowTrendingUpIcon className="icon-sm me-2" />
                      Trending
                    </div>
                  }
                />
                <Tab 
                  eventKey="hot" 
                  title={
                    <div className="d-flex align-items-center">
                      <FireIcon className="icon-sm me-2" />
                      Hot
                    </div>
                  }
                />
              </Tabs>
            </div>
            
            <Row>
              {(activeTab === 'trending' ? trendingNFTs : hotNFTs).map((nft) => (
                <Col key={nft.id} md={6} lg={3} className="mb-4">
                  <Card className="nft-card bg-secondary border-0 shadow-sm h-100">
                    <div className="position-relative">
                      <Card.Img 
                        variant="top" 
                        src={nft.imageUrl} 
                        onError={handleImageError}
                        style={{ height: '220px', objectFit: 'cover' }}
                      />
                      <div className="position-absolute top-0 end-0 m-2">
                        <Badge bg="dark" className="px-2 py-1 opacity-75">
                          {formatNumber(nft.items)} items
                        </Badge>
                      </div>
                      <div 
                        className="position-absolute bottom-0 start-0 end-0 p-3 nft-card-overlay"
                        style={{ 
                          background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))',
                          opacity: 0.8
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-end">
                          <div>
                            <div className="small text-white">Floor Price</div>
                            <div className="fw-bold text-white">{formatCurrency(nft.floorPrice, 'ETH')}</div>
                          </div>
                          <div className="text-end">
                            <div className="small text-white">24h Volume</div>
                            <div className="fw-bold text-white">{formatCurrency(nft.volume24h, 'ETH')}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Card.Body>
                      <Card.Title>{nft.name}</Card.Title>
                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <div className="text-muted small">{formatNumber(nft.owners)} owners</div>
                        <Button variant="outline-primary" size="sm">View</Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
        
        {/* All Collections */}
        <Row>
          <Col>
            <h3 className="mb-3">All Collections</h3>
            <Row>
              {filteredNFTs.map((nft) => (
                <Col key={nft.id} md={6} lg={3} className="mb-4">
                  <Card className="nft-card bg-secondary border-0 shadow-sm h-100">
                    <div className="position-relative">
                      <Card.Img 
                        variant="top" 
                        src={nft.imageUrl} 
                        onError={handleImageError}
                        style={{ height: '220px', objectFit: 'cover' }}
                      />
                      <div 
                        className="position-absolute bottom-0 start-0 end-0 p-3 nft-card-overlay"
                        style={{ 
                          background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))',
                          opacity: 0.8
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-end">
                          <div>
                            <div className="small text-white">Floor Price</div>
                            <div className="fw-bold text-white">{formatCurrency(nft.floorPrice, 'ETH')}</div>
                          </div>
                          <div className="text-end">
                            <div className="small text-white">24h Volume</div>
                            <div className="fw-bold text-white">{formatCurrency(nft.volume24h, 'ETH')}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Card.Body>
                      <Card.Title>{nft.name}</Card.Title>
                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <div className="text-muted small">{formatNumber(nft.owners)} owners</div>
                        <Button variant="outline-primary" size="sm">View</Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </ClientOnly>
  );
} 