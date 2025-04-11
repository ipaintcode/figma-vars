# @figma-vars/core

Core functionality for working with Figma variables in JavaScript/TypeScript applications.

## Installation

```bash
npm install @figma-vars/core
# or
yarn add @figma-vars/core
# or
pnpm add @figma-vars/core
```

## Usage

### Fetching Variables from Figma

```typescript
import { FigmaClient } from '@figma-vars/core';

// Simple usage with environment variable
const client = new FigmaClient();
const variables = await client.getFileVariables('your_file_key');

// With explicit token
const client = new FigmaClient('your_figma_token');
const variables = await client.getFileVariables('your_file_key');

// With secure token provider function
const client = new FigmaClient(async () => {
  // Get token from a secure source
  const response = await fetch('/api/figma/token');
  const data = await response.json();
  return data.token;
});
const variables = await client.getFileVariables('your_file_key');
```

### Managing Variables Locally

```typescript
import { FigmaVars, Variable } from '@figma-vars/core';

// Create a new instance
const figmaVars = new FigmaVars();

// Set variables
const myVariables: Variable[] = [
  { name: 'Primary Color', value: '#1E88E5' },
  { name: 'Secondary Color', value: '#FF4081' }
];
figmaVars.setVariables(myVariables);

// Get variables
const variables = figmaVars.getVariables();
```

## API Reference

### `FigmaClient`

Client for interacting with the Figma API to fetch variables.

#### Constructor

```typescript
constructor(tokenProvider?: TokenProvider)
```

- `tokenProvider`: (Optional) A string token, a function that returns a token, or a function that returns a Promise with a token. If not provided, the client will try to use the `FIGMA_API_TOKEN` or `FIGMA_TOKEN` environment variables.

#### Methods

##### `getFileVariables`

```typescript
async getFileVariables(fileKey: string): Promise<Variable[]>
```

- `fileKey`: The Figma file key to fetch variables from.
- Returns: A promise that resolves to an array of Variable objects.

### `FigmaVars`

Class for managing Figma variables locally.

#### Constructor

```typescript
constructor()
```

Creates a new instance with an empty variables array.

#### Methods

##### `setVariables`

```typescript
setVariables(variables: Variable[]): void
```

- `variables`: Array of Variable objects to set.

##### `getVariables`

```typescript
getVariables(): Variable[]
```

- Returns: A copy of the current variables array.

### Types

#### `Variable`

```typescript
interface Variable {
  name: string;
  value: string;
}
```

#### `TokenProvider`

```typescript
type TokenProvider = string | (() => string) | (() => Promise<string>);
```

## Security Considerations

Never hardcode Figma tokens in client-side code. Use environment variables on the server side or a secure token provider function that calls a backend endpoint.

## License

MIT
