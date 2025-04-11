# Core API

The core API provides the fundamental functionality for working with Figma variables.

## Basic Usage

```typescript
import { FigmaAPI } from '@figma-vars/core'

const api = new FigmaAPI({
  token: process.env.FIGMA_ACCESS_TOKEN
})

// Get variables from a file
const variables = await api.getVariables('your-file-key')
```

## Methods

### getVariables

Retrieves all variables from a Figma file.

```typescript
const variables = await api.getVariables(fileKey: string)
```

### getCollections

Retrieves all variable collections from a Figma file.

```typescript
const collections = await api.getCollections(fileKey: string)
```

### getVariableById

Retrieves a specific variable by ID.

```typescript
const variable = await api.getVariableById(fileKey: string, variableId: string)
```
