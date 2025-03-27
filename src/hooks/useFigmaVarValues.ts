// useFigmaVarValues.ts
import { useState } from 'react';
import useFigmaAuth from './useFigmaAuth';
import { FigmaOperationResponse } from './types';
import { SpecificType } from './types';

// Example function to update a variable's value across modes. Adjust as per your API's capabilities.
const useFigmaVarValues = () => {
  const [response, setResponse] = useState<FigmaOperationResponse | null>(null);
  const token = useFigmaAuth();

  const updateVarValues = async (variableId: string, values: SpecificType) => {
    const url = `https://api.figma.com/v1/variables/${variableId}/values`; // Adjust the URL as needed

    try {
      const result = await fetch(url, {
        method: 'PUT',
        headers: {
          'X-FIGMA-TOKEN': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!result.ok) throw new Error('Failed to update variable values');

      // const data = await result.json();
      setResponse({ success: true, message: 'Variable values updated successfully' }); // Adjust based on actual API response
    } catch (error) {
      setResponse({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  return { response, updateVarValues };
};

export default useFigmaVarValues;
