/**
 * CLI option parsing and configuration for template initialisation.
 *
 * This module handles command-line argument parsing for the template initialisation CLI.
 * Supports three optional modes that can be combined:
 * - Dry-run mode (--dry-run): Preview changes without applying them
 * - Verbose mode (--verbose): Show detailed logging of all operations
 * - JSON output mode (--json): Output structured JSON for automation tools
 *
 * The CLI options are parsed from process.argv and provide flags to control
 * the behaviour of the initialisation process throughout all modules.
 *
 * @module scripts/lib/cli-options
 * @author Claude Code Documentation Generator
 * @created 2026-01-02
 */

/**
 * CLI options configuration.
 *
 * Represents the parsed command-line options that control the behaviour
 * of the template initialisation CLI. All options are boolean flags.
 *
 * @interface CliOptions
 * @property {boolean} dryRun - Preview mode: show what would change without making changes
 * @property {boolean} verbose - Detailed logging mode: show all operations and file content changes
 * @property {boolean} json - JSON output mode: output structured JSON for automation
 */
export interface CliOptions {
  /**
   * Dry-run mode: Preview changes without applying them.
   *
   * When enabled:
   * - File replacements are simulated but not written to disk
   * - Shows which files would be modified and what changes would occur
   * - No backups are created
   * - template.config.json is not created
   * - Original files remain completely untouched
   *
   * Useful for:
   * - Verifying configuration before committing to changes
   * - Testing the CLI without side effects
   * - Reviewing what placeholders will be replaced
   */
  dryRun: boolean

  /**
   * Verbose mode: Show detailed logging of all operations.
   *
   * When enabled:
   * - Shows file content before and after replacements
   * - Displays detailed information about each replacement operation
   * - Logs all validation checks and their results
   * - Shows backup creation and cleanup operations
   * - Provides timing information for operations
   *
   * Useful for:
   * - Debugging issues with the initialisation process
   * - Understanding exactly what the CLI is doing
   * - Troubleshooting replacement failures
   */
  verbose: boolean

  /**
   * JSON output mode: Output structured JSON for automation.
   *
   * When enabled:
   * - All output is valid JSON (no colour codes or formatting)
   * - Progress messages are suppressed
   * - Final result is a JSON object with operation details
   * - Suitable for parsing by CI/CD scripts or other tools
   *
   * JSON output structure:
   * {
   *   "success": boolean,
   *   "dryRun": boolean,
   *   "answers": { clientName, packageName, description, primaryColour },
   *   "filesModified": number,
   *   "files": [{ "path": string, "modified": boolean }],
   *   "error": string | null
   * }
   *
   * Useful for:
   * - Automated testing and CI/CD pipelines
   * - Integration with other tools
   * - Programmatic access to initialisation results
   */
  json: boolean
}

/**
 * Parses command-line arguments and returns CLI options.
 *
 * Scans process.argv for recognised CLI flags and returns a configuration
 * object with boolean flags for each option.
 *
 * Supported flags:
 * - --dry-run: Enable dry-run mode (preview only)
 * - --verbose: Enable verbose logging mode
 * - --json: Enable JSON output mode
 *
 * Flags can be combined:
 * --dry-run --verbose: Preview with detailed logging
 * --json --dry-run: JSON output for preview without changes
 *
 * All flags are optional and default to false if not provided.
 *
 * @returns {CliOptions} - Parsed CLI options with boolean flags
 *
 * @example
 * // Parse options from command line
 * const options = parseCliOptions();
 *
 * if (options.dryRun) {
 *   console.log('Running in preview mode - no changes will be made');
 * }
 *
 * if (options.verbose) {
 *   console.log('Verbose logging enabled');
 * }
 *
 * // Example command lines:
 * // node init-template.ts --dry-run
 * // node init-template.ts --verbose
 * // node init-template.ts --json
 * // node init-template.ts --dry-run --verbose
 */
export function parseCliOptions(): CliOptions {
  const args = process.argv.slice(2)

  return {
    dryRun: args.includes('--dry-run'),
    verbose: args.includes('--verbose'),
    json: args.includes('--json'),
  }
}

/**
 * Logger utility that respects CLI options.
 *
 * Provides logging functions that automatically adapt based on CLI options:
 * - In JSON mode: Suppresses all console output
 * - In verbose mode: Shows detailed messages
 * - In normal mode: Shows standard messages
 *
 * @class Logger
 */
/**
 * JSON output data structure for automation mode.
 *
 * @interface JsonOutputData
 */
export interface JsonOutputData {
  /** Whether the initialisation was successful */
  success: boolean
  /** Whether dry-run mode was enabled */
  dryRun: boolean
  /** User answers from the prompts */
  answers: {
    clientName: string
    packageName: string
    description: string
    primaryColour: string
  } | null
  /** Number of files modified */
  filesModified: number
  /** Array of file results */
  files: Array<{ file: string; modified: boolean }>
  /** Error message if failed */
  error: string | null
  /** Whether placeholders were verified as replaced */
  verified?: boolean
  /** Existing package name if conflict detected */
  existingPackage?: string
  /** Existing client name if conflict detected */
  existingClient?: string
}

export class Logger {
  private options: CliOptions
  private jsonData: JsonOutputData

  constructor(options: CliOptions) {
    this.options = options
    this.jsonData = {
      success: false,
      dryRun: options.dryRun,
      answers: null,
      filesModified: 0,
      files: [],
      error: null,
    }
  }

  /**
   * Logs a standard message (only if not in JSON mode).
   *
   * @param {string} message - The message to log
   */
  log(message: string): void {
    if (!this.options.json) {
      console.log(message)
    }
  }

  /**
   * Logs a verbose message (only if verbose mode is enabled and not in JSON mode).
   *
   * @param {string} message - The verbose message to log
   */
  verbose(message: string): void {
    if (this.options.verbose && !this.options.json) {
      console.log(message)
    }
  }

  /**
   * Sets JSON data for final output.
   *
   * @param {Partial<JsonOutputData>} data - Data to merge into JSON output
   */
  setJsonData(data: Partial<JsonOutputData>): void {
    this.jsonData = { ...this.jsonData, ...data }
  }

  /**
   * Outputs final JSON result (only in JSON mode).
   */
  outputJson(): void {
    if (this.options.json) {
      console.log(JSON.stringify(this.jsonData, null, 2))
    }
  }
}
