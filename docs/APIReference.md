# API Reference Docs

## APIReference.md

This document should detail each hook's API, including parameters, return types, and example usage. Here's an example format for a couple of hooks:

```markdown
## FigmaVarsHooks API Reference

This document provides detailed information about the APIs provided by FigmaVarsHooks.

## Hooks

### `useFigmaVars`

Fetches variables from a specified Figma file.

#### Parameters

- `fileKey`: String - The key of the Figma file from which to fetch variables.

#### Returns

- An object containing:
  - `data`: Array of FigmaVariable objects | null
  - `loading`: Boolean
  - `error`: Error | null

#### Example

```jsx
const { data: variables, loading, error } = useFigmaVars('file_key_here');
