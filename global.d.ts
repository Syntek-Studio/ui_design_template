/**
 * Global type declarations
 */

// CSS side-effect imports (import './styles.css')
declare module '*.css'

// CSS modules (import styles from './styles.module.css')
declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}
