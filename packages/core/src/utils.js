/**
 * Check if a value is an RGB color
 */
export function isRGB(value) {
    return (typeof value === 'object' &&
        value !== null &&
        'r' in value &&
        'g' in value &&
        'b' in value &&
        !('a' in value));
}
/**
 * Check if a value is an RGBA color
 */
export function isRGBA(value) {
    return (typeof value === 'object' &&
        value !== null &&
        'r' in value &&
        'g' in value &&
        'b' in value &&
        'a' in value);
}
/**
 * Get the type of a variable value
 */
export function getVariableType(value) {
    if (typeof value === 'boolean')
        return 'BOOLEAN';
    if (typeof value === 'number')
        return 'FLOAT';
    if (typeof value === 'string')
        return 'STRING';
    if (isRGB(value) || isRGBA(value))
        return 'COLOR';
    throw new Error(`Invalid variable value type: ${typeof value}`);
}
/**
 * Convert a color to RGB format
 */
export function toRGB(color) {
    if (typeof color === 'string') {
        // Handle hex color
        const hex = color.replace('#', '');
        return {
            r: parseInt(hex.slice(0, 2), 16) / 255,
            g: parseInt(hex.slice(2, 4), 16) / 255,
            b: parseInt(hex.slice(4, 6), 16) / 255,
        };
    }
    if (isRGBA(color)) {
        const { r, g, b } = color;
        return { r, g, b };
    }
    return color;
}
