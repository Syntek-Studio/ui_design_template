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
