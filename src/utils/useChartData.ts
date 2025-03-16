import { useState, useEffect } from 'react';

// Generate initial price history data with trend and volatility parameters
const generateInitialData = (days = 30, startPrice = 45000, volatility = 0.05, trend = 0) => {
  const data = [];
  let currentPrice = startPrice;
  
  const now = new Date();
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    
    // Adjust date based on days parameter
    if (days <= 1) {
      // For 1D, use hours
      date.setHours(date.getHours() - i * (24 / days));
    } else {
      // For longer periods, use days
      date.setDate(date.getDate() - i);
    }
    
    // Add some randomness to the price with trend bias
    const change = (Math.random() - 0.5 + trend * 0.1) * 2 * volatility;
    currentPrice = Math.max(currentPrice * (1 + change), 0.01);
    
    data.push({
      date: date.toISOString(),
      price: currentPrice,
    });
  }
  
  return data;
};

// Generate data for different timeframes
const generateTimeframeData = (asset) => {
  // Different starting prices for each asset
  const startPrices = {
    bitcoin: 45000,
    ethereum: 2500,
    solana: 120,
    cardano: 0.5,
  };
  
  // Different volatility and trend patterns for each asset
  const patterns = {
    bitcoin: { volatility: 0.04, trend: 0.2 },
    ethereum: { volatility: 0.06, trend: 0.3 },
    solana: { volatility: 0.08, trend: -0.1 },
    cardano: { volatility: 0.05, trend: 0.1 },
  };
  
  const startPrice = startPrices[asset] || 1000;
  const { volatility, trend } = patterns[asset] || { volatility: 0.05, trend: 0 };
  
  return {
    '1D': generateInitialData(1, startPrice, volatility * 0.5, trend),
    '1W': generateInitialData(7, startPrice * 0.9, volatility * 0.7, trend * 0.8),
    '1M': generateInitialData(30, startPrice * 0.8, volatility, trend),
    '1Y': generateInitialData(365, startPrice * 0.6, volatility * 1.5, trend * 0.5),
  };
};

// Generate data for multiple assets
const generateMultiAssetData = () => {
  return {
    bitcoin: generateTimeframeData('bitcoin'),
    ethereum: generateTimeframeData('ethereum'),
    solana: generateTimeframeData('solana'),
    cardano: generateTimeframeData('cardano'),
  };
};

export const useChartData = (updateInterval = 2000) => {
  const [chartData, setChartData] = useState(generateMultiAssetData());
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M'); // 1D, 1W, 1M, 1Y
  
  // Update the chart data with a new price point
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prevData => {
        const newData = { ...prevData };
        
        // Update each asset with a new price point
        Object.keys(newData).forEach(asset => {
          // Get the current timeframe data
          const timeframeData = newData[asset][selectedTimeframe];
          
          // Get the last price
          const lastPrice = timeframeData[timeframeData.length - 1].price;
          
          // Generate a small random change based on asset volatility
          const volatilityFactor = asset === 'bitcoin' ? 0.01 : 
                                  asset === 'ethereum' ? 0.015 : 
                                  asset === 'solana' ? 0.02 : 0.012;
          
          const change = (Math.random() - 0.5) * volatilityFactor;
          const newPrice = Math.max(0.01, lastPrice * (1 + change));
          
          // Create a new data point with current time
          const now = new Date();
          const newPoint = {
            date: now.toISOString(),
            price: newPrice,
          };
          
          // Update the data by removing the first point and adding the new one
          newData[asset][selectedTimeframe] = [
            ...timeframeData.slice(1),
            newPoint
          ];
        });
        
        return newData;
      });
    }, updateInterval);
    
    return () => clearInterval(interval);
  }, [updateInterval, selectedTimeframe]);
  
  // Get the current data for the selected timeframe
  const getCurrentData = (asset) => {
    return chartData[asset][selectedTimeframe];
  };
  
  return {
    chartData: {
      bitcoin: getCurrentData('bitcoin'),
      ethereum: getCurrentData('ethereum'),
      solana: getCurrentData('solana'),
      cardano: getCurrentData('cardano'),
    },
    selectedTimeframe,
    setSelectedTimeframe,
  };
}; 