# React Integration

## Installation

```bash
npm install @figma-vars/react
# or
yarn add @figma-vars/react
# or
pnpm add @figma-vars/react
```

## Hooks

### useFigmaVariables

The main hook for accessing Figma variables in your React components.

```typescript
import { useFigmaVariables } from '@figma-vars/react'

function MyComponent() {
  const { variables, loading, error } = useFigmaVariables({
    fileKey: 'your-file-key'
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      {variables.map(variable => (
        <div key={variable.id}>
          {variable.name}: {variable.value}
        </div>
      ))}
    </div>
  )
}
```

### useFigmaVariable

Access a single variable by name or ID.

```typescript
import { useFigmaVariable } from '@figma-vars/react'

function MyComponent() {
  const { variable, loading, error } = useFigmaVariable({
    fileKey: 'your-file-key',
    variableName: 'primary-color'
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div style={{ color: variable.value }}>
      This text uses the primary color
    </div>
  )
}
```

### useFigmaCollections

Access variable collections.

```typescript
import { useFigmaCollections } from '@figma-vars/react'

function MyComponent() {
  const { collections, loading, error } = useFigmaCollections({
    fileKey: 'your-file-key'
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      {collections.map(collection => (
        <div key={collection.id}>
          <h3>{collection.name}</h3>
          <ul>
            {collection.variables.map(variable => (
              <li key={variable.id}>{variable.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
```

## Provider Setup

Wrap your app with the FigmaProvider for global configuration:

```typescript
import { FigmaProvider } from '@figma-vars/react'

function App() {
  return (
    <FigmaProvider
      fileKey="your-file-key"
      token={process.env.FIGMA_ACCESS_TOKEN}
    >
      <YourApp />
    </FigmaProvider>
  )
}
```

## Error Handling

All hooks provide error handling through the `error` property:

```typescript
function MyComponent() {
  const { error } = useFigmaVariables({
    fileKey: 'your-file-key'
  })

  if (error) {
    switch (error.code) {
      case 'TOKEN_ERROR':
        return <div>Authentication error. Please check your token.</div>
      case 'FILE_NOT_FOUND':
        return <div>Figma file not found. Please check your file key.</div>
      default:
        return <div>An error occurred: {error.message}</div>
    }
  }

  return <div>Your content here</div>
}
```

## Loading States

Handle loading states appropriately:

```typescript
function MyComponent() {
  const { loading } = useFigmaVariables({
    fileKey: 'your-file-key'
  })

  if (loading) {
    return (
      <div className="loading-spinner">
        Loading variables...
      </div>
    )
  }

  return <div>Your content here</div>
}
```

## Next Steps

- Learn about [security best practices](/guide/security)
- Explore [advanced usage](/guide/advanced)
- Check out the [API reference](/api/)
