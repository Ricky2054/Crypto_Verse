'use client';

import { Container, Row, Col, Card, Button, Table, Badge } from 'react-bootstrap';
import { useNFTData } from '@/utils/useNFTData';
import { formatCurrency, formatNumber } from '@/utils/formatters';
import ClientOnly from '@/components/ClientOnly';

export default function NFTPage() {
  const { nftCollections } = useNFTData();
  
  // Featured collections (top 3 by volume)
  const featuredCollections = [...nftCollections]
    .sort((a, b) => b.volume24h - a.volume24h)
    .slice(0, 3);
  
  // Function to handle image loading errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://via.placeholder.com/800x800?text=NFT+Image';
  };

  return (
    <Container fluid className="p-4">
      <h2 className="mb-4">NFT Collections</h2>
      
      {/* Featured Collections */}
      <h4 className="mb-3">Featured Collections</h4>
      <ClientOnly>
        <Row className="mb-4">
          {featuredCollections.map((collection) => (
            <Col md={4} key={collection.id} className="mb-4">
              <Card className="bg-secondary h-100 nft-card">
                <div className="position-relative">
                  <Card.Img 
                    variant="top" 
                    src={collection.imageUrl} 
                    alt={collection.name}
                    onError={handleImageError}
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                  <div className="position-absolute top-0 end-0 m-2">
                    <Badge bg="primary" className="px-2 py-1">
                      {formatNumber(collection.items)} items
                    </Badge>
                  </div>
                </div>
                <Card.Body>
                  <Card.Title>{collection.name}</Card.Title>
                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <div className="text-muted small">Floor Price</div>
                      <div className="fw-bold">{formatCurrency(collection.floorPrice, 'ETH')}</div>
                    </div>
                    <div className="text-end">
                      <div className="text-muted small">24h Volume</div>
                      <div className="fw-bold">{formatCurrency(collection.volume24h, 'ETH')}</div>
                    </div>
                  </div>
                  <Button variant="primary" className="w-100">View Collection</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </ClientOnly>
      
      {/* All Collections */}
      <h4 className="mb-3">All Collections</h4>
      <ClientOnly>
        <Card className="bg-secondary mb-4">
          <Card.Body className="p-0">
            <Table responsive className="table-dark mb-0">
              <thead>
                <tr>
                  <th className="ps-3">#</th>
                  <th>Collection</th>
                  <th>Floor Price</th>
                  <th>24h Volume</th>
                  <th>Items</th>
                  <th>Owners</th>
                  <th className="pe-3"></th>
                </tr>
              </thead>
              <tbody>
                {nftCollections.map((collection, index) => (
                  <tr key={collection.id}>
                    <td className="ps-3">{index + 1}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <img 
                          src={collection.imageUrl} 
                          alt={collection.name} 
                          onError={handleImageError}
                          className="me-2 rounded" 
                          width="40" 
                          height="40" 
                          style={{ objectFit: 'cover' }}
                        />
                        <span>{collection.name}</span>
                      </div>
                    </td>
                    <td>{formatCurrency(collection.floorPrice, 'ETH')}</td>
                    <td>{formatCurrency(collection.volume24h, 'ETH')}</td>
                    <td>{formatNumber(collection.items)}</td>
                    <td>{formatNumber(collection.owners)}</td>
                    <td className="pe-3">
                      <Button variant="outline-primary" size="sm">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </ClientOnly>
    </Container>
  );
} 