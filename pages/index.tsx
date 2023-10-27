import { Inter } from 'next/font/google';
import { useMarkets } from '@/api/useMarkets';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Market } from '@/components/Market/Market';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { markets } = useMarkets();

  const [minimumLoadingTime, setMinimumLoadingTime] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinimumLoadingTime(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const isLoading = minimumLoadingTime || !markets;

  return (
    <main className={`${inter.className}`}>
      {isLoading ? <LoadingScreen /> : <Market markets={markets} />}
    </main>
  );
}
