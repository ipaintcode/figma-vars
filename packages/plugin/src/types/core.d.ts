declare module '@figma-vars/core' {
  export interface Variable {
    id: string;
    name: string;
    value?: any;
    resolvedType?: string;
    valuesByMode?: Record<string, any>;
    [key: string]: any;
  }

  export interface Collection {
    id: string;
    name: string;
    modes?: any[];
    [key: string]: any;
  }

  export type TokenProvider = string | (() => string) | (() => Promise<string>);

  export function envTokenProvider(): string;
  export function legacyEnvTokenProvider(): string;

  export class FigmaClient {
    constructor(tokenProvider?: TokenProvider);
    getFileVariables(fileKey: string): Promise<Variable[]>;
    getFileVariableCollections(fileKey: string): Promise<Collection[]>;
  }
}