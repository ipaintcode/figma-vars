// useFigmaVarCollections.ts
import { useState, useEffect } from 'react';
import useFigmaAuth from './useFigmaAuth';
import { FigmaCollection, HookState } from './types';

const useFigmaVarCollections = (fileKey: string): HookState<FigmaCollection[]> => {
  const [state, setState] = useState<HookState<FigmaCollection[]>>({
    data: null,
    loading: true,
    error: null,
  });
  const token = useFigmaAuth();

  useEffect(() => {
    const fetchCollections = async () => {
      if (!token) {
        setState(s => ({ ...s, loading: false, error: new Error("API token is not provided") }));
        return;
      }

      const url = `https://api.figma.com/v1/files/${fileKey}/collections`; // Adjust the URL as needed

      try {
        const response = await fetch(url, {
          headers: {
            'X-FIGMA-TOKEN': token,
          },
        });

        if (!response.ok) throw new Error(`Failed to fetch Figma collections: ${response.statusText}`);

        const data = await response.json();
        setState({ data: data.collections, loading: false, error: null }); // Adjust according to the actual API response
      } catch (error) {
        // setState(s => ({ ...s, loading: false, error }));
      }
    };

    fetchCollections();
  }, [fileKey, token]);

  return state;
};

export default useFigmaVarCollections;
