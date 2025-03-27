// useUpdateFigmaVar.ts
import { useState } from 'react';
import useFigmaAuth from './useFigmaAuth';
import { FigmaOperationResponse } from './types';

const useUpdateFigmaVar = () => {
  const [response, setResponse] = useState<FigmaOperationResponse | null>(null);
  const token = useFigmaAuth();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateVariable = async (fileKey: string, variableId: string, newVariableData: any) => {
    const url = `https://api.figma.com/v1/files/${fileKey}/variables/${variableId}`; // Adjust URL as needed

    try {
      const result = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-FIGMA-TOKEN': token,
        },
        body: JSON.stringify(newVariableData),
      });

      if (!result.ok) throw new Error('Failed to update Figma variable');

      const data: FigmaOperationResponse = await result.json();
      setResponse(data);
    } catch (error) {
      setResponse({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  return { response, updateVariable };
};

export default useUpdateFigmaVar;