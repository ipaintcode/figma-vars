import { Variable } from './FigmaVars';

/**
 * TokenProvider can be a string, a function returning a string, or a function returning a Promise<string>
 */
export type TokenProvider = string | (() => string) | (() => Promise<string>);

/**
 * Client for interacting with the Figma API to fetch variables
 */
export class FigmaClient {
  private tokenProvider: TokenProvider | undefined;

  /**
   * Creates a new FigmaClient
   * @param tokenProvider A token or function that returns a token
   */
  constructor(tokenProvider?: TokenProvider) {
    this.tokenProvider = tokenProvider;
  }

  /**
   * Get the token from the provider
   * @returns The Figma API token
   */
  private async getToken(): Promise<string> {
    if (!this.tokenProvider) {
      // Try to get from environment variables
      const token = process.env.FIGMA_API_TOKEN || process.env.FIGMA_TOKEN;
      if (!token) {
        throw new Error('No Figma API token provided. Please provide a token or set the FIGMA_API_TOKEN environment variable.');
      }
      return token;
    }

    if (typeof this.tokenProvider === 'string') {
      return this.tokenProvider;
    }

    return await this.tokenProvider();
  }

  /**
   * Get variables from a Figma file
   * @param fileKey The Figma file key
   * @returns An array of variables
   */
  async getFileVariables(fileKey: string): Promise<Variable[]> {
    const token = await this.getToken();

    // In a real implementation, this would make an API call to Figma
    // For now, we'll return mock data
    console.log(`Fetching variables for file ${fileKey} with token ${token.substring(0, 4)}...`);

    // Mock implementation - would be replaced with actual API call
    return [
      { name: 'Primary Color', value: '#1E88E5' },
      { name: 'Secondary Color', value: '#FF4081' },
      { name: 'Background Color', value: '#FFFFFF' },
      { name: 'Text Color', value: '#212121' }
    ];
  }
}