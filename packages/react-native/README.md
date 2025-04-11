# @figma-vars/react-native

React Native components and hooks for working with Figma variables.

## Installation

```bash
npm install @figma-vars/react-native @figma-vars/core
# or
yarn add @figma-vars/react-native @figma-vars/core
# or
pnpm add @figma-vars/react-native @figma-vars/core
```

## Usage

### Using the Figma Variables Hook

```tsx
import { useFigmaVariables } from '@figma-vars/react-native';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

function MyComponent() {
  // Secure approach using a backend proxy
  const { variables, loading, error } = useFigmaVariables('your_file_key', {
    tokenProvider: async () => {
      const response = await fetch('https://your-api.com/figma/token');
      const data = await response.json();
      return data.token;
    }
  });

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.error}>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Figma Variables</Text>
      {variables.map((variable) => (
        <Text
          key={variable.name}
          style={[styles.variableText, { color: variable.value }]}
        >
          {variable.name}: {variable.value}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  variableText: {
    fontSize: 16,
    marginBottom: 8,
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});
```

### Using the FigmaVars Context

```tsx
import { FigmaVars } from '@figma-vars/core';
import { FigmaVarsProvider, useFigmaVars } from '@figma-vars/react-native';
import { View, Text, StyleSheet } from 'react-native';

// Component that uses the FigmaVars context
function ColorDisplay() {
  const figmaVars = useFigmaVars();
  const variables = figmaVars.getVariables();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Colors</Text>
      {variables.map((variable) => (
        <Text
          key={variable.name}
          style={[styles.variableText, { color: variable.value }]}
        >
          {variable.name}: {variable.value}
        </Text>
      ))}
    </View>
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
      <View style={styles.app}>
        <Text style={styles.title}>My App</Text>
        <ColorDisplay />
      </View>
    </FigmaVarsProvider>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  variableText: {
    fontSize: 16,
    marginBottom: 8,
  },
});
```

## API Reference

The API is similar to the React package but optimized for React Native.

### Hooks

#### `useFigmaVariables`

```typescript
function useFigmaVariables(
  fileKey: string,
  options?: UseFigmaVariablesOptions
): UseFigmaVariablesResult
```

A React Native hook for fetching Figma variables with security best practices.

#### `useFigmaVars`

```typescript
function useFigmaVars(): FigmaVars
```

A React Native hook for accessing the FigmaVars instance from the context.

### Components

#### `FigmaVarsProvider`

```typescript
function FigmaVarsProvider({
  children,
  figmaVars
}: FigmaVarsProviderProps): JSX.Element
```

A provider component for the FigmaVars context in React Native.

## Security Considerations

Never store API tokens directly in your React Native app. Always use a secure backend service to handle authentication.

## License

MIT
