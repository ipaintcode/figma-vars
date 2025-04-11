/**
 * Helper function to get environment variables
 * In a real plugin, this would interact with Figma's storage or settings
 * @param {string} name - The environment variable name
 * @returns {string} The value of the environment variable
 */
export function getEnvVar(name) {
  // In a real plugin, we would use figma.clientStorage or similar to get stored values
  // This is a simplified placeholder implementation
  const defaultValues = {
    FIGMA_ACCESS_TOKEN: 'sample-token',
  };

  return defaultValues[name] || '';
}