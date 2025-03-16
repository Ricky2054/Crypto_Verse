'use client';

import { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import PriceChart from '@/components/PriceChart';
import ClientOnly from '@/components/ClientOnly';

// Generate random price data
const generatePriceData = (points = 50, startPrice = 3000, volatility = 0.02) => {
  const data = [];
  let price = startPrice;
  const now = new Date();
  
  for (let i = points; i >= 0; i--) {
    // Create a date in the past
    const date = new Date(now);
    date.setHours(date.getHours() - i);
    
    // Add some random price movement
    const change = (Math.random() - 0.5) * 2 * volatility;
    price = Math.max(price * (1 + change), 0.01);
    
    data.push({
      date: date.toISOString(),
      price
    });
  }
  
  return data;
};

export default function ChartTest() {
  const [timeframe, setTimeframe] = useState('1D');
  const [priceData, setPriceData] = useState(generatePriceData());
  
  // Update data every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Get the last price
      const lastPrice = priceData[priceData.length - 1].price;
      
      // Generate a small random change
      const change = (Math.random() - 0.5) * 0.02; // -1% to +1%
      const newPrice = Math.max(0.01, lastPrice * (1 + change));
      
      // Create a new data point with current time
      const newPoint = {
        date: new Date().toISOString(),
        price: newPrice
      };
      
      // Update the data by removing the first point and adding the new one
      setPriceData(prev => [...prev.slice(1), newPoint]);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [priceData]);
  
  return (
    <ClientOnly>
      <Container className="py-5">
        <Row className="mb-4">
          <Col>
            <h1>Dynamic Price Chart</h1>
            <p className="text-muted">Real-time price updates with interactive hover effects</p>
          </Col>
        </Row>
        
        <Row>
          <Col>
            <Card className="bg-secondary border-0 shadow">
              <Card.Body>
                <PriceChart 
                  data={priceData}
                  timeframe={timeframe}
                  onTimeframeChange={setTimeframe}
                  height={400}
                  color="#10b981"
                  currencySymbol="USD"
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </ClientOnly>
  );
} 