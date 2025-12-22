# Self-Learning System Data

This folder contains data for the Syntek Dev Suite self-learning system. The system improves agent performance based on team feedback.

## Folder Structure

| Folder | Purpose |
|--------|---------|
| `runs/` | Records of individual agent runs |
| `feedback/` | User feedback on agent outputs |
| `aggregates/daily/` | Daily summary statistics |
| `aggregates/weekly/` | Weekly summary statistics |
| `variants/` | A/B test prompt variants |
| `optimisations/pending/` | LLM-generated improvements awaiting review |
| `optimisations/applied/` | Improvements that have been applied |
| `optimisations/rejected/` | Improvements that were rejected |
| `templates/` | Analysis prompt templates |

## Configuration

See `config.json` for system settings:
- `enabled`: Whether the learning system is active
- `auto_optimisation_enabled`: Whether improvements are applied automatically
- `min_runs_for_analysis`: Minimum runs before analysis occurs

## How It Works

1. **Feedback Collection** - After each agent run, rate the output with `/syntek-dev-suite:learning-feedback`
2. **Metrics Recording** - Run duration, outcomes, and errors are tracked automatically
3. **Pattern Analysis** - The system identifies what works and what doesn't
4. **A/B Testing** - Prompt variants are tested to find the best approach
5. **Prompt Optimisation** - Winning prompts are applied (automatically if enabled)

## Commands

```bash
# Give feedback after an agent run
/syntek-dev-suite:learning-feedback good
/syntek-dev-suite:learning-feedback bad [reason]

# Check A/B test status
/syntek-dev-suite:learning-ab-test list
/syntek-dev-suite:learning-ab-test status <agent>

# Manage optimisations
/syntek-dev-suite:learning-optimise status
/syntek-dev-suite:learning-optimise analyse <agent>
/syntek-dev-suite:learning-optimise apply <id>
```

## Best Practices

1. **Be consistent** - Always provide feedback after significant agent runs
2. **Be specific** - When marking as "bad", explain what was wrong
3. **Commit regularly** - The team benefits when feedback is in version control
4. **Review periodically** - Check `aggregates/` for performance trends
