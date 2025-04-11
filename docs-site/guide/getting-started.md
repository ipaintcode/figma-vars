# Getting Started

Welcome to Figma Variables! This guide will help you get started with using Figma Variables in your projects.

## Installation

Install the package using your preferred package manager:

```bash
# Using npm
npm install @figma-vars/core @figma-vars/react

# Using yarn
yarn add @figma-vars/core @figma-vars/react

# Using pnpm
pnpm add @figma-vars/core @figma-vars/react
```

## Basic Usage

### Core API

```typescript
import { FigmaAPI } from '@figma-vars/core'

const api = new FigmaAPI({
  token: process.env.FIGMA_ACCESS_TOKEN
})

// Get variables from a file
const variables = await api.getVariables('your-file-key')
```

### React Integration

```typescript
import { FigmaProvider, useFigmaVariables } from '@figma-vars/react'

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

function YourApp() {
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

## Next Steps

- Learn about [security best practices](/guide/security)
- Explore the [React integration](/react/)
- Check out the [API reference](/api/)
