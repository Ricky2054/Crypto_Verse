import { useState, useEffect } from 'react';
import { portfolioData as initialPortfolioData, transactionHistory as initialTransactionHistory } from './dummyData';

const getRandomChange = () => {
  return (Math.random() * 2 - 1) * 2; // Random value between -2% and +2%
};

const updatePortfolioData = (data: any[]) => {
  return data.map(asset => {
    const priceChange = getRandomChange();
    const newValue = asset.value * (1 + priceChange / 100);
    return {
      ...asset,
      value: newValue,
      profitLoss: asset.profitLoss + priceChange,
    };
  });
};

export const usePortfolioData = (updateInterval = 5000) => {
  const [portfolioData, setPortfolioData] = useState(initialPortfolioData);
  const [transactionHistory] = useState(initialTransactionHistory);

  useEffect(() => {
    const interval = setInterval(() => {
      setPortfolioData(prev => updatePortfolioData(prev));
    }, updateInterval);

    return () => clearInterval(interval);
  }, [updateInterval]);

  const totalValue = portfolioData.reduce((sum, asset) => sum + asset.value, 0);
  const totalProfitLoss = portfolioData.reduce((sum, asset) => sum + (asset.value * asset.profitLoss / 100), 0);
  const profitLossPercentage = (totalProfitLoss / (totalValue - totalProfitLoss)) * 100;

  return {
    portfolioData,
    transactionHistory,
    totalValue,
    totalProfitLoss,
    profitLossPercentage,
  };
}; 