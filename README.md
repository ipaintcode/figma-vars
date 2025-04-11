# Figma Variables Package

A modern, modular library for working with Figma variables.

## Features

- 🚀 Modern ESM modules with TypeScript support
- 📦 Monorepo structure for clean separation of concerns
- 🔄 Full TypeScript declarations for type safety
- 🌳 Tree-shakable exports for smaller bundle sizes
- 🧩 Modular packages for different environments (Core, React, React Native)
- 🔒 Secure token handling to protect your Figma assets

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

## Security & Environment Variables

For secure usage, create a `.env` file at the root of your project:

```env
# Server-side environment variable (Node.js) - SECURE
FIGMA_API_TOKEN=your_figma_token_here
FIGMA_FILE_KEY=your_file_key_here
```

⚠️ **SECURITY WARNING:** Never expose Figma API tokens in client-side code. Environment variables with `VITE_` or `REACT_APP_` prefixes are bundled with your client-side code and can be extracted by anyone using your application.

❌ **UNSAFE - DO NOT USE IN PRODUCTION:**

```env
# These will be exposed in client-side code!
VITE_FIGMA_TOKEN=your_figma_token_here
VITE_FIGMA_FILE_KEY=your_file_key_here
```

✅ **RECOMMENDED APPROACH:** Use a secure backend proxy (see below).

Always add your `.env` file to `.gitignore` to prevent committing sensitive credentials.

> **Note:** Create React App (with REACT_APP_ prefix) has been officially deprecated by the React team. We recommend using Vite for new projects. See the [official React blog post](https://react.dev/blog/2025/02/14/sunsetting-create-react-app) for more information.

### Vite Configuration

React recommends Vite for new projects that don't use a full framework. Our packages are designed to work seamlessly with Vite, you just need to ensure environment variables are properly exposed:

```ts
// vite.config.ts
import { defineConfig, loadEnv, ConfigEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }: ConfigEnv) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    define: {
      'process.env': env
    },
    plugins: [react()],
  }
})
```

This configuration ensures that our library can access environment variables in a Vite environment.

## Usage

### Core Package

The most secure way to use the core package is with a server-side approach:

```js
import { FigmaClient } from '@figma-vars/core';

// Server-side (Node.js): Uses environment variables automatically
const client = new FigmaClient();
const fileKey = process.env.FIGMA_FILE_KEY;
const variables = await client.getFileVariables(fileKey);
```

For more control, you can provide custom token handling:

```js
import { FigmaClient } from '@figma-vars/core';

// Using a secure backend service (recommended for client-side apps)
const client = new FigmaClient(async () => {
  const response = await fetch('/api/get-figma-token');
  const { token } = await response.json();
  return token;
});

const variables = await client.getFileVariables('your_file_key');
```

### React Package

```jsx
import { useFigmaVariables } from '@figma-vars/react';

function App() {
  // SECURITY BEST PRACTICE: Using a backend proxy service
  const { variables, loading, error } = useFigmaVariables(
    'your_file_key',
    {
      tokenProvider: async () => {
        // Call your own backend API that securely handles the token
        const response = await fetch('/api/get-figma-token');
        const { token } = await response.json();
        return token;
      }
    }
  );

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

## Security Best Practices

To prevent unauthorized access to your Figma designs:

1. **Never hardcode API tokens in your source code**
2. **Never expose tokens in client-side code** - Use a backend proxy service
3. **Implement token scoping** - Only request access to specific files
4. **Use environment variables** with appropriate access restrictions
5. **Implement token rotation** for long-lived applications
6. **Apply the principle of least privilege** - Use tokens with minimal necessary permissions
7. **Set up proper CORS policies** on your backend proxy

### Example of a Secure Backend Proxy

```js
// server.js
import express from 'express';
import { FigmaClient } from '@figma-vars/core';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Configure CORS (in production, restrict to your domain)
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? 'https://your-domain.com'
    : 'http://localhost:3000'
}));

// FigmaClient automatically uses FIGMA_API_TOKEN from environment variables
const figmaClient = new FigmaClient();

app.get('/api/figma/variables/:fileKey', async (req, res) => {
  try {
    // Add your authentication and authorization logic here
    // Example: Check if the user is logged in and has access to this file

    const variables = await figmaClient.getFileVariables(req.params.fileKey);
    res.json(variables);
  } catch (error) {
    console.error('Figma API error:', error);
    res.status(500).json({ error: 'Failed to fetch variables' });
  }
});

// Token endpoint - never return raw tokens to unauthorized users!
app.get('/api/get-figma-token', (req, res) => {
  // Verify the user is authenticated
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // In a real implementation, you'd verify the auth token
  // and might use scoped/temporary tokens for specific files

  // IMPORTANT: This is just a proxy - we're not actually sending the token to the client
  // Instead, make the Figma API request server-side and return only the data
  res.json({
    success: true,
    message: 'Use /api/figma/variables/:fileKey instead of requesting tokens directly'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### Using with Next.js and Similar Frameworks

Modern frameworks like Next.js provide built-in solutions for secure API token handling:

#### Next.js API Routes

```js
// pages/api/figma/variables.js (Next.js API Route)
import { FigmaClient } from '@figma-vars/core';

export default async function handler(req, res) {
  // API routes run on the server - tokens are secure here
  const figmaClient = new FigmaClient();
  const fileKey = req.query.fileKey;

  try {
    // You can implement authentication here
    // e.g., check session, API key, etc.

    const variables = await figmaClient.getFileVariables(fileKey);
    res.status(200).json(variables);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch variables' });
  }
}
```

#### Next.js Server Components (App Router)

```jsx
// app/figma/page.jsx (Server Component)
import { FigmaClient } from '@figma-vars/core';

// This component runs entirely on the server - tokens are never sent to the client
export default async function FigmaVariablesPage() {
  const figmaClient = new FigmaClient();

  try {
    const variables = await figmaClient.getFileVariables(process.env.FIGMA_FILE_KEY);

    return (
      <div>
        <h1>Figma Variables</h1>
        <ul>
          {variables.map(variable => (
            <li key={variable.id}>{variable.name}</li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    return <div>Error loading Figma variables</div>;
  }
}
```

#### Client Component with Server Data Fetching

```jsx
// app/figma/client-page.jsx
'use client'
import { useState, useEffect } from 'react';

export default function FigmaVariablesClientPage() {
  const [variables, setVariables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVariables() {
      // Call your internal API route which securely handles the token
      const response = await fetch('/api/figma/variables?fileKey=your_file_key');
      const data = await response.json();
      setVariables(data);
      setLoading(false);
    }

    fetchVariables();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Figma Variables (Client Component)</h1>
      <ul>
        {variables.map(variable => (
          <li key={variable.id}>{variable.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Production Security Configuration

For production environments, consider these additional security measures:

1. **Run periodic security audits** on your dependencies
2. **Set up rate limiting** to prevent abuse of your Figma API proxy
3. **Implement request logging** for security monitoring
4. **Use HTTPS** exclusively for all API communication
5. **Configure secure headers** (Content-Security-Policy, etc.)
6. **Consider using a CDN** with WAF capabilities

## License

MIT

## CDN Usage

You can use this package directly via CDN without npm installation:

### Skypack (recommended)

```html
<!-- ES Module import for main functionality -->
<script type="module">
  import { FigmaClient } from 'https://cdn.skypack.dev/@figma-vars/core';

  // Using the library
  const client = new FigmaClient(async () => {
    // Get token from your secure backend
    const response = await fetch('/api/figma-token');
    const data = await response.json();
    return data.token;
  });

  // Fetch variables
  const variables = await client.getFileVariables('your_file_key');
  console.log(variables);
</script>
```

#### Importing React Package

```html
<!-- React components and hooks -->
<script type="module">
  import React from 'https://cdn.skypack.dev/react';
  import { useFigmaVariables } from 'https://cdn.skypack.dev/@figma-vars/react';

  // Use React components and hooks
  function MyComponent() {
    const { variables, loading, error } = useFigmaVariables('your_file_key', {
      tokenProvider: async () => {
        const response = await fetch('/api/figma-token');
        const data = await response.json();
        return data.token;
      }
    });

    // Component implementation...
  }
</script>
```

#### Importing Plugin Functionality

```html
<!-- For plugin-specific functionality -->
<script type="module">
  import { somePluginFunction } from 'https://cdn.skypack.dev/@figma-vars/core/plugin';

  // Use plugin functionality
  somePluginFunction();
</script>
```

### UNPKG

```html
<!-- Core package -->
<script type="module">
  import { FigmaClient } from 'https://unpkg.com/@figma-vars/core/dist/index.mjs';

  // Using the library...
</script>

<!-- React package -->
<script type="module">
  import React from 'https://unpkg.com/react/umd/react.production.min.js';
  import { useFigmaVariables } from 'https://unpkg.com/@figma-vars/react/dist/index.mjs';

  // Using React components...
</script>

<!-- Plugin functionality -->
<script type="module">
  import { somePluginFunction } from 'https://unpkg.com/@figma-vars/core/dist/index.mjs';
</script>
```

### jsDelivr

```html
<!-- Core package -->
<script type="module">
  import { FigmaClient } from 'https://cdn.jsdelivr.net/npm/@figma-vars/core/dist/index.mjs';

  // Using the library...
</script>

<!-- React package -->
<script type="module">
  import React from 'https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js';
  import { useFigmaVariables } from 'https://cdn.jsdelivr.net/npm/@figma-vars/react/dist/index.mjs';

  // Using React components...
</script>

<!-- Plugin package -->
<script type="module">
  import React from 'https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js';
  import ReactDOM from 'https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js';
  import { VariablesWidget, VariableList } from 'https://cdn.jsdelivr.net/npm/@figma-vars/plugin/dist/index.mjs';

  // Using Plugin components
  ReactDOM.render(
    <VariablesWidget />,
    document.getElementById('figma-widget')
  );
</script>
```

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
