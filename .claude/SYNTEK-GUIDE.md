# Syntek Dev Suite - Plugin Usage Guide

**Version:** 1.0.0
**Plugin:** syntek-dev-suite
**Maintained by:** Syntek Developers

---

## Table of Contents

- [Quick Start](#quick-start)
- [Complete Development Workflow](#complete-development-workflow)
- [Command Types](#command-types)
- [Agent Commands](#agent-commands)
- [Plugin Commands](#plugin-commands)
- [Learning Commands](#learning-commands)
- [Skills Reference](#skills-reference)
- [Self-Learning and A/B Testing](#self-learning-and-ab-testing)
- [Best Practices](#best-practices)
- [Environment Commands](#environment-commands)
- [Getting Help](#getting-help)

---

## Quick Start

The Syntek Dev Suite provides specialised AI agents for full-stack development. Each agent has domain expertise and understands your project's stack through the `CLAUDE.md` file.

### Basic Usage

```bash
# Plan a new feature
/syntek-dev-suite:plan Add a new Card component with variants

# Implement frontend
/syntek-dev-suite:frontend Create the Card component for web and mobile

# Write tests
/syntek-dev-suite:test-writer Write tests for the Card component

# Review code
/syntek-dev-suite:review Review the Card implementation

# Give feedback to improve the agent
/syntek-dev-suite:learning-feedback good
```

---

## Complete Development Workflow

This section walks through a complete development cycle for a shared library.

### Phase 1: Planning

```bash
# 1. Plan the component architecture
/syntek-dev-suite:plan Design a Modal component with animations

# 2. Generate user stories if needed
/syntek-dev-suite:stories Create user stories for the Modal component
```

### Phase 2: Test-Driven Development

```bash
# 1. Write tests first (TDD)
/syntek-dev-suite:test-writer Write tests for the Modal component

# 2. Generate documentation
/syntek-dev-suite:docs Document the Modal component API
```

### Phase 3: Implementation

```bash
# 1. Implement the component
/syntek-dev-suite:frontend Create the Modal component for web

/syntek-dev-suite:frontend Create the Modal component for mobile

# 2. Fix any syntax or linting issues
/syntek-dev-suite:syntax Fix linting errors in the Modal component
```

### Phase 4: Quality Assurance

```bash
# 1. Run QA testing
/syntek-dev-suite:qa-tester Review the Modal implementation for edge cases

# 2. Code review
/syntek-dev-suite:review Review the Modal component
```

### Phase 5: Completion

```bash
# 1. Refactor if needed
/syntek-dev-suite:refactor Clean up the Modal component code

# 2. Update documentation
/syntek-dev-suite:docs Update Modal documentation with examples

# 3. Commit changes
git add . && git commit -m "feat(modal): add Modal component for web and mobile"
```

---

## Command Types

All Syntek commands are prefixed with their type for clarity:

| Prefix | Type | Description |
|--------|------|-------------|
| `/syntek-dev-suite:` | Agent | Spawns a specialised AI agent |

---

## Agent Commands

### Planning & Architecture

| Command | Description |
|---------|-------------|
| `/syntek-dev-suite:plan` | Create architectural plans, break down features |
| `/syntek-dev-suite:stories` | Generate user stories from requirements |
| `/syntek-dev-suite:sprint` | Organise stories into balanced sprints |
| `/syntek-dev-suite:completion` | Track story and sprint completion |

### Development

| Command | Description |
|---------|-------------|
| `/syntek-dev-suite:setup` | Project initialisation and configuration |
| `/syntek-dev-suite:backend` | Backend development, APIs, database |
| `/syntek-dev-suite:frontend` | UI/UX, components, accessibility |
| `/syntek-dev-suite:database` | Database design, migrations, optimisation |
| `/syntek-dev-suite:auth` | Authentication, MFA, session management |

### Quality & Testing

| Command | Description |
|---------|-------------|
| `/syntek-dev-suite:test-writer` | TDD test suites and stubs |
| `/syntek-dev-suite:qa-tester` | Hostile QA, security, edge cases |
| `/syntek-dev-suite:review` | Code review, SOLID, security |
| `/syntek-dev-suite:debug` | Root cause analysis, debugging |

### Refactoring & Maintenance

| Command | Description |
|---------|-------------|
| `/syntek-dev-suite:refactor` | Code cleanup without changing logic |
| `/syntek-dev-suite:syntax` | Fix syntax and linting errors |
| `/syntek-dev-suite:docs` | Technical documentation |

### Infrastructure

| Command | Description |
|---------|-------------|
| `/syntek-dev-suite:cicd` | CI/CD pipelines, deployments |
| `/syntek-dev-suite:security` | Access control, headers, rate limiting |
| `/syntek-dev-suite:logging` | Logging, Sentry, audit trails |
| `/syntek-dev-suite:git` | Branch management, versioning |

### Specialised

| Command | Description |
|---------|-------------|
| `/syntek-dev-suite:gdpr` | GDPR compliance, data protection |
| `/syntek-dev-suite:seo` | SEO, meta tags, structured data |
| `/syntek-dev-suite:notifications` | Email, SMS, push notifications |
| `/syntek-dev-suite:export` | PDF, Excel, CSV, JSON exports |
| `/syntek-dev-suite:reporting` | Data queries, report services |
| `/syntek-dev-suite:data` | Data analysis, Python, SQL |
| `/syntek-dev-suite:support-articles` | Help documentation |

---

## Plugin Commands

| Command | Description |
|---------|-------------|
| `/syntek-dev-suite:init` | Initialise Syntek Dev Suite for a project |

---

## Learning Commands

The learning system helps agents improve over time based on your feedback.

| Command | Description |
|---------|-------------|
| `/syntek-dev-suite:learning-feedback good` | Mark the last run as successful |
| `/syntek-dev-suite:learning-feedback bad [comment]` | Mark as needing improvement |
| `/syntek-dev-suite:learning-ab-test list` | List active A/B tests |
| `/syntek-dev-suite:learning-ab-test status <agent>` | Show test results for an agent |
| `/syntek-dev-suite:learning-optimise status` | Show optimisation system status |
| `/syntek-dev-suite:learning-optimise analyse <agent>` | Analyse an agent's performance |
| `/syntek-dev-suite:learning-optimise apply <id>` | Apply a pending optimisation |

---

## Skills Reference

Skills are loaded automatically based on your project's `Skill Target` in `CLAUDE.md`.

### Stack Skills

| Skill | Target | Applied To |
|-------|--------|------------|
| `stack-shared-lib` | Shared Library | NPM packages for web/mobile |

### Global Skill

The `global-workflow` skill is always loaded and provides:
- British English localisation
- Date format: DD/MM/YYYY
- Time format: 24-hour clock (14:30)
- Timezone: Europe/London
- Currency: GBP
- Git commit message standards
- Documentation formatting rules

---

## Self-Learning and A/B Testing

The plugin includes a self-learning system that improves agent performance based on your feedback. Each project develops its own optimised prompts over time.

### How It Works

1. **Feedback Collection** - After each agent run, rate the output
2. **Metrics Recording** - Run duration, outcomes, and errors are tracked
3. **Pattern Analysis** - The system identifies what works and what doesn't
4. **A/B Testing** - Prompt variants are tested to find the best approach
5. **Prompt Optimisation** - Winning prompts are applied automatically

### Giving Feedback

After each agent run, provide feedback to improve future runs:

```bash
# If the output was good
/syntek-dev-suite:learning-feedback good

# If the output needs improvement
/syntek-dev-suite:learning-feedback bad The output didn't follow the coding style
```

### Project-Specific Learning

- All feedback and metrics are stored in your project's `docs/METRICS/` folder
- Data is committed to Git, so the whole team benefits from improvements
- Each project develops its own optimised prompts over time
- The more feedback you provide, the better the agents become for your project

---

## Best Practices

### 1. Always Start with `/syntek-dev-suite:plan`

For any non-trivial feature, get a roadmap before coding:

```bash
/syntek-dev-suite:plan Add a DatePicker component
```

### 2. Use `/syntek-dev-suite:qa-tester` Before Merging

Catch issues early with hostile QA:

```bash
/syntek-dev-suite:qa-tester Review my changes before PR
```

### 3. Keep CLAUDE.md Updated

When you add dependencies or change frameworks, update `.claude/CLAUDE.md`.

### 4. Let Agents Read Files

Don't paste code into commands. The agent will read files:

```bash
# Good
/syntek-dev-suite:frontend Fix the Button component

# Less good
/syntek-dev-suite:frontend Fix this code: [pasted code]
```

### 5. Chain Commands Logically

Follow the natural development flow:

```
plan -> test-writer -> frontend -> syntax -> qa-tester -> review -> docs
```

### 6. Commit After Each Step

Small, focused commits after each agent interaction:

```bash
/syntek-dev-suite:frontend Create the Card component
git commit -m "feat(card): add Card component"

/syntek-dev-suite:test-writer Write tests for Card component
git commit -m "test(card): add Card component tests"
```

### 7. Give Feedback

Help agents improve by providing feedback:

```bash
/syntek-dev-suite:learning-feedback good   # When output is correct
/syntek-dev-suite:learning-feedback bad    # When output needs improvement
```

---

## Environment Commands

This project uses root-level scripts for different environments:

| Script | Purpose | Command |
|--------|---------|---------|
| `./dev.sh` | Start development | Watch mode with tsup |
| `./test.sh` | Run tests | Test suite + type check + lint |
| `./staging.sh` | Staging build | Build + prerelease version |
| `./production.sh` | Production build | Build for release |

---

## Getting Help

- **Plugin Issues:** https://github.com/syntek-developers/syntek-dev-suite/issues
- **Documentation:** See `examples/` folder in the plugin directory
- **Reset to Default:** Delete `.claude/` folder and run `/syntek-dev-suite:init` again

---

**Happy coding with Syntek Dev Suite!**
