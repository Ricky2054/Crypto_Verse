'use client';

import { Row, Col, Card, Table, Button, Container } from 'react-bootstrap';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import { newsItems } from '@/utils/dummyData';
import { formatCurrency, formatCompactNumber, formatPercentage, timeAgo } from '@/utils/formatters';
import { useSimulatedData } from '@/utils/useSimulatedData';

export default function Dashboard() {
  const { cryptoData, marketStats, trendingCoins } = useSimulatedData(3000); // Update every 3 seconds

  return (
    <Container fluid className="p-4">
      {/* Market Overview */}
      <Row className="mb-4">
        <Col>
          <h2 className="mb-4">Market Overview</h2>
          <Row>
            <Col md={4} className="mb-3">
              <Card className="stat-card h-100">
                <Card.Body>
                  <div className="stat-card-title">Total Market Cap</div>
                  <div className="stat-card-value">{formatCurrency(marketStats.totalMarketCap)}</div>
                  <div className="stat-card-change positive-change">
                    <ArrowUpIcon className="icon-sm me-1" />
                    {formatPercentage(2.5)}
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="stat-card h-100">
                <Card.Body>
                  <div className="stat-card-title">24h Volume</div>
                  <div className="stat-card-value">{formatCurrency(marketStats.total24hVolume)}</div>
                  <div className="stat-card-change negative-change">
                    <ArrowDownIcon className="icon-sm me-1" />
                    {formatPercentage(-1.2)}
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-3">
              <Card className="stat-card h-100">
                <Card.Body>
                  <div className="stat-card-title">BTC Dominance</div>
                  <div className="stat-card-value">{formatPercentage(marketStats.btcDominance)}</div>
                  <div className="stat-card-change positive-change">
                    <ArrowUpIcon className="icon-sm me-1" />
                    {formatPercentage(0.8)}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Top Cryptocurrencies */}
      <Row className="mb-4">
        <Col>
          <h2 className="mb-4">Top Cryptocurrencies</h2>
          <Card className="bg-secondary">
            <Card.Body>
              <div className="table-responsive">
                <Table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>24h Change</th>
                      <th>Market Cap</th>
                      <th>Volume (24h)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cryptoData.map((crypto) => (
                      <tr key={crypto.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="crypto-icon me-2">{crypto.symbol.charAt(0)}</div>
                            <div>
                              <div className="fw-bold">{crypto.name}</div>
                              <div className="text-muted">{crypto.symbol}</div>
                            </div>
                          </div>
                        </td>
                        <td>{formatCurrency(crypto.price)}</td>
                        <td>
                          <span className={crypto.change24h >= 0 ? 'text-success' : 'text-danger'}>
                            {crypto.change24h >= 0 ? '↑' : '↓'} {formatPercentage(Math.abs(crypto.change24h))}
                          </span>
                        </td>
                        <td>{formatCompactNumber(crypto.marketCap)}</td>
                        <td>{formatCompactNumber(crypto.volume24h)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Trending & News */}
      <Row>
        <Col lg={4} className="mb-4">
          <h2 className="mb-4">Trending</h2>
          <Card className="bg-secondary">
            <Card.Body>
              {trendingCoins.map((coin) => (
                <div key={coin.id} className="d-flex align-items-center justify-content-between mb-3">
                  <div className="d-flex align-items-center">
                    <div className="crypto-icon me-2">{coin.symbol.charAt(0)}</div>
                    <div>
                      <div className="fw-bold">{coin.name}</div>
                      <div className="text-muted">{coin.symbol}</div>
                    </div>
                  </div>
                  <div className="text-end">
                    <div>{formatCurrency(coin.price)}</div>
                    <div className={coin.change24h >= 0 ? 'text-success' : 'text-danger'}>
                      {coin.change24h >= 0 ? '↑' : '↓'} {formatPercentage(Math.abs(coin.change24h))}
                    </div>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={8}>
          <h2 className="mb-4">Latest News</h2>
          <Row>
            {newsItems.map((news) => (
              <Col md={6} key={news.id} className="mb-4">
                <Card className="bg-secondary h-100">
                  <Card.Img variant="top" src={news.imageUrl} alt={news.title} />
                  <Card.Body>
                    <Card.Title>{news.title}</Card.Title>
                    <div className="text-muted mt-2">
                      <small>{news.source} • {timeAgo(news.date)}</small>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
} 