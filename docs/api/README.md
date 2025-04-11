# API Reference

Welcome to the @figma-vars API Reference documentation. This section provides detailed information about the classes, methods, and types available in the various packages.

## Core Package

The core package (`@figma-vars/core`) provides the foundation for working with Figma variables.

### FigmaClient

The primary class for interacting with the Figma API.

```typescript
class FigmaClient {
  constructor(tokenProvider?: TokenProvider);

  async getFileVariables(fileKey: string): Promise<Variable[]>;
  async getFileVariableCollections(fileKey: string): Promise<Collection[]>;
}
```

#### TokenProvider

```typescript
type TokenProvider = string | (() => string) | (() => Promise<string>);
```

The TokenProvider type allows for flexible token management:

- String: Direct token value (not recommended for client-side code)
- Function: Synchronous function that returns a token
- Async Function: Asynchronous function that returns a Promise resolving to a token

#### Variable

```typescript
interface Variable {
  id: string;
  name: string;
  key: string;
  resolvedType: string;
  valuesByMode: Record<string, any>;
  remote: boolean;
  description?: string;
  hiddenFromPublishing?: boolean;
  scopes?: string[];
}
```

#### Collection

```typescript
interface Collection {
  id: string;
  name: string;
  key: string;
  modes: Mode[];
  defaultModeId: string;
  remote: boolean;
  hiddenFromPublishing?: boolean;
}
```

## React Package

The React package (`@figma-vars/react`) provides hooks for integrating Figma variables with React applications.

### useFigmaVariables

```typescript
function useFigmaVariables(
  fileKey: string,
  options?: {
    tokenProvider?: TokenProvider;
  }
): {
  variables: Variable[];
  loading: boolean;
  error: Error | null;
}
```

## Plugin Package

The Plugin package (`@figma-vars/plugin`) provides components and utilities for building Figma plugins.

### VariableList

```typescript
interface VariableListProps {
  variables: Variable[];
}

const VariableList: React.FC<VariableListProps>;
```

### VariablesWidget

```typescript
const VariablesWidget: React.FC;
```

### VariablesPlugin

```typescript
const VariablesPlugin: React.FC;
```

## Full Type Definitions

For complete type definitions, please refer to the TypeScript declaration files in each package or view the source code directly on [GitHub](https://github.com/yourusername/figma-vars).
