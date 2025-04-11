# React Hooks Guide

The `@figma-vars/react` package provides React hooks for integrating Figma variables into your React applications with minimal effort.

## Available Hooks

### `useFigmaVariables`

The primary hook for fetching Figma variables from a file.

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

## Basic Usage

```jsx
import { useFigmaVariables } from '@figma-vars/react';

function DesignSystem() {
  const { variables, loading, error } = useFigmaVariables(
    'YOUR_FIGMA_FILE_KEY',
    {
      tokenProvider: async () => {
        const response = await fetch('/api/figma-token');
        const data = await response.json();
        return data.token;
      }
    }
  );

  if (loading) return <div>Loading variables...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Design System Variables</h1>
      <div className="variables-grid">
        {variables.map(variable => (
          <VariableCard key={variable.id} variable={variable} />
        ))}
      </div>
    </div>
  );
}
```

## Security Considerations

### Client-Side Security Warning

The `useFigmaVariables` hook includes built-in security checks to prevent common token exposure mistakes:

```jsx
// This will trigger a security warning in the console
// and reject the request with an error
const { variables } = useFigmaVariables('YOUR_FILE_KEY');
```

### Secure Implementation with Backend

For production applications, always implement a backend proxy:

```jsx
// Component.jsx
import { useFigmaVariables } from '@figma-vars/react';

function DesignSystem() {
  // No token provider needed, API calls go through your backend
  const { variables } = useFigmaVariables('YOUR_FILE_KEY');

  // Rest of your component...
}

// api/figma-variables.js (e.g., Next.js API route)
import { FigmaClient } from '@figma-vars/core';

export default async function handler(req, res) {
  const fileKey = req.query.fileKey;
  const client = new FigmaClient(); // Uses FIGMA_API_TOKEN from environment

  try {
    const variables = await client.getFileVariables(fileKey);
    res.json(variables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

## Advanced Usage

### Filtering Variables by Type

```jsx
import { useFigmaVariables } from '@figma-vars/react';
import { useState } from 'react';

function ColorSystem() {
  const [filter, setFilter] = useState('COLOR');
  const { variables, loading } = useFigmaVariables('YOUR_FILE_KEY', {
    tokenProvider: async () => getSecureToken()
  });

  const filteredVariables = variables.filter(v => v.resolvedType === filter);

  return (
    <div>
      <select value={filter} onChange={e => setFilter(e.target.value)}>
        <option value="COLOR">Colors</option>
        <option value="FLOAT">Numbers</option>
        <option value="STRING">Text</option>
      </select>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="variable-grid">
          {filteredVariables.map(variable => (
            <div key={variable.id} className="variable-card">
              {variable.resolvedType === 'COLOR' && (
                <div
                  className="color-preview"
                  style={{ backgroundColor: rgbaToHex(variable.value) }}
                />
              )}
              <h3>{variable.name}</h3>
              <code>{JSON.stringify(variable.value)}</code>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Helper function to convert Figma RGBA to CSS hex
function rgbaToHex(rgba) {
  if (!rgba) return '#000000';
  const { r, g, b } = rgba;
  return `#${Math.round(r * 255).toString(16).padStart(2, '0')}${
    Math.round(g * 255).toString(16).padStart(2, '0')}${
    Math.round(b * 255).toString(16).padStart(2, '0')}`;
}
```

### Using with CSS Variables

```jsx
import { useFigmaVariables } from '@figma-vars/react';
import { useEffect } from 'react';

function CSSVariablesInjector() {
  const { variables, loading } = useFigmaVariables('YOUR_FILE_KEY', {
    tokenProvider: async () => getSecureToken()
  });

  // Inject variables as CSS custom properties
  useEffect(() => {
    if (loading || !variables) return;

    const root = document.documentElement;

    // Reset existing variables
    root.removeAttribute('style');

    // Add new variables
    variables.forEach(variable => {
      if (variable.resolvedType === 'COLOR') {
        const { r, g, b, a = 1 } = variable.value || {};
        if (r !== undefined) {
          root.style.setProperty(
            `--${variable.name.replace(/\s+/g, '-').toLowerCase()}`,
            `rgba(${r * 255}, ${g * 255}, ${b * 255}, ${a})`
          );
        }
      } else if (typeof variable.value === 'string' || typeof variable.value === 'number') {
        root.style.setProperty(
          `--${variable.name.replace(/\s+/g, '-').toLowerCase()}`,
          variable.value
        );
      }
    });
  }, [variables, loading]);

  return (
    <div className="css-variables-status">
      {loading ? 'Loading CSS variables...' : 'CSS variables loaded!'}
    </div>
  );
}
```

## Error Handling

The hook provides detailed error information:

```jsx
const { variables, loading, error } = useFigmaVariables('YOUR_FILE_KEY');

if (error) {
  if (error.message.includes('authentication')) {
    return <div>Authentication error. Please check your API token.</div>;
  } else if (error.message.includes('not found')) {
    return <div>File not found. Please check your file key.</div>;
  } else {
    return <div>An unexpected error occurred: {error.message}</div>;
  }
}
```

## Performance Considerations

For optimal performance:

1. **Cache results**: Implement caching to reduce API calls
2. **Use a backend proxy**: This reduces client-side processing
3. **Only fetch what you need**: Consider having backend endpoints that return filtered data

```jsx
// Optimized usage with caching
import { useFigmaVariables } from '@figma-vars/react';
import { useState, useEffect } from 'react';

function useLocalStorageCache(key, ttl = 3600000) {
  const getItem = () => {
    const item = localStorage.getItem(key);
    if (!item) return null;

    const { timestamp, data } = JSON.parse(item);
    if (Date.now() - timestamp > ttl) {
      localStorage.removeItem(key);
      return null;
    }

    return data;
  };

  const setItem = (data) => {
    localStorage.setItem(key, JSON.stringify({
      timestamp: Date.now(),
      data
    }));
  };

  return [getItem, setItem];
}

function OptimizedDesignSystem() {
  const [cachedVars, setCachedVars] = useLocalStorageCache('figma-vars', 60 * 60 * 1000); // 1 hour TTL
  const [variables, setVariables] = useState(cachedVars() || []);
  const [loading, setLoading] = useState(!cachedVars());
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cachedVars()) return;

    const fetchVars = async () => {
      try {
        const response = await fetch('/api/figma-variables');
        const data = await response.json();
        setVariables(data);
        setCachedVars(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchVars();
  }, []);

  // Rest of component...
}
```

## Learn More

For more information on Figma variables and how to use them in your design system, check out:

- [Figma Variables API Documentation](https://www.figma.com/developers/api#variables)
- [Security Best Practices](./security.md)
- [API Reference](../api/README.md)
