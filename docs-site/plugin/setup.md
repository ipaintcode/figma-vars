# Plugin Setup

Learn how to set up and configure the Figma Variables plugin.

## Installation

1. Open Figma
2. Go to Plugins > Development > Import plugin from manifest
3. Select the `manifest.json` file from the plugin directory

## Configuration

Create a `config.json` file in your plugin directory:

```json
{
  "fileKey": "your-file-key",
  "collections": ["Colors", "Typography", "Spacing"],
  "exportPath": "./tokens"
}
```

## Development Setup

1. Clone the repository
2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm run dev
   ```

## Building for Production

1. Build the plugin:

   ```bash
   pnpm run build
   ```

2. The built plugin will be in the `dist` directory
3. Import the built plugin into Figma
