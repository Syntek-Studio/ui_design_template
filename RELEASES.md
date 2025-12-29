# Release Notes

**Last Updated**: 29/12/2024
**Version**: 0.1.0
**Maintained By**: Development Team
**Language**: British English (en_GB)
**Timezone**: Europe/London

---

## Table of Contents

- [Latest Release](#latest-release)
- [Previous Releases](#previous-releases)
- [Coming Soon](#coming-soon)

---

## Latest Release

### Version 0.1.0 - 29 December 2024

Welcome to the initial release of **@tempalte/ui**, a shared component library for building beautiful, consistent user interfaces across web and mobile platforms.

#### What's New

**Cross-Platform Components**
We've built a foundation for creating UI components that work seamlessly on both web browsers and mobile apps. Our first component, the Button, is available in both platforms with a consistent API.

**Comprehensive Design System**
Everything you need for consistent, beautiful designs is included:
- **Colour Palette**: Primary, secondary, and semantic colours with multiple shades
- **Spacing Scale**: A 4-pixel grid system for perfect alignment
- **Typography**: Carefully chosen font families, sizes, and weights
- **Responsive Breakpoints**: Mobile-first breakpoints from 640px to 1536px
- **Shadows & Borders**: Pre-defined shadow depths and border styles

**Modern Development Experience**
Built with the latest tools for an excellent developer experience:
- Full TypeScript support with comprehensive type definitions
- Tailwind CSS 4 for rapid styling
- Interactive component documentation with Storybook
- Import components with simple, intuitive syntax

**Easy Integration**
Getting started is straightforward:
```typescript
// For web projects
import { Button } from '@tempalte/ui';

// For mobile projects
import { Mobile } from '@tempalte/ui';
```

#### Getting Started

1. Install the library:
   ```bash
   npm install @tempalte/ui
   ```

2. Import and use components:
   ```typescript
   import { Button } from '@tempalte/ui';

   <Button title="Click me" variant="primary" onClick={() => {}} />
   ```

3. Use design tokens for consistency:
   ```typescript
   import { colours, spacing } from '@tempalte/ui';

   const primaryColor = colours.primary[500];
   const padding = spacing[4];
   ```

#### What This Means for You

**For Web Developers:**
- Use familiar React components with Tailwind CSS styling
- Full hover and focus state support
- Works with existing web applications

**For Mobile Developers:**
- React Native components with Nativewind support
- Platform-appropriate interactions (onPress instead of onClick)
- Seamless integration with React Native apps

**For Design System Managers:**
- Centralised design tokens for brand consistency
- Easy to extend and customise
- Documentation included out of the box

---

## Coming Soon

In our next releases, we're working on:

**Additional Components**
- Card component for content containers
- Input component for forms
- Modal component for dialogs
- Navigation components

**Enhanced Features**
- Dark mode theme support
- Animation presets
- More comprehensive accessibility features
- Additional colour themes

**Developer Experience**
- More Storybook examples
- Enhanced TypeScript documentation
- Performance optimisation guides
- Migration guides for existing projects

**Testing & Quality**
- Comprehensive accessibility testing
- Cross-browser compatibility verification
- Performance benchmarks
- Visual regression testing

---

## Previous Releases

This is the initial release.

---

## Support & Feedback

We'd love to hear from you! If you have questions, suggestions, or run into any issues:

- Open an issue on our repository
- Check our documentation in the `docs/` folder
- Review component examples in Storybook

---

**Note:** This library is currently in pre-release (version 0.x.x) as we gather feedback and refine the component APIs. We're committed to stability, but some breaking changes may occur before version 1.0.0. We'll communicate any changes clearly in our changelog.

Thank you for using @tempalte/ui! We're excited to see what you build.
