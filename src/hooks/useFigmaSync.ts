// useFigmaSync.ts
import { useState, useEffect, useCallback } from 'react';
import useFigmaAuth from './useFigmaAuth';
import { FigmaVariable, SyncStatus } from './types';

const useFigmaSync = (fileKey: string) => {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({ isSyncing: false, lastSynced: null, error: null });
  const token = useFigmaAuth();

  // Assume we have a state that holds our local variables that we want to sync
  const [localVariables, setLocalVariables] = useState<FigmaVariable[]>([]);

  // Fetch variables from Figma
  const fetchVariables = useCallback(async () => {
    console.log(localVariables)
    setSyncStatus(s => ({ ...s, isSyncing: true }));
    const url = `https://api.figma.com/v1/files/${fileKey}/variables`;

    try {
      const response = await fetch(url, {
        headers: {
          'X-FIGMA-TOKEN': token,
        },
      });
      if (!response.ok) throw new Error('Failed to fetch Figma variables');

      const { meta: { variables } } = await response.json();
      setLocalVariables(variables);
      setSyncStatus({ isSyncing: false, lastSynced: new Date(), error: null });
    } catch (error) {
      setSyncStatus({ isSyncing: false, lastSynced: null, error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }, [fileKey, localVariables, token]);

  // Example function to update Figma variables based on local changes
  // This is highly simplified and would need to be adjusted based on your actual logic for determining what needs to be updated
  const pushUpdatesToFigma = useCallback(async () => {
    // Placeholder for update logic
  }, []);
      // TODO: update dependency useEffect array
  // }, [token, localVariables]);


  // Example useEffect to automatically fetch variables when fileKey or token changes
  useEffect(() => {
    fetchVariables();
  }, [fetchVariables]);

  return { syncStatus, fetchVariables, pushUpdatesToFigma };
};

export default useFigmaSync;