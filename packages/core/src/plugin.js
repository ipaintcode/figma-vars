/**
 * Send a message to the Figma plugin
 */
export async function sendPluginMessage(message) {
    if (typeof parent === 'undefined') {
        throw new Error('This function can only be called from within a Figma plugin UI');
    }
    parent.postMessage({ pluginMessage: message }, '*');
}
/**
 * Register a handler for plugin messages
 */
export function registerPluginMessageHandler(handler) {
    if (typeof window === 'undefined' || !window.figma?.ui) {
        throw new Error('This function can only be called from within a Figma plugin');
    }
    // @ts-ignore - Figma plugin API types are not available
    window.figma.ui.onmessage = handler;
}
/**
 * Create a plugin message
 */
export function createPluginMessage(type, payload) {
    return {
        type,
        payload
    };
}
