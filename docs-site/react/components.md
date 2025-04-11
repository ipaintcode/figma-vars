# React Components

A collection of React components for working with Figma variables.

## FigmaProvider

The main provider component for configuring Figma Variables in your React application.

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

## VariableDisplay

A component for displaying a Figma variable.

```typescript
import { VariableDisplay } from '@figma-vars/react'

function MyComponent() {
  return (
    <VariableDisplay
      fileKey="your-file-key"
      variableName="primary-color"
    />
  )
}
```

## CollectionDisplay

A component for displaying a variable collection.

```typescript
import { CollectionDisplay } from '@figma-vars/react'

function MyComponent() {
  return (
    <CollectionDisplay
      fileKey="your-file-key"
      collectionName="Colors"
    />
  )
}
```

## ErrorBoundary

A component for handling errors in Figma variable operations.

```typescript
import { FigmaErrorBoundary } from '@figma-vars/react'

function MyComponent() {
  return (
    <FigmaErrorBoundary
      fallback={<div>Something went wrong</div>}
    >
      <VariableDisplay
        fileKey="your-file-key"
        variableName="primary-color"
      />
    </FigmaErrorBoundary>
  )
}
```
