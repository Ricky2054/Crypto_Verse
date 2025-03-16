'use client';

import { useEffect, useState } from 'react';

export default function ClientOnly({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Return null on first render to avoid hydration mismatch
  if (!isClient) {
    return null;
  }

  return <>{children}</>;
} 