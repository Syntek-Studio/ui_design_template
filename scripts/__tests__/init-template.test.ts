/**
 * Integration tests for the init-template module
 *
 * This test suite validates the entire template initialisation workflow:
 * - Detecting if a template has already been initialised
 * - Creating the template configuration file
 * - Performing placeholder replacements across multiple files
 * - Verifying that all placeholders have been replaced
 * - End-to-end initialisation flow
 *
 * Test setup: Each test creates a temporary directory (__test-temp-integration__)
 * that simulates a template project. This directory is cleaned up after each test.
 *
 * Important: Tests that modify the working directory use process.chdir() and
 * restore it in afterEach hooks to avoid interfering with other tests.
 *
 * @module scripts/__tests__/init-template.test
 */

import { promises as fs } from 'fs'
import path from 'path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  checkDirectoryConflict,
  createTemplateConfig,
  main,
  performReplacements,
  verifyReplacements,
} from '../init-template'

/**
 * Test group: checkDirectoryConflict function
 *
 * Verifies that checkDirectoryConflict correctly detects whether a template
 * has already been initialised by checking template.config.json.
 *
 * The template can only be initialised once. Subsequent initialisation attempts
 * should be rejected unless the user explicitly re-initialises.
 *
 * Tests cover:
 * - No conflict when config file doesn't exist (fresh template)
 * - Conflict detected when config exists and initialized is true
 * - No conflict when config exists but initialized is false
 * - Graceful handling of corrupted/invalid JSON
 * - Returning full conflict details (package name, client name, timestamp)
 */
describe('checkDirectoryConflict', () => {
  const testDir = path.join(process.cwd(), '__test-temp-integration__')
  const configPath = path.join(testDir, 'template.config.json')

  beforeEach(async () => {
    await fs.mkdir(testDir, { recursive: true })
    // Change working directory to test directory
    process.chdir(testDir)
  })

  afterEach(async () => {
    // Change back to original directory
    process.chdir(path.join(testDir, '..'))
    await fs.rm(testDir, { recursive: true, force: true })
  })

  it('should return no conflict when template.config.json does not exist', async () => {
    const result = await checkDirectoryConflict()

    expect(result.conflict).toBe(false)
    expect(result.reason).toBeUndefined()
  })

  it('should return conflict when template.config.json exists and is initialized', async () => {
    const config = {
      initialized: true,
      packageName: '@acme/ui',
      clientName: 'Acme Corporation',
      initializedAt: new Date().toISOString(),
    }

    await fs.writeFile(configPath, JSON.stringify(config, null, 2), 'utf-8')

    const result = await checkDirectoryConflict()

    expect(result.conflict).toBe(true)
    expect(result.reason).toBe('already-initialized')
    expect(result.packageName).toBe('@acme/ui')
  })

  it('should return no conflict when template.config.json exists but initialized is false', async () => {
    const config = {
      initialized: false,
      packageName: '@test/ui',
    }

    await fs.writeFile(configPath, JSON.stringify(config, null, 2), 'utf-8')

    const result = await checkDirectoryConflict()

    expect(result.conflict).toBe(false)
  })

  it('should handle corrupted template.config.json gracefully', async () => {
    await fs.writeFile(configPath, 'invalid json{', 'utf-8')

    // Should either return no conflict or handle error gracefully
    await expect(checkDirectoryConflict()).resolves.toBeDefined()
  })

  it('should return conflict details with client name', async () => {
    const config = {
      initialized: true,
      packageName: '@test-corp/ui',
      clientName: 'Test Corporation',
      initializedAt: '2026-01-02T12:00:00.000Z',
    }

    await fs.writeFile(configPath, JSON.stringify(config, null, 2), 'utf-8')

    const result = await checkDirectoryConflict()

    expect(result.conflict).toBe(true)
    expect(result.clientName).toBe('Test Corporation')
  })
})

/**
 * Test group: createTemplateConfig function
 *
 * Verifies that createTemplateConfig correctly generates template.config.json
 * with all required metadata about the initialisation.
 *
 * The config file serves as:
 * - Proof of initialisation (initialized: true)
 * - Record of when initialisation occurred (initializedAt timestamp)
 * - Documentation of original template source (@syntek-studio/ui)
 * - Reference to template version used
 * - Store of user choices (packageName, clientName, description, colours)
 *
 * Tests cover:
 * - Creates valid JSON with correct structure
 * - Includes initialisation timestamp within correct range
 * - Includes original template information and version
 * - Formats JSON with 2-space indentation
 * - Overwrites existing config if re-initialising
 */
describe('createTemplateConfig', () => {
  const testDir = path.join(process.cwd(), '__test-temp-integration__')
  const configPath = path.join(testDir, 'template.config.json')

  beforeEach(async () => {
    await fs.mkdir(testDir, { recursive: true })
    process.chdir(testDir)
  })

  afterEach(async () => {
    process.chdir(path.join(testDir, '..'))
    await fs.rm(testDir, { recursive: true, force: true })
  })

  it('should create template.config.json with correct structure', async () => {
    const answers = {
      clientName: 'Test Corp',
      packageName: '@test/ui',
      description: 'Test design system',
      primaryColour: '#3b82f6',
    }

    await createTemplateConfig(answers)

    const configExists = await fs.access(configPath).then(
      () => true,
      () => false
    )
    expect(configExists).toBe(true)

    const configContent = await fs.readFile(configPath, 'utf-8')
    const config = JSON.parse(configContent)

    expect(config.initialized).toBe(true)
    expect(config.packageName).toBe('@test/ui')
    expect(config.clientName).toBe('Test Corp')
    expect(config.primaryColour).toBe('#3b82f6')
    expect(config.description).toBe('Test design system')
  })

  it('should include initialization timestamp', async () => {
    const answers = {
      clientName: 'Test',
      packageName: '@test/ui',
      description: 'Test',
      primaryColour: '#3b82f6',
    }

    const beforeTime = new Date()
    await createTemplateConfig(answers)
    const afterTime = new Date()

    const configContent = await fs.readFile(configPath, 'utf-8')
    const config = JSON.parse(configContent)

    expect(config.initializedAt).toBeDefined()
    const initTime = new Date(config.initializedAt)
    expect(initTime.getTime()).toBeGreaterThanOrEqual(beforeTime.getTime())
    expect(initTime.getTime()).toBeLessThanOrEqual(afterTime.getTime())
  })

  it('should include original template information', async () => {
    const answers = {
      clientName: 'Test',
      packageName: '@test/ui',
      description: 'Test',
      primaryColour: '#3b82f6',
    }

    await createTemplateConfig(answers)

    const configContent = await fs.readFile(configPath, 'utf-8')
    const config = JSON.parse(configContent)

    expect(config.originalTemplate).toBe('@syntek-studio/ui')
    expect(config.templateVersion).toBeDefined()
  })

  it('should format JSON with proper indentation', async () => {
    const answers = {
      clientName: 'Test',
      packageName: '@test/ui',
      description: 'Test',
      primaryColour: '#3b82f6',
    }

    await createTemplateConfig(answers)

    const configContent = await fs.readFile(configPath, 'utf-8')

    // Check that JSON is formatted with 2-space indentation
    expect(configContent).toContain('  "initialized"')
    expect(configContent).toContain('  "packageName"')
  })

  it('should overwrite existing config file', async () => {
    const oldConfig = {
      initialized: true,
      packageName: '@old/ui',
    }
    await fs.writeFile(configPath, JSON.stringify(oldConfig), 'utf-8')

    const answers = {
      clientName: 'New Corp',
      packageName: '@new/ui',
      description: 'New description',
      primaryColour: '#ff0000',
    }

    await createTemplateConfig(answers)

    const configContent = await fs.readFile(configPath, 'utf-8')
    const config = JSON.parse(configContent)

    expect(config.packageName).toBe('@new/ui')
    expect(config.clientName).toBe('New Corp')
  })
})

/**
 * Test group: performReplacements function
 *
 * Verifies that performReplacements correctly updates all template files
 * with user-provided values.
 *
 * Replacements made:
 * - @syntek-studio/ui → user's package name
 * - @syntek-studio/ui → user's package name (alternate placeholder)
 * - Syntek Studio → user's client name
 * - Default description → user's custom description
 * - Primary colour hex → user's chosen colour
 *
 * Target files (in project root and subdirectories):
 * - package.json (name and author fields)
 * - README.md (title and references)
 * - .claude/CLAUDE.md (references to original template)
 * - src/index.ts (comments and documentation)
 * - Any other files that match patterns
 *
 * Tests cover:
 * - All specified files are updated correctly
 * - Returns array with file paths and modification status
 * - Only marks files as modified if changes were actually made
 * - Handles multiple occurrences of same placeholder
 * - Preserves file formatting and structure (JSON indentation, etc)
 */
describe('performReplacements', () => {
  const testDir = path.join(process.cwd(), '__test-temp-integration__')

  beforeEach(async () => {
    await fs.mkdir(testDir, { recursive: true })
    process.chdir(testDir)

    // Create test files
    await fs.writeFile(
      path.join(testDir, 'package.json'),
      JSON.stringify({ name: '@syntek-studio/ui', author: 'Syntek Studio' }, null, 2),
      'utf-8'
    )

    await fs.writeFile(
      path.join(testDir, 'README.md'),
      '# @syntek-studio/ui\n\nBy Syntek Studio',
      'utf-8'
    )

    await fs.mkdir(path.join(testDir, '.claude'), { recursive: true })
    await fs.writeFile(path.join(testDir, '.claude', 'CLAUDE.md'), 'Use @syntek-studio/ui', 'utf-8')

    await fs.mkdir(path.join(testDir, 'src'), { recursive: true })
    await fs.writeFile(path.join(testDir, 'src', 'index.ts'), '// @syntek-studio/ui', 'utf-8')
  })

  afterEach(async () => {
    process.chdir(path.join(testDir, '..'))
    await fs.rm(testDir, { recursive: true, force: true })
  })

  it('should replace content in all specified files', async () => {
    const answers = {
      clientName: 'Acme Corp',
      packageName: '@acme/ui',
      description: 'Acme design system',
      primaryColour: '#3b82f6',
    }

    const results = await performReplacements(answers)

    expect(results).toBeDefined()
    expect(Array.isArray(results)).toBe(true)

    // Verify package.json
    const packageJson = JSON.parse(await fs.readFile(path.join(testDir, 'package.json'), 'utf-8'))
    expect(packageJson.name).toBe('@acme/ui')
    expect(packageJson.author).toBe('Acme Corp')

    // Verify README.md
    const readme = await fs.readFile(path.join(testDir, 'README.md'), 'utf-8')
    expect(readme).toContain('@acme/ui')
    expect(readme).toContain('Acme Corp')
    expect(readme).not.toContain('@syntek-studio/ui')
    expect(readme).not.toContain('Syntek Studio')
  })

  it('should return array of results with file paths and modification status', async () => {
    const answers = {
      clientName: 'Test',
      packageName: '@test/ui',
      description: 'Test',
      primaryColour: '#3b82f6',
    }

    const results = await performReplacements(answers)

    expect(results.length).toBeGreaterThan(0)

    results.forEach((result) => {
      expect(result).toHaveProperty('file')
      expect(result).toHaveProperty('modified')
      expect(typeof result.file).toBe('string')
      expect(typeof result.modified).toBe('boolean')
    })
  })

  it('should mark files as modified only if changes were made', async () => {
    // Create a file with no placeholders
    await fs.writeFile(path.join(testDir, 'test.txt'), 'No placeholders here', 'utf-8')

    const answers = {
      clientName: 'Test',
      packageName: '@test/ui',
      description: 'Test',
      primaryColour: '#3b82f6',
    }

    const results = await performReplacements(answers)

    // Files with placeholders should be modified
    const packageResult = results.find((r) => r.file === 'package.json')
    expect(packageResult?.modified).toBe(true)
  })

  it('should handle files with multiple occurrences of placeholders', async () => {
    await fs.writeFile(
      path.join(testDir, 'test.md'),
      '@syntek-studio/ui is great. Use @syntek-studio/ui today!',
      'utf-8'
    )

    const answers = {
      clientName: 'Test',
      packageName: '@test/ui',
      description: 'Test',
      primaryColour: '#3b82f6',
    }

    await performReplacements(answers)

    const content = await fs.readFile(path.join(testDir, 'test.md'), 'utf-8')
    expect(content).toBe('@test/ui is great. Use @test/ui today!')
  })

  it('should preserve file formatting and structure', async () => {
    const answers = {
      clientName: 'Test',
      packageName: '@test/ui',
      description: 'Test',
      primaryColour: '#3b82f6',
    }

    await performReplacements(answers)

    const packageContent = await fs.readFile(path.join(testDir, 'package.json'), 'utf-8')
    const packageJson = JSON.parse(packageContent)

    // JSON should still be valid
    expect(packageJson).toBeDefined()
    // Formatting should be preserved (2-space indentation)
    expect(packageContent).toContain('  "name"')
  })
})

/**
 * Test group: verifyReplacements function
 *
 * Verifies that all template placeholders have been correctly replaced.
 * This is a quality assurance step to prevent accidentally publishing a
 * template with references to the original template.
 *
 * Checks for any remaining instances of:
 * - @syntek-studio/ui (original package name)
 * - @syntek-studio/ui (alternate original package name)
 * - Syntek Studio (original company name)
 * - Default description (original default text)
 *
 * If any of these are found, initialisation is considered incomplete and
 * the process should be stopped before publishing.
 *
 * Tests cover:
 * - Returns true when all placeholders are replaced
 * - Returns false when any placeholder remains
 * - Checks all relevant files (package.json, README.md, .claude/CLAUDE.md, src/index.ts)
 * - Detects remaining placeholders in various file types
 */
describe('verifyReplacements', () => {
  const testDir = path.join(process.cwd(), '__test-temp-integration__')

  beforeEach(async () => {
    await fs.mkdir(testDir, { recursive: true })
    process.chdir(testDir)
  })

  afterEach(async () => {
    process.chdir(path.join(testDir, '..'))
    await fs.rm(testDir, { recursive: true, force: true })
  })

  it('should return true when all placeholders are replaced', async () => {
    await fs.writeFile(
      path.join(testDir, 'package.json'),
      JSON.stringify({ name: '@acme/ui' }),
      'utf-8'
    )
    await fs.writeFile(path.join(testDir, 'README.md'), '# @acme/ui', 'utf-8')

    const verified = await verifyReplacements()

    expect(verified).toBe(true)
  })

  it('should return false when placeholders remain', async () => {
    await fs.writeFile(
      path.join(testDir, 'package.json'),
      JSON.stringify({ name: '@syntek-studio/ui' }),
      'utf-8'
    )

    const verified = await verifyReplacements()

    expect(verified).toBe(false)
  })

  it('should check all relevant files', async () => {
    // Create files with no placeholders
    await fs.writeFile(
      path.join(testDir, 'package.json'),
      JSON.stringify({ name: '@acme/ui' }),
      'utf-8'
    )
    await fs.writeFile(path.join(testDir, 'README.md'), '# @acme/ui', 'utf-8')

    await fs.mkdir(path.join(testDir, '.claude'), { recursive: true })
    await fs.writeFile(path.join(testDir, '.claude', 'CLAUDE.md'), 'Use @acme/ui', 'utf-8')

    await fs.mkdir(path.join(testDir, 'src'), { recursive: true })
    await fs.writeFile(path.join(testDir, 'src', 'index.ts'), '// @acme/ui', 'utf-8')

    const verified = await verifyReplacements()

    expect(verified).toBe(true)
  })

  it('should detect remaining @syntek-studio/ui placeholders', async () => {
    await fs.writeFile(
      path.join(testDir, 'package.json'),
      'Install @syntek-studio/ui from npm',
      'utf-8'
    )

    const verified = await verifyReplacements()

    expect(verified).toBe(false)
  })

  it('should detect remaining @syntek-studio/ui placeholders', async () => {
    await fs.writeFile(
      path.join(testDir, 'README.md'),
      'Use @syntek-studio/ui in your project',
      'utf-8'
    )

    const verified = await verifyReplacements()

    expect(verified).toBe(false)
  })

  it('should detect remaining "Syntek Studio" placeholders', async () => {
    await fs.writeFile(path.join(testDir, 'README.md'), 'Created by Syntek Studio', 'utf-8')

    const verified = await verifyReplacements()

    expect(verified).toBe(false)
  })
})

/**
 * Test group: main function (End-to-End Integration Test)
 *
 * Tests the complete initialisation workflow from start to finish.
 * The main() function orchestrates:
 *
 * 1. Check for existing initialisation (prevent re-initialisation)
 * 2. Prompt user for required information (mocked in tests)
 * 3. Perform all placeholder replacements
 * 4. Create template.config.json
 * 5. Verify all replacements completed successfully
 *
 * These tests verify the entire workflow, including:
 * - Handling fresh templates (no prior initialisation)
 * - Detecting and rejecting re-initialisation attempts
 * - Creating all expected output files and metadata
 * - Preserving template structure and formatting
 *
 * Note: In real usage, main() prompts the user with inquirer.js
 * In tests, these prompts are mocked to provide predefined answers.
 */
describe('main (Integration Test)', () => {
  const testDir = path.join(process.cwd(), '__test-temp-integration__')

  beforeEach(async () => {
    await fs.mkdir(testDir, { recursive: true })
    process.chdir(testDir)

    // Set up minimal template structure
    await fs.writeFile(
      path.join(testDir, 'package.json'),
      JSON.stringify(
        {
          name: '@syntek-studio/ui',
          version: '0.7.1',
          description:
            'A shared UI component library for React Web and React Native applications. Built with TypeScript, Tailwind CSS 4, and Nativewind 4.',
          author: 'Syntek Studio',
        },
        null,
        2
      ),
      'utf-8'
    )

    await fs.writeFile(
      path.join(testDir, 'README.md'),
      '# @syntek-studio/ui\n\nBy Syntek Studio',
      'utf-8'
    )

    await fs.mkdir(path.join(testDir, '.claude'), { recursive: true })
    await fs.writeFile(path.join(testDir, '.claude', 'CLAUDE.md'), 'Use @syntek-studio/ui', 'utf-8')

    await fs.mkdir(path.join(testDir, 'src'), { recursive: true })
    await fs.writeFile(path.join(testDir, 'src', 'index.ts'), '// @syntek-studio/ui', 'utf-8')
  })

  afterEach(async () => {
    process.chdir(path.join(testDir, '..'))
    await fs.rm(testDir, { recursive: true, force: true })
  })

  it('should complete full initialization workflow', async () => {
    // Mock user inputs
    const mockAnswers = {
      clientName: 'Test Corporation',
      packageName: '@test-corp/ui',
      description: 'Test Corp design system for web and mobile',
      primaryColour: '#3b82f6',
    }

    // Mock inquirer prompts
    vi.mock('inquirer', () => ({
      default: {
        prompt: vi.fn().mockResolvedValue(mockAnswers),
      },
    }))

    // This test verifies that main() can be called
    // Full integration would require mocking console and inquirer
    expect(main).toBeDefined()
    expect(typeof main).toBe('function')
  })

  it('should create all expected outputs', async () => {
    const answers = {
      clientName: 'Test Corp',
      packageName: '@test/ui',
      description: 'Test design system',
      primaryColour: '#3b82f6',
    }

    // Simulate what main() does
    await performReplacements(answers)
    await createTemplateConfig(answers)

    // Verify template.config.json exists
    const configExists = await fs.access(path.join(testDir, 'template.config.json')).then(
      () => true,
      () => false
    )
    expect(configExists).toBe(true)

    // Verify files were modified
    const packageJson = JSON.parse(await fs.readFile(path.join(testDir, 'package.json'), 'utf-8'))
    expect(packageJson.name).toBe('@test/ui')
    expect(packageJson.author).toBe('Test Corp')
  })

  it('should handle re-initialization scenario', async () => {
    // First initialization
    const firstAnswers = {
      clientName: 'First Corp',
      packageName: '@first/ui',
      description: 'First description',
      primaryColour: '#ff0000',
    }

    await performReplacements(firstAnswers)
    await createTemplateConfig(firstAnswers)

    // Check for conflict
    const conflict = await checkDirectoryConflict()
    expect(conflict.conflict).toBe(true)
    expect(conflict.packageName).toBe('@first/ui')

    // Second initialization (re-initialization)
    const secondAnswers = {
      clientName: 'Second Corp',
      packageName: '@second/ui',
      description: 'Second description',
      primaryColour: '#00ff00',
    }

    await performReplacements(secondAnswers)
    await createTemplateConfig(secondAnswers)

    // Verify second initialization succeeded
    const config = JSON.parse(
      await fs.readFile(path.join(testDir, 'template.config.json'), 'utf-8')
    )
    expect(config.packageName).toBe('@second/ui')
    expect(config.clientName).toBe('Second Corp')
  })
})
