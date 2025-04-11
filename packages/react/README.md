# @figma-vars/react

React components and hooks for working with Figma variables.

## Installation

```bash
npm install @figma-vars/react @figma-vars/core
# or
yarn add @figma-vars/react @figma-vars/core
# or
pnpm add @figma-vars/react @figma-vars/core
```

## Usage

### Using the Figma Variables Hook

```tsx
import { useFigmaVariables } from '@figma-vars/react';

function MyComponent() {
  // Secure approach using a backend proxy
  const { variables, loading, error } = useFigmaVariables('your_file_key', {
    tokenProvider: async () => {
      const response = await fetch('/api/figma/token');
      const data = await response.json();
      return data.token;
    }
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Figma Variables</h2>
      <ul>
        {variables.map((variable) => (
          <li key={variable.name} style={{ color: variable.value }}>
            {variable.name}: {variable.value}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Using the FigmaVars Context

```tsx
import { FigmaVars } from '@figma-vars/core';
import { FigmaVarsProvider, useFigmaVars } from '@figma-vars/react';

// Component that uses the FigmaVars context
function ColorDisplay() {
  const figmaVars = useFigmaVars();
  const variables = figmaVars.getVariables();

  return (
    <div>
      <h2>My Colors</h2>
      <ul>
        {variables.map((variable) => (
          <li key={variable.name} style={{ color: variable.value }}>
            {variable.name}: {variable.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

// App with the provider
function App() {
  // Create and configure FigmaVars instance
  const figmaVars = new FigmaVars();
  figmaVars.setVariables([
    { name: 'Primary Color', value: '#1E88E5' },
    { name: 'Secondary Color', value: '#FF4081' }
  ]);

  return (
    <FigmaVarsProvider figmaVars={figmaVars}>
      <h1>My App</h1>
      <ColorDisplay />
    </FigmaVarsProvider>
  );
}
```

## API Reference

### Hooks

#### `useFigmaVariables`

```typescript
function useFigmaVariables(
  fileKey: string,
  options?: UseFigmaVariablesOptions
): UseFigmaVariablesResult
```

A React hook for fetching Figma variables with security best practices.

- `fileKey`: The Figma file key to fetch variables from.
- `options`: (Optional) Configuration options:
  - `tokenProvider`: A function that securely retrieves a Figma API token.
- Returns an object with:
  - `variables`: Array of Variable objects.
  - `loading`: Boolean indicating if the variables are being loaded.
  - `error`: Error object if an error occurred, null otherwise.

#### `useFigmaVars`

```typescript
function useFigmaVars(): FigmaVars
```

A React hook for accessing the FigmaVars instance from the context.

- Returns: The FigmaVars instance from the context.
- Throws an error if used outside of a FigmaVarsProvider.

### Components

#### `FigmaVarsProvider`

```typescript
function FigmaVarsProvider({
  children,
  figmaVars
}: FigmaVarsProviderProps): JSX.Element
```

A provider component for the FigmaVars context.

- `children`: ReactNode to render within the provider.
- `figmaVars`: FigmaVars instance to provide to the context.

### Types

#### `UseFigmaVariablesOptions`

```typescript
interface UseFigmaVariablesOptions {
  tokenProvider?: TokenProvider;
}
```

#### `UseFigmaVariablesResult`

```typescript
interface UseFigmaVariablesResult {
  variables: Variable[];
  loading: boolean;
  error: Error | null;
}
```

#### `FigmaVarsProviderProps`

```typescript
interface FigmaVarsProviderProps {
  children: ReactNode;
  figmaVars: FigmaVars;
}
```

## Security Considerations

Never use client-side environment variables for API tokens. Always use a secure backend proxy for production applications.

```tsx
// RECOMMENDED: Using a secure backend proxy
const { variables } = useFigmaVariables('your_file_key', {
  tokenProvider: async () => {
    // Call your backend API that securely handles authentication
    const response = await fetch('/api/figma/token');
    const data = await response.json();
    return data.token;
  }
});
```

## License

MIT
