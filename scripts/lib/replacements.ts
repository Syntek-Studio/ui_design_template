/**
 * Placeholder replacement utilities for template initialization.
 *
 * This module manages the mapping of template placeholders to user-provided values
 * and performs string replacements across project files. It handles special characters
 * in regex patterns and ensures all template placeholders are correctly replaced.
 *
 * Key Concepts:
 * - UserAnswers: User input collected from CLI prompts
 * - ReplacementMap: Key-value pairs mapping template placeholders to replacement values
 * - Files modified: package.json, README.md, .claude/CLAUDE.md, src/index.ts
 * - Placeholder strings: @syntek-studio/ui, @syntek-studio/ui, Syntek Studio, description text
 *
 * @module scripts/lib/replacements
 * @author Claude Code Documentation Generator
 * @created 2026-01-02
 */

/**
 * User input answers collected from CLI prompts.
 *
 * These values are provided by the user during the initialization process
 * and are used to replace template placeholders throughout the project.
 *
 * @typedef {Object} UserAnswers
 * @property {string} clientName - Name of the client or company (max 100 chars)
 * @property {string} packageName - npm package name (max 214 chars, lowercase)
 * @property {string} description - Project description (max 500 chars)
 * @property {string} primaryColour - Primary brand colour as hex code (e.g., "#3b82f6")
 */
export interface UserAnswers {
  clientName: string
  packageName: string
  description: string
  primaryColour: string
}

/**
 * Map of template placeholders to their replacement values.
 *
 * Keys are the placeholder strings to search for (template defaults).
 * Values are the replacement strings (user-provided values).
 * Used with regex escaping to safely replace all occurrences in files.
 *
 * @typedef {Object} ReplacementMap
 * @property {string} [key] - Placeholder string to search for
 * @property {string} [value] - Replacement string to use
 *
 * @example
 * const map = {
 *   '@syntek-studio/ui': '@acme/ui',
 *   '@syntek-studio/ui': '@acme/ui',
 *   'Syntek Studio': 'Acme Corporation',
 *   'Default description text': 'Custom description'
 * }
 */
export interface ReplacementMap {
  [key: string]: string
}

/**
 * Creates a replacement map from user answers.
 *
 * Builds a mapping of template placeholder strings to user-provided values.
 * This map is used to replace all occurrences of default template values
 * throughout the project files.
 *
 * Template placeholders replaced:
 * - '@syntek-studio/ui' → user's packageName
 * - '@syntek-studio/ui' → user's packageName
 * - 'Syntek Studio' → user's clientName
 * - 'A shared UI component library...' → user's description
 * - (Primary colour placeholders if defined in templates)
 *
 * @param {UserAnswers} answers - The user's input from CLI prompts
 * @returns {ReplacementMap} - Map of template placeholders to replacement values
 *
 * @example
 * const map = createReplacementMap({
 *   clientName: 'Acme',
 *   packageName: '@acme/ui',
 *   description: 'Acme design system',
 *   primaryColour: '#3b82f6'
 * });
 * // Returns {
 * //   '@syntek-studio/ui': '@acme/ui',
 * //   '@syntek-studio/ui': '@acme/ui',
 * //   'Syntek Studio': 'Acme',
 * //   'A shared UI component library...': 'Acme design system'
 * // }
 */
export function createReplacementMap(answers: UserAnswers): ReplacementMap {
  return {
    // Package name replacement (appears in package.json, README, examples, etc.)
    '@syntek-studio/ui': answers.packageName,

    // Client name replacements (multiple formats used throughout template)
    SYNTEK_CLIENT_NAME: answers.clientName,
    'Syntek Studio': answers.clientName,
    'Sam Bailey': answers.clientName,

    // Primary colour replacement (appears in design tokens)
    '#3b82f6': answers.primaryColour,

    // Description replacement (appears in package.json and README)
    'A shared UI component library for React Web and React Native applications. Built with TypeScript, Tailwind CSS 4, and Nativewind 4.':
      answers.description,
  }
}

/**
 * Returns the list of files that need placeholder replacements.
 *
 * These are the project files that contain template placeholders and need
 * to be updated during initialization. The list includes:
 * - package.json: Package metadata (name, author, description)
 * - README.md: Project documentation and examples
 * - .claude/CLAUDE.md: Development guidelines and architecture
 * - src/index.ts: Module exports and descriptions
 *
 * File paths are relative to the project root.
 *
 * @returns {string[]} - Array of relative file paths that need modification
 *
 * @example
 * const files = getFilesToModify();
 * // Returns: [
 * //   'package.json',
 * //   'README.md',
 * //   '.claude/CLAUDE.md',
 * //   'src/index.ts'
 * // ]
 */
export function getFilesToModify(): string[] {
  return ['package.json', 'README.md', '.claude/CLAUDE.md', 'src/index.ts']
}

/**
 * Sanitises a value for safe use in JSON files.
 *
 * Escapes double quotes and backslashes to prevent JSON injection attacks.
 * This ensures user-provided values cannot break JSON syntax or inject
 * malicious content into package.json and other JSON configuration files.
 *
 * Characters escaped:
 * - " (double quote) → \"
 * - \ (backslash) → \\
 *
 * @param {string} value - The value to sanitise
 * @returns {string} - Sanitised value safe for JSON
 *
 * @example
 * sanitiseForJSON('test')              // returns 'test'
 * sanitiseForJSON('test"value')        // returns 'test\\"value'
 * sanitiseForJSON('C:\\path')          // returns 'C:\\\\path'
 * sanitiseForJSON('test", "bad": "x')  // returns 'test\\", \\"bad\\": \\"x'
 */
export function sanitiseForJSON(value: string): string {
  // Escape quotes and backslashes to prevent JSON injection
  return value.replace(/["\\]/g, '\\$&')
}

/**
 * Sanitises a value for safe use in Markdown files.
 *
 * Removes HTML tags to prevent injection attacks when Markdown is rendered as HTML.
 * This protects against XSS attacks if README.md or other documentation is
 * displayed in web interfaces (GitHub, npm, documentation sites).
 *
 * Characters removed:
 * - < (less than)
 * - > (greater than)
 *
 * @param {string} value - The value to sanitise
 * @returns {string} - Sanitised value safe for Markdown
 *
 * @example
 * sanitiseForMarkdown('Acme Corp')                      // returns 'Acme Corp'
 * sanitiseForMarkdown('Acme <script>alert(1)</script>') // returns 'Acme scriptalert(1)/script'
 * sanitiseForMarkdown('<b>Bold</b>')                    // returns 'bBold/b'
 */
export function sanitiseForMarkdown(value: string): string {
  // Remove HTML tags to prevent injection
  return value.replace(/[<>]/g, '')
}

/**
 * Applies context-aware sanitisation to replacement values based on file type.
 *
 * Determines the appropriate sanitisation strategy based on file extension:
 * - .json files: Escape quotes and backslashes (JSON injection prevention)
 * - .md files: Remove HTML tags (XSS prevention)
 * - Other files: No sanitisation (passthrough)
 *
 * This provides defence-in-depth protection against injection attacks while
 * preserving functionality for non-vulnerable file types.
 *
 * @param {string} value - The value to sanitise
 * @param {string} filePath - The file path to determine context
 * @returns {string} - Sanitised value appropriate for the file type
 *
 * @example
 * sanitiseReplacementValue('test"value', 'package.json')  // JSON escaped
 * sanitiseReplacementValue('test<tag>', 'README.md')      // HTML tags removed
 * sanitiseReplacementValue('test"value', 'index.ts')      // No sanitisation
 */
export function sanitiseReplacementValue(value: string, filePath: string): string {
  if (filePath.endsWith('.json')) {
    return sanitiseForJSON(value)
  }
  if (filePath.endsWith('.md')) {
    return sanitiseForMarkdown(value)
  }
  return value
}

/**
 * Escapes special regex characters in a string.
 *
 * Converts a regular string into a string safe for use as a literal pattern
 * in a RegExp. This is necessary because some characters have special meaning
 * in regular expressions and must be escaped with a backslash to match literally.
 *
 * Characters escaped:
 * @ / - . ( ) [ ] * + ? ^ $ | { } \
 *
 * This function is used internally before creating regex patterns for placeholder
 * replacement, ensuring that special characters in package names and other strings
 * are treated as literals rather than regex operators.
 *
 * @param {string} str - The string to escape
 * @returns {string} - Escaped string safe for use in RegExp constructor
 *
 * @example
 * escapeRegExp('@syntek-studio/ui')  // returns '\\@syntek\\-studio\\/ui'
 * escapeRegExp('example.com')        // returns 'example\\.com'
 * escapeRegExp('test(1+2)')          // returns 'test\\(1\\+2\\)'
 * escapeRegExp('[test]')             // returns '\\[test\\]'
 * escapeRegExp('^hello$')            // returns '\\^hello\\$'
 */
export function escapeRegExp(str: string): string {
  // Escape all special regex characters: @ . * + ? ^ $ { } ( ) | [ ] \ / -
  return str.replace(/[@.*+?^${}()|[\]\\/-]/g, '\\$&')
}

/**
 * Applies replacements to a content string.
 *
 * Replaces all occurrences of placeholder strings with their corresponding values
 * from the replacement map. Uses regex with global flag to replace all instances.
 *
 * Security: When filePath is provided, applies context-aware sanitisation to prevent
 * injection attacks (JSON injection, XSS via Markdown).
 *
 * Process:
 * 1. Iterates through each key-value pair in the replacement map
 * 2. Escapes special regex characters in the key (placeholder)
 * 3. Creates a RegExp with global flag for case-sensitive replacement
 * 4. Sanitises replacement value if filePath provided (context-aware)
 * 5. Replaces all occurrences in the content
 * 6. Returns the fully replaced content
 *
 * Preserves:
 * - Line breaks and whitespace formatting
 * - Indentation and structural formatting
 * - Case sensitivity (replacements are case-sensitive)
 * - Content outside of placeholders
 *
 * @param {string} content - The content string to modify
 * @param {ReplacementMap} replacements - Map of placeholder→replacement pairs
 * @param {string} [filePath] - Optional file path for context-aware sanitisation
 * @returns {string} - Content with all replacements applied
 *
 * @example
 * // Single replacement
 * applyReplacements('Use @syntek-studio/ui', {
 *   '@syntek-studio/ui': '@acme/ui'
 * })
 * // Returns: 'Use @acme/ui'
 *
 * // Multiple replacements
 * applyReplacements('Package: @syntek-studio/ui by Syntek Studio', {
 *   '@syntek-studio/ui': '@acme/ui',
 *   'Syntek Studio': 'Acme Corporation'
 * })
 * // Returns: 'Package: @acme/ui by Acme Corporation'
 *
 * // With sanitisation (JSON file)
 * applyReplacements('{"name": "PLACEHOLDER"}', {
 *   'PLACEHOLDER': 'test"value'
 * }, 'package.json')
 * // Returns: '{"name": "test\\"value"}' (quotes escaped)
 *
 * // With sanitisation (Markdown file)
 * applyReplacements('# PLACEHOLDER', {
 *   'PLACEHOLDER': 'Acme <script>alert(1)</script>'
 * }, 'README.md')
 * // Returns: '# Acme scriptalert(1)/script' (HTML tags removed)
 */
export function applyReplacements(
  content: string,
  replacements: ReplacementMap,
  filePath?: string
): string {
  let modifiedContent = content

  // Apply each replacement from the map
  for (const [placeholder, replacement] of Object.entries(replacements)) {
    // Escape special regex characters in the placeholder
    const escapedPlaceholder = escapeRegExp(placeholder)

    // Create a global regex to replace all occurrences
    const regex = new RegExp(escapedPlaceholder, 'g')

    // Apply context-aware sanitisation if file path is provided
    const sanitisedReplacement = filePath
      ? sanitiseReplacementValue(replacement, filePath)
      : replacement

    // Apply the replacement
    modifiedContent = modifiedContent.replace(regex, sanitisedReplacement)
  }

  return modifiedContent
}
