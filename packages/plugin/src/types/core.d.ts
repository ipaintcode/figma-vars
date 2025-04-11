declare module '@figma-vars/core' {
  export interface Variable {
    name: string;
    value: string | number | boolean | object;
  }

  export type TokenProvider = string | (() => string) | (() => Promise<string>);

  export class FigmaClient {
    constructor(tokenProvider?: TokenProvider);
    getFileVariables(fileKey: string): Promise<Variable[]>;
  }

  export class FigmaVars {
    constructor();
    setVariables(variables: Variable[]): void;
    getVariables(): Variable[];
  }
}