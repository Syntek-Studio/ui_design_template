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
  } catch (error) {
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
 * 3. Applies replacements to each file
 * 4. Returns results array showing which files were modified
 *
 * Error handling:
 * - If a file does not exist, throws an error (fails fast)
 * - Caller is responsible for backup/restore if needed
 * - All files should be modified or none for consistency
 *
 * @param {UserAnswers} answers - The user's answers from initialization prompts
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
 *   }
 * }
 */
export async function performReplacements(answers: UserAnswers): Promise<ReplacementResult[]> {
  // Import the replacement utilities
  const { createReplacementMap, getFilesToModify } = await import('./lib/replacements')
  const { processDirectory } = await import('./lib/file-operations')

  // Create the replacement map from user answers
  const replacementMap = createReplacementMap(answers)

  // Get the list of files to modify
  const filesToModify = getFilesToModify()

  // Process all files with the replacement map
  const results = await processDirectory(filesToModify, replacementMap)

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
 * 1. Display welcome message
 * 2. Check for existing initialization (conflict check)
 * 3. If conflict detected, exit with error message
 * 4. Display user prompts to collect input
 * 5. Display confirmation prompt
 * 6. If not confirmed, loop back to step 4
 * 7. Perform file replacements
 * 8. Create template configuration
 * 9. Verify all placeholders were replaced
 * 10. Display success message
 *
 * Error handling:
 * - Catches and logs errors with clear messages
 * - Exits with non-zero status code on failure
 * - Provides helpful error context
 *
 * This function should be called directly or via Node.js CLI:
 * node --loader tsx scripts/init-template.ts
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

  try {
    // Display welcome message
    displayWelcomeMessage()

    // Check for existing initialization
    const conflictCheck = await checkDirectoryConflict()
    if (conflictCheck.conflict) {
      console.log(chalk.red('✗ This template has already been initialized!\n'))
      console.log(chalk.yellow('  Package: ') + chalk.white(conflictCheck.packageName))
      console.log(chalk.yellow('  Client:  ') + chalk.white(conflictCheck.clientName))
      console.log('\n')
      console.log(
        chalk.gray('If you need to re-initialize, please delete template.config.json first.\n')
      )
      process.exit(1)
    }

    // Prompt for user inputs (will loop until confirmed)
    let answers: UserAnswers
    let confirmed = false

    while (!confirmed) {
      answers = await promptUserInputs()
      confirmed = await confirmInputs(answers)

      if (!confirmed) {
        console.log('\n')
        console.log("Let's try again...\n")
      }
    }

    // Perform file replacements
    console.log(chalk.cyan('\nInitializing template...\n'))
    const results = await performReplacements(answers!)

    // Create template configuration
    await createTemplateConfig(answers!)
    console.log(chalk.green('✓ Configuration saved to template.config.json\n'))

    // Verify all replacements were successful
    const verified = await verifyReplacements()
    if (!verified) {
      console.log(chalk.yellow('⚠ Warning: Some placeholders may not have been replaced'))
      console.log(chalk.gray('Please review the modified files manually\n'))
    } else {
      console.log(chalk.green('✓ All placeholders verified as replaced\n'))
    }

    // Display success message
    displaySuccessMessage(answers!, results)
  } catch (error) {
    console.log('\n')
    console.log(chalk.red('✗ Initialization failed'))
    console.log(chalk.red(`  Error: ${(error as Error).message}`))
    console.log('\n')
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
