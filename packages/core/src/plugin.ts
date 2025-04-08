import type { PluginMessage, PluginMessageHandler } from './types.js';

/**
 * Send a message to the Figma plugin
 */
export async function sendPluginMessage<T = any>(message: PluginMessage<T>): Promise<void> {
  if (typeof parent === 'undefined') {
    throw new Error('This function can only be called from within a Figma plugin UI');
  }
  parent.postMessage({ pluginMessage: message }, '*');
}

/**
 * Register a handler for plugin messages
 */
export function registerPluginMessageHandler<T = any>(handler: PluginMessageHandler<T>): void {
  if (typeof window === 'undefined' || !window.figma?.ui) {
    throw new Error('This function can only be called from within a Figma plugin');
  }
  // @ts-ignore - Figma plugin API types are not available
  window.figma.ui.onmessage = handler;
}

/**
 * Create a plugin message
 */
export function createPluginMessage<T = any>(type: string, payload?: T): PluginMessage<T> {
  return {
    type,
    payload
  };
}
