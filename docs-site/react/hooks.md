# React Hooks

A collection of React hooks for working with Figma variables.

## useFigmaVariables

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

## useFigmaVariable

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

## useFigmaCollections

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
