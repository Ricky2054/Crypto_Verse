'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import PriceChart from '@/components/PriceChart';
import ClientOnly from '@/components/ClientOnly';

// Generate random price chart data
const generateChartData = (days: number, volatility = 0.05, trend = 0) => {
  const data = [];
  const now = new Date();
  let price = 2.5 + Math.random() * 2; // Starting price between 2.5 and 4.5 ETH
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // Add some randomness to the price with a trend bias
    const change = (Math.random() - 0.5 + trend * 0.1) * 2 * volatility;
    price = Math.max(0.1, price * (1 + change));
    
    data.push({
      date: date.toISOString(),
      price
    });
  }
  
  return data;
};

// Generate data for different timeframes
const generateTimeframeData = () => {
  return {
    '1D': generateChartData(24, 0.02, 0.2), // 24 hours, low volatility, upward trend
    '1W': generateChartData(7, 0.05, -0.1), // 7 days, medium volatility, slight downward trend
    '1M': generateChartData(30, 0.08, 0.3), // 30 days, higher volatility, strong upward trend
    '1Y': generateChartData(365, 0.1, 0.05) // 365 days, high volatility, slight upward trend
  };
};

export default function ChartDemo() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const [selectedCrypto, setSelectedCrypto] = useState('ethereum');
  const [chartData, setChartData] = useState<any>({
    ethereum: generateTimeframeData(),
    bitcoin: generateTimeframeData(),
    solana: generateTimeframeData(),
    cardano: generateTimeframeData()
  });
  
  // Update data periodically to simulate real-time changes
  useEffect(() => {
    const interval = setInterval(() => {
      // Update only the current timeframe data for the selected crypto
      setChartData(prevData => {
        const newData = { ...prevData };
        
        // Get the last price
        const lastPrice = prevData[selectedCrypto][selectedTimeframe][prevData[selectedCrypto][selectedTimeframe].length - 1].price;
        
        // Generate a small random change
        const change = (Math.random() - 0.5) * 0.02; // -1% to +1%
        const newPrice = Math.max(0.1, lastPrice * (1 + change));
        
        // Create a new data point with current time
        const newPoint = {
          date: new Date().toISOString(),
          price: newPrice
        };
        
        // Update the data by removing the first point and adding the new one
        newData[selectedCrypto][selectedTimeframe] = [
          ...prevData[selectedCrypto][selectedTimeframe].slice(1),
          newPoint
        ];
        
        return newData;
      });
    }, 3000); // Update every 3 seconds
    
    return () => clearInterval(interval);
  }, [selectedCrypto, selectedTimeframe]);
  
  // Regenerate data when crypto or timeframe changes
  useEffect(() => {
    // No need to regenerate data as we're already updating it periodically
  }, [selectedCrypto, selectedTimeframe]);
  
  // Get the color for the selected crypto
  const getCryptoColor = (crypto: string) => {
    switch (crypto) {
      case 'bitcoin': return '#F7931A';
      case 'ethereum': return '#627EEA';
      case 'solana': return '#00FFA3';
      case 'cardano': return '#0033AD';
      default: return '#3b82f6';
    }
  };
  
  return (
    <ClientOnly>
      <Container fluid className="py-4">
        <Row className="mb-4">
          <Col>
            <h1 className="mb-3">Dynamic Price Chart Demo</h1>
            <p className="text-muted">Interactive price chart with real-time data updates</p>
          </Col>
        </Row>
        
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
                
                <PriceChart 
                  data={chartData[selectedCrypto][selectedTimeframe]} 
                  timeframe={selectedTimeframe}
                  onTimeframeChange={setSelectedTimeframe}
                  height={400}
                  color={getCryptoColor(selectedCrypto)}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <Row>
          <Col md={6}>
            <Card className="bg-secondary border-0 shadow-sm h-100">
              <Card.Body>
                <h4 className="mb-3">About This Chart</h4>
                <p>
                  This demo showcases a dynamic price chart with simulated cryptocurrency data. 
                  The chart updates in real-time every few seconds to simulate market movements.
                </p>
                <p>
                  Features:
                </p>
                <ul>
                  <li>Animated transitions when data changes</li>
                  <li>Multiple timeframe options (1D, 1W, 1M, 1Y)</li>
                  <li>Different cryptocurrencies with unique colors</li>
                  <li>Price indicators and grid lines</li>
                  <li>Responsive design that adapts to screen size</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="bg-secondary border-0 shadow-sm h-100">
              <Card.Body>
                <h4 className="mb-3">How It Works</h4>
                <p>
                  The chart is rendered using HTML Canvas for optimal performance. Data points are 
                  generated with randomized price movements to simulate market volatility.
                </p>
                <p>
                  Each cryptocurrency has different volatility patterns and trend biases:
                </p>
                <ul>
                  <li><strong>Bitcoin:</strong> Moderate volatility with slight upward trend</li>
                  <li><strong>Ethereum:</strong> Higher volatility with stronger upward trend</li>
                  <li><strong>Solana:</strong> High volatility with mixed trend</li>
                  <li><strong>Cardano:</strong> Lower volatility with sideways movement</li>
                </ul>
                <p>
                  Try changing the timeframe and cryptocurrency to see different patterns!
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </ClientOnly>
  );
} 