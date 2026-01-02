/**
 * File system operations for template initialization.
 *
 * This module provides async utilities for reading, writing, and modifying files
 * during the template initialization process. It includes:
 * - File existence checks
 * - File reading and writing (UTF-8)
 * - Content replacement in files (using ReplacementMap)
 * - Backup creation and restoration
 *
 * All file operations are async and use the Node.js fs.promises API.
 * Error handling is delegated to the caller for flexible error management.
 *
 * @module scripts/lib/file-operations
 * @author Claude Code Documentation Generator
 * @created 2026-01-02
 */

import {
  readFile as fsReadFile,
  writeFile as fsWriteFile,
  copyFile,
  unlink,
  access,
} from 'node:fs/promises'
import { constants } from 'node:fs'
import chalk from 'chalk'
import type { ReplacementMap } from './replacements'
import { applyReplacements } from './replacements'

/**
 * Checks if a file or directory exists.
 *
 * Uses fs.access() to determine if a path exists. Works for both files and
 * directories. Does not throw an error for non-existent paths; instead returns
 * false to allow graceful handling.
 *
 * @param {string} filePath - The absolute or relative path to check
 * @returns {Promise<boolean>} - True if the path exists, false otherwise
 *
 * @example
 * const exists = await fileExists('./package.json');
 * if (exists) {
 *   console.log('package.json found');
 * }
 */
export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath, constants.F_OK)
    return true
  } catch {
    return false
  }
}

/**
 * Reads a file's content as a UTF-8 encoded string.
 *
 * Reads the complete file content from disk. All files are decoded as UTF-8,
 * which supports both ASCII text and Unicode characters (including emojis).
 *
 * The function will throw an error if:
 * - The file does not exist (ENOENT)
 * - The file cannot be read due to permissions (EACCES)
 * - The file path is invalid
 *
 * @param {string} filePath - The absolute or relative path to the file
 * @returns {Promise<string>} - The complete file content as a UTF-8 string
 * @throws {Error} - If file does not exist or cannot be read
 *
 * @example
 * try {
 *   const content = await readFile('./package.json');
 *   const pkg = JSON.parse(content);
 *   console.log(pkg.name);
 * } catch (error) {
 *   console.error('Failed to read file:', error.message);
 * }
 */
export async function readFile(filePath: string): Promise<string> {
  return await fsReadFile(filePath, 'utf-8')
}

/**
 * Writes content to a file, creating or overwriting it.
 *
 * Creates the file if it does not exist, or completely replaces the existing
 * file content if it does. All content is encoded as UTF-8.
 *
 * Parent directories must already exist; this function does not create them.
 * If you need to create directories, use fs.mkdir() first.
 *
 * Common side effects:
 * - Creates a new file if it does not exist
 * - Overwrites existing file content completely
 * - Preserves file permissions if file already exists
 * - Updates file modification timestamp
 *
 * @param {string} filePath - The absolute or relative path to the file
 * @param {string} content - The content to write to the file (UTF-8 encoded)
 * @returns {Promise<void>}
 *
 * @example
 * // Write plain text
 * await writeFile('./output.txt', 'Hello, World!');
 *
 * // Write JSON with formatting
 * const data = { name: '@acme/ui', version: '1.0.0' };
 * await writeFile('./package.json', JSON.stringify(data, null, 2));
 *
 * // Overwrite existing file
 * const oldContent = await readFile('./config.txt');
 * const newContent = oldContent + '\\nNew line';
 * await writeFile('./config.txt', newContent);
 */
export async function writeFile(filePath: string, content: string): Promise<void> {
  await fsWriteFile(filePath, content, 'utf-8')
}

/**
 * Replaces content in a file using a replacement map.
 *
 * Reads the file, applies all replacements from the map, and writes the file
 * back only if changes were made. This allows callers to track which files
 * were actually modified.
 *
 * Process:
 * 1. Read the file content
 * 2. Apply all replacements using applyReplacements() from replacements.ts
 * 3. Compare original content with modified content
 * 4. Write file only if content changed
 * 5. Return true/false indicating whether the file was modified
 *
 * This is an optimisation to avoid writing unnecessary file changes and
 * updating modification timestamps when content is unchanged.
 *
 * @param {string} filePath - The absolute or relative path to the file
 * @param {ReplacementMap} replacements - Map of placeholder→replacement pairs
 * @returns {Promise<boolean>} - True if file was modified, false if no changes made
 * @throws {Error} - If file does not exist or cannot be read/written
 *
 * @example
 * // Replace single placeholder
 * const modified = await replaceInFile('./package.json', {
 *   '@syntek-studio/ui': '@acme/ui'
 * });
 * if (modified) {
 *   console.log('package.json was updated');
 * }
 *
 * // Replace multiple placeholders
 * const result = await replaceInFile('./README.md', {
 *   '@syntek-studio/ui': '@acme/ui',
 *   'Syntek Studio': 'Acme Corporation'
 * });
 * console.log(result ? 'Modified' : 'No changes');
 */
export async function replaceInFile(
  filePath: string,
  replacements: ReplacementMap
): Promise<boolean> {
  // Read the current file content
  const originalContent = await readFile(filePath)

  // Apply all replacements from the map
  const modifiedContent = applyReplacements(originalContent, replacements)

  // Check if content actually changed
  if (originalContent === modifiedContent) {
    return false
  }

  // Write the modified content back to the file
  await writeFile(filePath, modifiedContent)

  return true
}

/**
 * Creates a backup of a file by copying it with a .backup extension.
 *
 * Creates a copy of the original file with '.backup' appended to the filename.
 * If a backup already exists, it is overwritten with the new backup.
 * The original file is not modified.
 *
 * This function is used to allow rollback of file modifications in case of
 * errors during the initialization process.
 *
 * Backup naming:
 * - Original: ./package.json → Backup: ./package.json.backup
 * - Original: /etc/config.txt → Backup: /etc/config.txt.backup
 *
 * @param {string} filePath - The absolute or relative path to the file to backup
 * @returns {Promise<string>} - The path to the created backup file
 * @throws {Error} - If original file does not exist or backup fails
 *
 * @example
 * try {
 *   // Backup before making changes
 *   const backupPath = await createBackup('./package.json');
 *   console.log(`Backup created at: ${backupPath}`);
 *
 *   // Make modifications
 *   await writeFile('./package.json', modifiedContent);
 *
 *   // If error occurs, restore from backup
 * } catch (error) {
 *   await restoreFromBackup('./package.json');
 *   console.error('Failed, restored from backup');
 * }
 */
export async function createBackup(filePath: string): Promise<string> {
  const backupPath = `${filePath}.backup`
  await copyFile(filePath, backupPath)
  return backupPath
}

/**
 * Restores a file from its backup copy.
 *
 * Copies the .backup file back to the original filename and deletes the
 * backup file. Used to undo modifications made during the initialization
 * process if errors occur.
 *
 * Process:
 * 1. Read content from filename.backup
 * 2. Write content back to original filename (overwrite)
 * 3. Delete the backup file (filename.backup)
 *
 * This completely restores the original file state that existed when the
 * backup was created.
 *
 * @param {string} filePath - The path to the original file (not the .backup file)
 * @returns {Promise<void>}
 * @throws {Error} - If backup file does not exist or restore fails
 *
 * @example
 * // Error handling with automatic rollback
 * try {
 *   const filesToModify = ['package.json', 'README.md', 'src/index.ts'];
 *   const backups = [];
 *
 *   // Create backups before modifications
 *   for (const file of filesToModify) {
 *     const backup = await createBackup(file);
 *     backups.push(backup);
 *   }
 *
 *   // Apply modifications
 *   await performReplacements(answers);
 *
 * } catch (error) {
 *   // Restore from backups on error
 *   console.error('Initialization failed, restoring from backups...');
 *   for (const file of filesToModify) {
 *     await restoreFromBackup(file);
 *   }
 *   throw error;
 * }
 */
export async function restoreFromBackup(filePath: string): Promise<void> {
  const backupPath = `${filePath}.backup`

  // Copy backup file back to original location
  await copyFile(backupPath, filePath)

  // Delete the backup file
  await unlink(backupPath)
}

/**
 * Processes multiple files with replacements and displays progress.
 *
 * Applies the same replacement map to multiple files and shows progress
 * indicators during processing. Returns an array of results indicating
 * which files were modified.
 *
 * Progress display:
 * - Shows "Processing..." message before starting
 * - Displays each file as it's processed with a check mark or skip indicator
 * - Shows summary of total files modified
 *
 * The function does not create backups; the caller is responsible for
 * backup/restore logic if needed.
 *
 * @param {string[]} filePaths - Array of file paths to process
 * @param {ReplacementMap} replacements - Map of placeholder→replacement pairs
 * @returns {Promise<Array<{file: string, modified: boolean}>>} - Array of results
 * @throws {Error} - If any file does not exist or cannot be processed
 *
 * @example
 * const replacementMap = createReplacementMap(answers);
 * const filesToModify = getFilesToModify();
 *
 * const results = await processDirectory(filesToModify, replacementMap);
 *
 * const modifiedCount = results.filter(r => r.modified).length;
 * console.log(`Modified ${modifiedCount} of ${results.length} files`);
 *
 * // Example output:
 * // Processing files...
 * // ✓ package.json (modified)
 * // ✓ README.md (modified)
 * // - .claude/CLAUDE.md (no changes)
 * // ✓ src/index.ts (modified)
 * //
 * // Modified 3 of 4 files
 */
export async function processDirectory(
  filePaths: string[],
  replacements: ReplacementMap
): Promise<Array<{ file: string; modified: boolean }>> {
  const results: Array<{ file: string; modified: boolean }> = []

  console.log(chalk.cyan('\nProcessing files...\n'))

  for (const filePath of filePaths) {
    try {
      // Check if file exists
      const exists = await fileExists(filePath)
      if (!exists) {
        console.log(chalk.red(`✗ ${filePath} (file not found)`))
        throw new Error(`File not found: ${filePath}`)
      }

      // Apply replacements
      const modified = await replaceInFile(filePath, replacements)

      // Display progress
      if (modified) {
        console.log(chalk.green(`✓ ${filePath} `) + chalk.gray('(modified)'))
      } else {
        console.log(chalk.gray(`- ${filePath} (no changes)`))
      }

      results.push({ file: filePath, modified })
    } catch (error) {
      console.log(chalk.red(`✗ ${filePath} (error: ${(error as Error).message})`))
      throw error
    }
  }

  const modifiedCount = results.filter((r) => r.modified).length
  console.log(chalk.cyan(`\nModified ${modifiedCount} of ${results.length} files\n`))

  return results
}

/**
 * Processes multiple files with replacements, backup support, and automatic rollback on failure.
 *
 * This is a safer version of processDirectory that:
 * 1. Creates backups of all files before modification
 * 2. Applies replacements to all files
 * 3. Automatically restores from backups if any file fails
 * 4. Cleans up backup files on success
 *
 * This ensures atomic-like behaviour where either all files are modified successfully
 * or none are modified (rolled back to original state).
 *
 * @param {string[]} filePaths - Array of file paths to process
 * @param {ReplacementMap} replacements - Map of placeholder→replacement pairs
 * @returns {Promise<Array<{file: string, modified: boolean}>>} - Array of results
 * @throws {Error} - If any file fails and rollback is performed
 *
 * @example
 * try {
 *   const results = await processDirectoryWithRollback(filesToModify, replacementMap);
 *   console.log('All files modified successfully');
 * } catch (error) {
 *   console.log('Operation failed, all changes rolled back');
 * }
 */
export async function processDirectoryWithRollback(
  filePaths: string[],
  replacements: ReplacementMap
): Promise<Array<{ file: string; modified: boolean }>> {
  const results: Array<{ file: string; modified: boolean }> = []
  const backupPaths: string[] = []

  console.log(chalk.cyan('\nCreating backups...\n'))

  // Step 1: Create backups of all files
  for (const filePath of filePaths) {
    try {
      const exists = await fileExists(filePath)
      if (!exists) {
        console.log(chalk.yellow(`⚠ ${filePath} (file not found, skipping backup)`))
        continue
      }

      await createBackup(filePath)
      backupPaths.push(filePath) // Store original path for restore
      console.log(chalk.gray(`  ↳ Backed up: ${filePath}`))
    } catch (error) {
      console.log(chalk.red(`✗ Failed to backup ${filePath}: ${(error as Error).message}`))
      // Restore any backups created so far
      await cleanupBackups(backupPaths, true)
      throw new Error(`Backup failed for ${filePath}: ${(error as Error).message}`)
    }
  }

  console.log(chalk.cyan('\nProcessing files...\n'))

  // Step 2: Apply replacements to all files
  try {
    for (const filePath of filePaths) {
      const exists = await fileExists(filePath)
      if (!exists) {
        console.log(chalk.yellow(`⚠ ${filePath} (file not found, skipping)`))
        results.push({ file: filePath, modified: false })
        continue
      }

      const modified = await replaceInFile(filePath, replacements)

      if (modified) {
        console.log(chalk.green(`✓ ${filePath} `) + chalk.gray('(modified)'))
      } else {
        console.log(chalk.gray(`- ${filePath} (no changes)`))
      }

      results.push({ file: filePath, modified })
    }

    // Step 3: Clean up backups on success (delete them)
    await cleanupBackups(backupPaths, false)

    const modifiedCount = results.filter((r) => r.modified).length
    console.log(chalk.cyan(`\nModified ${modifiedCount} of ${results.length} files\n`))

    return results
  } catch (error) {
    // Step 4: Rollback on failure - restore all backups
    console.log(chalk.red('\n✗ Error occurred during file processing'))
    console.log(chalk.yellow('  Rolling back changes...\n'))

    await cleanupBackups(backupPaths, true)

    console.log(chalk.green('  ✓ All files restored to original state\n'))
    throw error
  }
}

/**
 * Cleans up backup files - either by deleting them (success) or restoring them (failure).
 *
 * @param {string[]} originalPaths - Array of original file paths (backups are .backup suffix)
 * @param {boolean} restore - If true, restore from backups; if false, delete backups
 * @returns {Promise<void>}
 */
async function cleanupBackups(originalPaths: string[], restore: boolean): Promise<void> {
  for (const filePath of originalPaths) {
    try {
      if (restore) {
        await restoreFromBackup(filePath)
        console.log(chalk.gray(`  ↳ Restored: ${filePath}`))
      } else {
        // Just delete the backup file
        const backupPath = `${filePath}.backup`
        const exists = await fileExists(backupPath)
        if (exists) {
          await unlink(backupPath)
        }
      }
    } catch (cleanupError) {
      // Log but don't throw - best effort cleanup
      console.log(
        chalk.yellow(
          `  ⚠ Could not ${restore ? 'restore' : 'clean up'} ${filePath}: ${(cleanupError as Error).message}`
        )
      )
    }
  }
}
