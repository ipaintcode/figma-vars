# Figma Variables Package

A modern, modular library for working with Figma variables.

## Features

- 🚀 Modern ESM modules with TypeScript support
- 📦 Monorepo structure for clean separation of concerns
- 🔄 Full TypeScript declarations for type safety
- 🌳 Tree-shakable exports for smaller bundle sizes
- 🧩 Modular packages for different environments (Core, React, React Native)

## Packages

This repository is a monorepo that contains the following packages:

- `@figma-vars/core` - Core functionality for working with Figma variables
- `@figma-vars/plugin` - Figma plugin integration components
- `@figma-vars/react` - React components and hooks for Figma variables
- `@figma-vars/react-native` - React Native components for Figma variables

## Requirements

- Node.js 16+
- pnpm 7+

## Installation

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build
```

## Development

```bash
# Watch for changes and rebuild
pnpm dev

# Run type checking
pnpm typecheck

# Clean build artifacts
pnpm clean
```

## Usage

### Core Package

```js
import { FigmaClient, findVariableById } from '@figma-vars/core';

// Create a client
const client = new FigmaClient('your-figma-token');

// Get variables from a file
const variables = await client.getFileVariables('file-key');

// Find a specific variable
const variable = findVariableById(variables, 'variable-id');
```

### React Package

```jsx
import { useFigmaVariables } from '@figma-vars/react';

function App() {
  const { variables, loading, error } = useFigmaVariables('file-key', 'your-figma-token');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {variables.map(variable => (
        <div key={variable.id}>{variable.name}</div>
      ))}
    </div>
  );
}
```

## License

MIT

## Getting Started with FigmaVars

Welcome to FigmaVars, a React hooks library designed to simplify the integration of Figma variables into your React applications.

[FigmaVars dot com](https://figmavars.com)

## Setup

Before using the hooks, you need to configure your Figma API token. You can store your token securely and make it available in your application, preferably through environment variables.

Create a `.env` file in the root of your project and add:

```env
REACT_APP_FIGMA_TOKEN=your_figma_api_token_here
```

Please ensure you have .env in your .gitignore file to secure your token.

## Basic Usage

Here's a simple example of how to use the useFigmaVars hook to fetch variables from a Figma file:

```tsx
import React, { useEffect } from 'react';
import { useFigmaVars } from 'figma-vars-hooks';

// Define a type for the variable object
interface FigmaVariable {
  id: string;
  name: string;
  value: string; // Adjust the type according to what `value` can be
}

Const App: React.FC = () => {
  // Here we're assuming `useFigmaVars` returns an object with data, loading, and error properties
  // Adjust the type of `data` based on the actual structure of variables you expect
  const { data: variables, loading, error } = useFigmaVars('file_key_here');

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {variables?.map((varItem: FigmaVariable) => (
        <div key={varItem.id}>{varItem.name}: {varItem.value}</div>
      ))}
    </div>
  );
};

export default App;
```

## Next Steps

You can thoroughly explore the other hooks provided by FigmaVars to leverage Figma variables in your project. For detailed API documentation, please take a look at APIReference.md.

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
