// useFigmaVarAliases.ts
import { useState } from 'react';
import { FigmaVariable } from './types';

const useFigmaVarAliases = () => {
  const [aliases, setAliases] = useState<{ [alias: string]: FigmaVariable }>({});

  const setAlias = (alias: string, variable: FigmaVariable) => {
    setAliases(prev => ({ ...prev, [alias]: variable }));
  };

  const removeAlias = (alias: string) => {
    const newAliases = { ...aliases };
    delete newAliases[alias];
    setAliases(newAliases);
  };

  return { aliases, setAlias, removeAlias };
};

export default useFigmaVarAliases;
