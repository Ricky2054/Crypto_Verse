'use client';

import DashboardLayout from '@/components/DashboardLayout';
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import { ArrowsRightLeftIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

export default function ExchangePage() {
  return (
    <DashboardLayout>
      <div className="mb-4">
        <h1 className="fs-2 fw-bold mb-1">Exchange</h1>
        <p className="text-muted">Swap cryptocurrencies instantly at the best rates</p>
      </div>

      <Row className="g-4">
        <Col lg={8}>
          <Card className="bg-dark border-secondary mb-4">
            <Card.Body className="p-4">
              <h2 className="fs-5 fw-bold mb-4">Swap Tokens</h2>
              
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="text-muted">From</label>
                  <span className="text-muted small">Balance: 0.42 BTC</span>
                </div>
                <div className="d-flex gap-3">
                  <Form.Select className="bg-dark border-secondary text-light" style={{ maxWidth: '150px' }}>
                    <option>BTC</option>
                    <option>ETH</option>
                    <option>SOL</option>
                    <option>USDT</option>
                  </Form.Select>
                  <Form.Control 
                    type="number" 
                    placeholder="0.00" 
                    className="bg-dark border-secondary text-light"
                  />
                </div>
                <div className="d-flex justify-content-between mt-1">
                  <span className="text-muted small">≈ $24,518.29</span>
                  <Button variant="link" className="p-0 text-primary small">Max</Button>
                </div>
              </div>
              
              <div className="d-flex justify-content-center my-4">
                <Button 
                  variant="dark" 
                  className="rounded-circle d-flex align-items-center justify-content-center p-2"
                >
                  <ArrowsRightLeftIcon style={{ width: '20px', height: '20px' }} />
                </Button>
              </div>
              
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="text-muted">To</label>
                  <span className="text-muted small">Balance: 0.00 ETH</span>
                </div>
                <div className="d-flex gap-3">
                  <Form.Select className="bg-dark border-secondary text-light" style={{ maxWidth: '150px' }}>
                    <option>ETH</option>
                    <option>BTC</option>
                    <option>SOL</option>
                    <option>USDT</option>
                  </Form.Select>
                  <Form.Control 
                    type="number" 
                    placeholder="0.00" 
                    className="bg-dark border-secondary text-light"
                  />
                </div>
                <div className="d-flex justify-content-between mt-1">
                  <span className="text-muted small">≈ $0.00</span>
                </div>
              </div>
              
              <div className="d-flex flex-column gap-2 mb-4">
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Rate</span>
                  <span>1 BTC = 17.12 ETH</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Fee</span>
                  <span>0.1% (≈ $24.52)</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="text-muted">Slippage Tolerance</span>
                  <span>0.5%</span>
                </div>
              </div>
              
              <Button variant="primary" className="w-100 py-3">
                Swap Now
              </Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card className="bg-dark border-secondary mb-4">
            <Card.Body>
              <h2 className="fs-5 fw-bold mb-4">Recent Transactions</h2>
              <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-center">
                  <div className="transaction-icon swap me-3">
                    <ArrowsRightLeftIcon style={{ width: '16px', height: '16px' }} />
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between">
                      <span className="fw-medium text-light">BTC to ETH</span>
                      <span className="text-light">0.05 BTC</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted small">2023-06-15 14:30</span>
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
                      <span className="fw-medium text-light">ETH to SOL</span>
                      <span className="text-light">2.5 ETH</span>
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
                      <span className="fw-medium text-light">USDT to BTC</span>
                      <span className="text-light">1,000 USDT</span>
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
          
          <Card className="bg-dark border-secondary">
            <Card.Body>
              <h2 className="fs-5 fw-bold mb-4">Market Rates</h2>
              <Table responsive className="table-dark">
                <thead>
                  <tr>
                    <th>Pair</th>
                    <th>Rate</th>
                    <th>Change</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>BTC/USDT</td>
                    <td>$61,245.32</td>
                    <td className="text-success">+2.4%</td>
                  </tr>
                  <tr>
                    <td>ETH/USDT</td>
                    <td>$3,421.67</td>
                    <td className="text-success">+1.8%</td>
                  </tr>
                  <tr>
                    <td>SOL/USDT</td>
                    <td>$142.89</td>
                    <td className="text-danger">-3.2%</td>
                  </tr>
                  <tr>
                    <td>BNB/USDT</td>
                    <td>$574.21</td>
                    <td className="text-success">+0.7%</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
} 