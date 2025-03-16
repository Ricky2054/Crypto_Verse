'use client';

import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import { ArrowUpIcon, ArrowDownIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/solid';
import { formatCurrency, formatNumber, formatPercentage, timeAgo } from '@/utils/formatters';
import { usePortfolioData } from '@/utils/usePortfolioData';
import ClientOnly from '@/components/ClientOnly';

export default function Portfolio() {
  const { portfolioData, transactionHistory, totalValue, totalProfitLoss, profitLossPercentage } = usePortfolioData(3000);

  return (
    <Container fluid className="p-4">
      {/* Portfolio Overview */}
      <Row className="mb-4">
        <Col>
          <h2 className="mb-4">Portfolio Overview</h2>
          <ClientOnly>
            <Row>
              <Col md={4} className="mb-3">
                <Card className="stat-card h-100">
                  <Card.Body>
                    <div className="stat-card-title">Total Value</div>
                    <div className="stat-card-value">{formatCurrency(totalValue)}</div>
                    <div className={`stat-card-change ${profitLossPercentage >= 0 ? 'positive-change' : 'negative-change'}`}>
                      {profitLossPercentage >= 0 ? (
                        <ArrowUpIcon className="icon-sm me-1" />
                      ) : (
                        <ArrowDownIcon className="icon-sm me-1" />
                      )}
                      {formatPercentage(Math.abs(profitLossPercentage))}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-3">
                <Card className="stat-card h-100">
                  <Card.Body>
                    <div className="stat-card-title">24h Profit/Loss</div>
                    <div className="stat-card-value">{formatCurrency(totalProfitLoss)}</div>
                    <div className={`stat-card-change ${profitLossPercentage >= 0 ? 'positive-change' : 'negative-change'}`}>
                      {profitLossPercentage >= 0 ? (
                        <ArrowUpIcon className="icon-sm me-1" />
                      ) : (
                        <ArrowDownIcon className="icon-sm me-1" />
                      )}
                      {formatPercentage(Math.abs(profitLossPercentage))}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-3">
                <Card className="stat-card h-100">
                  <Card.Body>
                    <div className="stat-card-title">Total Assets</div>
                    <div className="stat-card-value">{portfolioData.length}</div>
                    <div className="text-muted">Active Positions</div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </ClientOnly>
        </Col>
      </Row>

      {/* Portfolio Assets */}
      <Row className="mb-4">
        <Col>
          <Card className="bg-secondary">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">Your Assets</h2>
                <div>
                  <Button variant="primary" className="me-2">
                    <ArrowsRightLeftIcon className="icon-sm me-2" />
                    Swap
                  </Button>
                  <Button variant="outline-light">
                    View All
                  </Button>
                </div>
              </div>
              <ClientOnly>
                <div className="table-responsive">
                  <Table className="table">
                    <thead>
                      <tr>
                        <th>Asset</th>
                        <th>Amount</th>
                        <th>Value</th>
                        <th>Profit/Loss</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {portfolioData.map((asset) => (
                        <tr key={asset.symbol}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="crypto-icon me-2">{asset.symbol.charAt(0)}</div>
                              <div>
                                <div className="fw-bold">{asset.asset}</div>
                                <div className="text-muted">{asset.symbol}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="fw-bold">{formatNumber(asset.amount)}</div>
                            <div className="text-muted">{asset.symbol}</div>
                          </td>
                          <td>
                            <div className="fw-bold">{formatCurrency(asset.value)}</div>
                          </td>
                          <td>
                            <div className={asset.profitLoss >= 0 ? 'text-success' : 'text-danger'}>
                              {asset.profitLoss >= 0 ? '↑' : '↓'} {formatPercentage(Math.abs(asset.profitLoss))}
                            </div>
                          </td>
                          <td>
                            <Button variant="outline-primary" size="sm" className="me-2">Trade</Button>
                            <Button variant="outline-light" size="sm">View</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </ClientOnly>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Transactions */}
      <Row>
        <Col>
          <Card className="bg-secondary">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">Recent Transactions</h2>
                <Button variant="outline-light">View All</Button>
              </div>
              <ClientOnly>
                <div className="table-responsive">
                  <Table className="table">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Asset</th>
                        <th>Amount</th>
                        <th>Price</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactionHistory.map((tx) => (
                        <tr key={tx.id}>
                          <td>
                            <div className={`transaction-icon ${tx.type}`}>
                              {tx.type === 'buy' ? (
                                <ArrowDownIcon className="icon-sm" />
                              ) : (
                                <ArrowUpIcon className="icon-sm" />
                              )}
                            </div>
                          </td>
                          <td>{tx.asset}</td>
                          <td>{formatNumber(tx.amount)}</td>
                          <td>{formatCurrency(tx.price)}</td>
                          <td>{timeAgo(tx.date)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </ClientOnly>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
} 