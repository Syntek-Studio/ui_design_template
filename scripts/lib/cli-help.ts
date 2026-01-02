/**
 * CLI help text and usage information for template initialisation.
 *
 * Provides usage instructions and option descriptions for the template
 * initialisation CLI tool.
 *
 * @module scripts/lib/cli-help
 * @author Claude Code Documentation Generator
 * @created 2026-01-02
 */

import chalk from 'chalk'

/**
 * Displays help text for the CLI.
 *
 * Shows usage information, available options, and examples for running
 * the template initialisation CLI.
 */
export function displayHelp(): void {
  console.log('')
  console.log(chalk.bold.cyan('Template Initialisation CLI'))
  console.log('')
  console.log(chalk.white('Usage:'))
  console.log(chalk.gray('  npm run init-template [options]'))
  console.log(chalk.gray('  npx tsx scripts/init-template.ts [options]'))
  console.log('')
  console.log(chalk.white('Options:'))
  console.log(chalk.cyan('  --dry-run  ') + chalk.gray('Preview changes without modifying files'))
  console.log(chalk.cyan('  --verbose  ') + chalk.gray('Show detailed logging of all operations'))
  console.log(chalk.cyan('  --json     ') + chalk.gray('Output structured JSON for automation'))
  console.log(chalk.cyan('  --help     ') + chalk.gray('Display this help message'))
  console.log('')
  console.log(chalk.white('Examples:'))
  console.log(chalk.gray('  # Normal initialisation'))
  console.log(chalk.yellow('  npm run init-template'))
  console.log('')
  console.log(chalk.gray('  # Preview changes without modifying files'))
  console.log(chalk.yellow('  npm run init-template -- --dry-run'))
  console.log('')
  console.log(chalk.gray('  # Preview with detailed logging'))
  console.log(chalk.yellow('  npm run init-template -- --dry-run --verbose'))
  console.log('')
  console.log(chalk.gray('  # Output JSON for automation (pipe to jq, etc.)'))
  console.log(chalk.yellow('  npm run init-template -- --json'))
  console.log('')
  console.log(chalk.white('Description:'))
  console.log(
    chalk.gray('  Initialises a new design system template by customising package names,')
  )
  console.log(chalk.gray('  client names, brand colours, and descriptions throughout the project.'))
  console.log('')
}

/**
 * Checks if help was requested via CLI arguments.
 *
 * @returns {boolean} - True if --help flag was provided
 */
export function isHelpRequested(): boolean {
  return process.argv.includes('--help') || process.argv.includes('-h')
}
