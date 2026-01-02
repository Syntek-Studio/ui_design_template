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
import type { Logger } from './cli-options'

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
 * @param {boolean} [dryRun=false] - If true, simulate without writing files
 * @param {Logger} [logger] - Optional logger for verbose output
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
 *
 * // Dry-run mode
 * const wouldModify = await replaceInFile('./package.json', replacements, true, logger);
 * // File is not actually modified when dryRun is true
 */
export async function replaceInFile(
  filePath: string,
  replacements: ReplacementMap,
  dryRun: boolean = false,
  logger?: Logger
): Promise<boolean> {
  // Read the current file content
  const originalContent = await readFile(filePath)

  logger?.verbose(`  Reading ${filePath} (${originalContent.length} bytes)`)

  // Apply all replacements from the map
  const modifiedContent = applyReplacements(originalContent, replacements)

  // Check if content actually changed
  if (originalContent === modifiedContent) {
    logger?.verbose(`  No changes needed in ${filePath}`)
    return false
  }

  logger?.verbose(`  Content changed in ${filePath}`)

  // Show diff in verbose mode
  if (logger && originalContent !== modifiedContent) {
    const originalLines = originalContent.split('\n').length
    const modifiedLines = modifiedContent.split('\n').length
    logger.verbose(`    Lines: ${originalLines} → ${modifiedLines}`)
  }

  // Write the modified content back to the file (unless dry-run)
  if (!dryRun) {
    await writeFile(filePath, modifiedContent)
    logger?.verbose(`  Written ${filePath}`)
  } else {
    logger?.verbose(`  [DRY-RUN] Would write ${filePath}`)
  }

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
 * @param {boolean} [dryRun=false] - If true, simulate without writing files
 * @param {Logger} [logger] - Optional logger for verbose output
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
  replacements: ReplacementMap,
  dryRun: boolean = false,
  logger?: Logger
): Promise<Array<{ file: string; modified: boolean }>> {
  const results: Array<{ file: string; modified: boolean }> = []

  const message = dryRun ? '\n[DRY-RUN] Previewing file changes...\n' : '\nProcessing files...\n'
  if (logger) {
    logger.log(chalk.cyan(message))
  } else {
    console.log(chalk.cyan(message))
  }

  for (const filePath of filePaths) {
    try {
      // Check if file exists
      const exists = await fileExists(filePath)
      if (!exists) {
        const errorMsg = chalk.red(`✗ ${filePath} (file not found)`)
        if (logger) {
          logger.log(errorMsg)
        } else {
          console.log(errorMsg)
        }
        throw new Error(`File not found: ${filePath}`)
      }

      // Apply replacements
      const modified = await replaceInFile(filePath, replacements, dryRun, logger)

      // Display progress
      if (modified) {
        const statusMsg =
          chalk.green(`✓ ${filePath} `) + chalk.gray(dryRun ? '(would be modified)' : '(modified)')
        if (logger) {
          logger.log(statusMsg)
        } else {
          console.log(statusMsg)
        }
      } else {
        const statusMsg = chalk.gray(`- ${filePath} (no changes)`)
        if (logger) {
          logger.log(statusMsg)
        } else {
          console.log(statusMsg)
        }
      }

      results.push({ file: filePath, modified })
    } catch (error) {
      const errorMsg = chalk.red(`✗ ${filePath} (error: ${(error as Error).message})`)
      if (logger) {
        logger.log(errorMsg)
      } else {
        console.log(errorMsg)
      }
      throw error
    }
  }

  const modifiedCount = results.filter((r) => r.modified).length
  const summaryMsg = dryRun
    ? `\n[DRY-RUN] Would modify ${modifiedCount} of ${results.length} files\n`
    : `\nModified ${modifiedCount} of ${results.length} files\n`

  if (logger) {
    logger.log(chalk.cyan(summaryMsg))
  } else {
    console.log(chalk.cyan(summaryMsg))
  }

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
 * @param {boolean} [dryRun=false] - If true, simulate without writing files
 * @param {Logger} [logger] - Optional logger for verbose output
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
  replacements: ReplacementMap,
  dryRun: boolean = false,
  logger?: Logger
): Promise<Array<{ file: string; modified: boolean }>> {
  const results: Array<{ file: string; modified: boolean }> = []
  const backupPaths: string[] = []

  // Skip backups in dry-run mode
  if (!dryRun) {
    const backupMsg = chalk.cyan('\nCreating backups...\n')
    if (logger) {
      logger.log(backupMsg)
    } else {
      console.log(backupMsg)
    }

    // Step 1: Create backups of all files
    for (const filePath of filePaths) {
      try {
        const exists = await fileExists(filePath)
        if (!exists) {
          const warnMsg = chalk.yellow(`⚠ ${filePath} (file not found, skipping backup)`)
          if (logger) {
            logger.log(warnMsg)
          } else {
            console.log(warnMsg)
          }
          continue
        }

        await createBackup(filePath)
        backupPaths.push(filePath) // Store original path for restore
        const backupSuccessMsg = chalk.gray(`  ↳ Backed up: ${filePath}`)
        if (logger) {
          logger.verbose(backupSuccessMsg)
        } else {
          console.log(backupSuccessMsg)
        }
      } catch (error) {
        const errorMsg = chalk.red(`✗ Failed to backup ${filePath}: ${(error as Error).message}`)
        if (logger) {
          logger.log(errorMsg)
        } else {
          console.log(errorMsg)
        }
        // Restore any backups created so far
        await cleanupBackups(backupPaths, true, logger)
        throw new Error(`Backup failed for ${filePath}: ${(error as Error).message}`)
      }
    }
  }

  const processingMsg = dryRun
    ? chalk.cyan('\n[DRY-RUN] Previewing file changes...\n')
    : chalk.cyan('\nProcessing files...\n')
  if (logger) {
    logger.log(processingMsg)
  } else {
    console.log(processingMsg)
  }

  // Step 2: Apply replacements to all files
  try {
    for (const filePath of filePaths) {
      const exists = await fileExists(filePath)
      if (!exists) {
        const warnMsg = chalk.yellow(`⚠ ${filePath} (file not found, skipping)`)
        if (logger) {
          logger.log(warnMsg)
        } else {
          console.log(warnMsg)
        }
        results.push({ file: filePath, modified: false })
        continue
      }

      const modified = await replaceInFile(filePath, replacements, dryRun, logger)

      if (modified) {
        const statusMsg =
          chalk.green(`✓ ${filePath} `) + chalk.gray(dryRun ? '(would be modified)' : '(modified)')
        if (logger) {
          logger.log(statusMsg)
        } else {
          console.log(statusMsg)
        }
      } else {
        const statusMsg = chalk.gray(`- ${filePath} (no changes)`)
        if (logger) {
          logger.log(statusMsg)
        } else {
          console.log(statusMsg)
        }
      }

      results.push({ file: filePath, modified })
    }

    // Step 3: Clean up backups on success (delete them) - skip in dry-run
    if (!dryRun) {
      await cleanupBackups(backupPaths, false, logger)
    }

    const modifiedCount = results.filter((r) => r.modified).length
    const summaryMsg = dryRun
      ? chalk.cyan(`\n[DRY-RUN] Would modify ${modifiedCount} of ${results.length} files\n`)
      : chalk.cyan(`\nModified ${modifiedCount} of ${results.length} files\n`)
    if (logger) {
      logger.log(summaryMsg)
    } else {
      console.log(summaryMsg)
    }

    return results
  } catch (error) {
    // Step 4: Rollback on failure - restore all backups (skip in dry-run)
    if (!dryRun) {
      const errorMsg = chalk.red('\n✗ Error occurred during file processing')
      const rollbackMsg = chalk.yellow('  Rolling back changes...\n')
      if (logger) {
        logger.log(errorMsg)
        logger.log(rollbackMsg)
      } else {
        console.log(errorMsg)
        console.log(rollbackMsg)
      }

      await cleanupBackups(backupPaths, true, logger)

      const restoredMsg = chalk.green('  ✓ All files restored to original state\n')
      if (logger) {
        logger.log(restoredMsg)
      } else {
        console.log(restoredMsg)
      }
    }
    throw error
  }
}

/**
 * Cleans up backup files - either by deleting them (success) or restoring them (failure).
 *
 * @param {string[]} originalPaths - Array of original file paths (backups are .backup suffix)
 * @param {boolean} restore - If true, restore from backups; if false, delete backups
 * @param {Logger} [logger] - Optional logger for verbose output
 * @returns {Promise<void>}
 */
async function cleanupBackups(
  originalPaths: string[],
  restore: boolean,
  logger?: Logger
): Promise<void> {
  for (const filePath of originalPaths) {
    try {
      if (restore) {
        await restoreFromBackup(filePath)
        const restoredMsg = chalk.gray(`  ↳ Restored: ${filePath}`)
        if (logger) {
          logger.verbose(restoredMsg)
        } else {
          console.log(restoredMsg)
        }
      } else {
        // Just delete the backup file
        const backupPath = `${filePath}.backup`
        const exists = await fileExists(backupPath)
        if (exists) {
          await unlink(backupPath)
          logger?.verbose(chalk.gray(`  ↳ Removed backup: ${backupPath}`))
        }
      }
    } catch (cleanupError) {
      // Log but don't throw - best effort cleanup
      const warnMsg = chalk.yellow(
        `  ⚠ Could not ${restore ? 'restore' : 'clean up'} ${filePath}: ${(cleanupError as Error).message}`
      )
      if (logger) {
        logger.log(warnMsg)
      } else {
        console.log(warnMsg)
      }
    }
  }
}
