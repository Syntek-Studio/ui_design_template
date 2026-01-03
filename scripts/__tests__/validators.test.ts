/**
 * Test suite for validators module
 *
 * Tests all input validation functions used during template initialisation.
 * These validators ensure user input is valid before proceeding with replacements.
 *
 * Validators:
 * - validatePackageName: Ensures valid npm package name format
 * - validateHexColour: Ensures valid hex colour code (#RGB or #RRGGBB)
 * - validateDescription: Ensures description is non-empty and not too long
 * - validateClientName: Ensures client name is non-empty and not too long
 *
 * Each validator returns:
 * - true if input is valid
 * - Error message string (truthy) if input is invalid
 *
 * This allows the prompts to display specific error messages to the user.
 *
 * @module scripts/__tests__/validators.test
 */

import { describe, it, expect } from 'vitest'
import {
  validatePackageName,
  validateHexColour,
  validateDescription,
  validateClientName,
} from '../lib/validators'

/**
 * Test group: validatePackageName function
 *
 * Verifies that validatePackageName correctly validates npm package names.
 *
 * Valid package names:
 * - Scoped: @scope/package (lowercase letters, hyphens, underscores, dots, tildes, numbers)
 * - Unscoped: package (same character rules)
 * - Max 214 characters total
 *
 * Invalid package names:
 * - Uppercase letters (must be lowercase)
 * - Spaces
 * - Special characters except - . _ ~ (and @ for scopes)
 * - Starting with dot or underscore
 * - Too long (> 214 characters)
 * - Malformed scopes (@/ or @scope without package)
 * - Scopes without slash (@scopepackage)
 * - Empty string
 *
 * Tests organised by category:
 * - Valid Package Names: Common valid formats
 * - Invalid Package Names: Common invalid inputs
 * - Edge Cases: Boundary conditions and special scenarios
 */
describe('validatePackageName', () => {
  describe('Valid Package Names', () => {
    it('should accept valid scoped package names with lowercase letters', () => {
      expect(validatePackageName('@acme/ui')).toBe(true)
      expect(validatePackageName('@my-company/design-system')).toBe(true)
      expect(validatePackageName('@test/test')).toBe(true)
    })

    it('should accept valid unscoped package names', () => {
      expect(validatePackageName('acme-ui')).toBe(true)
      expect(validatePackageName('my-design-system')).toBe(true)
      expect(validatePackageName('test')).toBe(true)
    })

    it('should accept package names with hyphens', () => {
      expect(validatePackageName('@company-name/ui-kit')).toBe(true)
      expect(validatePackageName('company-ui-kit')).toBe(true)
    })

    it('should accept package names with dots', () => {
      expect(validatePackageName('@company/ui.kit')).toBe(true)
      expect(validatePackageName('company.ui.kit')).toBe(true)
    })

    it('should accept package names with underscores', () => {
      expect(validatePackageName('@company/ui_kit')).toBe(true)
      expect(validatePackageName('company_ui_kit')).toBe(true)
    })

    it('should accept package names with tildes', () => {
      expect(validatePackageName('@company/~ui')).toBe(true)
      expect(validatePackageName('~company-ui')).toBe(true)
    })

    it('should accept package names with numbers', () => {
      expect(validatePackageName('@company2/ui2')).toBe(true)
      expect(validatePackageName('company2-ui')).toBe(true)
    })
  })

  describe('Invalid Package Names', () => {
    it('should reject uppercase letters in scoped packages', () => {
      const result = validatePackageName('@Acme/ui')
      expect(result).not.toBe(true)
      expect(result).toContain('lowercase')
    })

    it('should reject uppercase letters in unscoped packages', () => {
      const result = validatePackageName('Acme-UI')
      expect(result).not.toBe(true)
      expect(result).toContain('lowercase')
    })

    it('should reject spaces in package names', () => {
      const result1 = validatePackageName('@acme/ui library')
      expect(result1).not.toBe(true)
      expect(result1).toContain('lowercase')

      const result2 = validatePackageName('acme ui')
      expect(result2).not.toBe(true)
      expect(result2).toContain('lowercase')
    })

    it('should reject names starting with a dot', () => {
      const result1 = validatePackageName('@company/.ui')
      expect(result1).not.toBe(true)

      const result2 = validatePackageName('.ui')
      expect(result2).not.toBe(true)
    })

    it('should reject names starting with an underscore', () => {
      const result1 = validatePackageName('@company/_ui')
      expect(result1).not.toBe(true)

      const result2 = validatePackageName('_ui')
      expect(result2).not.toBe(true)
    })

    it('should reject names over 214 characters', () => {
      const longName = '@scope/' + 'a'.repeat(210)
      const result = validatePackageName(longName)
      expect(result).not.toBe(true)
      expect(result).toContain('214 characters')
    })

    it('should reject malformed scoped package names (no scope)', () => {
      const result = validatePackageName('@/ui')
      expect(result).not.toBe(true)
    })

    it('should reject malformed scoped package names (no package)', () => {
      const result = validatePackageName('@company/')
      expect(result).not.toBe(true)
    })

    it('should reject scoped packages without slash', () => {
      const result = validatePackageName('@companyui')
      expect(result).not.toBe(true)
    })

    it('should reject empty package names', () => {
      const result = validatePackageName('')
      expect(result).not.toBe(true)
    })

    it('should reject package names with special characters', () => {
      const result1 = validatePackageName('@company/ui!')
      expect(result1).not.toBe(true)

      const result2 = validatePackageName('company$ui')
      expect(result2).not.toBe(true)

      const result3 = validatePackageName('@company/ui#kit')
      expect(result3).not.toBe(true)
    })
  })

  describe('Edge Cases', () => {
    it('should handle package names with multiple scopes (invalid)', () => {
      const result = validatePackageName('@scope1/@scope2/ui')
      expect(result).not.toBe(true)
    })

    it('should reject package names shorter than 3 characters (security)', () => {
      const result1 = validatePackageName('ab')
      expect(result1).not.toBe(true)
      expect(result1).toContain('at least 3 characters')

      const result2 = validatePackageName('a')
      expect(result2).not.toBe(true)
      expect(result2).toContain('at least 3 characters')
    })

    it('should accept minimum valid length package names', () => {
      expect(validatePackageName('abc')).toBe(true)
      expect(validatePackageName('@a/bcd')).toBe(true)
    })

    it('should handle exactly 214 characters', () => {
      const exactLength = '@s/' + 'a'.repeat(210)
      expect(validatePackageName(exactLength)).toBe(true)
    })
  })
})

/**
 * Test group: validateHexColour function
 *
 * Verifies that validateHexColour correctly validates hex colour codes.
 *
 * Valid hex colours:
 * - 6-digit format: #RRGGBB (e.g. #3b82f6, #ffffff)
 * - 3-digit format: #RGB (shorthand, e.g. #fff, #000)
 * - Case-insensitive (accepts uppercase, lowercase, mixed)
 * - Must start with # symbol
 *
 * Invalid hex colours:
 * - Missing # symbol
 * - Wrong length (1, 2, 4, 5, 7+ digits are all invalid)
 * - Non-hexadecimal digits (G-Z are invalid)
 * - Special characters (@, !, $, etc.)
 * - Spaces or whitespace
 * - Empty string
 * - Multiple # symbols
 *
 * Tests organised by category:
 * - Valid Hex Colours: Common valid formats
 * - Invalid Hex Colours: Common invalid inputs
 * - Edge Cases: Boundary conditions
 */
describe('validateHexColour', () => {
  describe('Valid Hex Colours', () => {
    it('should accept valid 6-digit hex colours (lowercase)', () => {
      expect(validateHexColour('#3b82f6')).toBe(true)
      expect(validateHexColour('#ffffff')).toBe(true)
      expect(validateHexColour('#000000')).toBe(true)
    })

    it('should accept valid 6-digit hex colours (uppercase)', () => {
      expect(validateHexColour('#3B82F6')).toBe(true)
      expect(validateHexColour('#FFFFFF')).toBe(true)
      expect(validateHexColour('#ABCDEF')).toBe(true)
    })

    it('should accept valid 6-digit hex colours (mixed case)', () => {
      expect(validateHexColour('#3b82F6')).toBe(true)
      expect(validateHexColour('#FfFfFf')).toBe(true)
    })

    it('should accept valid 3-digit hex colours (lowercase)', () => {
      expect(validateHexColour('#fff')).toBe(true)
      expect(validateHexColour('#000')).toBe(true)
      expect(validateHexColour('#abc')).toBe(true)
    })

    it('should accept valid 3-digit hex colours (uppercase)', () => {
      expect(validateHexColour('#FFF')).toBe(true)
      expect(validateHexColour('#ABC')).toBe(true)
    })

    it('should accept valid 3-digit hex colours (mixed case)', () => {
      expect(validateHexColour('#FfF')).toBe(true)
      expect(validateHexColour('#AbC')).toBe(true)
    })
  })

  describe('Invalid Hex Colours', () => {
    it('should reject colours without hash symbol', () => {
      const result1 = validateHexColour('3b82f6')
      expect(result1).not.toBe(true)
      expect(result1).toContain('hex code')

      const result2 = validateHexColour('fff')
      expect(result2).not.toBe(true)
      expect(result2).toContain('hex code')
    })

    it('should reject colours with invalid hex digits', () => {
      const result1 = validateHexColour('#gggggg')
      expect(result1).not.toBe(true)
      expect(result1).toContain('hex code')

      const result2 = validateHexColour('#xyz')
      expect(result2).not.toBe(true)
      expect(result2).toContain('hex code')
    })

    it('should reject colours with wrong length (4 digits)', () => {
      const result = validateHexColour('#ffff')
      expect(result).not.toBe(true)
      expect(result).toContain('hex code')
    })

    it('should reject colours with wrong length (5 digits)', () => {
      const result = validateHexColour('#fffff')
      expect(result).not.toBe(true)
      expect(result).toContain('hex code')
    })

    it('should reject colours with wrong length (7 digits)', () => {
      const result = validateHexColour('#fffffff')
      expect(result).not.toBe(true)
      expect(result).toContain('hex code')
    })

    it('should reject colours with wrong length (2 digits)', () => {
      const result = validateHexColour('#ff')
      expect(result).not.toBe(true)
      expect(result).toContain('hex code')
    })

    it('should reject colours with wrong length (1 digit)', () => {
      const result = validateHexColour('#f')
      expect(result).not.toBe(true)
      expect(result).toContain('hex code')
    })

    it('should reject empty strings', () => {
      const result = validateHexColour('')
      expect(result).not.toBe(true)
      expect(result).toContain('hex code')
    })

    it('should reject colours with special characters', () => {
      const result1 = validateHexColour('#3b82f$')
      expect(result1).not.toBe(true)
      expect(result1).toContain('hex code')

      const result2 = validateHexColour('#fff!')
      expect(result2).not.toBe(true)
      expect(result2).toContain('hex code')
    })

    it('should reject colours with spaces', () => {
      const result1 = validateHexColour('#fff fff')
      expect(result1).not.toBe(true)
      expect(result1).toContain('hex code')

      const result2 = validateHexColour('# ffffff')
      expect(result2).not.toBe(true)
      expect(result2).toContain('hex code')
    })
  })

  describe('Edge Cases', () => {
    it('should reject hash symbol only', () => {
      const result = validateHexColour('#')
      expect(result).not.toBe(true)
      expect(result).toContain('hex code')
    })

    it('should reject multiple hash symbols', () => {
      const result = validateHexColour('##ffffff')
      expect(result).not.toBe(true)
      expect(result).toContain('hex code')
    })
  })
})

/**
 * Test group: validateDescription function
 *
 * Verifies that validateDescription correctly validates project descriptions.
 *
 * Valid descriptions:
 * - Non-empty (at least 1 character)
 * - Max 500 characters
 * - Accepts any characters: letters, numbers, punctuation, emojis, unicode
 * - Can contain newlines and special characters
 * - Whitespace trimmed before validation
 *
 * Invalid descriptions:
 * - Empty string
 * - Whitespace-only (spaces, tabs, newlines)
 * - Over 500 characters
 *
 * Constraints:
 * - Minimum length: 1 character
 * - Maximum length: 500 characters
 *
 * Tests organised by category:
 * - Valid Descriptions: Typical acceptable inputs
 * - Invalid Descriptions: Unacceptable inputs
 * - Edge Cases: Boundary conditions (0, 1, 500, 501 characters)
 */
describe('validateDescription', () => {
  describe('Valid Descriptions', () => {
    it('should accept a simple description', () => {
      expect(validateDescription('A design system')).toBe(true)
    })

    it('should accept descriptions with special characters', () => {
      expect(validateDescription("Acme's design system for web & mobile")).toBe(true)
      expect(validateDescription('Design system (web + mobile)')).toBe(true)
    })

    it('should accept descriptions with numbers', () => {
      expect(validateDescription('Design system v2.0 for 2026')).toBe(true)
    })

    it('should accept descriptions with punctuation', () => {
      expect(validateDescription('A modern, responsive design system.')).toBe(true)
      expect(validateDescription('Design system - web and mobile!')).toBe(true)
    })

    it('should accept descriptions with newlines', () => {
      expect(validateDescription('Line 1\nLine 2')).toBe(true)
    })

    it('should accept single character descriptions', () => {
      expect(validateDescription('A')).toBe(true)
    })

    it('should accept exactly 500 characters', () => {
      const exactly500 = 'a'.repeat(500)
      expect(validateDescription(exactly500)).toBe(true)
    })

    it('should accept descriptions with emojis', () => {
      expect(validateDescription('Design system 🎨')).toBe(true)
    })
  })

  describe('Invalid Descriptions', () => {
    it('should reject empty descriptions', () => {
      const result = validateDescription('')
      expect(result).not.toBe(true)
      expect(result).toContain('cannot be empty')
    })

    it('should reject whitespace-only descriptions', () => {
      const result1 = validateDescription('   ')
      expect(result1).not.toBe(true)
      expect(result1).toContain('cannot be empty')

      const result2 = validateDescription('\t')
      expect(result2).not.toBe(true)
      expect(result2).toContain('cannot be empty')

      const result3 = validateDescription('\n')
      expect(result3).not.toBe(true)
      expect(result3).toContain('cannot be empty')
    })

    it('should reject descriptions over 500 characters', () => {
      const over500 = 'a'.repeat(501)
      const result = validateDescription(over500)
      expect(result).not.toBe(true)
      expect(result).toContain('500 characters')
    })

    it('should reject very long descriptions', () => {
      const veryLong = 'a'.repeat(1000)
      const result = validateDescription(veryLong)
      expect(result).not.toBe(true)
      expect(result).toContain('500 characters')
    })
  })

  describe('Edge Cases', () => {
    it('should trim whitespace before validation', () => {
      // Should trim leading/trailing whitespace
      expect(validateDescription('  Valid description  ')).toBe(true)
    })

    it('should handle descriptions with only whitespace in middle', () => {
      expect(validateDescription('Valid     description')).toBe(true)
    })
  })
})

/**
 * Test group: validateClientName function
 *
 * Verifies that validateClientName correctly validates client/company names.
 *
 * Valid client names:
 * - Non-empty (at least 1 character)
 * - Max 100 characters
 * - Accepts letters, numbers, spaces, punctuation
 * - Supports special characters: apostrophes, ampersands, hyphens, dots
 * - Examples: "Acme Corp", "O'Reilly Media", "AT&T"
 * - Whitespace trimmed before validation
 *
 * Invalid client names:
 * - Empty string
 * - Whitespace-only (spaces, tabs, newlines only)
 * - Over 100 characters
 *
 * Constraints:
 * - Minimum length: 1 character
 * - Maximum length: 100 characters
 *
 * Tests organised by category:
 * - Valid Client Names: Typical company names
 * - Invalid Client Names: Unacceptable inputs
 * - Edge Cases: Boundary conditions (1, 100, 101 characters)
 */
describe('validateClientName', () => {
  describe('Valid Client Names', () => {
    it('should accept simple client names', () => {
      expect(validateClientName('Acme')).toBe(true)
      expect(validateClientName('Acme Corporation')).toBe(true)
    })

    it('should accept client names with special characters', () => {
      expect(validateClientName("O'Reilly Media")).toBe(true)
      expect(validateClientName('Smith & Co.')).toBe(true)
      expect(validateClientName('AT&T')).toBe(true)
    })

    it('should accept client names with numbers', () => {
      expect(validateClientName('3M Corporation')).toBe(true)
      expect(validateClientName('Company 123')).toBe(true)
    })

    it('should accept client names with hyphens', () => {
      expect(validateClientName('Hewlett-Packard')).toBe(true)
      expect(validateClientName('Procter & Gamble')).toBe(true)
    })

    it('should accept client names with multiple words', () => {
      expect(validateClientName('The Walt Disney Company')).toBe(true)
    })

    it('should accept exactly 100 characters', () => {
      const exactly100 = 'A'.repeat(100)
      expect(validateClientName(exactly100)).toBe(true)
    })
  })

  describe('Invalid Client Names', () => {
    it('should reject empty client names', () => {
      const result = validateClientName('')
      expect(result).not.toBe(true)
      expect(result).toContain('cannot be empty')
    })

    it('should reject whitespace-only client names', () => {
      const result = validateClientName('   ')
      expect(result).not.toBe(true)
      expect(result).toContain('cannot be empty')
    })

    it('should reject client names over 100 characters', () => {
      const over100 = 'A'.repeat(101)
      const result = validateClientName(over100)
      expect(result).not.toBe(true)
      expect(result).toContain('100 characters')
    })
  })

  describe('Edge Cases', () => {
    it('should trim whitespace before validation', () => {
      expect(validateClientName('  Acme Corp  ')).toBe(true)
    })

    it('should accept single character names', () => {
      expect(validateClientName('X')).toBe(true)
    })
  })
})
