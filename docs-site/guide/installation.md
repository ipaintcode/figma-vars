# Installation

This guide covers the installation and setup process for Figma Variables.

## Package Installation

Choose your preferred package manager:

```bash
# Using npm
npm install @figma-vars/core @figma-vars/react

# Using yarn
yarn add @figma-vars/core @figma-vars/react

# Using pnpm
pnpm add @figma-vars/core @figma-vars/react
```

## Environment Setup

1. Create a `.env` file in your project root:

```bash
FIGMA_ACCESS_TOKEN=your_access_token_here
FIGMA_FILE_KEY=your_file_key_here
```

1. Add `.env` to your `.gitignore`:

```text
.env
.env.local
.env.*.local
```

1. Create a `.env.example` file for reference:

```bash
FIGMA_ACCESS_TOKEN=
FIGMA_FILE_KEY=
```

## TypeScript Configuration

If you're using TypeScript, add the following to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["@figma-vars/core", "@figma-vars/react"]
  }
}
```

## Next Steps

- Follow the [Quick Start](/guide/quick-start) guide
- Learn about [security best practices](/guide/security)
- Explore the [React integration](/react/)
