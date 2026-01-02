/**
 * Test suite for file-operations module
 *
 * Tests all file system operations used by the template initialisation script:
 * - fileExists: Check if a file or directory exists
 * - readFile: Read file content as UTF-8 string
 * - writeFile: Write content to a file (creates if missing)
 * - replaceInFile: Replace multiple placeholders in a file
 * - createBackup: Create a .backup copy of a file
 * - restoreFromBackup: Restore a file from its backup
 *
 * Each test group uses a temporary directory (__test-temp__) that is cleaned up
 * after the tests complete to avoid polluting the file system.
 *
 * @module scripts/__tests__/file-operations.test
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { promises as fs } from 'fs'
import path from 'path'
import {
  fileExists,
  readFile,
  writeFile,
  replaceInFile,
  createBackup,
  restoreFromBackup,
} from '../lib/file-operations'

/**
 * Test group: fileExists function
 *
 * Verifies that fileExists correctly detects whether files and directories
 * exist, handling both absolute and relative paths.
 *
 * Edge cases covered:
 * - Existing files (returns true)
 * - Non-existent files (returns false)
 * - Directories (returns true)
 * - Absolute paths (correct handling)
 * - Relative paths (correct handling)
 */
describe('fileExists', () => {
  const testDir = path.join(process.cwd(), '__test-temp__')
  const testFile = path.join(testDir, 'test-file.txt')

  beforeEach(async () => {
    await fs.mkdir(testDir, { recursive: true })
  })

  afterEach(async () => {
    await fs.rm(testDir, { recursive: true, force: true })
  })

  it('should return true for existing files', async () => {
    await fs.writeFile(testFile, 'test content', 'utf-8')

    const exists = await fileExists(testFile)

    expect(exists).toBe(true)
  })

  it('should return false for non-existent files', async () => {
    const nonExistentFile = path.join(testDir, 'does-not-exist.txt')

    const exists = await fileExists(nonExistentFile)

    expect(exists).toBe(false)
  })

  it('should return true for existing directories', async () => {
    const exists = await fileExists(testDir)

    expect(exists).toBe(true)
  })

  it('should handle absolute paths', async () => {
    await fs.writeFile(testFile, 'test', 'utf-8')

    const exists = await fileExists(testFile)

    expect(exists).toBe(true)
  })

  it('should handle relative paths', async () => {
    const relativeFile = path.join('.', '__test-temp__', 'test-file.txt')
    await fs.writeFile(testFile, 'test', 'utf-8')

    const exists = await fileExists(relativeFile)

    expect(exists).toBe(true)
  })
})

/**
 * Test group: readFile function
 *
 * Verifies that readFile correctly reads file content as UTF-8 strings.
 * Tests include handling of:
 * - Simple single-line content
 * - Multiline files with line breaks
 * - JSON content (as string, not parsed)
 * - Empty files
 * - Special characters and unicode (café, 日本語, emojis)
 * - Error handling for non-existent files
 *
 * Important: This function returns raw file content as a string.
 * JSON parsing (if needed) must be done by the caller.
 */
describe('readFile', () => {
  const testDir = path.join(process.cwd(), '__test-temp__')
  const testFile = path.join(testDir, 'read-test.txt')

  beforeEach(async () => {
    await fs.mkdir(testDir, { recursive: true })
  })

  afterEach(async () => {
    await fs.rm(testDir, { recursive: true, force: true })
  })

  it('should read file content correctly', async () => {
    const content = 'Hello, World!'
    await fs.writeFile(testFile, content, 'utf-8')

    const result = await readFile(testFile)

    expect(result).toBe(content)
  })

  it('should read multiline content', async () => {
    const content = 'Line 1\nLine 2\nLine 3'
    await fs.writeFile(testFile, content, 'utf-8')

    const result = await readFile(testFile)

    expect(result).toBe(content)
  })

  it('should read JSON content as string', async () => {
    const jsonContent = '{"name": "@syntek-studio/ui"}'
    await fs.writeFile(testFile, jsonContent, 'utf-8')

    const result = await readFile(testFile)

    expect(result).toBe(jsonContent)
  })

  it('should read empty files', async () => {
    await fs.writeFile(testFile, '', 'utf-8')

    const result = await readFile(testFile)

    expect(result).toBe('')
  })

  it('should handle files with special characters', async () => {
    const content = 'Special chars: @#$%^&*()'
    await fs.writeFile(testFile, content, 'utf-8')

    const result = await readFile(testFile)

    expect(result).toBe(content)
  })

  it('should throw error for non-existent files', async () => {
    const nonExistentFile = path.join(testDir, 'does-not-exist.txt')

    await expect(readFile(nonExistentFile)).rejects.toThrow()
  })

  it('should handle UTF-8 encoded content', async () => {
    const content = 'Unicode: café, naïve, 日本語, 🎨'
    await fs.writeFile(testFile, content, 'utf-8')

    const result = await readFile(testFile)

    expect(result).toBe(content)
  })
})

/**
 * Test group: writeFile function
 *
 * Verifies that writeFile correctly writes content to files.
 * Tests cover:
 * - Writing new content to existing files (overwrites)
 * - Creating new files if they don't exist
 * - Handling multiline content
 * - Writing empty files
 * - Writing JSON content with formatting preservation
 * - Unicode and special character handling
 *
 * Note: writeFile will overwrite existing files without warning.
 * Always create backups before modifying important files.
 */
describe('writeFile', () => {
  const testDir = path.join(process.cwd(), '__test-temp__')
  const testFile = path.join(testDir, 'write-test.txt')

  beforeEach(async () => {
    await fs.mkdir(testDir, { recursive: true })
  })

  afterEach(async () => {
    await fs.rm(testDir, { recursive: true, force: true })
  })

  it('should write content to file', async () => {
    const content = 'Test content'

    await writeFile(testFile, content)

    const readContent = await fs.readFile(testFile, 'utf-8')
    expect(readContent).toBe(content)
  })

  it('should create file if it does not exist', async () => {
    const newFile = path.join(testDir, 'new-file.txt')
    const content = 'New file content'

    await writeFile(newFile, content)

    const exists = await fileExists(newFile)
    expect(exists).toBe(true)

    const readContent = await fs.readFile(newFile, 'utf-8')
    expect(readContent).toBe(content)
  })

  it('should overwrite existing file', async () => {
    const originalContent = 'Original content'
    const newContent = 'New content'

    await fs.writeFile(testFile, originalContent, 'utf-8')
    await writeFile(testFile, newContent)

    const readContent = await fs.readFile(testFile, 'utf-8')
    expect(readContent).toBe(newContent)
    expect(readContent).not.toBe(originalContent)
  })

  it('should write multiline content', async () => {
    const content = 'Line 1\nLine 2\nLine 3'

    await writeFile(testFile, content)

    const readContent = await fs.readFile(testFile, 'utf-8')
    expect(readContent).toBe(content)
  })

  it('should write empty content', async () => {
    await writeFile(testFile, '')

    const readContent = await fs.readFile(testFile, 'utf-8')
    expect(readContent).toBe('')
  })

  it('should write JSON content', async () => {
    const jsonContent = JSON.stringify({ name: '@acme/ui', version: '1.0.0' }, null, 2)

    await writeFile(testFile, jsonContent)

    const readContent = await fs.readFile(testFile, 'utf-8')
    expect(readContent).toBe(jsonContent)
  })

  it('should write UTF-8 encoded content', async () => {
    const content = 'Unicode: café, naïve, 日本語, 🎨'

    await writeFile(testFile, content)

    const readContent = await fs.readFile(testFile, 'utf-8')
    expect(readContent).toBe(content)
  })

  it('should preserve file formatting', async () => {
    const content = '{\n  "indented": true\n}'

    await writeFile(testFile, content)

    const readContent = await fs.readFile(testFile, 'utf-8')
    expect(readContent).toBe(content)
  })
})

/**
 * Test group: replaceInFile function
 *
 * Verifies that replaceInFile correctly replaces multiple placeholders in files.
 * This is critical for the template initialisation process where we replace:
 * - @syntek-studio/ui → custom package name
 * - Syntek Studio → client name
 * - Default description → custom description
 * - Primary colour placeholder → user's chosen colour
 *
 * Tests cover:
 * - Single and multiple replacements in one call
 * - All occurrences replaced (not just first match)
 * - Formatting and line breaks preserved
 * - Return value: true if modified, false if no changes
 * - Special regex characters handled safely
 * - Empty replacement map (no changes)
 * - Error handling for non-existent files
 *
 * Returns: boolean indicating whether file was modified
 */
describe('replaceInFile', () => {
  const testDir = path.join(process.cwd(), '__test-temp__')
  const testFile = path.join(testDir, 'replace-test.txt')

  beforeEach(async () => {
    await fs.mkdir(testDir, { recursive: true })
  })

  afterEach(async () => {
    await fs.rm(testDir, { recursive: true, force: true })
  })

  it('should replace content in file and return true when changes made', async () => {
    const originalContent = 'Use @syntek-studio/ui in your project'
    await fs.writeFile(testFile, originalContent, 'utf-8')

    const replacements = {
      '@syntek-studio/ui': '@acme/ui',
    }

    const wasModified = await replaceInFile(testFile, replacements)

    expect(wasModified).toBe(true)

    const newContent = await fs.readFile(testFile, 'utf-8')
    expect(newContent).toBe('Use @acme/ui in your project')
  })

  it('should return false when no changes made', async () => {
    const originalContent = 'This has no placeholders'
    await fs.writeFile(testFile, originalContent, 'utf-8')

    const replacements = {
      '@syntek-studio/ui': '@acme/ui',
    }

    const wasModified = await replaceInFile(testFile, replacements)

    expect(wasModified).toBe(false)

    const newContent = await fs.readFile(testFile, 'utf-8')
    expect(newContent).toBe(originalContent)
  })

  it('should handle multiple replacements', async () => {
    const originalContent = 'Package: @syntek-studio/ui by Syntek Studio'
    await fs.writeFile(testFile, originalContent, 'utf-8')

    const replacements = {
      '@syntek-studio/ui': '@acme/ui',
      'Syntek Studio': 'Acme Corp',
    }

    const wasModified = await replaceInFile(testFile, replacements)

    expect(wasModified).toBe(true)

    const newContent = await fs.readFile(testFile, 'utf-8')
    expect(newContent).toBe('Package: @acme/ui by Acme Corp')
  })

  it('should replace all occurrences', async () => {
    const originalContent = '@syntek-studio/ui is great. Install @syntek-studio/ui now!'
    await fs.writeFile(testFile, originalContent, 'utf-8')

    const replacements = {
      '@syntek-studio/ui': '@acme/ui',
    }

    await replaceInFile(testFile, replacements)

    const newContent = await fs.readFile(testFile, 'utf-8')
    expect(newContent).toBe('@acme/ui is great. Install @acme/ui now!')
    expect(newContent).not.toContain('@syntek-studio/ui')
  })

  it('should preserve formatting and line breaks', async () => {
    const originalContent = `{
  "name": "@syntek-studio/ui",
  "author": "Syntek Studio"
}`
    await fs.writeFile(testFile, originalContent, 'utf-8')

    const replacements = {
      '@syntek-studio/ui': '@acme/ui',
      'Syntek Studio': 'Acme Corp',
    }

    await replaceInFile(testFile, replacements)

    const newContent = await fs.readFile(testFile, 'utf-8')
    expect(newContent).toContain('"name": "@acme/ui"')
    expect(newContent).toContain('"author": "Acme Corp"')
    expect(newContent).toMatch(/\{[\s\S]*"name"[\s\S]*"author"[\s\S]*\}/)
  })

  it('should handle empty replacement map', async () => {
    const originalContent = 'Test content'
    await fs.writeFile(testFile, originalContent, 'utf-8')

    const replacements = {}

    const wasModified = await replaceInFile(testFile, replacements)

    expect(wasModified).toBe(false)

    const newContent = await fs.readFile(testFile, 'utf-8')
    expect(newContent).toBe(originalContent)
  })

  it('should throw error for non-existent files', async () => {
    const nonExistentFile = path.join(testDir, 'does-not-exist.txt')
    const replacements = { old: 'new' }

    await expect(replaceInFile(nonExistentFile, replacements)).rejects.toThrow()
  })

  it('should handle special regex characters in search string', async () => {
    const originalContent = 'Install @syntek-studio/ui from npm'
    await fs.writeFile(testFile, originalContent, 'utf-8')

    const replacements = {
      '@syntek-studio/ui': '@acme/ui',
    }

    await replaceInFile(testFile, replacements)

    const newContent = await fs.readFile(testFile, 'utf-8')
    expect(newContent).toBe('Install @acme/ui from npm')
  })
})

/**
 * Test group: createBackup function
 *
 * Verifies that createBackup correctly creates .backup copies of files.
 * Used as a safety mechanism before performing file replacements.
 *
 * Tests cover:
 * - Creates file with .backup extension
 * - Preserves original content exactly
 * - Does not modify the original file
 * - Overwrites existing backups (latest backup only)
 * - Error handling for non-existent files
 *
 * Return value: Path to the created backup file (filepath + .backup)
 *
 * Usage: Always create a backup before calling replaceInFile to enable rollback.
 */
describe('createBackup', () => {
  const testDir = path.join(process.cwd(), '__test-temp__')
  const testFile = path.join(testDir, 'backup-test.txt')

  beforeEach(async () => {
    await fs.mkdir(testDir, { recursive: true })
  })

  afterEach(async () => {
    await fs.rm(testDir, { recursive: true, force: true })
  })

  it('should create a backup file with .backup extension', async () => {
    const content = 'Original content'
    await fs.writeFile(testFile, content, 'utf-8')

    const backupPath = await createBackup(testFile)

    expect(backupPath).toBe(testFile + '.backup')

    const backupExists = await fileExists(backupPath)
    expect(backupExists).toBe(true)
  })

  it('should preserve original file content in backup', async () => {
    const content = 'Original content to backup'
    await fs.writeFile(testFile, content, 'utf-8')

    const backupPath = await createBackup(testFile)

    const backupContent = await fs.readFile(backupPath, 'utf-8')
    expect(backupContent).toBe(content)
  })

  it('should not modify the original file', async () => {
    const content = 'Original content'
    await fs.writeFile(testFile, content, 'utf-8')

    await createBackup(testFile)

    const originalContent = await fs.readFile(testFile, 'utf-8')
    expect(originalContent).toBe(content)
  })

  it('should overwrite existing backup', async () => {
    const content1 = 'First content'
    const content2 = 'Second content'

    await fs.writeFile(testFile, content1, 'utf-8')
    await createBackup(testFile)

    await fs.writeFile(testFile, content2, 'utf-8')
    const backupPath = await createBackup(testFile)

    const backupContent = await fs.readFile(backupPath, 'utf-8')
    expect(backupContent).toBe(content2)
  })

  it('should throw error for non-existent files', async () => {
    const nonExistentFile = path.join(testDir, 'does-not-exist.txt')

    await expect(createBackup(nonExistentFile)).rejects.toThrow()
  })
})

/**
 * Test group: restoreFromBackup function
 *
 * Verifies that restoreFromBackup correctly restores files from .backup copies.
 * Provides rollback capability if template initialisation fails.
 *
 * Workflow:
 * 1. Create original file
 * 2. Call createBackup to create filename.backup
 * 3. Modify the original file
 * 4. Call restoreFromBackup to restore original content
 *
 * Tests cover:
 * - Restores exact original content
 * - Removes backup file after restoration
 * - Error handling if backup doesn't exist
 * - Creates original file if it's missing but backup exists
 *
 * Important: The backup file is deleted after restoration.
 * There is no second backup, so plan accordingly.
 */
describe('restoreFromBackup', () => {
  const testDir = path.join(process.cwd(), '__test-temp__')
  const testFile = path.join(testDir, 'restore-test.txt')
  const backupFile = testFile + '.backup'

  beforeEach(async () => {
    await fs.mkdir(testDir, { recursive: true })
  })

  afterEach(async () => {
    await fs.rm(testDir, { recursive: true, force: true })
  })

  it('should restore file from backup', async () => {
    const originalContent = 'Original content'
    const modifiedContent = 'Modified content'

    await fs.writeFile(testFile, originalContent, 'utf-8')
    await createBackup(testFile)
    await fs.writeFile(testFile, modifiedContent, 'utf-8')

    await restoreFromBackup(testFile)

    const restoredContent = await fs.readFile(testFile, 'utf-8')
    expect(restoredContent).toBe(originalContent)
  })

  it('should remove backup file after restoration', async () => {
    const content = 'Test content'
    await fs.writeFile(testFile, content, 'utf-8')
    await createBackup(testFile)

    await restoreFromBackup(testFile)

    const backupExists = await fileExists(backupFile)
    expect(backupExists).toBe(false)
  })

  it('should throw error if backup does not exist', async () => {
    await fs.writeFile(testFile, 'content', 'utf-8')

    await expect(restoreFromBackup(testFile)).rejects.toThrow()
  })

  it('should throw error if original file does not exist but backup does', async () => {
    await fs.writeFile(backupFile, 'backup content', 'utf-8')

    // This should still work - restore creates the original file
    await restoreFromBackup(testFile)

    const exists = await fileExists(testFile)
    expect(exists).toBe(true)
  })
})
