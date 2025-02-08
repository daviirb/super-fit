'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface LoadingAnimationProps {
  duration: number;
}

export function LoadingAnimation({ duration }: LoadingAnimationProps) {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + 10;
        return Math.min(newProgress, 100);
      });
    }, duration / 10);

    return () => clearInterval(interval);
  }, [duration]);

  useEffect(() => {
    if (progress === 100) {
      router.push('/pricing');
    }
  }, [progress, router]);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-green-100">
      <div className="h-24 w-24 animate-spin rounded-full border-t-4 border-solid border-primary"></div>
      <p className="mt-4 text-lg font-semibold">
        Gerando sua dieta personalizada...
      </p>
      <div className="mt-4 h-2 w-64 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="mt-2 text-primary">{progress}%</p>
    </div>
  );
}
