// useFigmaVars.ts
import { useState, useEffect } from 'react';
import useFigmaAuth from './useFigmaAuth';
import { FigmaVariable, VariablesResponse } from './types';

const useFigmaVars = (fileKey: string) => {
  const [data, setData] = useState<FigmaVariable[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const token = useFigmaAuth();

  useEffect(() => {
    const fetchVariables = async () => {
      if (!token) {
        setError(new Error("API token is not provided"));
        setLoading(false);
        return;
      }

      const url = `https://api.figma.com/v1/files/${fileKey}/variables`;

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'X-FIGMA-TOKEN': token,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch Figma variables: ${response.statusText}`);
        }

        const json: VariablesResponse = await response.json();
        setData(json.meta.variables);
      } catch (error) {
        setError(error instanceof Error ? error : new Error('Failed to fetch'));
      } finally {
        setLoading(false);
      }
    };

    fetchVariables();
  }, [fileKey, token]);

  return { data, loading, error };
};

export default useFigmaVars;