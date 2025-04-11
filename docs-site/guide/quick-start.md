# Quick Start

This guide will help you get up and running with Figma Variables quickly.

## Prerequisites

- Node.js 18 or later
- A Figma account
- A Figma access token
- A Figma file with variables

## Step 1: Install the Package

```bash
pnpm add @figma-vars/core @figma-vars/react
```

## Step 2: Set Up Environment Variables

Create a `.env` file in your project root:

```bash
FIGMA_ACCESS_TOKEN=your_access_token_here
FIGMA_FILE_KEY=your_file_key_here
```

## Step 3: Create a Simple React Component

```typescript
import { FigmaProvider, useFigmaVariables } from '@figma-vars/react'

function App() {
  return (
    <FigmaProvider
      fileKey={process.env.FIGMA_FILE_KEY}
      token={process.env.FIGMA_ACCESS_TOKEN}
    >
      <VariableDisplay />
    </FigmaProvider>
  )
}

function VariableDisplay() {
  const { variables, loading, error } = useFigmaVariables({
    fileKey: process.env.FIGMA_FILE_KEY
  })

  if (loading) return <div>Loading variables...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h1>Figma Variables</h1>
      <ul>
        {variables.map(variable => (
          <li key={variable.id}>
            <strong>{variable.name}:</strong> {variable.value}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
```

## Step 4: Run Your Application

```bash
pnpm run dev
```

Visit `http://localhost:5173` to see your variables displayed.

## Next Steps

- Learn about [security best practices](/guide/security)
- Explore the [React integration](/react/)
- Check out the [API reference](/api/)
