import type { Variable, Collection } from './types.js';

/**
 * TokenProvider can be a string, a function returning a string, or a function returning a Promise<string>
 * This flexibility allows for secure token handling strategies:
 * 1. Environment variables (process.env.FIGMA_API_TOKEN) - server-side only
 * 2. Dynamic token retrieval from secure storage
 * 3. Token rotation strategies
 * 4. Fetching tokens from a secure backend
 *
 * ⚠️ SECURITY WARNING: Never expose Figma API tokens in client-side code.
 * Always use a backend proxy service for client-side applications.
 */
export type TokenProvider = string | (() => string) | (() => Promise<string>);

/**
 * Default environment variable token provider that safely accesses process.env
 * @returns The token from environment variables
 *
 * ⚠️ SECURITY WARNING: This provider is only secure in server-side environments.
 * Do not use with client-side environment variables (like VITE_ or REACT_APP_ prefixed vars).
 */
export function envTokenProvider(): string {
  // Only use server-side environment variables
  const token = process.env.FIGMA_API_TOKEN;

  if (!token) {
    throw new Error(
      'No Figma API token found in environment variables. ' +
      'Please set FIGMA_API_TOKEN in your environment or .env file. ' +
      'For client-side applications, use a secure backend proxy instead. ' +
      'See the documentation for more details on secure token handling.'
    );
  }

  return token;
}

/**
 * Legacy environment variable token provider that includes client-side environment variables
 * @deprecated This provider may expose tokens in client-side code. Use envTokenProvider or a secure backend proxy instead.
 * @returns The token from environment variables
 */
export function legacyEnvTokenProvider(): string {
  // Try different environment variable patterns in order of preference
  const token = process.env.FIGMA_API_TOKEN ||
                process.env.VITE_FIGMA_TOKEN ||
                process.env.REACT_APP_FIGMA_TOKEN; // Fallback for legacy CRA projects

  if (!token) {
    throw new Error(
      'No Figma API token found in environment variables. ' +
      'Please set FIGMA_API_TOKEN in your environment or .env file. ' +
      'For client-side applications, use a secure backend proxy instead. ' +
      'See the documentation for more details on secure token handling.'
    );
  }

  if (typeof window !== 'undefined' &&
      (process.env.VITE_FIGMA_TOKEN || process.env.REACT_APP_FIGMA_TOKEN)) {
    console.warn(
      '⚠️ SECURITY WARNING: Using VITE_FIGMA_TOKEN or REACT_APP_FIGMA_TOKEN in a browser environment ' +
      'will expose your Figma API token to the public. ' +
      'For production applications, use a secure backend proxy instead.'
    );
  }

  return token;
}

export class FigmaClient {
  private tokenProvider: TokenProvider;

  /**
   * Create a new FigmaClient
   * @param tokenProvider A token string or function that returns a token
   * @example
   * // Using environment variables (recommended for server-side only)
   * const client = new FigmaClient(); // Uses envTokenProvider by default
   *
   * // Using a secure backend service (recommended for client-side)
   * const client = new FigmaClient(async () => {
   *   const response = await fetch('/api/get-figma-token');
   *   const data = await response.json();
   *   return data.token;
   * });
   */
  constructor(tokenProvider: TokenProvider = envTokenProvider) {
    this.tokenProvider = tokenProvider;

    // Security check for client-side environment
    if (typeof window !== 'undefined' && typeof this.tokenProvider === 'string') {
      console.warn(
        '⚠️ SECURITY WARNING: Using a string token in a browser environment ' +
        'will expose your Figma API token to the public. ' +
        'For production applications, use a secure backend proxy instead.'
      );
    }
  }

  /**
   * Resolves the token from the provider
   * @returns A Promise that resolves to the Figma API token
   * @private
   */
  private async getToken(): Promise<string> {
    if (typeof this.tokenProvider === 'string') {
      return this.tokenProvider;
    } else {
      const token = await this.tokenProvider();
      return token;
    }
  }

  /**
   * Get variables from a Figma file
   * @param fileKey The Figma file key
   * @returns A Promise that resolves to an array of Variable objects
   */
  async getFileVariables(fileKey: string): Promise<Variable[]> {
    const token = await this.getToken();
    const response = await fetch(`https://api.figma.com/v1/files/${fileKey}/variables`, {
      headers: {
        'X-Figma-Token': token,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch variables: ${response.statusText}`);
    }

    const data = await response.json();
    return data.meta.variables;
  }

  /**
   * Get variable collections from a Figma file
   * @param fileKey The Figma file key
   * @returns A Promise that resolves to an array of Collection objects
   */
  async getFileVariableCollections(fileKey: string): Promise<Collection[]> {
    const token = await this.getToken();
    const response = await fetch(`https://api.figma.com/v1/files/${fileKey}/variable-collections`, {
      headers: {
        'X-Figma-Token': token,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch variable collections: ${response.statusText}`);
    }

    const data = await response.json();
    return data.meta.collections;
  }
}