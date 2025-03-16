import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="py-6 px-8 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center">
            <span className="text-white font-bold">CV</span>
          </div>
          <span className="ml-3 text-xl font-bold gradient-text">CryptoVerse</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-text-white hover:text-primary-cyan transition-colors">Login</button>
          <button className="btn-primary">Sign Up</button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-8 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Your Gateway to the <span className="gradient-text">Future of Finance</span>
          </h1>
          <p className="text-text-gray text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            Track cryptocurrencies, manage your portfolio, and stay updated with the latest crypto news all in one place.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-primary text-lg py-3 px-8 flex items-center justify-center gap-2">
              Explore Dashboard
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
            <button className="btn-secondary text-lg py-3 px-8">
              Create Account
            </button>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-16 px-8 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="gradient-text">Powerful Features</span> for Crypto Enthusiasts
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card">
              <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Portfolio Tracking</h3>
              <p className="text-text-gray">Monitor your crypto investments in real-time with advanced analytics and performance metrics.</p>
            </div>
            
            <div className="card">
              <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Market Data</h3>
              <p className="text-text-gray">Access comprehensive market data, price charts, and trading volumes for thousands of cryptocurrencies.</p>
            </div>
            
            <div className="card">
              <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Latest News</h3>
              <p className="text-text-gray">Stay informed with curated news from trusted sources across the cryptocurrency ecosystem.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 border-t border-gray-800 text-text-gray text-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="gradient-text font-bold">CryptoVerse</span> © 2023. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
} 