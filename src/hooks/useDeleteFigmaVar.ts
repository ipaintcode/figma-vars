// useDeleteFigmaVar.ts
import { useState } from 'react';
import useFigmaAuth from './useFigmaAuth';
import { FigmaOperationResponse } from './types';

const useDeleteFigmaVar = () => {
  const [response, setResponse] = useState<FigmaOperationResponse | null>(null);
  const token = useFigmaAuth();

  const deleteVariable = async (fileKey: string, variableId: string) => {
    const url = `https://api.figma.com/v1/files/${fileKey}/variables/${variableId}`; // Adjust URL as needed

    try {
      const result = await fetch(url, {
        method: 'DELETE',
        headers: {
          'X-FIGMA-TOKEN': token,
        },
      });

      if (!result.ok) throw new Error('Failed to delete Figma variable');

      const data: FigmaOperationResponse = await result.json();
      setResponse(data);
    } catch (error) {
      setResponse({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  return { response, deleteVariable };
};

export default useDeleteFigmaVar;
