import Card from '../ui/Card';
import PriceChange from '../ui/PriceChange';
import { WalletIcon } from '@heroicons/react/24/outline';

export default function PortfolioSummary() {
  return (
    <Card className="h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Portfolio Summary</h3>
        <button className="btn-secondary text-sm py-1 px-3 flex items-center gap-1">
          <WalletIcon className="h-4 w-4" />
          <span>Add Asset</span>
        </button>
      </div>
      
      <div className="mb-6">
        <div className="text-3xl font-bold mb-1">$24,875.32</div>
        <div className="flex items-center gap-4">
          <PriceChange value={842.12} className="text-sm" />
          <PriceChange value={3.5} percentage className="text-sm" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800/50 rounded-lg p-3">
          <div className="text-text-gray text-sm mb-1">Total Gain/Loss</div>
          <div className="flex items-center">
            <PriceChange value={1458.23} className="font-medium" />
            <span className="text-text-gray ml-2 text-sm">(6.2%)</span>
          </div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-3">
          <div className="text-text-gray text-sm mb-1">Assets</div>
          <div className="font-medium">12 Assets</div>
          <div className="text-text-gray text-xs">Across 4 Blockchains</div>
        </div>
      </div>
    </Card>
  );
} 