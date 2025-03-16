import Card from '../ui/Card';
import PriceChange from '../ui/PriceChange';
import { Row, Col } from 'react-bootstrap';

const marketStats = [
  { label: 'Market Cap', value: '$2.14T', change: 2.5 },
  { label: '24h Volume', value: '$84.7B', change: 5.2 },
  { label: 'BTC Dominance', value: '51.2%', change: -0.8 },
  { label: 'Active Cryptocurrencies', value: '12,871', change: 124, noPrefix: true },
];

export default function MarketOverview() {
  return (
    <Card>
      <h3 className="fs-5 fw-semibold mb-3">Market Overview</h3>
      <Row className="g-3">
        {marketStats.map((stat, index) => (
          <Col key={index} xs={12} sm={6}>
            <div className="p-3 rounded" style={{ backgroundColor: 'rgba(31, 41, 55, 0.5)' }}>
              <div className="text-muted small mb-1">{stat.label}</div>
              <div className="fw-medium fs-5">{stat.value}</div>
              <PriceChange 
                value={stat.change} 
                percentage={!stat.noPrefix} 
                size="sm"
                className="mt-1" 
              />
            </div>
          </Col>
        ))}
      </Row>
    </Card>
  );
} 