/**
 * Template Initialization CLI.
 *
 * Main entry point for the template initialization workflow. Orchestrates the entire
 * process of converting a template into a project-specific instance by:
 * 1. Checking for existing initialization
 * 2. Collecting user inputs (client name, package name, description, brand colour)
 * 3. Confirming inputs
 * 4. Replacing placeholders in project files
 * 5. Creating a configuration record
 * 6. Verifying all replacements succeeded
 * 7. Displaying success message
 *
 * The CLI prompts users interactively and provides clear feedback throughout
 * the initialization process. It includes error handling and rollback capability
 * via backup files in case of failures.
 *
 * @module scripts/init-template
 * @author Claude Code Documentation Generator
 * @created 2026-01-02
 */

import type { UserAnswers } from './lib/replacements'

/**
 * Template configuration stored after successful initialization.
 *
 * This configuration object is saved to template.config.json in the project root
 * and tracks the initialization state. It is used to:
 * - Prevent re-initialization of already-initialized templates
 * - Record which template was initialized and when
 * - Store the project-specific configuration values
 *
 * @typedef {Object} TemplateConfig
 * @property {boolean} initialized - Whether the template has been initialized (always true if file exists)
 * @property {string} initializedAt - ISO 8601 timestamp of when initialization occurred (e.g., "2026-01-02T12:30:45.123Z")
 * @property {string} packageName - The npm package name chosen by the user
 * @property {string} clientName - The client/company name chosen by the user
 * @property {string} primaryColour - The primary brand colour as hex code
 * @property {string} description - The project description chosen by the user
 * @property {string} originalTemplate - The original template package name (e.g., "@syntek-studio/ui")
 * @property {string} templateVersion - The version of the template that was initialized
 */
export interface TemplateConfig {
  initialized: boolean
  initializedAt: string
  packageName: string
  clientName: string
  primaryColour: string
  description: string
  originalTemplate: string
  templateVersion: string
}

/**
 * Result of checking whether the directory has already been initialized.
 *
 * Returned by checkDirectoryConflict() to indicate whether the template
 * has already been initialized. If a conflict is detected, provides
 * details about the existing initialization.
 *
 * @typedef {Object} ConflictCheckResult
 * @property {boolean} conflict - Whether initialization conflict detected (true if already initialized)
 * @property {string} [reason] - Reason for conflict (currently only 'already-initialized')
 * @property {string} [packageName] - The package name of existing initialization (if conflict)
 * @property {string} [clientName] - The client name of existing initialization (if conflict)
 */
export interface ConflictCheckResult {
  conflict: boolean
  reason?: 'already-initialized'
  packageName?: string
  clientName?: string
}

/**
 * Result of a file replacement operation.
 *
 * Indicates whether a particular file was modified during the replacement process.
 * Used to track which files were changed and provide feedback to the user.
 *
 * @typedef {Object} ReplacementResult
 * @property {string} file - The relative path to the file that was processed
 * @property {boolean} modified - Whether the file content was actually modified
 */
export interface ReplacementResult {
  file: string
  modified: boolean
}

/**
 * Checks if the directory has already been initialized.
 *
 * Looks for the template.config.json file in the project root and checks
 * whether the template has been initialized. If the config file exists and
 * has initialized set to true, returns a conflict indicating the template
 * has already been set up.
 *
 * Handles edge cases:
 * - Missing template.config.json: No conflict (returns conflict: false)
 * - Corrupted JSON: Gracefully handles parsing errors
 * - Partially initialized: Checks initialized flag, not just file existence
 *
 * @returns {Promise<ConflictCheckResult>} - Object with conflict status and details
 *
 * @example
 * // Check if already initialized
 * const result = await checkDirectoryConflict();
 *
 * if (result.conflict) {
 *   // Template is already initialized
 *   console.log(`This template is already initialized as ${result.packageName}`);
 *   console.log(`Client: ${result.clientName}`);
 *   process.exit(1);
 * } else {
 *   // Template not initialized, proceed
 *   console.log('Ready to initialize');
 * }
 */
export async function checkDirectoryConflict(): Promise<ConflictCheckResult> {
  const { fileExists, readFile } = await import('./lib/file-operations')

  // Check if template.config.json exists
  const configExists = await fileExists('template.config.json')

  if (!configExists) {
    // No conflict - template not yet initialized
    return { conflict: false }
  }

  try {
    // Read and parse the config file
    const configContent = await readFile('template.config.json')
    const config: TemplateConfig = JSON.parse(configContent)

    // Check if initialized flag is set
    if (config.initialized) {
      return {
        conflict: true,
        reason: 'already-initialized',
        packageName: config.packageName,
        clientName: config.clientName,
      }
    }

    // Config exists but not marked as initialized
    return { conflict: false }
  } catch {
    // If config file is corrupted, treat as not initialized
    console.warn('Warning: template.config.json exists but could not be read')
    return { conflict: false }
  }
}

/**
 * Creates the template.config.json configuration file.
 *
 * Generates and writes the template configuration to template.config.json
 * in the project root. This file records:
 * - Initialization status and timestamp
 * - User-provided configuration (package name, client name, description, colour)
 * - Original template information (name and version)
 *
 * The config is formatted as JSON with 2-space indentation for readability.
 * If template.config.json already exists, it is overwritten.
 *
 * Configuration values saved:
 * - initialized: boolean (always true when created)
 * - initializedAt: ISO 8601 timestamp
 * - packageName: from user input
 * - clientName: from user input
 * - description: from user input
 * - primaryColour: from user input
 * - originalTemplate: hardcoded as "@syntek-studio/ui"
 * - templateVersion: read from package.json version field
 *
 * @param {UserAnswers} answers - The user's answers from the initialization prompts
 * @returns {Promise<void>}
 *
 * @example
 * // Create configuration after getting user inputs
 * const answers = await promptUserInputs();
 * await createTemplateConfig(answers);
 * // Creates: template.config.json with formatted JSON containing all config data
 */
export async function createTemplateConfig(answers: UserAnswers): Promise<void> {
  const { writeFile } = await import('./lib/file-operations')
  const { readFile } = await import('./lib/file-operations')

  // Read current package.json to get version
  const packageJsonContent = await readFile('package.json')
  const packageJson = JSON.parse(packageJsonContent)

  // Create the template configuration
  const config: TemplateConfig = {
    initialized: true,
    initializedAt: new Date().toISOString(),
    packageName: answers.packageName,
    clientName: answers.clientName,
    primaryColour: answers.primaryColour,
    description: answers.description,
    originalTemplate: '@syntek-studio/ui',
    templateVersion: packageJson.version,
  }

  // Write configuration to template.config.json
  await writeFile('template.config.json', JSON.stringify(config, null, 2))
}

/**
 * Performs all file replacements based on user answers.
 *
 * The core operation of the initialization process. Creates a replacement map
 * from the user's answers and applies it to all project files that contain
 * template placeholders.
 *
 * Files modified:
 * - package.json: Updates name, author, description fields
 * - README.md: Replaces all documentation placeholders
 * - .claude/CLAUDE.md: Updates development guidelines with new package name
 * - src/index.ts: Updates module descriptions
 *
 * Process:
 * 1. Creates replacement map from user answers
 * 2. Gets list of files to modify from replacements module
 * 3. Creates backups of all files before modification (unless dry-run)
 * 4. Applies replacements to each file
 * 5. On error, automatically rolls back all changes
 * 6. Returns results array showing which files were modified
 *
 * Error handling:
 * - Creates backups before any modifications
 * - Automatically rolls back on failure (atomic-like operation)
 * - Files are either all modified or none (restored to original state)
 * - Provides detailed error messages with remediation steps
 *
 * @param {UserAnswers} answers - The user's answers from initialization prompts
 * @param {boolean} [useRollback=true] - Whether to use rollback-protected processing
 * @param {boolean} [dryRun=false] - If true, simulate without writing files
 * @param {import('./lib/cli-options').Logger} [logger] - Optional logger for verbose output
 * @returns {Promise<ReplacementResult[]>} - Array of ReplacementResult objects
 *                                           showing file and modification status
 *
 * @example
 * // Perform replacements after user confirmation
 * const answers = await promptUserInputs();
 * const confirmed = await confirmInputs(answers);
 * if (confirmed) {
 *   try {
 *     const results = await performReplacements(answers);
 *     results.forEach(r => {
 *       console.log(`${r.file}: ${r.modified ? 'modified' : 'unchanged'}`);
 *     });
 *   } catch (error) {
 *     console.error('Replacement failed:', error.message);
 *     // Note: Files are automatically restored on error
 *   }
 * }
 */
export async function performReplacements(
  answers: UserAnswers,
  useRollback: boolean = true,
  dryRun: boolean = false,
  logger?: import('./lib/cli-options').Logger
): Promise<ReplacementResult[]> {
  // Import the replacement utilities
  const { createReplacementMap, getFilesToModify } = await import('./lib/replacements')
  const { processDirectory, processDirectoryWithRollback } = await import('./lib/file-operations')

  // Create the replacement map from user answers
  const replacementMap = createReplacementMap(answers)

  // Get the list of files to modify
  const filesToModify = getFilesToModify()

  // Process all files with the replacement map
  // Use rollback-protected version by default for safety
  const results = useRollback
    ? await processDirectoryWithRollback(filesToModify, replacementMap, dryRun, logger)
    : await processDirectory(filesToModify, replacementMap, dryRun, logger)

  return results
}

/**
 * Verifies that all template placeholders have been successfully replaced.
 *
 * Scans all project files to check for any remaining template placeholder
 * strings. This is a safety check to ensure initialization completed successfully.
 *
 * Placeholders checked for:
 * - "@syntek-studio/ui"
 * - "@syntek-studio/ui"
 * - "Syntek Studio"
 * - Original default description text
 *
 * Uses the same files from getFilesToModify() to check only relevant files.
 * Returns true only if NO placeholders are found in ANY file.
 *
 * This function is important for:
 * - Quality assurance (ensuring no incomplete replacements)
 * - Debugging (identifying which placeholders remain if verification fails)
 * - User confidence (giving users assurance the initialization completed)
 *
 * @returns {Promise<boolean>} - True if all placeholders verified as replaced,
 *                               false if any placeholders remain
 *
 * @example
 * // Verify replacements after performReplacements()
 * await performReplacements(answers);
 * const verified = await verifyReplacements();
 *
 * if (!verified) {
 *   console.error('Error: Some template placeholders remain unreplaced');
 *   console.error('This indicates incomplete initialization');
 *   process.exit(1);
 * } else {
 *   console.log('All placeholders verified as replaced');
 * }
 */
export async function verifyReplacements(): Promise<boolean> {
  const { getFilesToModify } = await import('./lib/replacements')
  const { readFile } = await import('./lib/file-operations')

  // Placeholders that should no longer exist after replacement
  const placeholders = [
    '@syntek-studio/ui',
    'SYNTEK_CLIENT_NAME',
    'Syntek Studio',
    '#3b82f6',
    'A shared UI component library for React Web and React Native applications. Built with TypeScript, Tailwind CSS 4, and Nativewind 4.',
  ]

  // Get files that were modified
  const filesToCheck = getFilesToModify()

  // Check each file for remaining placeholders
  for (const filePath of filesToCheck) {
    const content = await readFile(filePath)

    for (const placeholder of placeholders) {
      if (content.includes(placeholder)) {
        // Found a placeholder that wasn't replaced
        console.warn(`Warning: Placeholder "${placeholder}" still found in ${filePath}`)
        return false
      }
    }
  }

  // All placeholders were successfully replaced
  return true
}

/**
 * Main CLI entry point for template initialization.
 *
 * Orchestrates the entire initialization workflow, combining all the above
 * functions in the correct sequence:
 *
 * 1. Parse CLI options (--dry-run, --verbose, --json)
 * 2. Display welcome message (unless JSON mode)
 * 3. Check for existing initialization (conflict check)
 * 4. If conflict detected, exit with error message
 * 5. Display user prompts to collect input
 * 6. Display confirmation prompt
 * 7. If not confirmed, loop back to step 5
 * 8. Perform file replacements (preview in dry-run mode)
 * 9. Create template configuration (skip in dry-run mode)
 * 10. Verify all placeholders were replaced
 * 11. Display success message or JSON output
 *
 * CLI Options:
 * - --dry-run: Preview changes without modifying files
 * - --verbose: Show detailed logging of all operations
 * - --json: Output structured JSON for automation
 *
 * Error handling:
 * - Catches and logs errors with clear messages
 * - Exits with non-zero status code on failure
 * - Provides helpful error context
 *
 * This function should be called directly or via Node.js CLI:
 * node --loader tsx scripts/init-template.ts [--dry-run] [--verbose] [--json]
 *
 * @returns {Promise<void>}
 *
 * @example
 * // Run the initialization CLI
 * main()
 *   .catch((error) => {
 *     console.error('Initialization failed:', error.message);
 *     process.exit(1);
 *   });
 *
 * // Expected workflow:
 * // ✓ Welcome message displayed
 * // ? Client name: Acme Corporation
 * // ? Package name: @acme/ui
 * // ? Description: Acme design system
 * // ? Primary colour: #3b82f6
 * // ✓ Do you want to proceed? (Y/n)
 * // ✓ Initializing...
 * // ✓ Files modified: 4
 * // ✓ Configuration saved
 * // ✓ Verification passed
 * // ✓ Initialization complete!
 */
export async function main(): Promise<void> {
  // Import the prompt functions
  const { displayWelcomeMessage, promptUserInputs, confirmInputs, displaySuccessMessage } =
    await import('./lib/prompts')
  const chalk = (await import('chalk')).default
  const { parseCliOptions, Logger } = await import('./lib/cli-options')
  const { displayHelp, isHelpRequested } = await import('./lib/cli-help')

  // Check for help flag first
  if (isHelpRequested()) {
    displayHelp()
    process.exit(0)
  }

  // Parse CLI options
  const options = parseCliOptions()
  const logger = new Logger(options)

  try {
    // Display welcome message (skip in JSON mode)
    if (!options.json) {
      displayWelcomeMessage()
    }

    logger.verbose(
      chalk.gray(
        `CLI Options: dryRun=${options.dryRun}, verbose=${options.verbose}, json=${options.json}`
      )
    )

    // Check for existing initialization (skip in dry-run mode)
    if (!options.dryRun) {
      const conflictCheck = await checkDirectoryConflict()
      if (conflictCheck.conflict) {
        if (options.json) {
          logger.setJsonData({
            success: false,
            error: 'Template already initialized',
            existingPackage: conflictCheck.packageName,
            existingClient: conflictCheck.clientName,
          })
          logger.outputJson()
        } else {
          logger.log(chalk.red('✗ This template has already been initialized!\n'))
          logger.log(chalk.yellow('  Package: ') + chalk.white(conflictCheck.packageName))
          logger.log(chalk.yellow('  Client:  ') + chalk.white(conflictCheck.clientName))
          logger.log('\n')
          logger.log(
            chalk.gray('If you need to re-initialize, please delete template.config.json first.\n')
          )
        }
        process.exit(1)
      }
    } else {
      logger.verbose(chalk.gray('[DRY-RUN] Skipping initialization conflict check'))
    }

    // Prompt for user inputs (will loop until confirmed)
    let answers: UserAnswers
    let confirmed = false

    while (!confirmed) {
      answers = await promptUserInputs()
      confirmed = await confirmInputs(answers)

      if (!confirmed) {
        logger.log('\n')
        logger.log("Let's try again...\n")
      }
    }

    // Store answers for JSON output
    logger.setJsonData({ answers: answers! })

    // Perform file replacements
    const initMsg = options.dryRun
      ? chalk.cyan('\n[DRY-RUN] Previewing template initialization...\n')
      : chalk.cyan('\nInitializing template...\n')
    logger.log(initMsg)

    const results = await performReplacements(answers!, true, options.dryRun, logger)

    // Store results for JSON output
    const modifiedCount = results.filter((r) => r.modified).length
    logger.setJsonData({
      filesModified: modifiedCount,
      files: results,
    })

    // Create template configuration (skip in dry-run mode)
    if (!options.dryRun) {
      await createTemplateConfig(answers!)
      logger.log(chalk.green('✓ Configuration saved to template.config.json\n'))
    } else {
      logger.log(chalk.gray('[DRY-RUN] Would create template.config.json\n'))
    }

    // Verify all replacements were successful (skip in dry-run mode)
    if (!options.dryRun) {
      const verified = await verifyReplacements()
      if (!verified) {
        logger.log(chalk.yellow('⚠ Warning: Some placeholders may not have been replaced'))
        logger.log(chalk.gray('Please review the modified files manually\n'))
        logger.setJsonData({ verified: false })
      } else {
        logger.log(chalk.green('✓ All placeholders verified as replaced\n'))
        logger.setJsonData({ verified: true })
      }
    } else {
      logger.verbose(chalk.gray('[DRY-RUN] Skipping placeholder verification'))
    }

    // Mark as successful
    logger.setJsonData({ success: true })

    // Display success message or JSON output
    if (options.json) {
      logger.outputJson()
    } else {
      displaySuccessMessage(answers!, results)

      // Add dry-run reminder
      if (options.dryRun) {
        logger.log(chalk.bold.yellow('\n[DRY-RUN] No files were actually modified.'))
        logger.log(chalk.gray('Run without --dry-run to apply changes.\n'))
      }
    }
  } catch (error) {
    const errorMessage = (error as Error).message

    // Set error in JSON data
    logger.setJsonData({
      success: false,
      error: errorMessage,
    })

    if (options.json) {
      // Output JSON error
      logger.outputJson()
    } else {
      // Display formatted error
      logger.log('\n')
      logger.log(chalk.red('✗ Initialisation failed'))
      logger.log(chalk.red(`  Error: ${errorMessage}`))
      logger.log('\n')

      // Provide helpful remediation messages based on error type
      logger.log(chalk.yellow('Troubleshooting:'))

      if (errorMessage.includes('File not found')) {
        logger.log(chalk.gray('  • Ensure you are running this command from the project root'))
        logger.log(chalk.gray('  • Check that the template files have not been deleted'))
        logger.log(chalk.gray('  • Try cloning the template repository again'))
      } else if (errorMessage.includes('permission') || errorMessage.includes('EACCES')) {
        logger.log(chalk.gray('  • Check that you have write permissions in this directory'))
        logger.log(chalk.gray('  • Try running with elevated privileges if necessary'))
        logger.log(chalk.gray('  • Ensure no files are locked or open in another program'))
      } else if (errorMessage.includes('Backup failed')) {
        logger.log(chalk.gray('  • Ensure sufficient disk space is available'))
        logger.log(chalk.gray('  • Check that you have write permissions'))
        logger.log(chalk.gray('  • Remove any existing .backup files and try again'))
      } else if (errorMessage.includes('JSON')) {
        logger.log(chalk.gray('  • A configuration file may be corrupted'))
        logger.log(chalk.gray('  • Check package.json and template.config.json for syntax errors'))
        logger.log(chalk.gray('  • Try restoring from version control'))
      } else {
        logger.log(chalk.gray('  • Check the error message above for details'))
        logger.log(chalk.gray('  • Ensure all template files are present and readable'))
        logger.log(chalk.gray('  • Try running the command again'))
      }

      logger.log('\n')
      logger.log(chalk.gray('If the problem persists, please report the issue at:'))
      logger.log(chalk.blue('  https://github.com/syntek-studio/ui_design_template/issues'))
      logger.log('\n')
    }

    process.exit(1)
  }
}

/**
 * CLI execution entry point.
 *
 * Runs the main() function when this file is executed directly as a Node.js script.
 * This check ensures the CLI only runs when invoked directly, not when imported as a module.
 *
 * Usage:
 * node --loader tsx scripts/init-template.ts
 *
 * The --loader tsx is required because the script uses ES modules and TypeScript syntax.
 * It runs the Esbuild tsx loader to transpile TypeScript on-the-fly.
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error('Error:', error)
    process.exit(1)
  })
}
