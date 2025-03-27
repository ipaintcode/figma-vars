// types.ts
export interface FigmaVariable {
  type: string;
  id: string;
  name: string;
  value?: string; // Assume value is optional; adjust based on the actual API.
  // Include other properties as per the Figma API response.
}

export interface VariablesResponse {
  meta: {
    variables: FigmaVariable[];
  };
}

export interface FigmaOperationResponse {
  success: boolean;
  message?: string; // Optional message from the API
}

export interface FigmaCollection {
  id: string;
  name: string;
  variables: FigmaVariable[];
}

export interface HookState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export interface FigmaOperationResponse {
  success: boolean;
  message?: string;
}

export interface FigmaError {
  statusCode: number;
  message: string;
}

export interface SyncStatus {
  isSyncing: boolean;
  lastSynced: Date | null;
  error: string | null;
}

export interface VariableValueUpdate {
  modeId: string;
  value: string; // or any, if the value can be more complex than just a string
}

export type SpecificType = VariableValueUpdate[];