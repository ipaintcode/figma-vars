# Plugin Development

Learn how to develop and extend the Figma Variables plugin.

## Project Structure

```
plugin/
├── src/
│   ├── code.ts        # Plugin main code
│   ├── ui.tsx         # Plugin UI components
│   └── utils.ts       # Utility functions
├── manifest.json      # Plugin manifest
└── package.json       # Dependencies
```

## Development Workflow

1. Make changes to the source code
2. The development server will automatically rebuild
3. Reload the plugin in Figma to see changes

## Adding New Features

### Creating a New Command

```typescript
// src/code.ts
figma.commands.register('exportVariables', async () => {
  const variables = await figma.variables.getLocalVariables()
  // Your export logic here
})
```

### Adding UI Components

```typescript
// src/ui.tsx
import React from 'react'

export function ExportButton() {
  return (
    <button onClick={() => {
      parent.postMessage({ pluginMessage: { type: 'export' } }, '*')
    }}>
      Export Variables
    </button>
  )
}
```

## Testing

1. Unit tests:

   ```bash
   pnpm run test
   ```

2. E2E tests:

   ```bash
   pnpm run test:e2e
   ```

## Debugging

1. Open the developer console in Figma
2. Use `console.log` for debugging
3. Check the plugin logs in the Figma developer tools
