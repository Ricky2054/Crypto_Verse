import { useState, useEffect } from 'react';
import { newsItems as initialNewsItems } from './dummyData';

// Local placeholder images using SVG instead of JPG
const newsImageUrls = [
  '/images/placeholders/bitcoin-news.svg',
  '/images/placeholders/ethereum-news.svg',
  '/images/placeholders/crypto-news.svg',
  '/images/placeholders/bitcoin-news.svg',
  '/images/placeholders/ethereum-news.svg',
  '/images/placeholders/crypto-news.svg',
  '/images/placeholders/bitcoin-news.svg',
  '/images/placeholders/ethereum-news.svg',
  '/images/placeholders/crypto-news.svg',
  '/images/placeholders/bitcoin-news.svg',
  '/images/placeholders/ethereum-news.svg',
  '/images/placeholders/crypto-news.svg'
];

// Fallback image
const fallbackImage = '/images/placeholders/crypto-news.svg';

// Realistic headlines
const headlines = [
  'Bitcoin Surges Past $70,000 as Institutional Adoption Accelerates',
  'Ethereum 2.0 Upgrade Successfully Completed, Gas Fees Drop by 90%',
  'SEC Approves Spot Ethereum ETF, Market Reacts Positively',
  'Major Bank Announces Integration of Blockchain Technology for Cross-Border Payments',
  'NFT Market Shows Signs of Recovery with Record-Breaking Sales',
  'Central Banks Worldwide Explore Digital Currency Options',
  'Crypto Regulation Framework Proposed by G20 Nations',
  'DeFi Total Value Locked Reaches New All-Time High of $150 Billion',
  'Solana Ecosystem Expands with Major DeFi and Gaming Projects',
  'Crypto Mining Companies Shift to Renewable Energy Sources',
  'Binance Settles with Regulators, Agrees to Pay $4.3 Billion Fine',
  'Layer 2 Solutions See Massive Growth as Ethereum Scaling Continues'
];

// News sources
const sources = [
  'CoinDesk',
  'Bloomberg Crypto',
  'The Block',
  'CryptoSlate',
  'Decrypt',
  'Cointelegraph',
  'Forbes Crypto',
  'CNBC Crypto'
];

// Update news items with random changes
const updateNewsItems = (items: any[]) => {
  return items.map((item) => {
    // Generate a random date within the last 24 hours
    const now = new Date();
    const hoursAgo = Math.floor(Math.random() * 24);
    const minutesAgo = Math.floor(Math.random() * 60);
    const date = new Date(now);
    date.setHours(date.getHours() - hoursAgo);
    date.setMinutes(date.getMinutes() - minutesAgo);
    
    // Randomly select a source
    const source = sources[Math.floor(Math.random() * sources.length)];
    
    // Randomly select a headline
    const title = headlines[Math.floor(Math.random() * headlines.length)];
    
    return {
      ...item,
      title,
      source,
      date: date.toISOString(),
      // Keep the same image URL for consistency
      imageUrl: item.imageUrl,
    };
  });
};

export const useNewsData = (updateInterval = 2000) => {
  // Initialize with more news items and reliable images
  const initializedNewsItems = Array.from({ length: 12 }, (_, index) => {
    const id = initialNewsItems[index % initialNewsItems.length]?.id || index + 1;
    const title = headlines[index % headlines.length];
    const source = sources[index % sources.length];
    
    // Generate a random date within the last 24 hours
    const now = new Date();
    const hoursAgo = Math.floor(Math.random() * 24);
    const date = new Date(now);
    date.setHours(date.getHours() - hoursAgo);
    
    return {
      id,
      title,
      source,
      date: date.toISOString(),
      url: '#',
      imageUrl: newsImageUrls[index % newsImageUrls.length],
      // Add a fallback image in case the primary one fails
      fallbackImageUrl: fallbackImage
    };
  });
  
  const [newsItems, setNewsItems] = useState(initializedNewsItems);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setNewsItems(prev => updateNewsItems(prev));
    }, updateInterval);
    
    return () => clearInterval(interval);
  }, [updateInterval]);
  
  return { newsItems };
}; 