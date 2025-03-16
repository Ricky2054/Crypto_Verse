const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create directory if it doesn't exist
const placeholdersDir = path.join(__dirname, '../public/images/placeholders');
if (!fs.existsSync(placeholdersDir)) {
  fs.mkdirSync(placeholdersDir, { recursive: true });
}

const placeholders = [
  { name: 'bitcoin-news.jpg', text: 'Bitcoin News', color: '#3b82f6' },
  { name: 'ethereum-news.jpg', text: 'Ethereum News', color: '#8b5cf6' },
  { name: 'crypto-news.jpg', text: 'Crypto News', color: '#10b981' },
  { name: 'blockchain-news.jpg', text: 'Blockchain News', color: '#f59e0b' },
  { name: 'nft-news.jpg', text: 'NFT News', color: '#ef4444' },
  { name: 'defi-news.jpg', text: 'DeFi News', color: '#6366f1' },
  { name: 'altcoin-news.jpg', text: 'Altcoin News', color: '#ec4899' },
  { name: 'mining-news.jpg', text: 'Mining News', color: '#14b8a6' },
  { name: 'regulation-news.jpg', text: 'Regulation News', color: '#f97316' },
  { name: 'market-news.jpg', text: 'Market News', color: '#8b5cf6' },
  { name: 'trading-news.jpg', text: 'Trading News', color: '#3b82f6' },
  { name: 'technology-news.jpg', text: 'Technology News', color: '#10b981' }
];

function createPlaceholder(placeholder) {
  const { name, text, color } = placeholder;
  
  const canvas = createCanvas(800, 450);
  const ctx = canvas.getContext('2d');
  
  // Fill background
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Add pattern
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  for (let i = 0; i < canvas.width; i += 20) {
    for (let j = 0; j < canvas.height; j += 20) {
      if ((i + j) % 40 === 0) {
        ctx.fillRect(i, j, 10, 10);
      }
    }
  }
  
  // Add text
  ctx.fillStyle = 'white';
  ctx.font = 'bold 40px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  
  // Add crypto symbol
  ctx.font = 'bold 120px Arial';
  ctx.globalAlpha = 0.1;
  ctx.fillText('₿', canvas.width / 2, canvas.height / 2 - 60);
  ctx.globalAlpha = 1;
  
  return canvas;
}

// Generate and save all placeholders
placeholders.forEach(placeholder => {
  const canvas = createPlaceholder(placeholder);
  const buffer = canvas.toBuffer('image/jpeg');
  const filePath = path.join(placeholdersDir, placeholder.name);
  
  fs.writeFileSync(filePath, buffer);
  console.log(`Created: ${filePath}`);
});

console.log('All placeholder images have been generated!'); 