# Token Management

Learn how to securely manage Figma access tokens in your application.

## Environment Variables

The recommended way to handle tokens is through environment variables:

```typescript
import { FigmaAPI } from '@figma-vars/core'

const api = new FigmaAPI({
  token: process.env.FIGMA_ACCESS_TOKEN
})
```

## Token Providers

You can use different token providers based on your needs:

### Environment Variable Provider

```typescript
import { EnvironmentVariableProvider } from '@figma-vars/core'

const provider = new EnvironmentVariableProvider('FIGMA_ACCESS_TOKEN')
const api = new FigmaAPI({ tokenProvider: provider })
```

### Custom Token Provider

```typescript
import { TokenProvider } from '@figma-vars/core'

class CustomTokenProvider implements TokenProvider {
  async getToken(): Promise<string> {
    // Your custom token retrieval logic
    return 'your-token'
  }
}

const api = new FigmaAPI({ tokenProvider: new CustomTokenProvider() })
```

## Security Best Practices

1. Never hardcode tokens in your source code
2. Use environment variables or secure token storage
3. Rotate tokens regularly
4. Use minimal required permissions
5. Monitor token usage
