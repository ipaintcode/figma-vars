// useFigmaVarsCache.ts
import { useState } from 'react';
import { FigmaVariable } from './types';

const useFigmaVarsCache = () => {
  const [varsCache, setVarsCache] = useState<{ [key: string]: FigmaVariable[] }>({});

  const getVarsFromCache = (fileKey: string): FigmaVariable[] | undefined => {
    return varsCache[fileKey];
  };

  const setVarsToCache = (fileKey: string, variables: FigmaVariable[]): void => {
    setVarsCache(prev => ({ ...prev, [fileKey]: variables }));
  };

  // Fetching and caching logic here...

  return { getVarsFromCache, setVarsToCache };
};

export default useFigmaVarsCache;
