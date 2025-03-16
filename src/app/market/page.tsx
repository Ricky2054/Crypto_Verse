'use client';

import { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Form } from 'react-bootstrap';
import { formatCurrency, formatCompactNumber, formatPercentage } from '@/utils/formatters';
import { useSimulatedData } from '@/utils/useSimulatedData';
import { useChartData } from '@/utils/useChartData';
import PriceChart from '@/components/PriceChart';
import ClientOnly from '@/components/ClientOnly';

export default function MarketPage() {
  const { cryptoData, marketStats } = useSimulatedData(2000); // Update every 2 seconds
  const { chartData, selectedTimeframe, setSelectedTimeframe } = useChartData(2000);
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');

  // Get currency symbol based on selected crypto
  const getCurrencySymbol = (crypto: string) => {
    switch (crypto) {
      case 'bitcoin': return 'BTC';
      case 'ethereum': return 'ETH';
      case 'solana': return 'SOL';
      case 'cardano': return 'ADA';
      default: return 'USD';
    }
  };

  return (
    <Container fluid className="p-4">
      <h2 className="mb-4">Market Overview</h2>
      
      {/* Market Stats */}
      <ClientOnly>
        <Row className="mb-4">
          <Col md={4} className="mb-3">
            <Card className="stat-card h-100">
              <Card.Body>
                <div className="stat-card-title">Total Market Cap</div>
                <div className="stat-card-value">{formatCurrency(marketStats.totalMarketCap)}</div>
                <div className="stat-card-change positive-change">
                  <span>↑</span> {formatPercentage(2.5)}
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
                  <span>↓</span> {formatPercentage(1.2)}
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
                  <span>↑</span> {formatPercentage(0.8)}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </ClientOnly>
      
      {/* Price Chart */}
      <Row className="mb-4">
        <Col>
          <Card className="bg-secondary border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="mb-0">Price Chart</h3>
                <Form.Select 
                  className="w-auto" 
                  value={selectedCrypto}
                  onChange={(e) => setSelectedCrypto(e.target.value)}
                >
                  <option value="bitcoin">Bitcoin (BTC)</option>
                  <option value="ethereum">Ethereum (ETH)</option>
                  <option value="solana">Solana (SOL)</option>
                  <option value="cardano">Cardano (ADA)</option>
                </Form.Select>
              </div>
              
              <ClientOnly>
                <PriceChart 
                  data={chartData[selectedCrypto]} 
                  timeframe={selectedTimeframe}
                  onTimeframeChange={setSelectedTimeframe}
                  height={400}
                  color={
                    selectedCrypto === 'bitcoin' ? '#F7931A' :
                    selectedCrypto === 'ethereum' ? '#627EEA' :
                    selectedCrypto === 'solana' ? '#00FFA3' :
                    '#0033AD'
                  }
                  currencySymbol={getCurrencySymbol(selectedCrypto)}
                />
              </ClientOnly>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Cryptocurrency Table */}
      <Row>
        <Col>
          <Card className="bg-secondary border-0 shadow-sm">
            <Card.Body>
              <h3 className="mb-4">Top Cryptocurrencies</h3>
              <div className="table-responsive">
                <Table className="align-middle">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>24h %</th>
                      <th>7d %</th>
                      <th>Market Cap</th>
                      <th>Volume (24h)</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cryptoData.map((crypto, index) => (
                      <tr key={crypto.id}>
                        <td>{index + 1}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="crypto-icon me-2" style={{ backgroundColor: crypto.color }}>
                              {crypto.symbol.charAt(0)}
                            </div>
                            <div>
                              <div className="fw-bold">{crypto.name}</div>
                              <div className="text-muted small">{crypto.symbol}</div>
                            </div>
                          </div>
                        </td>
                        <td>{formatCurrency(crypto.price)}</td>
                        <td className={crypto.priceChange24h >= 0 ? 'text-success' : 'text-danger'}>
                          {formatPercentage(crypto.priceChange24h)}
                        </td>
                        <td className={crypto.priceChange7d >= 0 ? 'text-success' : 'text-danger'}>
                          {formatPercentage(crypto.priceChange7d)}
                        </td>
                        <td>{formatCurrency(crypto.marketCap)}</td>
                        <td>{formatCurrency(crypto.volume24h)}</td>
                        <td>
                          <Button 
                            variant="outline-primary" 
                            size="sm"
                            onClick={() => setSelectedCrypto(crypto.id)}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
} 