import React, { useState, useEffect, createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { FigmaClient } from '@figma-vars/core';
import type { Variable } from '@figma-vars/core';

// Local definition of FigmaVars until build issues are resolved
class FigmaVars {
  private variables: Variable[];

  constructor() {
    this.variables = [];
  }

  setVariables(variables: Variable[]): void {
    this.variables = [...variables];
  }

  getVariables(): Variable[] {
    return [...this.variables];
  }
}

/**
 * TokenProvider can be a string, a function returning a string, or a function returning a Promise<string>
 * This flexibility allows for secure token handling strategies
 */
type TokenProvider = string | (() => string) | (() => Promise<string>);

export interface UseFigmaVariablesOptions {
  /**
   * A function that securely retrieves a Figma API token
   * RECOMMENDED: Use a secure backend proxy instead of directly exposing tokens
   */
  tokenProvider?: TokenProvider;
}

export interface UseFigmaVariablesResult {
  variables: Variable[];
  loading: boolean;
  error: Error | null;
}

/**
 * React Native hook for fetching Figma variables with security best practices
 *
 * ⚠️ SECURITY WARNING: Never use client-side environment variables for API tokens.
 * Always use a secure backend proxy for production applications.
 *
 * @example
 * // RECOMMENDED: Using a secure backend proxy
 * const { variables, loading, error } = useFigmaVariables('your_file_key', {
 *   tokenProvider: async () => {
 *     // Call your backend API that securely handles authentication
 *     const response = await fetch('https://your-api.com/figma/token');
 *     const data = await response.json();
 *     return data.token;
 *   }
 * });
 *
 * @param fileKey The Figma file key
 * @param options Configuration options
 * @returns Object containing variables, loading state, and error
 */
export function useFigmaVariables(
  fileKey: string,
  options?: UseFigmaVariablesOptions
): UseFigmaVariablesResult {
  const [variables, setVariables] = useState<Variable[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchVariables = async () => {
      try {
        // Security check for client-side token exposure
        if (
          typeof global !== 'undefined' &&
          (!options?.tokenProvider) &&
          (process.env.FIGMA_API_TOKEN || process.env.REACT_APP_FIGMA_TOKEN)
        ) {
          console.error(
            '⚠️ SECURITY VULNERABILITY DETECTED: You are exposing your Figma API token in client-side code. ' +
            'This is a serious security risk. Use a secure backend proxy instead.'
          );
          setError(new Error(
            'Insecure token configuration detected. See console for details.'
          ));
          setLoading(false);
          return;
        }

        const client = new FigmaClient(options?.tokenProvider);
        const data = await client.getFileVariables(fileKey);
        setVariables(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch Figma variables'));
        setLoading(false);
      }
    };

    fetchVariables();
  }, [fileKey, options?.tokenProvider]);

  return { variables, loading, error };
}

// Export types
export type { Variable } from '@figma-vars/core';

// FigmaVars Context
interface FigmaVarsContextType {
  figmaVars: FigmaVars;
}

const FigmaVarsContext = createContext<FigmaVarsContextType | null>(null);

interface FigmaVarsProviderProps {
  children: ReactNode;
  figmaVars: FigmaVars;
}

export function FigmaVarsProvider({ children, figmaVars }: FigmaVarsProviderProps) {
  return React.createElement(
    FigmaVarsContext.Provider,
    { value: { figmaVars } },
    children
  );
}

export function useFigmaVars() {
  const context = useContext(FigmaVarsContext);
  if (!context) {
    throw new Error('useFigmaVars must be used within a FigmaVarsProvider');
  }
  return context.figmaVars;
}

// Export the FigmaVars class
export { FigmaVars };