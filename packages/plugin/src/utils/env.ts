// Type definitions for Node.js process in environments that might not have it
declare const process: {
  env: {
    [key: string]: string | undefined;
  };
} | undefined;

/**
 * Safely access environment variables in any environment (browser or Node.js)
 * @param key The environment variable key to access
 * @param defaultValue Optional default value if the environment variable is not found
 * @returns The environment variable value or the default value
 */
export const getEnvVar = (key: string, defaultValue: string = ''): string => {
  // Check if running in a Node.js environment
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key] as string;
  }

  // For browser environments or if the variable is not defined
  return defaultValue;
};