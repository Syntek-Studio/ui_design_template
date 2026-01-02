/**
 * CLI user prompt utilities for template initialization.
 *
 * This module manages interactive prompts using the inquirer.js library to
 * collect user input during template initialization. Prompts include:
 * - Client/company name
 * - npm package name
 * - Project description
 * - Primary brand colour (hex code)
 *
 * All prompts include real-time validation using the validators module
 * to ensure input quality before proceeding.
 *
 * @module scripts/lib/prompts
 * @author Claude Code Documentation Generator
 * @created 2026-01-02
 */

import inquirer from 'inquirer'
import chalk from 'chalk'
import type { UserAnswers } from './replacements'
import {
  validateClientName,
  validatePackageName,
  validateDescription,
  validateHexColour,
} from './validators'

/**
 * Prompts the user for initialization inputs using interactive inquirer prompts.
 *
 * Displays a series of interactive prompts to collect the following information:
 * - Client/company name (with validation for empty/length)
 * - npm package name (with validation for npm naming rules)
 * - Primary brand colour as hex code (with validation for valid hex format)
 * - Project description (with validation for empty/length)
 *
 * Each prompt includes:
 * - Clear question text explaining what input is needed
 * - Real-time validation using validators from validators.ts
 * - Error messages displayed if input is invalid
 * - Ability to re-enter if validation fails
 *
 * @returns {Promise<UserAnswers>} - Object containing user's answers to all prompts
 * @property {string} clientName - The client/company name (1-100 characters)
 * @property {string} packageName - The npm package name (lowercase, max 214 chars)
 * @property {string} description - The project description (1-500 characters)
 * @property {string} primaryColour - Primary brand colour as hex code
 *
 * @example
 * // Get user input interactively
 * const answers = await promptUserInputs();
 * console.log(`Package: ${answers.packageName}`);
 * console.log(`Client: ${answers.clientName}`);
 * console.log(`Description: ${answers.description}`);
 * console.log(`Brand colour: ${answers.primaryColour}`);
 *
 * // Example output:
 * // {
 * //   clientName: 'Acme Corporation',
 * //   packageName: '@acme/ui',
 * //   description: 'Design system for web and mobile',
 * //   primaryColour: '#3b82f6'
 * // }
 */
export async function promptUserInputs(): Promise<UserAnswers> {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'clientName',
      message: 'What is your client/company name?',
      default: 'Acme Corporation',
      validate: (input: string) => {
        const result = validateClientName(input)
        return result === true ? true : result
      },
    },
    {
      type: 'input',
      name: 'packageName',
      message: 'What is your npm package name?',
      default: '@acme/ui',
      validate: (input: string) => {
        const result = validatePackageName(input)
        return result === true ? true : result
      },
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a project description:',
      default: 'A shared UI component library for web and mobile applications',
      validate: (input: string) => {
        const result = validateDescription(input)
        return result === true ? true : result
      },
    },
    {
      type: 'input',
      name: 'primaryColour',
      message: 'What is your primary brand colour? (hex code)',
      default: '#3b82f6',
      validate: (input: string) => {
        const result = validateHexColour(input)
        return result === true ? true : result
      },
    },
  ])

  return answers as UserAnswers
}

/**
 * Displays a confirmation prompt summarising the user's inputs.
 *
 * Shows a summary of all collected inputs and asks the user to confirm
 * whether they want to proceed with initialization. If the user says "no",
 * they can go back and re-enter the values.
 *
 * The summary typically displays:
 * - Client name
 * - Package name
 * - Description
 * - Primary brand colour
 *
 * This checkpoint prevents accidental initialisation with incorrect values
 * and allows users to catch mistakes before file modifications occur.
 *
 * @param {UserAnswers} answers - The answers to display for confirmation
 * @returns {Promise<boolean>} - True if user confirms and wants to proceed,
 *                               false if user wants to re-enter values
 *
 * @example
 * // After collecting inputs, ask for confirmation
 * const confirmed = await confirmInputs(answers);
 * if (!confirmed) {
 *   // User wants to re-enter, ask prompts again
 *   const newAnswers = await promptUserInputs();
 *   // ... continue with new answers
 * } else {
 *   // User confirmed, proceed with initialization
 *   await performReplacements(answers);
 * }
 */
export async function confirmInputs(answers: UserAnswers): Promise<boolean> {
  console.log('\n')
  console.log(chalk.bold.white('Please confirm your inputs:'))
  console.log('\n')
  console.log(chalk.cyan('  Client Name:    ') + chalk.white(answers.clientName))
  console.log(chalk.cyan('  Package Name:   ') + chalk.white(answers.packageName))
  console.log(chalk.cyan('  Description:    ') + chalk.white(answers.description))
  console.log(chalk.cyan('  Primary Colour: ') + chalk.white(answers.primaryColour))
  console.log('\n')

  const confirmation = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'proceed',
      message: 'Do you want to proceed with these values?',
      default: true,
    },
  ])

  return confirmation.proceed
}

/**
 * Displays a welcome message at the start of the CLI.
 *
 * Shows an introduction message to greet the user and explain what the
 * template initialization CLI does. This should:
 * - Welcome the user to the template initialization process
 * - Briefly explain what the CLI does
 * - Set expectations for what information will be collected
 * - Display branding or project information if relevant
 *
 * This is a display-only function (synchronous) that does not collect input.
 *
 * @example
 * // Display welcome message at the start of the CLI
 * displayWelcomeMessage();
 * console.log('Starting initialization...');
 * const answers = await promptUserInputs();
 */
export function displayWelcomeMessage(): void {
  console.log('\n')
  console.log(chalk.bold.cyan('╔════════════════════════════════════════════════════════════════╗'))
  console.log(chalk.bold.cyan('║                                                                ║'))
  console.log(
    chalk.bold.cyan('║         ') +
      chalk.bold.white('Template Initialisation CLI') +
      chalk.bold.cyan('                       ║')
  )
  console.log(chalk.bold.cyan('║                                                                ║'))
  console.log(chalk.bold.cyan('╚════════════════════════════════════════════════════════════════╝'))
  console.log('\n')
  console.log(chalk.white('Welcome to the template initialisation wizard!'))
  console.log('\n')
  console.log(chalk.gray('This CLI will help you customise this template for your project by:'))
  console.log(chalk.gray('  • Setting your client/company name'))
  console.log(chalk.gray('  • Configuring your npm package name'))
  console.log(chalk.gray('  • Customising your project description'))
  console.log(chalk.gray('  • Defining your primary brand colour'))
  console.log('\n')
  console.log(chalk.yellow('All template placeholders will be replaced with your values.'))
  console.log('\n')
}

/**
 * Displays a success message after initialization completes.
 *
 * Shows a summary of the successful initialization, typically including:
 * - Confirmation that initialization succeeded
 * - List of files modified
 * - New package name and client name
 * - Next steps or instructions for the user
 * - Tips for what to do next (build, deploy, etc.)
 *
 * This message provides positive feedback and helps the user understand
 * what was accomplished during the initialization process.
 *
 * This is a display-only function (synchronous) that does not collect input.
 *
 * @param {UserAnswers} answers - The user's answers provided during initialization
 * @param {ReplacementResult[]} results - Array of file modification results,
 *                                        each containing { file, modified }
 *
 * @example
 * // After successful initialization
 * const answers = await promptUserInputs();
 * const results = await performReplacements(answers);
 * displaySuccessMessage(answers, results);
 * // Output:
 * // ✓ Initialization completed successfully!
 * // Package: @acme/ui
 * // Client: Acme Corporation
 * // Files modified: 4
 * // - package.json
 * // - README.md
 * // - .claude/CLAUDE.md
 * // - src/index.ts
 */
export function displaySuccessMessage(
  answers: UserAnswers,
  results: Array<{ file: string; modified: boolean }>
): void {
  console.log('\n')
  console.log(chalk.bold.green('✓ Initialisation completed successfully!'))
  console.log('\n')
  console.log(chalk.white('Your template has been customised with:'))
  console.log('\n')
  console.log(chalk.cyan('  Package:        ') + chalk.white(answers.packageName))
  console.log(chalk.cyan('  Client:         ') + chalk.white(answers.clientName))
  console.log(chalk.cyan('  Description:    ') + chalk.white(answers.description))
  console.log(chalk.cyan('  Primary Colour: ') + chalk.white(answers.primaryColour))
  console.log('\n')

  const modifiedFiles = results.filter((r) => r.modified)
  console.log(chalk.white(`Files modified: ${modifiedFiles.length}`))
  console.log('\n')

  modifiedFiles.forEach((result) => {
    console.log(chalk.green('  ✓ ') + chalk.gray(result.file))
  })

  console.log('\n')
  console.log(chalk.bold.yellow('Next steps:'))
  console.log(chalk.gray('  1. Review the modified files'))
  console.log(
    chalk.gray('  2. Run ') + chalk.white('npm run build') + chalk.gray(' to build your library')
  )
  console.log(
    chalk.gray('  3. Run ') +
      chalk.white('npm run storybook:web') +
      chalk.gray(' to view your components')
  )
  console.log(chalk.gray('  4. Commit your changes to version control'))
  console.log('\n')
}
