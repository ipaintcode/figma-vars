// useFigmaAuth.ts
import { useState, useEffect } from 'react';

const useFigmaAuth = (): string => {
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    // Ideally, you'd have a secure way to handle this token in production
    const figmaToken: string = process.env.REACT_APP_FIGMA_TOKEN || '';
    setToken(figmaToken);
  }, []);

  return token;
};

export default useFigmaAuth;