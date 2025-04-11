# Figma Plugin Development Guide

The `@figma-vars/plugin` package provides components and utilities for building Figma plugins and widgets that integrate with Figma variables.

## Getting Started

### Setting Up Your Plugin Project

1. First, install the package:

```bash
npm install @figma-vars/core @figma-vars/plugin
```

1. Create your plugin manifest file (`manifest.json`):

```json
{
  "name": "My Figma Variables Plugin",
  "id": "your-plugin-id",
  "api": "1.0.0",
  "main": "dist/code.js",
  "ui": "dist/ui.html",
  "editorType": ["figma"],
  "networkAccess": {
    "allowedDomains": ["https://api.figma.com"]
  }
}
```

### Implementing a Basic Plugin

Create a simple plugin that shows variables in the current file:

```typescript
// code.ts - Plugin code
import { FigmaClient } from '@figma-vars/core';

figma.showUI(__html__, { width: 450, height: 600 });

// Get the current file ID
const fileKey = figma.fileKey;

// Handle messages from the UI
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'get-variables') {
    try {
      // Access token is provided by the Figma plugin environment
      const variables = await figma.variables.getLocalVariables();

      // Send variables to the UI
      figma.ui.postMessage({
        type: 'variables',
        variables
      });
    } catch (error) {
      figma.ui.postMessage({
        type: 'error',
        message: error.message
      });
    }
  }

  if (msg.type === 'close') {
    figma.closePlugin();
  }
};
```

```jsx
// ui.tsx - Plugin UI with React
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { VariableList } from '@figma-vars/plugin';

const App = () => {
  const [variables, setVariables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Request variables from the plugin
    parent.postMessage({ pluginMessage: { type: 'get-variables' } }, '*');

    // Listen for messages from the plugin
    window.onmessage = (event) => {
      const { type, variables, message } = event.data.pluginMessage || {};

      if (type === 'variables') {
        setVariables(variables || []);
        setLoading(false);
      }

      if (type === 'error') {
        setError(message);
        setLoading(false);
      }
    };
  }, []);

  return (
    <div>
      <h2>Figma Variables</h2>

      {loading && <div>Loading variables...</div>}
      {error && <div className="error">Error: {error}</div>}

      <VariableList variables={variables} />

      <button onClick={() => parent.postMessage({ pluginMessage: { type: 'close' } }, '*')}>
        Close
      </button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

## Using VariablesWidget

The `VariablesWidget` component is designed for Figma widget development:

```jsx
import React from 'react';
import { VariablesWidget } from '@figma-vars/plugin';

// Register the widget
widget.register(VariablesWidget);
```

## Building and Deploying Plugins

### Build Setup with Vite

Create a `vite.config.ts` file:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    cssCodeSplit: false,
    assetsInlineLimit: 100000000,
    rollupOptions: {
      input: {
        ui: 'src/ui.html',
      },
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
});
```

### Build Setup with Webpack

Create a `webpack.config.js` file:

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const path = require('path');

module.exports = (env, argv) => ({
  mode: argv.mode === 'production' ? 'production' : 'development',

  // This is the entry point for your UI code
  entry: {
    ui: './src/ui.tsx',
    code: './src/code.ts',
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  // The filetypes we want to support
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  // Generate an HTML file including the output bundles
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/ui.html',
      filename: 'ui.html',
      chunks: ['ui'],
      inject: 'body',
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/ui/]),
  ],
});
```

### Publishing Your Plugin

1. Build your plugin:

```bash
npm run build
```

1. Create a `.zip` file with your `manifest.json` and `dist` directory
2. Go to the [Figma Plugin Manager](https://www.figma.com/community/plugins)
3. Click "Create a plugin" and upload your `.zip` file

## Advanced Topics

### Custom Token Providers

For enterprise environments, you might want to implement custom token providers:

```javascript
import { FigmaClient } from '@figma-vars/core';

// Enterprise SSO token management
const client = new FigmaClient(async () => {
  // Get token from your secure backend with SSO integration
  const response = await fetch('/api/enterprise/figma-token', {
    headers: {
      'Authorization': `Bearer ${yourSSOToken}`
    }
  });
  const data = await response.json();
  return data.token;
});
```

### Variable Updates with Change Tracking

Track and synchronize variable changes:

```javascript
// Plugin code
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'update-variable') {
    const { variableId, value } = msg;

    try {
      // Find the variable
      const variable = figma.variables.getVariableById(variableId);

      if (!variable) {
        throw new Error(`Variable with ID ${variableId} not found`);
      }

      // Create a change
      const change = await figma.variables.createVariableChange({
        variableId,
        valuesByMode: {
          [figma.variables.getLocalVariableCollection(variable.variableCollectionId).defaultModeId]: value
        }
      });

      // Apply the change
      await figma.variables.applyVariableChange(change);

      // Notify UI of success
      figma.ui.postMessage({
        type: 'variable-updated',
        variableId
      });
    } catch (error) {
      figma.ui.postMessage({
        type: 'error',
        message: error.message
      });
    }
  }
};
```

### Performance Optimization

For better plugin performance:

1. **Batch operations**: Group multiple variable operations
2. **Lazy loading**: Load variables only when needed
3. **Caching**: Cache variables to reduce API calls
4. **Compression**: Compress large variable sets when sending between plugin and UI

```javascript
// Batch variable fetching example
async function batchFetchVariables(variableIds) {
  return Promise.all(
    variableIds.map(id => figma.variables.getVariableById(id))
  );
}
```

## Learn More

For more information on Figma plugin development, check out:

- [Official Figma Plugin Documentation](https://www.figma.com/plugin-docs/)
- [Figma Widget API](https://www.figma.com/widget-docs/)
- [Figma Variables API](https://www.figma.com/developers/api#variables)
- [Security Best Practices](./security.md)
