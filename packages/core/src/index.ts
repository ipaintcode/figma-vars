// API
export { FigmaClient } from './api.js';

// Core functionality
export * from './variables.js';
export * from './plugin.js';
export * from './utils.js';

// Types
export * from './types.js';

// Re-export types for convenience
export type {
  Variable,
  Collection,
  Mode,
  VariableValue,
  VariableType,
  PluginMessage,
  PluginMessageHandler,
  RGB,
  RGBA,
} from './types.js';