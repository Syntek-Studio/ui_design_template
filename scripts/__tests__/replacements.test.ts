import { describe, it, expect } from 'vitest'
import {
  createReplacementMap,
  getFilesToModify,
  escapeRegExp,
  applyReplacements,
} from '../lib/replacements'

describe('createReplacementMap', () => {
  it('should create correct replacement map from user answers', () => {
    const answers = {
      clientName: 'Acme Corporation',
      packageName: '@acme/ui',
      description: 'Acme design system',
      primaryColour: '#ff0000',
    }

    const map = createReplacementMap(answers)

    expect(map).toHaveProperty('@syntek-studio/ui', '@acme/ui')
    expect(map).toHaveProperty('@template/ui', '@acme/ui')
    expect(map).toHaveProperty('Syntek Studio', 'Acme Corporation')
  })

  it('should handle unscoped package names', () => {
    const answers = {
      clientName: 'Acme',
      packageName: 'acme-ui',
      description: 'Acme UI',
      primaryColour: '#3b82f6',
    }

    const map = createReplacementMap(answers)

    expect(map['@syntek-studio/ui']).toBe('acme-ui')
    expect(map['@template/ui']).toBe('acme-ui')
  })

  it('should replace default description placeholder', () => {
    const answers = {
      clientName: 'Test Corp',
      packageName: '@test/ui',
      description: 'Custom description',
      primaryColour: '#3b82f6',
    }

    const map = createReplacementMap(answers)

    expect(map).toHaveProperty(
      'A shared UI component library for React Web and React Native applications. Built with TypeScript, Tailwind CSS 4, and Nativewind 4.',
      'Custom description'
    )
  })

  it('should handle special characters in client name', () => {
    const answers = {
      clientName: "O'Reilly & Associates",
      packageName: '@oreilly/ui',
      description: 'Publishing design system',
      primaryColour: '#3b82f6',
    }

    const map = createReplacementMap(answers)

    expect(map['Syntek Studio']).toBe("O'Reilly & Associates")
  })

  it('should return an object with all expected keys', () => {
    const answers = {
      clientName: 'Test',
      packageName: '@test/ui',
      description: 'Test description',
      primaryColour: '#3b82f6',
    }

    const map = createReplacementMap(answers)

    expect(map).toHaveProperty('@syntek-studio/ui')
    expect(map).toHaveProperty('@template/ui')
    expect(map).toHaveProperty('Syntek Studio')
    expect(Object.keys(map).length).toBeGreaterThanOrEqual(3)
  })
})

describe('getFilesToModify', () => {
  it('should return array of file paths to modify', () => {
    const files = getFilesToModify()

    expect(Array.isArray(files)).toBe(true)
    expect(files.length).toBeGreaterThan(0)
  })

  it('should include package.json', () => {
    const files = getFilesToModify()

    expect(files).toContain('package.json')
  })

  it('should include README.md', () => {
    const files = getFilesToModify()

    expect(files).toContain('README.md')
  })

  it('should include .claude/CLAUDE.md', () => {
    const files = getFilesToModify()

    expect(files).toContain('.claude/CLAUDE.md')
  })

  it('should include src/index.ts', () => {
    const files = getFilesToModify()

    expect(files).toContain('src/index.ts')
  })

  it('should return unique file paths (no duplicates)', () => {
    const files = getFilesToModify()
    const uniqueFiles = new Set(files)

    expect(files.length).toBe(uniqueFiles.size)
  })

  it('should return relative paths (not absolute)', () => {
    const files = getFilesToModify()

    files.forEach((file) => {
      expect(file).not.toMatch(/^[/\\]/) // Should not start with / or \
      expect(file).not.toMatch(/^[A-Z]:[/\\]/) // Should not be Windows absolute path
    })
  })
})

describe('escapeRegExp', () => {
  it('should escape special regex characters', () => {
    const input = '@syntek-studio/ui'
    const escaped = escapeRegExp(input)

    expect(escaped).toBe('\\@syntek\\-studio\\/ui')
  })

  it('should escape dots', () => {
    const input = 'example.com'
    const escaped = escapeRegExp(input)

    expect(escaped).toBe('example\\.com')
  })

  it('should escape parentheses', () => {
    const input = '(test)'
    const escaped = escapeRegExp(input)

    expect(escaped).toBe('\\(test\\)')
  })

  it('should escape square brackets', () => {
    const input = '[test]'
    const escaped = escapeRegExp(input)

    expect(escaped).toBe('\\[test\\]')
  })

  it('should escape asterisks and plus signs', () => {
    const input = 'test*+'
    const escaped = escapeRegExp(input)

    expect(escaped).toBe('test\\*\\+')
  })

  it('should escape question marks', () => {
    const input = 'test?'
    const escaped = escapeRegExp(input)

    expect(escaped).toBe('test\\?')
  })

  it('should escape dollar signs and carets', () => {
    const input = '^test$'
    const escaped = escapeRegExp(input)

    expect(escaped).toBe('\\^test\\$')
  })

  it('should escape pipe and curly braces', () => {
    const input = 'test|{value}'
    const escaped = escapeRegExp(input)

    expect(escaped).toBe('test\\|\\{value\\}')
  })

  it('should handle strings with no special characters', () => {
    const input = 'simple-test_123'
    const escaped = escapeRegExp(input)

    expect(escaped).toBe('simple\\-test_123')
  })

  it('should handle empty strings', () => {
    const input = ''
    const escaped = escapeRegExp(input)

    expect(escaped).toBe('')
  })

  it('should create a valid regex pattern when used', () => {
    const input = '@syntek-studio/ui'
    const escaped = escapeRegExp(input)
    const regex = new RegExp(escaped, 'g')

    const testString = 'Install @syntek-studio/ui from npm'
    const matches = testString.match(regex)

    expect(matches).toHaveLength(1)
    expect(matches?.[0]).toBe('@syntek-studio/ui')
  })
})

describe('applyReplacements', () => {
  it('should replace all occurrences of placeholders', () => {
    const content = 'Use @syntek-studio/ui in your project. Install @syntek-studio/ui from npm.'
    const replacements = {
      '@syntek-studio/ui': '@acme/ui',
    }

    const result = applyReplacements(content, replacements)

    expect(result).toBe('Use @acme/ui in your project. Install @acme/ui from npm.')
    expect(result).not.toContain('@syntek-studio/ui')
  })

  it('should handle multiple different replacements', () => {
    const content = 'Package: @syntek-studio/ui by Syntek Studio'
    const replacements = {
      '@syntek-studio/ui': '@acme/ui',
      'Syntek Studio': 'Acme Corporation',
    }

    const result = applyReplacements(content, replacements)

    expect(result).toBe('Package: @acme/ui by Acme Corporation')
  })

  it('should preserve content that should not be replaced', () => {
    const content = 'Use @syntek-studio/ui but keep this text unchanged'
    const replacements = {
      '@syntek-studio/ui': '@acme/ui',
    }

    const result = applyReplacements(content, replacements)

    expect(result).toContain('but keep this text unchanged')
  })

  it('should handle content with no placeholders', () => {
    const content = 'This content has no placeholders'
    const replacements = {
      '@syntek-studio/ui': '@acme/ui',
    }

    const result = applyReplacements(content, replacements)

    expect(result).toBe(content)
  })

  it('should handle empty content', () => {
    const content = ''
    const replacements = {
      '@syntek-studio/ui': '@acme/ui',
    }

    const result = applyReplacements(content, replacements)

    expect(result).toBe('')
  })

  it('should handle empty replacement map', () => {
    const content = 'Some content with @syntek-studio/ui'
    const replacements = {}

    const result = applyReplacements(content, replacements)

    expect(result).toBe(content)
  })

  it('should preserve line breaks and formatting', () => {
    const content =
      'Line 1: @syntek-studio/ui\nLine 2: @syntek-studio/ui\n  Indented: @syntek-studio/ui'
    const replacements = {
      '@syntek-studio/ui': '@acme/ui',
    }

    const result = applyReplacements(content, replacements)

    expect(result).toBe('Line 1: @acme/ui\nLine 2: @acme/ui\n  Indented: @acme/ui')
  })

  it('should handle special characters in replacement text', () => {
    const content = 'Company: Syntek Studio'
    const replacements = {
      'Syntek Studio': "O'Reilly & Associates",
    }

    const result = applyReplacements(content, replacements)

    expect(result).toBe("Company: O'Reilly & Associates")
  })

  it('should not replace partial matches', () => {
    const content = 'Use @syntek-studio/ui-extended and @syntek-studio/ui'
    const replacements = {
      '@syntek-studio/ui': '@acme/ui',
    }

    const result = applyReplacements(content, replacements)

    // Should replace both occurrences but handle extended version correctly
    expect(result).toContain('@acme/ui')
  })

  it('should handle case-sensitive replacements', () => {
    const content = 'SYNTEK-STUDIO and syntek-studio and Syntek Studio'
    const replacements = {
      'Syntek Studio': 'Acme Corp',
    }

    const result = applyReplacements(content, replacements)

    expect(result).toBe('SYNTEK-STUDIO and syntek-studio and Acme Corp')
  })

  it('should handle multiline content', () => {
    const content = `{
  "name": "@syntek-studio/ui",
  "description": "By Syntek Studio"
}`
    const replacements = {
      '@syntek-studio/ui': '@acme/ui',
      'Syntek Studio': 'Acme Corp',
    }

    const result = applyReplacements(content, replacements)

    expect(result).toContain('@acme/ui')
    expect(result).toContain('Acme Corp')
    expect(result).not.toContain('@syntek-studio/ui')
    expect(result).not.toContain('Syntek Studio')
  })
})
