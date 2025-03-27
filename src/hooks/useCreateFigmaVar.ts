// useCreateFigmaVar.ts
import { useState } from 'react';
import useFigmaAuth from './useFigmaAuth';
import { FigmaOperationResponse } from './types';

const useCreateFigmaVar = () => {
  const [response, setResponse] = useState<FigmaOperationResponse | null>(null);
  const token = useFigmaAuth();

  // TODO: Fix any type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createVariable = async (fileKey: string, variableData: any) => {
    const url = `https://api.figma.com/v1/files/${fileKey}/variables`; // Adjust URL as needed

    try {
      const result = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-FIGMA-TOKEN': token,
        },
        body: JSON.stringify(variableData),
      });

      if (!result.ok) throw new Error('Failed to create Figma variable');

      const data: FigmaOperationResponse = await result.json();
      setResponse(data);
    } catch (error) {
      setResponse({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  return { response, createVariable };
};

export default useCreateFigmaVar;