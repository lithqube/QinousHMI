/**
 * Converts camel case text to normal text with spaces.
 * Examples: 
 * - smallTest -> Small Test
 * - SystemTest -> System Test
 * - BCUController -> BCU Controller
 */
export default function titelize(camelCaseText: string): string {
    return camelCaseText.replace(/([A-Z][a-z])/g, ' $1').replace(/^./, str => str.trim().toUpperCase());    
}