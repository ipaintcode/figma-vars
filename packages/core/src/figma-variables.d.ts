import { Variable, VariableCollection } from '@figma/plugin-typings';

declare module '@figma/plugin-typings' {
  export interface PluginAPI {
    variables: {
      getVariableById(id: string): Variable | null;
      getVariableCollections(): VariableCollection[];
      getLocalVariables(): Variable[];
      getLocalVariableCollections(): VariableCollection[];
    };
  }
}

export {};