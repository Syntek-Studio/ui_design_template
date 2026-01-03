/**
 * Input validation utilities for the template initialisation CLI.
 *
 * This module provides validation functions for user inputs collected during the
 * template initialisation process. Each validator returns either true (valid) or
 * an error message string (invalid) to provide clear feedback to the user.
 *
 * Validation Rules Summary:
 * - Package names: npm naming standards (lowercase, scoped format support, 3-214 chars)
 * - Hex colours: valid 3-digit or 6-digit hex codes with hash prefix
 * - Descriptions: non-empty, max 500 characters, allows special characters and emojis
 * - Client names: non-empty, max 100 characters, allows letters/numbers/special chars
 *
 * Helper Functions:
 * - validateNonEmpty: Reusable empty check with custom field name
 * - validateMaxLength: Reusable length check with custom field name and limit
 *
 * @module scripts/lib/validators
 * @author Claude Code Documentation Generator
 * @created 2026-01-02
 */

/**
 * Validates that a string is non-empty after trimming whitespace.
 *
 * Reusable helper function for empty/whitespace validation with custom
 * error messages. Used by description and client name validators to avoid
 * code duplication.
 *
 * @param {string} value - The value to validate
 * @param {string} fieldName - The name of the field for error messages
 * @returns {boolean|string} - True if valid, or error message if empty
 *
 * @example
 * validateNonEmpty('Acme', 'Client name')       // returns true
 * validateNonEmpty('', 'Client name')           // returns 'Client name cannot be empty'
 * validateNonEmpty('   ', 'Description')        // returns 'Description cannot be empty'
 */
function validateNonEmpty(value: string, fieldName: string): boolean | string {
  const trimmed = value.trim()

  if (trimmed.length === 0) {
    return `${fieldName} cannot be empty`
  }

  return true
}

/**
 * Validates that a string does not exceed a maximum length.
 *
 * Reusable helper function for length validation with custom error messages.
 * Used by description and client name validators to avoid code duplication.
 * Trims whitespace before checking length.
 *
 * @param {string} value - The value to validate
 * @param {number} maxLength - The maximum allowed length
 * @param {string} fieldName - The name of the field for error messages
 * @returns {boolean|string} - True if valid, or error message if too long
 *
 * @example
 * validateMaxLength('Acme', 100, 'Client name')          // returns true
 * validateMaxLength('A'.repeat(101), 100, 'Client name') // returns 'Client name must be 100 characters or less'
 * validateMaxLength('Short', 500, 'Description')         // returns true
 */
function validateMaxLength(value: string, maxLength: number, fieldName: string): boolean | string {
  const trimmed = value.trim()

  if (trimmed.length > maxLength) {
    return `${fieldName} must be ${maxLength} characters or less`
  }

  return true
}

/**
 * Validates an npm package name according to npm naming rules.
 *
 * Enforces the following rules:
 * - Must be lowercase (no uppercase letters)
 * - Can contain hyphens, dots, underscores, and tildes
 * - Cannot contain spaces or special characters (except @, /, -, ., _, ~)
 * - Cannot start with a dot or underscore
 * - Must be between 3 and 214 characters (security enhancement)
 * - Must contain only ASCII characters (security enhancement)
 * - Scoped packages must follow format: @scope/package-name
 * - Scoped package scope and name must both be non-empty
 *
 * @param {string} name - The package name to validate
 * @returns {boolean|string} - Returns true if valid, or error message string if invalid
 *
 * @example
 * validatePackageName('@acme/ui')              // returns true
 * validatePackageName('acme-ui')               // returns true
 * validatePackageName('@company/ui.kit')       // returns true
 * validatePackageName('Acme-UI')               // returns 'Package name must be lowercase...'
 * validatePackageName('acme ui')               // returns 'Package name must be lowercase...'
 * validatePackageName('@/ui')                  // returns error message
 * validatePackageName('@company/')             // returns error message
 * validatePackageName('ab')                    // returns 'Package name must be at least 3 characters'
 * validatePackageName('пакет')                 // returns 'Package name contains non-ASCII characters...'
 */
export function validatePackageName(name: string): boolean | string {
  // Check if empty
  if (!name || name.trim().length === 0) {
    return 'Package name cannot be empty'
  }

  // Check length (npm maximum is 214 characters)
  if (name.length > 214) {
    return 'Package name must be 214 characters or less'
  }

  // Check minimum length (security enhancement to prevent single-char packages)
  if (name.length < 3) {
    return 'Package name must be at least 3 characters'
  }

  // Check for non-ASCII characters (security enhancement to prevent typosquatting)
  // eslint-disable-next-line no-control-regex
  if (/[^\x00-\x7F]/.test(name)) {
    return 'Package name contains non-ASCII characters which may cause issues'
  }

  // Check if lowercase only
  if (name !== name.toLowerCase()) {
    return 'Package name must be lowercase (no uppercase letters allowed)'
  }

  // Check if starts with dot or underscore
  if (name.startsWith('.') || name.startsWith('_')) {
    return 'Package name cannot start with a dot or underscore'
  }

  // Check for scoped package format
  if (name.startsWith('@')) {
    const scopeMatch = name.match(/^@([^/]+)\/(.+)$/)
    if (!scopeMatch) {
      return 'Scoped package must follow format: @scope/package-name'
    }

    const [, scope, packagePart] = scopeMatch

    if (!scope || scope.length === 0) {
      return 'Scoped package must have a non-empty scope'
    }

    if (!packagePart || packagePart.length === 0) {
      return 'Scoped package must have a non-empty package name after the slash'
    }

    // Validate that scope and package name don't start with dot or underscore
    if (scope.startsWith('.') || scope.startsWith('_')) {
      return 'Scope cannot start with a dot or underscore'
    }

    if (packagePart.startsWith('.') || packagePart.startsWith('_')) {
      return 'Package name part cannot start with a dot or underscore'
    }
  }

  // Check for valid characters (lowercase letters, digits, hyphens, dots, underscores, tildes)
  // For scoped packages, @ and / are also allowed
  const validPattern = /^(@[a-z0-9-_.~]+\/)?[a-z0-9-_.~]+$/
  if (!validPattern.test(name)) {
    return 'Package name can only contain lowercase letters, digits, hyphens, dots, underscores, and tildes'
  }

  return true
}

/**
 * Validates a hexadecimal colour code.
 *
 * Accepts 3-digit or 6-digit hex colour codes with a leading hash symbol.
 * Case-insensitive (accepts both uppercase and lowercase hex digits).
 *
 * Valid formats:
 * - 3-digit: #RGB (e.g., #fff, #abc)
 * - 6-digit: #RRGGBB (e.g., #ffffff, #3b82f6)
 *
 * Invalid formats:
 * - Missing hash symbol (e.g., "3b82f6")
 * - Wrong length (e.g., 4 or 5 digits)
 * - Invalid hex digits (non-0-9, a-f characters)
 * - Special characters or spaces in the code
 *
 * @param {string} colour - The hex colour to validate (e.g., "#3b82f6" or "#fff")
 * @returns {boolean|string} - Returns true if valid, or error message string if invalid
 *
 * @example
 * validateHexColour('#3b82f6')     // returns true (6-digit, lowercase)
 * validateHexColour('#FFFFFF')     // returns true (6-digit, uppercase)
 * validateHexColour('#FfF')        // returns true (3-digit, mixed case)
 * validateHexColour('3b82f6')      // returns 'Colour must be a valid hex code...'
 * validateHexColour('#gggggg')     // returns 'Colour must be a valid hex code...'
 * validateHexColour('#3b82f')      // returns 'Colour must be a valid hex code...'
 */
export function validateHexColour(colour: string): boolean | string {
  // Check if empty
  if (!colour || colour.trim().length === 0) {
    return 'Colour must be a valid hex code (e.g., #3b82f6 or #fff)'
  }

  // Trim whitespace
  const trimmedColour = colour.trim()

  // Check if starts with hash
  if (!trimmedColour.startsWith('#')) {
    return 'Colour must be a valid hex code starting with # (e.g., #3b82f6 or #fff)'
  }

  // Extract hex part (without the #)
  const hexPart = trimmedColour.slice(1)

  // Check length (must be 3 or 6 characters)
  if (hexPart.length !== 3 && hexPart.length !== 6) {
    return 'Colour must be a valid hex code with 3 or 6 digits (e.g., #3b82f6 or #fff)'
  }

  // Check if all characters are valid hex digits (0-9, a-f, A-F)
  const validHexPattern = /^[0-9a-fA-F]+$/
  if (!validHexPattern.test(hexPart)) {
    return 'Colour must be a valid hex code with only hex digits (0-9, a-f, A-F)'
  }

  return true
}

/**
 * Validates a description string.
 *
 * Rules:
 * - Cannot be empty (must have at least one non-whitespace character)
 * - Cannot be whitespace-only (spaces, tabs, newlines)
 * - Maximum length: 500 characters
 * - Accepts special characters, numbers, emojis, and punctuation
 * - Leading and trailing whitespace is trimmed before validation
 *
 * Uses helper functions to avoid code duplication.
 *
 * @param {string} description - The description to validate
 * @returns {boolean|string} - Returns true if valid, or error message string if invalid
 *
 * @example
 * validateDescription('A design system')                                    // returns true
 * validateDescription('Design system v2.0 for 2026')                        // returns true
 * validateDescription("Acme's design system for web & mobile")              // returns true
 * validateDescription('Design system 🎨')                                   // returns true
 * validateDescription('')                                                   // returns 'Description cannot be empty'
 * validateDescription('   ')                                                // returns 'Description cannot be empty'
 * validateDescription('a'.repeat(501))                                      // returns 'Description must be 500 characters or less'
 */
export function validateDescription(description: string): boolean | string {
  // Check if empty using helper function
  const emptyCheck = validateNonEmpty(description, 'Description')
  if (emptyCheck !== true) return emptyCheck

  // Check maximum length using helper function
  const lengthCheck = validateMaxLength(description, 500, 'Description')
  if (lengthCheck !== true) return lengthCheck

  return true
}

/**
 * Validates a client or company name.
 *
 * Rules:
 * - Cannot be empty (must have at least one non-whitespace character)
 * - Cannot be whitespace-only (spaces, tabs, newlines)
 * - Maximum length: 100 characters
 * - Accepts letters, numbers, spaces, and special characters (apostrophes, hyphens, ampersands, etc.)
 * - Leading and trailing whitespace is trimmed before validation
 *
 * Uses helper functions to avoid code duplication.
 *
 * @param {string} name - The client name to validate
 * @returns {boolean|string} - Returns true if valid, or error message string if invalid
 *
 * @example
 * validateClientName('Acme')                          // returns true
 * validateClientName('Acme Corporation')              // returns true
 * validateClientName('Hewlett-Packard')               // returns true
 * validateClientName("O'Reilly Media")                // returns true
 * validateClientName('Smith & Co.')                   // returns true
 * validateClientName('3M Corporation')                // returns true
 * validateClientName('The Walt Disney Company')       // returns true
 * validateClientName('')                              // returns 'Client name cannot be empty'
 * validateClientName('   ')                           // returns 'Client name cannot be empty'
 * validateClientName('A'.repeat(101))                 // returns 'Client name must be 100 characters or less'
 */
export function validateClientName(name: string): boolean | string {
  // Check if empty using helper function
  const emptyCheck = validateNonEmpty(name, 'Client name')
  if (emptyCheck !== true) return emptyCheck

  // Check maximum length using helper function
  const lengthCheck = validateMaxLength(name, 100, 'Client name')
  if (lengthCheck !== true) return lengthCheck

  return true
}
