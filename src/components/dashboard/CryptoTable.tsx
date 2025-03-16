'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import PriceChange from '../ui/PriceChange';
import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

// Mock data for cryptocurrencies
const cryptoData = [
  { 
    id: 'bitcoin', 
    name: 'Bitcoin', 
    symbol: 'BTC', 
    price: 58432.21, 
    change24h: 2.34, 
    marketCap: 1120000000000, 
    volume24h: 32500000000,
    image: '/bitcoin.png'
  },
  { 
    id: 'ethereum', 
    name: 'Ethereum', 
    symbol: 'ETH', 
    price: 3245.87, 
    change24h: 3.56, 
    marketCap: 389000000000, 
    volume24h: 18700000000,
    image: '/ethereum.png'
  },
  { 
    id: 'binancecoin', 
    name: 'Binance Coin', 
    symbol: 'BNB', 
    price: 432.65, 
    change24h: -1.23, 
    marketCap: 72000000000, 
    volume24h: 2100000000,
    image: '/binance.png'
  },
  { 
    id: 'cardano', 
    name: 'Cardano', 
    symbol: 'ADA', 
    price: 1.23, 
    change24h: 5.67, 
    marketCap: 42000000000, 
    volume24h: 3400000000,
    image: '/cardano.png'
  },
  { 
    id: 'solana', 
    name: 'Solana', 
    symbol: 'SOL', 
    price: 102.45, 
    change24h: -2.78, 
    marketCap: 38000000000, 
    volume24h: 2800000000,
    image: '/solana.png'
  },
];

export default function CryptoTable() {
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <Card title="Top Cryptocurrencies">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-text-gray border-b border-gray-800">
              <th className="pb-3 text-left font-medium"></th>
              <th className="pb-3 text-left font-medium">Name</th>
              <th className="pb-3 text-right font-medium">Price</th>
              <th className="pb-3 text-right font-medium">24h Change</th>
              <th className="pb-3 text-right font-medium">Market Cap</th>
              <th className="pb-3 text-right font-medium">Volume (24h)</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((crypto) => (
              <tr key={crypto.id} className="border-b border-gray-800 hover:bg-gray-800/30">
                <td className="py-4 pr-2">
                  <button 
                    onClick={() => toggleFavorite(crypto.id)}
                    className="text-gray-400 hover:text-primary-cyan"
                  >
                    {favorites.includes(crypto.id) ? (
                      <StarIconSolid className="h-5 w-5 text-primary-cyan" />
                    ) : (
                      <StarIcon className="h-5 w-5" />
                    )}
                  </button>
                </td>
                <td className="py-4">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                      {crypto.symbol.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{crypto.name}</div>
                      <div className="text-text-gray text-sm">{crypto.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 text-right font-medium">
                  ${crypto.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className="py-4 text-right">
                  <PriceChange value={crypto.change24h} percentage />
                </td>
                <td className="py-4 text-right text-text-gray">
                  ${(crypto.marketCap / 1000000000).toFixed(1)}B
                </td>
                <td className="py-4 text-right text-text-gray">
                  ${(crypto.volume24h / 1000000000).toFixed(1)}B
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-center">
        <button className="btn-secondary">View All Cryptocurrencies</button>
      </div>
    </Card>
  );
} 