'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import Card from '@/components/ui/Card';
import NewsCard from '@/components/news/NewsCard';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const categories = ['All', 'Bitcoin', 'Ethereum', 'Altcoins', 'NFTs', 'DeFi', 'Regulation', 'Technology', 'Business'];

// Extended mock data for news
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
  {
    id: 5,
    title: 'NFT Market Shows Signs of Recovery After Months of Decline',
    summary: 'The NFT market is showing signs of recovery with increased trading volume and new collections gaining traction.',
    source: 'NFTWorld',
    date: 'May 9, 2023',
    readTime: '4 min read',
    imageUrl: '/news5.jpg',
    tags: ['nft', 'markets', 'art'],
    category: 'NFTs'
  },
  {
    id: 6,
    title: 'Central Banks Accelerate CBDC Development Amid Crypto Boom',
    summary: 'Central banks around the world are accelerating their development of central bank digital currencies (CBDCs) in response to the growing popularity of cryptocurrencies.',
    source: 'FinanceToday',
    date: 'May 8, 2023',
    readTime: '6 min read',
    imageUrl: '/news6.jpg',
    tags: ['cbdc', 'regulation', 'central-banks'],
    category: 'Regulation'
  },
  {
    id: 7,
    title: 'DeFi Protocol Aave Launches V3 with Enhanced Security Features',
    summary: 'Decentralized finance protocol Aave has launched its V3 update with enhanced security features and improved capital efficiency.',
    source: 'DeFiInsider',
    date: 'May 7, 2023',
    readTime: '4 min read',
    imageUrl: '/news7.jpg',
    tags: ['defi', 'aave', 'security'],
    category: 'DeFi'
  },
  {
    id: 8,
    title: 'Crypto Mining Companies Shift to Renewable Energy Sources',
    summary: 'Major cryptocurrency mining companies are increasingly shifting to renewable energy sources amid environmental concerns.',
    source: 'CryptoMining',
    date: 'May 6, 2023',
    readTime: '5 min read',
    imageUrl: '/news8.jpg',
    tags: ['mining', 'environment', 'bitcoin'],
    category: 'Bitcoin'
  },
];

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredNews = newsData
    .filter(news => activeCategory === 'All' || news.category === activeCategory)
    .filter(news => 
      searchQuery === '' || 
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Crypto News</h1>
        <p className="text-text-gray">Stay updated with the latest cryptocurrency news and insights</p>
      </div>
      
      <div className="mb-6">
        <Card>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2">
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
            <div className="mt-4 md:mt-0 relative w-full md:w-auto">
              <input 
                type="text" 
                placeholder="Search news..." 
                className="bg-gray-800 text-white rounded-lg pl-10 pr-4 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-primary-cyan"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-gray" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          
          {filteredNews.length === 0 && (
            <div className="text-center py-12">
              <p className="text-text-gray">No news articles found matching your criteria.</p>
            </div>
          )}
          
          {filteredNews.length > 0 && (
            <div className="mt-6 flex justify-center">
              <div className="flex">
                <button className="px-4 py-2 bg-gray-800 rounded-l-lg text-text-gray hover:text-white">Previous</button>
                <button className="px-4 py-2 bg-gray-700 text-white">1</button>
                <button className="px-4 py-2 bg-gray-800 text-text-gray hover:text-white">2</button>
                <button className="px-4 py-2 bg-gray-800 text-text-gray hover:text-white">3</button>
                <button className="px-4 py-2 bg-gray-800 rounded-r-lg text-text-gray hover:text-white">Next</button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
} 