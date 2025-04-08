import type { Variable, Collection } from './types.js';

export class FigmaClient {
  private readonly token: string;

  constructor(token: string) {
    this.token = token;
  }

  /**
   * Get variables from a Figma file
   */
  async getFileVariables(fileKey: string): Promise<Variable[]> {
    const response = await fetch(`https://api.figma.com/v1/files/${fileKey}/variables`, {
      headers: {
        'X-Figma-Token': this.token,
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
   */
  async getFileVariableCollections(fileKey: string): Promise<Collection[]> {
    const response = await fetch(`https://api.figma.com/v1/files/${fileKey}/variable-collections`, {
      headers: {
        'X-Figma-Token': this.token,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch variable collections: ${response.statusText}`);
    }

    const data = await response.json();
    return data.meta.collections;
  }
}