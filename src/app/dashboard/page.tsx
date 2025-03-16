'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { Row, Col, Card, Table, Button, Form } from 'react-bootstrap';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import { CurrencyDollarIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="mb-4">
        <h1 className="fs-2 fw-bold mb-1">Dashboard</h1>
        <p className="text-muted">Welcome back! Here's an overview of your crypto assets.</p>
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

      {/* Portfolio and Recent Transactions */}
      <Row className="g-4 mb-4">
        <Col lg={8}>
          <Card className="h-100 bg-dark border-secondary">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fs-5 fw-bold m-0">Portfolio Distribution</h2>
                <Form.Select className="w-auto bg-dark border-secondary text-light">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>All time</option>
                </Form.Select>
              </div>
              <div className="d-flex justify-content-center align-items-center" style={{ height: '250px' }}>
                {/* Placeholder for chart */}
                <div className="text-center text-muted">
                  <p>Chart will be displayed here</p>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="h-100 bg-dark border-secondary">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fs-5 fw-bold m-0">Recent Transactions</h2>
                <Button variant="link" className="p-0 text-primary">View All</Button>
              </div>
              <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-center">
                  <div className="transaction-icon buy me-3">
                    <ArrowDownIcon style={{ width: '16px', height: '16px' }} />
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between">
                      <span className="fw-medium text-light">Buy BTC</span>
                      <span className="text-light">$1,200.00</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted small">2023-06-15 14:30</span>
                      <span className="text-success small">Completed</span>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="transaction-icon sell me-3">
                    <ArrowUpIcon style={{ width: '16px', height: '16px' }} />
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between">
                      <span className="fw-medium text-light">Sell ETH</span>
                      <span className="text-light">$800.00</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted small">2023-06-14 09:15</span>
                      <span className="text-success small">Completed</span>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="transaction-icon swap me-3">
                    <ArrowsRightLeftIcon style={{ width: '16px', height: '16px' }} />
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between">
                      <span className="fw-medium text-light">Swap BTC to SOL</span>
                      <span className="text-light">$500.00</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted small">2023-06-13 16:45</span>
                      <span className="text-success small">Completed</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Assets Table */}
      <Card className="bg-dark border-secondary">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fs-5 fw-bold m-0">Your Assets</h2>
            <div className="d-flex gap-2">
              <Button variant="outline-light" size="sm">
                <CurrencyDollarIcon style={{ width: '16px', height: '16px', marginRight: '4px' }} />
                Deposit
              </Button>
              <Button variant="outline-light" size="sm">
                <ArrowUpIcon style={{ width: '16px', height: '16px', marginRight: '4px' }} />
                Withdraw
              </Button>
              <Button variant="primary" size="sm">
                <ArrowsRightLeftIcon style={{ width: '16px', height: '16px', marginRight: '4px' }} />
                Swap
              </Button>
            </div>
          </div>
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