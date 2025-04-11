# Advanced Usage

This guide covers advanced features and techniques for working with Figma Variables.

## Advanced API Usage

### Batch Operations

```typescript
import { FigmaAPI } from '@figma-vars/core'

const api = new FigmaAPI({
  token: process.env.FIGMA_ACCESS_TOKEN
})

// Get multiple collections at once
const collections = await api.getCollections('your-file-key', {
  collectionIds: ['collection1', 'collection2']
})

// Get variables by collection
const variables = await api.getVariablesByCollection('your-file-key', 'collection-id')
```

### Custom Token Providers

Create custom token providers for different environments:

```typescript
import { TokenProvider } from '@figma-vars/core'

class AWSSecretsManagerProvider implements TokenProvider {
  async getToken(): Promise<string> {
    // Fetch token from AWS Secrets Manager
    const secret = await this.getSecret('figma-token')
    return secret
  }

  private async getSecret(name: string): Promise<string> {
    // AWS Secrets Manager implementation
    return 'your-token'
  }
}

const api = new FigmaAPI({
  tokenProvider: new AWSSecretsManagerProvider()
})
```

## Advanced React Integration

### Custom Hooks

Create custom hooks for specific use cases:

```typescript
import { useFigmaVariables } from '@figma-vars/react'

function useColorVariables(fileKey: string) {
  const { variables, loading, error } = useFigmaVariables({
    fileKey,
    filter: variable => variable.resolvedType === 'COLOR'
  })

  return { colorVariables: variables, loading, error }
}

function MyComponent() {
  const { colorVariables, loading } = useColorVariables('your-file-key')

  if (loading) return <div>Loading colors...</div>

  return (
    <div>
      {colorVariables.map(color => (
        <div key={color.id} style={{ backgroundColor: color.value }}>
          {color.name}
        </div>
      ))}
    </div>
  )
}
```

### Context Providers

Create custom context providers for specific variable types:

```typescript
import { createContext, useContext } from 'react'
import { useFigmaVariables } from '@figma-vars/react'

const ColorContext = createContext<Record<string, string>>({})

export function ColorProvider({ children, fileKey }: { children: React.ReactNode, fileKey: string }) {
  const { variables, loading } = useFigmaVariables({
    fileKey,
    filter: variable => variable.resolvedType === 'COLOR'
  })

  const colorMap = variables.reduce((acc, variable) => {
    acc[variable.name] = variable.value
    return acc
  }, {} as Record<string, string>)

  if (loading) return <div>Loading colors...</div>

  return (
    <ColorContext.Provider value={colorMap}>
      {children}
    </ColorContext.Provider>
  )
}

export function useColors() {
  return useContext(ColorContext)
}
```

## Performance Optimization

### Caching

Implement caching for variables to reduce API calls:

```typescript
import { FigmaAPI } from '@figma-vars/core'

class CachedFigmaAPI extends FigmaAPI {
  private cache: Map<string, any> = new Map()

  async getVariables(fileKey: string) {
    const cacheKey = `variables:${fileKey}`

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)
    }

    const variables = await super.getVariables(fileKey)
    this.cache.set(cacheKey, variables)

    return variables
  }
}
```

### Selective Loading

Load only the variables you need:

```typescript
import { useFigmaVariables } from '@figma-vars/react'

function MyComponent() {
  const { variables } = useFigmaVariables({
    fileKey: 'your-file-key',
    filter: variable => variable.collectionId === 'colors'
  })

  return (
    <div>
      {variables.map(variable => (
        <div key={variable.id}>{variable.name}</div>
      ))}
    </div>
  )
}
```

## Next Steps

- Learn about [security best practices](/guide/security)
- Explore the [React integration](/react/)
- Check out the [API reference](/api/)
