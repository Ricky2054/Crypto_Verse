'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { Row, Col, Card, Table, Button } from 'react-bootstrap';
import { ArrowUpIcon, ArrowDownIcon, PlusIcon } from '@heroicons/react/24/solid';

export default function PortfolioPage() {
  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fs-2 fw-bold mb-1">Portfolio</h1>
          <p className="text-muted">Track and manage your crypto investments</p>
        </div>
        <Button variant="primary" className="d-flex align-items-center">
          <PlusIcon style={{ width: '16px', height: '16px', marginRight: '8px' }} />
          Add Asset
        </Button>
      </div>

      {/* Stats Row */}
      <Row className="g-4 mb-4">
        <Col md={4}>
          <div className="stat-card">
            <div className="stat-card-title">Total Balance</div>
            <div className="stat-card-value">$24,518.29</div>
            <div className="stat-card-change positive-change">
              <ArrowUpIcon style={{ width: '14px', height: '14px', marginRight: '4px' }} />
              <span>+2.3% ($563.24)</span>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="stat-card">
            <div className="stat-card-title">24h Change</div>
            <div className="stat-card-value">+$563.24</div>
            <div className="stat-card-change positive-change">
              <ArrowUpIcon style={{ width: '14px', height: '14px', marginRight: '4px' }} />
              <span>+2.3%</span>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="stat-card">
            <div className="stat-card-title">Total Assets</div>
            <div className="stat-card-value">8</div>
            <div className="stat-card-change">
              <span className="text-muted">Across 3 blockchains</span>
            </div>
          </div>
        </Col>
      </Row>

      {/* Portfolio Performance */}
      <Card className="mb-4 bg-dark border-secondary">
        <Card.Body>
          <h2 className="fs-5 fw-bold mb-4">Portfolio Performance</h2>
          <div className="d-flex justify-content-center align-items-center" style={{ height: '250px' }}>
            {/* Placeholder for chart */}
            <div className="text-center text-muted">
              <p>Chart will be displayed here</p>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Assets Table */}
      <Card className="bg-dark border-secondary">
        <Card.Body>
          <h2 className="fs-5 fw-bold mb-4">Your Assets</h2>
          <Table responsive className="table-dark">
            <thead>
              <tr>
                <th>Asset</th>
                <th>Price</th>
                <th>Holdings</th>
                <th>Value</th>
                <th>24h Change</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
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
                <td>0.2345 BTC</td>
                <td>$14,362.03</td>
                <td>
                  <div className="price-change positive">
                    <ArrowUpIcon style={{ width: '12px', height: '12px', marginRight: '4px' }} />
                    2.4%
                  </div>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <Button variant="outline-primary" size="sm">Trade</Button>
                    <Button variant="outline-light" size="sm">View</Button>
                  </div>
                </td>
              </tr>
              <tr>
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
                <td>1.8765 ETH</td>
                <td>$6,420.76</td>
                <td>
                  <div className="price-change positive">
                    <ArrowUpIcon style={{ width: '12px', height: '12px', marginRight: '4px' }} />
                    1.8%
                  </div>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <Button variant="outline-primary" size="sm">Trade</Button>
                    <Button variant="outline-light" size="sm">View</Button>
                  </div>
                </td>
              </tr>
              <tr>
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
                <td>26.2345 SOL</td>
                <td>$3,747.50</td>
                <td>
                  <div className="price-change negative">
                    <ArrowDownIcon style={{ width: '12px', height: '12px', marginRight: '4px' }} />
                    3.2%
                  </div>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <Button variant="outline-primary" size="sm">Trade</Button>
                    <Button variant="outline-light" size="sm">View</Button>
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