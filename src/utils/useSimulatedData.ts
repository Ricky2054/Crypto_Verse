import { useState, useEffect } from 'react';
import { cryptoData as initialCryptoData, marketStats as initialMarketStats, trendingCoins as initialTrendingCoins } from './dummyData';

const getRandomChange = () => {
  return (Math.random() * 2 - 1) * 2; // Random value between -2% and +2%
};

const updateCryptoData = (data: any[]) => {
  return data.map(crypto => ({
    ...crypto,
    price: crypto.price * (1 + getRandomChange() / 100),
    change24h: crypto.change24h + getRandomChange(),
    volume24h: crypto.volume24h * (1 + getRandomChange() / 100),
  }));
};

const updateMarketStats = (stats: any) => {
  const btcChange = getRandomChange();
  return {
    ...stats,
    totalMarketCap: stats.totalMarketCap * (1 + getRandomChange() / 100),
    total24hVolume: stats.total24hVolume * (1 + getRandomChange() / 100),
    btcDominance: stats.btcDominance + btcChange / 4,
  };
};

const updateTrendingCoins = (coins: any[]) => {
  return coins.map(coin => ({
    ...coin,
    price: coin.price * (1 + getRandomChange() / 100),
    change24h: coin.change24h + getRandomChange(),
  }));
};

export const useSimulatedData = (updateInterval = 5000) => {
  const [cryptoData, setCryptoData] = useState(initialCryptoData);
  const [marketStats, setMarketStats] = useState(initialMarketStats);
  const [trendingCoins, setTrendingCoins] = useState(initialTrendingCoins);

  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoData(prev => updateCryptoData(prev));
      setMarketStats(prev => updateMarketStats(prev));
      setTrendingCoins(prev => updateTrendingCoins(prev));
    }, updateInterval);

    return () => clearInterval(interval);
  }, [updateInterval]);

  return {
    cryptoData,
    marketStats,
    trendingCoins,
  };
}; 