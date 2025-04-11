# @figma-vars/plugin

Figma plugin for working with design variables.

## Features

- Easily view and manage variables within Figma
- Export variables to various formats
- Sync variables with your codebase
- Create and modify variables directly in the plugin

## Development

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/ipaintcode/figma-vars.git
   cd figma-vars
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Build the plugin:

   ```bash
   cd packages/plugin
   pnpm run build
   ```

### Running in Figma

1. Open Figma Desktop app
2. Go to Plugins > Development > Import plugin from manifest
3. Select the manifest.json file in the packages/plugin/dist directory

## Usage

### As a Figma Widget

```typescript
import { VariablesWidget } from '@figma-vars/plugin';

// Use the widget in your Figma plugin
figma.widget.register(VariablesWidget);
```

### As a Figma Plugin

```typescript
import { VariablesPlugin } from '@figma-vars/plugin';

// Initialize the plugin
VariablesPlugin.init();
```

## Configuration

The plugin can be configured using the following options:

```typescript
{
  // Default file to load variables from
  defaultFileKey: "your_figma_file_key",

  // Enable/disable features
  features: {
    export: true,
    import: true,
    sync: true
  },

  // Theme settings
  theme: "light" | "dark" | "system"
}
```

## License

MIT
