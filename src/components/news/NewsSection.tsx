'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import NewsCard from './NewsCard';

const categories = ['All', 'Bitcoin', 'Ethereum', 'Altcoins', 'NFTs', 'Regulation'];

const newsData = [
  {
    id: 1,
    title: 'Bitcoin Surges Past $60,000 as Institutional Adoption Accelerates',
    summary: 'Bitcoin has broken through the $60,000 barrier as more institutional investors add the cryptocurrency to their portfolios.',
    source: 'CryptoNews',
    date: 'May 15, 2023',
    readTime: '3 min read',
    imageUrl: '/news1.jpg',
    tags: ['bitcoin', 'markets', 'institutional'],
    category: 'Bitcoin'
  },
  {
    id: 2,
    title: 'Ethereum 2.0 Upgrade: What You Need to Know About the Merge',
    summary: 'The long-awaited Ethereum 2.0 upgrade is approaching. Here\'s what you need to know about the transition to proof-of-stake.',
    source: 'BlockchainInsider',
    date: 'May 14, 2023',
    readTime: '5 min read',
    imageUrl: '/news2.jpg',
    tags: ['ethereum', 'technology', 'eth2.0'],
    category: 'Ethereum'
  },
  {
    id: 3,
    title: 'SEC Approves First Spot Bitcoin ETF in Historic Decision',
    summary: 'The Securities and Exchange Commission has approved the first spot Bitcoin ETF, marking a significant milestone for cryptocurrency adoption.',
    source: 'CryptoDaily',
    date: 'May 12, 2023',
    readTime: '4 min read',
    imageUrl: '/news3.jpg',
    tags: ['bitcoin', 'regulation', 'etf'],
    category: 'Bitcoin'
  },
  {
    id: 4,
    title: 'Solana Ecosystem Expands with New DeFi Projects',
    summary: 'The Solana blockchain continues to grow with several new DeFi projects launching on the high-performance network.',
    source: 'DeFiPulse',
    date: 'May 10, 2023',
    readTime: '3 min read',
    imageUrl: '/news4.jpg',
    tags: ['solana', 'defi', 'altcoins'],
    category: 'Altcoins'
  },
];

export default function NewsSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  const filteredNews = activeCategory === 'All' 
    ? newsData 
    : newsData.filter(news => news.category === activeCategory);

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Latest News</h3>
        <div className="flex overflow-x-auto hide-scrollbar gap-2">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-1.5 text-sm rounded-full whitespace-nowrap transition-colors ${
                activeCategory === category 
                  ? 'bg-gradient-primary text-white' 
                  : 'bg-gray-800 text-text-gray hover:text-white'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredNews.map((news) => (
          <NewsCard
            key={news.id}
            title={news.title}
            summary={news.summary}
            source={news.source}
            date={news.date}
            readTime={news.readTime}
            imageUrl={news.imageUrl}
            tags={news.tags}
          />
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <button className="btn-secondary">View All News</button>
      </div>
    </Card>
  );
} 