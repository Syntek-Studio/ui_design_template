/**
 * Type declarations for CSS imports
 */

// Side-effect imports (import './styles.css')
declare module '*.css'

// CSS modules with default export (import styles from './styles.module.css')
declare module '*.module.css' {
  const classes: { [className: string]: string }
  export default classes
}
