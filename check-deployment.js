// Simple script to check if the application is running correctly
console.log('Checking CryptoVerse deployment...');

// Check if we're in a browser environment
if (typeof window !== 'undefined') {
  console.log('Running in browser environment');
  
  // Check if the document is loaded
  if (document.readyState === 'complete') {
    checkApp();
  } else {
    window.addEventListener('load', checkApp);
  }
}

function checkApp() {
  console.log('Document loaded, checking application...');
  
  // Check if the main elements are present
  const navbar = document.querySelector('nav.navbar');
  const heroSection = document.querySelector('section.py-5.py-md-6');
  const featuresSection = document.querySelector('section.py-5.py-md-6.bg-dark');
  
  if (navbar && heroSection && featuresSection) {
    console.log('CryptoVerse application loaded successfully!');
  } else {
    console.error('CryptoVerse application not loaded correctly.');
    console.log('Navbar present:', !!navbar);
    console.log('Hero section present:', !!heroSection);
    console.log('Features section present:', !!featuresSection);
  }
}

// Export for Node.js environments
if (typeof module !== 'undefined') {
  module.exports = { checkApp };
} 