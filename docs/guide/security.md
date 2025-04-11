# Security Best Practices

Security is a core principle of the @figma-vars library. This guide outlines best practices to ensure your Figma API tokens and design assets remain secure.

## The Risk of Client-Side Token Exposure

When working with API tokens, the primary security concern is exposing these tokens in client-side code. If a token is exposed, malicious users can:

- Access your Figma designs without permission
- View sensitive design information
- Potentially modify design files
- Access other Figma resources the token has permission to

## 🔒 Secure Token Handling

### ✅ DO: Use Server-Side Token Storage

Always store your Figma API tokens on the server side, using:

```javascript
// In your server's .env file (NOT exposed to the client)
FIGMA_API_TOKEN=your_token_here
```

### ❌ DON'T: Expose Tokens in Client-Side Code

Never include tokens in client-side code or environment variables like:

```javascript
// INSECURE: This exposes your token in the browser
const token = "fig_123456";
// or
const token = process.env.VITE_FIGMA_TOKEN; // VITE_ variables are bundled with the client
```

## Secure Implementation Patterns

### Backend Proxy Pattern (Recommended)

Create a secure backend API that handles all communication with the Figma API:

```javascript
// Server-side (secure.js)
import express from 'express';
import { FigmaClient } from '@figma-vars/core';

const app = express();
const figmaClient = new FigmaClient(); // Uses FIGMA_API_TOKEN from environment

app.get('/api/figma-variables/:fileKey', async (req, res) => {
  try {
    // Add authentication here
    const { fileKey } = req.params;
    const variables = await figmaClient.getFileVariables(fileKey);
    res.json(variables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

```javascript
// Client-side (secure-client.js)
async function getFigmaVariables(fileKey) {
  const response = await fetch(`/api/figma-variables/${fileKey}`);
  return response.json();
}
```

### Temporary Token Pattern

For short-lived applications or demos, generate temporary, scoped tokens:

```javascript
// Server-side token generation
app.get('/api/temp-token', isAuthenticated, async (req, res) => {
  // Create a short-lived token with minimal permissions
  const token = await generateScopedToken({
    fileKey: req.query.fileKey,
    expiresIn: '5m',
    permissions: ['read']
  });

  res.json({ token });
});
```

## Additional Security Measures

### 1. Implement Proper Authentication

Always add authentication to your backend proxy endpoints:

```javascript
function isAuthenticated(req, res, next) {
  // Check session, JWT, etc.
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

app.get('/api/figma-variables/:fileKey', isAuthenticated, async (req, res) => {
  // ...
});
```

### 2. Implement Rate Limiting

Protect your API from abuse with rate limiting:

```javascript
import rateLimit from 'express-rate-limit';

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', apiLimiter);
```

### 3. Use HTTPS Exclusively

Always configure your server to use HTTPS:

```javascript
import https from 'https';
import fs from 'fs';

const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
};

https.createServer(options, app).listen(443);
```

### 4. Implement Access Logging

Log access to your Figma API proxy for monitoring:

```javascript
import winston from 'winston';

const logger = winston.createLogger({
  transports: [new winston.transports.Console()]
});

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path} - ${req.ip}`);
  next();
});
```

## Security Checklist

- [ ] Figma API tokens are stored server-side only
- [ ] Backend authentication is implemented
- [ ] All API requests use HTTPS
- [ ] Rate limiting is configured
- [ ] Access logging is implemented
- [ ] CORS is properly configured
- [ ] Content-Security-Policy headers are set
- [ ] Package dependencies are regularly audited

By following these security practices, you can safely use the @figma-vars library in production applications without exposing your Figma assets to unauthorized access.
