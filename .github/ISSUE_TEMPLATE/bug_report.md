---
<!-- Bug report issue template for @syntek-studio/ui library -->
<!--
This template helps developers report bugs in a structured format that makes
debugging and reproduction easier. All sections should be completed to provide
maximum context for maintainers.

Instructions:
1. Use a clear, descriptive title (e.g., "[BUG] Button component onClick not firing on mobile")
2. Complete all sections with specific details
3. Include environment information (OS, Node version, package version)
4. Provide steps to reproduce or minimal code example
5. Add screenshots/videos if the bug is visually related
-->
name: Bug Report
about: Report a bug to help us improve
title: '[BUG] '
labels: bug
assignees: ''
---

## Describe the Bug

<!--
Provide a clear and concise description of what the bug is.
Explain what went wrong, not what you expected to happen.

Example:
"The Button component's onClick handler is not being called when clicked on
mobile devices. This appears to affect both iOS Safari and Android Chrome."
-->

## To Reproduce

<!--
Provide exact steps to reproduce the bug.
Be as specific as possible - include component props, imports, etc.

Example:
1. Import Button from @syntek-studio/ui
2. Render: <Button onClick={() => alert('clicked')}>Click me</Button>
3. Tap on the button on a mobile device
4. The alert does not appear
-->

Steps to reproduce the behaviour:

1. Go to '...'

2. Click on '...'

3. See error

## Expected Behaviour

<!--
What did you expect to happen?
Be specific about the expected outcome.

Example:
"The onClick handler should be called immediately when the button is tapped,
and the alert should appear with the message 'clicked'."
-->

## Actual Behaviour

<!--
What actually happened instead?
Include any error messages, console logs, or unexpected output.

Example:
"The onClick handler is not called. No error appears in console.
The button shows visual feedback (pressed state) but the handler doesn't fire."
-->

## Screenshots or Demo

<!--
If applicable, attach screenshots, screen recordings, or a CodeSandbox/Storybook
link that demonstrates the bug. Visual evidence helps greatly.

For web bugs: F12 DevTools console output, error messages
For mobile: Screen recording or screenshot of the issue
-->

## Environment

<!--
Provide detailed environment information. This helps us reproduce the issue
and understand if it's environment-specific.
-->

- OS: [e.g., macOS 14.0, Windows 11, Ubuntu 22.04]

- Node version: [e.g., 20.10.0]

- Package version: [e.g., 0.6.0]

- Browser (if applicable): [e.g., Chrome 120, Safari 17.1, Firefox 121]

- React version: [e.g., 18.2.0]

- React Native version (if applicable): [e.g., 0.73.0]

## Additional Context

<!--
Add any other context about the problem that might help us debug.

Examples:
- Did this work in a previous version?
- Is this reproducible consistently or intermittently?
- Are you using any custom styling or component composition?
- Did you modify the component in any way?
- Links to related discussions or issues
-->

## Code Example (Optional)

<!--
If possible, provide a minimal code example that reproduces the bug.
This helps maintainers quickly understand and fix the issue.

```typescript
import { Button } from '@syntek-studio/ui';

export function BugDemo() {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return <Button onClick={handleClick}>Click me</Button>;
}
```
-->
