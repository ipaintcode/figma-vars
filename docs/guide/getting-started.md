# Getting Started with @figma-vars

Welcome to the @figma-vars library, a modern, secure, and flexible solution for working with Figma variables in your projects.

## Installation

You can install the packages using npm, yarn, or pnpm:

```bash
# Using npm
npm install @figma-vars/core

# For React support
npm install @figma-vars/core @figma-vars/react

# For Figma Plugins/Widgets
npm install @figma-vars/core @figma-vars/plugin
```

## Security First Approach

One of the core principles of @figma-vars is security. Our library is designed to prevent common security pitfalls like token exposure in client-side code.

### ⚠️ Important Security Warning

Never expose your Figma API tokens in client-side code. Environment variables with `VITE_` or `REACT_APP_` prefixes are bundled with your client-side code and can be extracted by anyone using your application.

## Basic Usage

### Core Package

```javascript
import { FigmaClient } from '@figma-vars/core';

// Server-side usage (Node.js) - SECURE
const client = new FigmaClient();
const fileKey = process.env.FIGMA_FILE_KEY;
const variables = await client.getFileVariables(fileKey);

// Client-side with secure backend proxy - RECOMMENDED
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
      <h1>Figma Variables</h1>
      {variables.map(variable => (
        <div key={variable.id}>
          <h3>{variable.name}</h3>
          <p>{JSON.stringify(variable.value)}</p>
        </div>
      ))}
    </div>
  );
}
```

## Server-side Implementation

For production applications, we strongly recommend implementing a secure backend proxy:

```javascript
// server.js (Express example)
import express from 'express';
import { FigmaClient } from '@figma-vars/core';
import cors from 'cors';

const app = express();
app.use(cors());

// FigmaClient automatically uses FIGMA_API_TOKEN from environment variables
const figmaClient = new FigmaClient();

app.get('/api/figma/variables/:fileKey', async (req, res) => {
  try {
    // Add your authentication and authorization logic here
    const variables = await figmaClient.getFileVariables(req.params.fileKey);
    res.json(variables);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch variables' });
  }
});

app.listen(3001);
```

## Next.js Integration

Our library works seamlessly with Next.js:

```jsx
// app/api/figma/variables/[fileKey]/route.ts (Next.js App Router)
import { FigmaClient } from '@figma-vars/core';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { fileKey: string } }
) {
  const figmaClient = new FigmaClient();

  try {
    const variables = await figmaClient.getFileVariables(params.fileKey);
    return NextResponse.json(variables);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch variables' },
      { status: 500 }
    );
  }
}
```

## CDN Usage

You can use this package directly via CDN:

```html
<!-- ES Module import -->
<script type="module">
  import { FigmaClient } from 'https://cdn.skypack.dev/@figma-vars/core';

  // Using the library securely
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

## Account Requirements

Our library works with all paid Figma accounts:

| Account Type | Can Use Variables API | Can Create Access Tokens |
|-------------|----------------------|-------------------------|
| Free        | No                    | Yes (limited usefulness) |
| Professional | Yes                   | Yes                     |
| Organization | Yes                   | Yes                     |
| Enterprise  | Yes                   | Yes                     |

## Learn More

- [Security Best Practices](./security.md)
- [API Reference](../api/README.md)
- [React Hooks](./react-hooks.md)
- [Plugin Development](./plugin-development.md)
