'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { Row, Col, Card, Table, Form, InputGroup, Button } from 'react-bootstrap';
import { ArrowUpIcon, ArrowDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { StarIcon } from '@heroicons/react/24/outline';

export default function MarketPage() {
  return (
    <DashboardLayout>
      <div className="mb-4">
        <h1 className="fs-2 fw-bold mb-1">Market</h1>
        <p className="text-muted">Track real-time cryptocurrency prices and market trends</p>
      </div>

      {/* Stats Row */}
      <Row className="g-4 mb-4">
        <Col md={3}>
          <div className="stat-card">
            <div className="stat-card-title">Market Cap</div>
            <div className="stat-card-value">$2.14T</div>
            <div className="stat-card-change positive-change">
              <ArrowUpIcon style={{ width: '14px', height: '14px', marginRight: '4px' }} />
              <span>+2.5%</span>
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="stat-card">
            <div className="stat-card-title">24h Volume</div>
            <div className="stat-card-value">$84.7B</div>
            <div className="stat-card-change positive-change">
              <ArrowUpIcon style={{ width: '14px', height: '14px', marginRight: '4px' }} />
              <span>+5.2%</span>
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="stat-card">
            <div className="stat-card-title">BTC Dominance</div>
            <div className="stat-card-value">51.2%</div>
            <div className="stat-card-change negative-change">
              <ArrowDownIcon style={{ width: '14px', height: '14px', marginRight: '4px' }} />
              <span>-0.8%</span>
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className="stat-card">
            <div className="stat-card-title">Active Cryptocurrencies</div>
            <div className="stat-card-value">12,871</div>
            <div className="stat-card-change positive-change">
              <ArrowUpIcon style={{ width: '14px', height: '14px', marginRight: '4px' }} />
              <span>+124</span>
            </div>
          </div>
        </Col>
      </Row>

      {/* Market Table */}
      <Card className="bg-dark border-secondary">
        <Card.Body>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
            <div className="d-flex mb-3 mb-md-0">
              <Button variant="primary" className="me-2">All</Button>
              <Button variant="dark" className="me-2">Gainers</Button>
              <Button variant="dark" className="me-2">Losers</Button>
              <Button variant="dark">Trending</Button>
            </div>
            <InputGroup style={{ maxWidth: '300px' }}>
              <Form.Control
                placeholder="Search cryptocurrency..."
                className="bg-dark border-secondary text-light"
              />
              <Button variant="secondary">
                <MagnifyingGlassIcon style={{ width: '16px', height: '16px' }} />
              </Button>
            </InputGroup>
          </div>
          <Table responsive className="table-dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>24h Change</th>
                <th>Market Cap</th>
                <th>Volume (24h)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="crypto-icon me-2">B</div>
                    <div>
                      <div className="fw-medium text-light">Bitcoin</div>
                      <div className="text-muted small">BTC</div>
                    </div>
                  </div>
                </td>
                <td>$61,245.32</td>
                <td>
                  <div className="price-change positive">
                    <ArrowUpIcon style={{ width: '12px', height: '12px', marginRight: '4px' }} />
                    2.4%
                  </div>
                </td>
                <td>$1,183.5B</td>
                <td>$28.7B</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button variant="outline-primary" size="sm">Trade</Button>
                    <Button variant="outline-light" size="sm" className="d-flex align-items-center justify-content-center p-1">
                      <StarIcon style={{ width: '16px', height: '16px' }} />
                    </Button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="crypto-icon me-2">E</div>
                    <div>
                      <div className="fw-medium text-light">Ethereum</div>
                      <div className="text-muted small">ETH</div>
                    </div>
                  </div>
                </td>
                <td>$3,421.67</td>
                <td>
                  <div className="price-change positive">
                    <ArrowUpIcon style={{ width: '12px', height: '12px', marginRight: '4px' }} />
                    1.8%
                  </div>
                </td>
                <td>$411.2B</td>
                <td>$14.3B</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button variant="outline-primary" size="sm">Trade</Button>
                    <Button variant="outline-light" size="sm" className="d-flex align-items-center justify-content-center p-1">
                      <StarIcon style={{ width: '16px', height: '16px' }} />
                    </Button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="crypto-icon me-2">S</div>
                    <div>
                      <div className="fw-medium text-light">Solana</div>
                      <div className="text-muted small">SOL</div>
                    </div>
                  </div>
                </td>
                <td>$142.89</td>
                <td>
                  <div className="price-change negative">
                    <ArrowDownIcon style={{ width: '12px', height: '12px', marginRight: '4px' }} />
                    3.2%
                  </div>
                </td>
                <td>$61.5B</td>
                <td>$4.2B</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button variant="outline-primary" size="sm">Trade</Button>
                    <Button variant="outline-light" size="sm" className="d-flex align-items-center justify-content-center p-1">
                      <StarIcon style={{ width: '16px', height: '16px' }} />
                    </Button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>4</td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="crypto-icon me-2">B</div>
                    <div>
                      <div className="fw-medium text-light">Binance Coin</div>
                      <div className="text-muted small">BNB</div>
                    </div>
                  </div>
                </td>
                <td>$574.21</td>
                <td>
                  <div className="price-change positive">
                    <ArrowUpIcon style={{ width: '12px', height: '12px', marginRight: '4px' }} />
                    0.7%
                  </div>
                </td>
                <td>$88.9B</td>
                <td>$2.1B</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button variant="outline-primary" size="sm">Trade</Button>
                    <Button variant="outline-light" size="sm" className="d-flex align-items-center justify-content-center p-1">
                      <StarIcon style={{ width: '16px', height: '16px' }} />
                    </Button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>5</td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="crypto-icon me-2">A</div>
                    <div>
                      <div className="fw-medium text-light">Cardano</div>
                      <div className="text-muted small">ADA</div>
                    </div>
                  </div>
                </td>
                <td>$0.58</td>
                <td>
                  <div className="price-change positive">
                    <ArrowUpIcon style={{ width: '12px', height: '12px', marginRight: '4px' }} />
                    4.2%
                  </div>
                </td>
                <td>$20.4B</td>
                <td>$1.3B</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button variant="outline-primary" size="sm">Trade</Button>
                    <Button variant="outline-light" size="sm" className="d-flex align-items-center justify-content-center p-1">
                      <StarIcon style={{ width: '16px', height: '16px' }} />
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </DashboardLayout>
  );
} 