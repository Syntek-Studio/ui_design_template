// ===== Styles =====
// Import global Tailwind + custom styles
import './styles/index.css';

// ===== Layouts =====
export { default as Header } from './layouts/Header/HeaderWrapper.jsx';
export { default as Footer } from './layouts/Footer/FooterWrapper.jsx';
export { default as PageWrapper } from './layouts/PageWrapper.jsx';

// ===== Components =====
export { default as Button } from './components/Button/Button.jsx';
export { default as Card } from './components/Card/Card.jsx';
export * as Form from './components/Form/form.js';
export { default as Modal } from './components/Modal/Modal.jsx';
export * as Utility from './components/Utility/utility.js';