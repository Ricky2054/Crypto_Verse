'use client';

import { useState } from 'react';
import Card from '../ui/Card';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const timeRanges = ['1D', '1W', '1M', '3M', '1Y', 'All'];

const data = [
  { name: 'Jan', value: 18000 },
  { name: 'Feb', value: 16500 },
  { name: 'Mar', value: 19000 },
  { name: 'Apr', value: 17500 },
  { name: 'May', value: 21000 },
  { name: 'Jun', value: 20000 },
  { name: 'Jul', value: 22500 },
  { name: 'Aug', value: 24875 },
];

export default function PortfolioChart() {
  const [activeRange, setActiveRange] = useState('1M');

  return (
    <Card className="h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Portfolio Performance</h3>
        <div className="flex bg-gray-800 rounded-lg p-1">
          {timeRanges.map((range) => (
            <button
              key={range}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                activeRange === range 
                  ? 'bg-gray-700 text-white' 
                  : 'text-text-gray hover:text-white'
              }`}
              onClick={() => setActiveRange(range)}
            >
              {range}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#30D5C8" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#9966FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#CCCCCC', fontSize: 12 }}
            />
            <YAxis 
              hide={true}
              domain={['dataMin - 2000', 'dataMax + 2000']}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1E1E1E', 
                border: '1px solid #333',
                borderRadius: '8px',
                color: '#FFFFFF'
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
              labelFormatter={(label) => `${label}`}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#30D5C8" 
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
} 