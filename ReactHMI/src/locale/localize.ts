/**
 * Localization is kept as simple as possible. Right now, there is no need for ICU,
 * we only need simple string interpolation.
 */

const pattern = /\{(\w*)\}/g;

export default function localize(text: string, values?: [string, string]) {
    if (!values) {
        return text;
    }
    return text.replace(pattern, function(match, key) {
        const value = values[key];
        return value !== undefined ? value : "";        
    });
}