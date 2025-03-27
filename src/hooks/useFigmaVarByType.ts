// useFigmaVarByType.ts
import { useState, useEffect } from 'react';
import useFigmaVars from './useFigmaVars';
import { FigmaVariable } from './types';

const useFigmaVarByType = (fileKey: string, type: string) => {
  const { data, loading, error } = useFigmaVars(fileKey);
  const [filteredVars, setFilteredVars] = useState<FigmaVariable[]>([]);

  useEffect(() => {
    if (data) {
      const varsByType = data.filter(variable => variable.type === type);
      setFilteredVars(varsByType);
    }
  }, [data, type]);

  return { filteredVars, loading, error };
};

export default useFigmaVarByType;
