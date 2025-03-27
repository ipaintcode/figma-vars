// utils/fetchHelpers.ts
import { FIGMA_API_BASE_URL } from '../constants';
import { getFigmaToken } from './authHelpers';

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: BodyInit | null;
  headers?: HeadersInit;
}

/**
 * A helper function for making authenticated fetch requests to the Figma API.
 */
export const fetchWithAuth = async (endpoint: string, options: FetchOptions = { method: 'GET' }) => {
  const token = getFigmaToken();
  if (!token) {
    throw new Error('Figma API token is not available.');
  }

  const response = await fetch(`${FIGMA_API_BASE_URL}/${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      'X-FIGMA-TOKEN': token,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    // You could enhance error handling by parsing response to get more details
    throw new Error('Failed to fetch data from the Figma API.');
  }

  return response.json(); // Assuming all responses are JSON. Adjust as needed.
};
