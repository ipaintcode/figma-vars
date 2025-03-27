# Getting Started with FigmaVarsHooks

Welcome to FigmaVarsHooks, a React hooks library designed to simplify the integration of Figma variables into your React applications.

## Installation

To get started, install FigmaVarsHooks via npm or yarn:

```bash
npm install @ipaintcode/figma-vars-hooks
# or
yarn add @ipaintcode/figma-vars-hooks
```

## Setup

Before using the hooks, you need to configure your Figma API token. Store your token securely and make it available in your application, preferably through environment variables.

Create a `.env` file in the root of your project and add:

```env
REACT_APP_FIGMA_TOKEN=your_figma_api_token_here
```

Ensure you have .env in your .gitignore file to keep your token secure.

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

const App: React.FC = () => {
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

Explore the other hooks provided by FigmaVarsHooks to fully leverage Figma variables in your project. For detailed API documentation, please refer to APIReference.md.

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

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
