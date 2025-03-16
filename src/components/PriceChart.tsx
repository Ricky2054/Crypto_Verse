'use client';

import { useRef, useEffect, useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { formatCurrency } from '@/utils/formatters';

interface ChartDataPoint {
  date: string;
  price: number;
}

interface PriceChartProps {
  data: ChartDataPoint[];
  timeframe: string;
  onTimeframeChange: (timeframe: string) => void;
  height?: number;
  color?: string;
  currencySymbol?: string;
}

const PriceChart: React.FC<PriceChartProps> = ({
  data,
  timeframe,
  onTimeframeChange,
  height = 300,
  color = '#3b82f6',
  currencySymbol = 'ETH'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height });
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoverPoint, setHoverPoint] = useState<{index: number, x: number, y: number} | null>(null);
  const [priceChange, setPriceChange] = useState({ value: 0, percentage: 0 });
  
  // Calculate price change when data changes
  useEffect(() => {
    if (data.length > 1) {
      const firstPrice = data[0].price;
      const lastPrice = data[data.length - 1].price;
      const change = lastPrice - firstPrice;
      const percentage = (change / firstPrice) * 100;
      
      setPriceChange({
        value: change,
        percentage: percentage
      });
    }
  }, [data]);
  
  // Format date based on timeframe
  const formatDate = (dateStr: string, timeframe: string) => {
    const date = new Date(dateStr);
    
    switch (timeframe) {
      case '1D':
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      case '1W':
        return date.toLocaleDateString([], { weekday: 'short' });
      case '1M':
        return date.toLocaleDateString([], { day: 'numeric', month: 'short' });
      case '1Y':
        return date.toLocaleDateString([], { month: 'short' });
      default:
        return date.toLocaleDateString();
    }
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const parent = canvas.parentElement;
        if (parent) {
          const { width } = parent.getBoundingClientRect();
          setDimensions({ width, height });
          
          // Set canvas dimensions with device pixel ratio for sharp rendering
          const dpr = window.devicePixelRatio || 1;
          canvas.width = width * dpr;
          canvas.height = height * dpr;
          canvas.style.width = `${width}px`;
          canvas.style.height = `${height}px`;
          
          // Redraw chart
          drawChart(1);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, [height, data]);

  // Animation effect when data changes
  useEffect(() => {
    setIsAnimating(true);
    setAnimationProgress(0);
    
    const startTime = performance.now();
    const duration = 800; // Animation duration in ms
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setAnimationProgress(progress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };
    
    requestAnimationFrame(animate);
  }, [data]);
  
  // Draw chart when animation progress changes
  useEffect(() => {
    drawChart(animationProgress);
  }, [animationProgress, dimensions, hoverPoint]);
  
  // Handle mouse move for hover effects
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || data.length === 0 || isAnimating) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Set chart dimensions
    const padding = { top: 20, right: 20, bottom: 30, left: 40 };
    const chartWidth = dimensions.width - padding.left - padding.right;
    
    // Find the closest data point
    const dataPointWidth = chartWidth / (data.length - 1);
    const index = Math.round((x - padding.left) / dataPointWidth);
    
    if (index >= 0 && index < data.length) {
      // Scale functions
      const prices = data.map(d => d.price);
      const minPrice = Math.min(...prices) * 0.95;
      const maxPrice = Math.max(...prices) * 1.05;
      const priceRange = maxPrice - minPrice;
      const chartHeight = dimensions.height - padding.top - padding.bottom;
      
      const xScale = (i: number) => padding.left + (i / (data.length - 1)) * chartWidth;
      const yScale = (price: number) => padding.top + chartHeight - ((price - minPrice) / priceRange) * chartHeight;
      
      setHoverPoint({
        index,
        x: xScale(index),
        y: yScale(data[index].price)
      });
    } else {
      setHoverPoint(null);
    }
  };
  
  // Handle mouse leave
  const handleMouseLeave = () => {
    setHoverPoint(null);
  };
  
  const drawChart = (progress: number) => {
    if (!canvasRef.current || data.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const dpr = window.devicePixelRatio || 1;
    ctx.resetTransform();
    ctx.scale(dpr, dpr);
    
    // Clear canvas
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);
    
    // Set chart dimensions
    const padding = { top: 20, right: 20, bottom: 30, left: 40 };
    const chartWidth = dimensions.width - padding.left - padding.right;
    const chartHeight = dimensions.height - padding.top - padding.bottom;
    
    // Find min and max values
    const prices = data.map(d => d.price);
    const minPrice = Math.min(...prices) * 0.95;
    const maxPrice = Math.max(...prices) * 1.05;
    const priceRange = maxPrice - minPrice;
    
    // Scale functions
    const xScale = (i: number) => padding.left + (i / (data.length - 1)) * chartWidth;
    const yScale = (price: number) => padding.top + chartHeight - ((price - minPrice) / priceRange) * chartHeight;
    
    // Draw background gradient
    const bgGradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartHeight);
    bgGradient.addColorStop(0, 'rgba(26, 29, 36, 0.5)');
    bgGradient.addColorStop(1, 'rgba(26, 29, 36, 0.1)');
    
    ctx.fillStyle = bgGradient;
    ctx.fillRect(padding.left, padding.top, chartWidth, chartHeight);
    
    // Draw grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    const gridLines = 5;
    for (let i = 0; i <= gridLines; i++) {
      const y = padding.top + (i / gridLines) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + chartWidth, y);
      ctx.stroke();
      
      // Price labels
      const price = maxPrice - (i / gridLines) * priceRange;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(formatCurrency(price, currencySymbol), padding.left - 5, y + 3);
    }
    
    // Vertical grid lines
    const verticalLines = Math.min(data.length, 7);
    for (let i = 0; i < verticalLines; i++) {
      const dataIndex = Math.floor((i / (verticalLines - 1)) * (data.length - 1));
      const x = xScale(dataIndex);
      
      ctx.beginPath();
      ctx.moveTo(x, padding.top);
      ctx.lineTo(x, padding.top + chartHeight);
      ctx.stroke();
      
      // Date labels
      const date = data[dataIndex].date;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(formatDate(date, timeframe), x, padding.top + chartHeight + 15);
    }
    
    // Draw area under the curve
    ctx.beginPath();
    ctx.moveTo(xScale(0), yScale(data[0].price * progress));
    
    for (let i = 1; i < data.length; i++) {
      const x = xScale(i);
      const y = yScale(data[i].price * progress);
      ctx.lineTo(x, y);
    }
    
    // Complete the area path
    ctx.lineTo(xScale(data.length - 1), yScale(minPrice));
    ctx.lineTo(xScale(0), yScale(minPrice));
    ctx.closePath();
    
    // Create gradient fill
    const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartHeight);
    gradient.addColorStop(0, `${color}40`); // 25% opacity
    gradient.addColorStop(1, `${color}05`); // 2% opacity
    
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw the price line
    ctx.beginPath();
    ctx.moveTo(xScale(0), yScale(data[0].price * progress));
    
    for (let i = 1; i < data.length; i++) {
      const x = xScale(i);
      const y = yScale(data[i].price * progress);
      ctx.lineTo(x, y);
    }
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw current price indicator
    const currentPrice = data[data.length - 1].price;
    const currentPriceY = yScale(currentPrice * progress);
    
    // Dashed line to current price
    ctx.beginPath();
    ctx.setLineDash([3, 3]);
    ctx.moveTo(padding.left, currentPriceY);
    ctx.lineTo(padding.left + chartWidth, currentPriceY);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Current price label
    ctx.fillStyle = 'white';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(formatCurrency(currentPrice * progress, currencySymbol), padding.left + chartWidth + 5, currentPriceY + 4);
    
    // Draw price points
    const pointRadius = 4;
    for (let i = 0; i < data.length; i += Math.ceil(data.length / 10)) {
      const x = xScale(i);
      const y = yScale(data[i].price * progress);
      
      ctx.beginPath();
      ctx.arc(x, y, pointRadius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(x, y, pointRadius - 1.5, 0, Math.PI * 2);
      ctx.fillStyle = '#1A1D24';
      ctx.fill();
    }
    
    // Draw the last point (current price)
    const lastX = xScale(data.length - 1);
    const lastY = yScale(currentPrice * progress);
    
    ctx.beginPath();
    ctx.arc(lastX, lastY, pointRadius + 1, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(lastX, lastY, pointRadius - 1, 0, Math.PI * 2);
    ctx.fillStyle = '#1A1D24';
    ctx.fill();
    
    // Draw hover point and tooltip
    if (hoverPoint && !isAnimating) {
      const { index, x, y } = hoverPoint;
      const hoverPrice = data[index].price;
      const hoverDate = data[index].date;
      
      // Draw vertical line
      ctx.beginPath();
      ctx.setLineDash([2, 2]);
      ctx.moveTo(x, padding.top);
      ctx.lineTo(x, padding.top + chartHeight);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Draw point highlight
      ctx.beginPath();
      ctx.arc(x, y, pointRadius + 2, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(x, y, pointRadius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      
      // Draw tooltip
      const tooltipWidth = 120;
      const tooltipHeight = 60;
      const tooltipX = Math.min(Math.max(x - tooltipWidth / 2, padding.left), dimensions.width - padding.right - tooltipWidth);
      const tooltipY = y - tooltipHeight - 10;
      
      // Tooltip background
      ctx.fillStyle = 'rgba(26, 29, 36, 0.9)';
      ctx.beginPath();
      ctx.roundRect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 4);
      ctx.fill();
      
      // Tooltip border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Tooltip content
      ctx.fillStyle = 'white';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(formatCurrency(hoverPrice, currencySymbol), tooltipX + tooltipWidth / 2, tooltipY + 20);
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '10px sans-serif';
      ctx.fillText(new Date(hoverDate).toLocaleString(), tooltipX + tooltipWidth / 2, tooltipY + 40);
    }
  };

  return (
    <div className="price-chart">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <div className="d-flex align-items-center">
            <h4 className="mb-0 me-3">{formatCurrency(data.length > 0 ? data[data.length - 1].price : 0, currencySymbol)}</h4>
            <span className={`badge ${priceChange.percentage >= 0 ? 'bg-success' : 'bg-danger'}`}>
              {priceChange.percentage >= 0 ? '+' : ''}{priceChange.percentage.toFixed(2)}%
            </span>
          </div>
          <div className="text-muted small">
            {priceChange.value >= 0 ? '+' : ''}{formatCurrency(priceChange.value, currencySymbol)} ({timeframe})
          </div>
        </div>
        <ButtonGroup size="sm">
          {['1D', '1W', '1M', '1Y'].map((tf) => (
            <Button
              key={tf}
              variant={timeframe === tf ? 'primary' : 'outline-secondary'}
              onClick={() => onTimeframeChange(tf)}
              className="px-3"
            >
              {tf}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <div style={{ position: 'relative', width: '100%', height: `${height}px` }}>
        <canvas
          ref={canvasRef}
          style={{ 
            width: '100%', 
            height: '100%',
            cursor: isAnimating ? 'default' : 'crosshair'
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
      </div>
    </div>
  );
};

export default PriceChart; 