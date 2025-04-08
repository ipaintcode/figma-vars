// Color types
export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface RGBA extends RGB {
  a: number;
}

// Variable types
export type VariableType = 'BOOLEAN' | 'FLOAT' | 'STRING' | 'COLOR';
export type VariableValue = boolean | number | string | RGB | RGBA;

// Variable collection types
export interface Mode {
  modeId: string;
  name: string;
}

export interface Collection {
  id: string;
  name: string;
  modes: Mode[];
  defaultModeId: string;
  remote: boolean;
}

export interface Variable {
  id: string;
  name: string;
  key: string;
  variableCollectionId: string;
  resolvedType: VariableType;
  valuesByMode: Record<string, VariableValue>;
  remote: boolean;
  description?: string;
  hiddenFromPublishing?: boolean;
  scopes?: string[];
}

// Plugin message types
export interface PluginMessage<T = any> {
  type: string;
  payload?: T;
}

export type PluginMessageHandler<T = any> = (message: PluginMessage<T>) => void | Promise<void>;

// Figma plugin types
declare global {
  interface Window {
    figma?: {
      ui: {
        onmessage: (handler: PluginMessageHandler) => void;
        postMessage: (message: any) => void;
      };
    };
  }
}