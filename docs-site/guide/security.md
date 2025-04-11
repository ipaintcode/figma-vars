# Security Best Practices

## Access Token Management

### Never Hardcode Tokens

❌ Bad:

```typescript
const client = new FigmaClient({
  token: 'your-figma-token-here' // Never do this!
})
```

✅ Good:

```typescript
const client = new FigmaClient({
  token: process.env.FIGMA_ACCESS_TOKEN
})
```

### Environment Variables

1. Create a `.env` file:

```bash
FIGMA_ACCESS_TOKEN=your-token-here
```

1. Add `.env` to `.gitignore`:

```text
.env
.env.local
.env.*.local
```

1. Create a `.env.example` file:

```bash
FIGMA_ACCESS_TOKEN=
```

## Token Providers

The library supports multiple token providers for flexible token management:

### Environment Variable Provider (Default)

```typescript
import { FigmaClient } from '@figma-vars/core'

const client = new FigmaClient({
  fileKey: 'your-file-key'
  // Uses FIGMA_ACCESS_TOKEN by default
})
```

### Custom Provider

```typescript
import { FigmaClient, TokenProvider } from '@figma-vars/core'

class CustomTokenProvider implements TokenProvider {
  async getToken(): Promise<string> {
    // Implement your token retrieval logic
    return 'your-token'
  }
}

const client = new FigmaClient({
  fileKey: 'your-file-key',
  tokenProvider: new CustomTokenProvider()
})
```

## Browser Environment

When using in the browser:

1. Use a backend proxy to handle token management
2. Implement proper CORS policies
3. Use environment-specific variables:

```typescript
const client = new FigmaClient({
  fileKey: 'your-file-key',
  token: import.meta.env.VITE_FIGMA_ACCESS_TOKEN // Vite
  // or
  token: process.env.NEXT_PUBLIC_FIGMA_ACCESS_TOKEN // Next.js
})
```

## Additional Security Tips

1. Rotate tokens regularly
2. Use token with minimal required permissions
3. Implement rate limiting
4. Monitor token usage
5. Set up proper error handling for token-related issues

## Next Steps

- Learn about [React integration](/react/)
- Explore [advanced usage](/guide/advanced)
- Check out the [API reference](/api/)
