// constants/index.ts

// Base URL for Figma API
export const FIGMA_API_BASE_URL = 'https://api.figma.com';

// Specific API endpoints
export const FIGMA_FILES_ENDPOINT = `${FIGMA_API_BASE_URL}/v1/files`;
export const FIGMA_VARIABLES_ENDPOINT = (fileKey: string) => `${FIGMA_FILES_ENDPOINT}/${fileKey}/variables`;
export const FIGMA_COLLECTIONS_ENDPOINT = (fileKey: string) => `${FIGMA_FILES_ENDPOINT}/${fileKey}/collections`;

// Possible actions for variable manipulation
export const CREATE_VARIABLE_ACTION = 'CREATE';
export const UPDATE_VARIABLE_ACTION = 'UPDATE';
export const DELETE_VARIABLE_ACTION = 'DELETE';

// Other constants as needed
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

// Define more constants as needed for error messages, specific API parameters, etc.
export const DEFAULT_ERROR_MESSAGE = 'An error occurred while communicating with the Figma API.';
